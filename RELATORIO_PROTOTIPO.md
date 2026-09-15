# Relatório do Protótipo — Automação de Publicação de Matérias do Prof. Dr. Elton Gomes

**Data:** 15/08/2026
**Autor:** Equipe de automação (revisão assistida por IA)
**Repositório do site:** https://github.com/EnioMax/Site_Prof-Elton
**Site publicado:** https://eniomax.github.io/Site_Prof-Elton/

---

## 1. Visão Geral

O protótipo automatiza o ciclo completo de publicação de matérias do Prof. Dr. Elton Gomes na seção **Mídia** do site: um alerta é disparado, o professor decide via WhatsApp o que fazer com a notícia, e o sistema publica automaticamente a matéria no topo da página — sem tocar em HTML.

**Fluxo macro:** `Google Alerts (detecção) → WhatsApp (decisão 1/2/3) → n8n (orquestração) → Postgres (controle) → GitHub Pages (publicação)`.

---

## 2. Arquitetura e Componentes

### 2.1 Infraestrutura (Docker, ambiente local)

| Container | Imagem | Porta | Função |
|---|---|---|---|
| `n8n` | n8nio/n8n:latest | 5678 | Orquestrador de workflows |
| `evolution-api` | evoapicloud/evolution-api | 8080 | Gateway WhatsApp (envio/recebimento) |
| `evolution-postgres` | postgres:15 | 5432 | Banco de dados (n8n + estado do pipeline) |

### 2.2 Banco de dados

Tabela principal **`itens_processados`** (banco `evolution_db`, usuário `evolution`):

| Coluna | Tipo | Observação |
|---|---|---|
| `id` | serial | PK |
| `video_id` | text | NOT NULL (ID do vídeo ou slug/link da matéria) |
| `titulo` | text | Título da matéria |
| `link` | text | URL da notícia |
| `status` | text | `notificado` → `publicado` / `ignorado` / `decidir_depois` |
| `data_processamento` | timestamptz | default `NOW()` |
| `notificado_em` | timestamptz | quando foi notificado via WhatsApp |
| `decidir_depois_em` | timestamptz | quando entrou em "decidir depois" |

### 2.3 Repositório do site (GitHub Pages)

- **`dados.js`** — "fonte de verdade" dos dados exibidos; editado automaticamente pelo pipeline via API do GitHub (PUT, base64). Contém:
  - `ACERVO_INTELECTUAL[]` — análises/artigos (curadoria manual, seção Acervo).
  - `MIDIA_DESTAQUES[]` — cards da seção Mídia, com limite de **4 itens**: vídeos (`tipo: "video"`), fotos (`tipo: "foto"`) e matérias (`tipo: "matéria"` com `link` e `imagem` og:image).
- **`app.js`** — renderiza os cards no DOM (`renderizarMidia()`), com links clicáveis na imagem, título e "Ler matéria →".
- **`style.css` / `index.html`** — estilos e estrutura; cache-buster `?v=20260816`.

---

## 3. Lógica do Pipeline (Workflow Principal)

### 3.1 Disparo (Webhook)

- Endpoint n8n: `POST http://localhost:5678/webhook/cd172a0a-fb25-4303-ae53-55e0a550dd3a`
- Payload da Evolution API:
  ```json
  { "event": "messages.upsert", "data": { "message": { "conversation": "1" } } }
  ```
- Responde `200 Workflow was started`.

### 3.2 Fluxo de decisão do professor

O professor recebe a matéria no WhatsApp com as opções:

```
1️⃣ Publicar
2️⃣ Ignorar
3️⃣ Decidir depois
```

O nó **Switch** roteia a resposta (`1`, `2` ou `3`) para três ramos Postgres:

| Resposta | Ação no banco |
|---|---|
| 1 — Publicar | `UPDATE ... SET status='publicado' WHERE status='notificado' RETURNING id, titulo, link` |
| 2 — Ignorar | `UPDATE ... SET status='ignorado' WHERE status='notificado'` |
| 3 — Decidir depois | `UPDATE ... SET status='decidir_depois', decidir_depois_em=NOW() WHERE status='notificado'` |

### 3.3 Ramo de Publicação

1. **`Marcar como publicado`** → atualiza o status e devolve os dados da matéria.
2. **`BuscarImagem`** → faz `GET` na URL da notícia e captura o HTML (texto) para extrair a `og:image` (thumbnail).
3. **`Code in JavaScript`** → lê `dados.js` do GitHub, extrai a `og:image`, monta a entrada nova e a insere no topo de `MIDIA_DESTAQUES`, aplicando a **regra de rotação FIFO** (ver 3.5). Retorna `sha` + conteúdo novo (base64).
4. **`HTTP Request3 / HTTP Request5`** → `PUT https://api.github.com/repos/EnioMax/Site_Prof-Elton/contents/dados.js` (publicação real).
5. **`HTTP Request4`** → envia confirmação ao professor via WhatsApp.

### 3.4 Workflow de Lembrete ("Relembrar decidir depois")

- Agenda a cada 30 min (`Schedule Trigger`).
- Se não há itens `notificado` em espera, verifica itens em `decidir_depois` há **mais de 24h**.
- Reativa um como `notificado` e reenvia a mensagem de decisão (1/2/3).

### 3.5 Regra de rotação (FIFO) — confirmada com o professor

> "A matéria mais recente fica no topo, depois a segunda, a terceira, até a quarta."

Implementação no nó Code (`while (entradas.length > LIMITE)`):

1. A entrada nova é **inserida no topo** de `MIDIA_DESTAQUES`.
2. Todas as 4 posições deslizam (incluindo curadas).
3. Ao chegar a 5ª entrada, a **4ª (mais antiga) é removida** do array e da página.
4. Os cards continuam exibindo os 4 itens mais recentes.

**Validação E2E:** matéria "Moraes autoriza X a retomar funcionamento no Brasil" entrou no topo (posição 1), "Foro de SP" deslizou para 2, curadas para 3 e 4, e o item antigo (TMC) saiu do ar. Commit GitHub `bacf301`.

### 3.6 Classificação de veículo (nó Code)

A URL da notícia é classificada por domínio para o tag do card:

| Domínio | Tag |
|---|---|
| `g1.globo.com` | G1 |
| `oglobo.globo.com` | O Globo |
| `gazetadopovo.com.br` | Gazeta do Povo |
| `folhape.com.br` | Folha de Pernambuco |
| `folha.uol.com.br` | Folha de S.Paulo |
| `estadao.com.br` | Estadão |
| `youtube.com` / `youtu.be` | YouTube (gera card de vídeo com `videoId`) |

---

## 4. O que foi feito

### 4.1 Fluxo e decisão
- Implementados os 3 ramos de resposta (publicar / ignorar / decidir depois) com atualização no Postgres e mensagens de confirmação no WhatsApp.
- Workflow de lembrete para matérias "decidir depois" após 24h.

### 4.2 Publicação automática
- Leitura do `dados.js` no GitHub via API, extração de `og:image` da página da notícia, inserção de card de matéria no topo e `PUT` do arquivo atualizado.
- Rotação FIFO simples e previsível (limite 4) — substituiu lógica complexa de evicção por "automático mais antigo".

### 4.3 Front-end
- Cards de matéria com imagem (og:image) e layout 16:9 responsivo.
- **Correção aplicada:** imagem e título agora são clicáveis (antes só "Ler matéria →" funcionava). Classes `.midia-materia-link` e `.midia-titulo-link`; cache-buster `v=20260816`.

### 4.4 Verificação e testes
- Simulação do Code node em Node.js (rotação FIFO correta: nova no topo, 4ª sai).
- Reimportação do workflow no n8n, reativação (webhook + active) e verificação do código persistido no banco após restart.
- Teste ao vivo: execução 355 finalizada com sucesso, matéria publicada, commit no GitHub, site HTTP 200.
- Conferência de que `app.js`, `style.css` e `index.html` estão no ar com as novas classes.

---

## 5. Próximos passos até a entrega do protótipo

### 5.1 Pendências críticas (antes de apresentar ao professor)
1. **Trocar o número de testes pelo do professor** em `build_wf.js` (atualmente `NUMERO = '5581994241537'`; professor = `5581997860554`) e reimportar/reativar o workflow.
2. **Validar o gatilho real do Google Alerts** — confirmar que a detecção/disparo chega de fato ao WhatsApp do professor (hoje o teste usou webhook manual).
3. **Ativar o workflow de lembrete** (`Relembrar decidir depois`) que está com `active: false`.
4. **Teste E2E completo** com o número do professor: alerta → decisão → publicação → confirmação, cobrindo os 3 botões.

### 5.2 Robustez e edge cases
5. **Prevenção de duplicidade** — hoje o Code ignora reenvio se a chave (videoId ou link) já existe; testar reenvio do mesmo link.
6. **Matérias sem `og:image`** — placeholder "Matéria na imprensa" já existe; validar visualmente em card real.
7. **Mensagens inesperadas** no webhook (texto livre em vez de 1/2/3) — decidir comportamento (ignorar com aviso, ou nova pergunta).
8. **Rate limit da API do GitHub** — tratar erro de quota e retry.
9. **Falha de rede/erros nos nós** — adicionar `onError` explícito e notificação de falha ao professor.

### 5.3 Segurança
10. **Autenticação do webhook** (token/segredo) para evitar disparos externos.
11. **Credenciais** — revisar armazenamento das senhas da Evolution API e do GitHub no n8n.
12. **Validação de URL** no `BuscarImagem` para evitar SSRF em caso de webhook aberto.

### 5.4 Operação e entrega
13. **Backup e versionamento** do `build_wf.js` (fonte única do workflow) e do export do n8n.
14. **Documentação de manutenção** — este relatório + como reimportar/reativar o workflow.
15. **Decisão de hospedagem** — o pipeline roda em Docker local; avaliar VM/servidor para produção e HTTPS no webhook.
16. **Monitoramento simples** — checagem periódica de que o n8n, Evolution API e Pages estão no ar.

### 5.5 Melhorias futuras (pós-prototótipo)
17. Dashboard no n8n para o professor acompanhar histórico (status por item).
18. Publicação de análises de vídeo (YouTube) no mesmo fluxo.
19. Escolha de imagem manual antes de publicar (botão extra no WhatsApp).
20. Integração com Google Alerts via RSS/email real (hoje o gatilho é manual/webhook).

---

## 6. Prompt pronto para a IA dar continuidade

Copie e cole o bloco abaixo na IA de sua preferência (substitua o que estiver entre colchetes):

```text
Atue como engenheiro sênior de automação (n8n, Docker, Node.js, GitHub Pages).

CONTEXTO DO PROJETO
Um site estático (repo GitHub EnioMax/Site_Prof-Elton) tem uma seção "Mídia" renderizada por
app.js a partir de dados.js (arrays ACERVO_INTELECTUAL e MIDIA_DESTAQUES, limite de 4 itens).
Um pipeline em n8n (Docker, porta 5678, project 34HunOHzMxLinQHh) recebe a decisão do professor
via WhatsApp (Evolution API em :8080), grava o status em Postgres (tabela itens_processados:
status notificado|publicado|ignorado|decidir_depois) e publica a matéria editando dados.js via
API do GitHub (PUT /repos/EnioMax/Site_Prof-Elton/contents/dados.js).

FLUXO ATUAL
1) Webhook POST /webhook/cd172a0a-fb25-4303-ae53-55e0a550dd3a
   payload {"event":"messages.upsert","data":{"message":{"conversation":"1"}}}
2) Switch roteia resposta do professor: 1=Publicar, 2=Ignorar, 3=Decidir depois.
3) Publicar -> UPDATE status='publicado' -> BuscarImagem (GET na URL p/ extrair og:image)
   -> nó Code insere card no TOPO de MIDIA_DESTAQUES e remove a 4ª entrada (FIFO)
   -> PUT dados.js -> confirmação via WhatsApp.
4) Workflow "Relembrar decidir depois" (id 7NFjh3xnze1vXIHm, schedule 30min) reavisa itens
   em decidir_depois há mais de 24h. Está inactive.

REGRAS DE NEGÓCIO
- Matéria mais recente no topo; as 4 posições deslizam; a 4ª sai quando chega a 5ª.
- Tags de veículo por domínio (g1.globo.com->G1, gazetadopovo.com.br->Gazeta do Povo, etc.).
- YouTube vira card tipo "video" com videoId.
- Sem og:image -> placeholder "Matéria na imprensa".

FONTE ÚNICA DO WORKFLOW
O arquivo build_wf.js (Node) gera wf-import.json e contém toda a lógica dos nós (inclusive o
nó Code). Para reimportar/reativar no n8n, rodar dentro do container:
  n8n import:workflow --input=/tmp/wf/wf-import.json --projectId=34HunOHzMxLinQHh
e os scripts register_webhook.js / set_av.js / set_active.js, seguidos de docker restart n8n.
Atenção: o n8n em execução pode sobrescrever o banco no shutdown; conferir workflow_entity.nodes
após o restart.

TAREFAS (prioridade do usuário)
1) [TAREFA — ex.: "Trocar o número do WhatsApp para 5581997860554 no build_wf.js e reimportar
   sem duplicar o workflow"]
2) [TAREFA 2 — ex.: "Criar validação de mensagens que não sejam 1/2/3 no webhook"]
3) [TAREFA 3 — ex.: "Adicionar autenticação por token no webhook do n8n"]

ENTREGÁVEIS ESPERADOS
- Código/instruções de mudança (no formato exato do build_wf.js, preservando IDs fixos de
  nós/workflows para não duplicar ao reimportar).
- Comandos Docker/n8n prontos para aplicar e reverter.
- Roteiro de validação (comandos psql, disparo de webhook, conferência do dados.js no GitHub).
- Aviso de riscos (rate limit GitHub, duplicidade de import, persistência do banco no restart).

Regra de ouro: alterar somente o build_wf.js (e arquivos do site quando necessário) e sempre
gerar/validar o JSON antes de importar. Não commitar nada sem instrução explícita.
```

---

## 7. Comandos úteis de referência

```bash
# Importar workflow no n8n
docker exec n8n n8n import:workflow --input=/tmp/wf/wf-import.json --projectId=34HunOHzMxLinQHh

# Copiar JSON para dentro do container
docker cp wf-import.json n8n:/tmp/wf/wf-import.json

# Consultar itens na fila
docker exec evolution-postgres psql -U evolution -d evolution_db -c "SELECT id, video_id, titulo, status, data_processamento FROM itens_processados ORDER BY id DESC LIMIT 10;"

# Disparar webhook manualmente (teste)
curl -X POST http://localhost:5678/webhook/cd172a0a-fb25-4303-ae53-55e0a550dd3a -H "Content-Type: application/json" -d "{\"event\":\"messages.upsert\",\"data\":{\"message\":{\"conversation\":\"1\"}}}"
```
