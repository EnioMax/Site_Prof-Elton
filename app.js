// app.js - Lógica e Funções de Conversão

// Estado interno para salvar as escolhas do usuário no Simulador
const simuladorState = {
    formato: "",
    tema: ""
};

// 1. Inicialização do Acervo e da Mídia assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    renderizarAcervo();
    renderizarMidia();
});

// Renderiza os cards de artigos dinamicamente baseando-se no dados.js
function renderizarAcervo() {
    const grid = document.getElementById("gridArtigos");
    if (!grid) return;

    grid.innerHTML = ACERVO_INTELECTUAL.map(item => `
        <div class="card-artigo">
            <div>
                <span class="categoria-tag">${item.categoria} — ${item.tipo}</span>
                <h4 style="margin: 8px 0; font-size:1.15rem; color:var(--cor-primaria); font-family:var(--fonte-serif);">${item.titulo}</h4>
                <p style="font-size:0.9rem; color:#666; margin-bottom: 15px;">Veículo: ${item.veiculo}</p>
            </div>
            <a href="${item.link}" target="_blank" style="color:var(--cor-secundaria); font-weight:bold; text-decoration:none; font-size:0.9rem; align-self: flex-start;">Acessar Conteúdo →</a>
        </div>
    `).join('');
}

// Renderiza os cards de mídia (vídeo ou foto) dinamicamente baseando-se no dados.js
function renderizarMidia() {
    const container = document.getElementById("listaMidia");
    if (!container) return;

    container.innerHTML = MIDIA_DESTAQUES.map(item => `
        <div class="bloco-video-focado">
            <div class="box-video-yt-novo">
                ${item.tipo === "video"
                    ? `<iframe src="https://www.youtube.com/embed/${item.videoId}" title="${item.titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                    : `<img src="${item.imagem}" alt="${item.titulo}" class="midia-foto">`
                }
            </div>
            <div class="info-video-texto-novo">
                <span class="tag-canal-nova">${item.tag}</span>
                <h3 class="titulo-video-novo">${item.titulo}</h3>
                <p class="resumo-video-novo">${item.resumo}</p>
            </div>
        </div>
    `).join('');
}

// 2. Manipulação de Etapas do Simulador de Palestras
function definirEscolha(campo, valor, etapaAtual) {
    // Guarda a resposta (ex: formato = "Palestra Corporativa")
    simuladorState[campo] = valor;

    // Oculta a etapa atual e mostra a próxima
    document.getElementById(`passo${etapaAtual}`).style.display = "none";
    document.getElementById(`passo${etapaAtual + 1}`).style.display = "block";
}

// 3. Controle dos Modais (Abre e Fecha)
function toggleModal(idModal) {
    const modal = document.getElementById(idModal);
    const displayAtual = window.getComputedStyle(modal).display;
    modal.style.display = displayAtual === "none" ? "block" : "none";
}

// 4. Processamento dos Formulários e Disparos de Alertas com contatos completos

// Envio do Simulador Multietapas
function processarEnvio(evento) {
    evento.preventDefault();

    const nome = document.getElementById("simNome").value;
    const empresa = document.getElementById("simEmpresa").value;
    const email = document.getElementById("simEmail").value;
    const whats = document.getElementById("simWhats").value;

    // Montando Mensagem com dados de contato cruciais para retorno rápido
    const mensagemTexto = `🚨 NOVO CONTATO CAPTADO - ÊNIO MAX.TECH%0A%0A` +
        `• Tipo: Agendamento de Palestra (Simulador)%0A` +
        `• Nome do Solicitante: ${nome}%0A` +
        `• Empresa/Instituição: ${empresa}%0A` +
        `• Formato Escolhido: ${simuladorState.formato}%0A` +
        `• Tema Solicitado: ${simuladorState.tema}%0A%0A` +
        `📞 DADOS DE CONTATO DIRETO:%0A` +
        `• WhatsApp: ${whats}%0A` +
        `• E-mail: ${email}`;

    enviarParaDestinatarios(mensagemTexto, { nome, empresa, email, whats, tipo: "Simulador" });
}

// Envio do Contato Rápido (botão flutuante)
function enviarContatoUrgente(evento) {
    evento.preventDefault();

    const nome = document.getElementById("urgNome").value;
    const veiculo = document.getElementById("urgVeiculo").value;
    const whats = document.getElementById("urgWhats").value;

    const mensagemTexto = `🚨 NOVO CONTATO CAPTADO - ÊNIO MAX.TECH%0A%0A` +
        `• Tipo: Contato Rápido (Botão Flutuante)%0A` +
        `• Nome: ${nome}%0A` +
        `• Empresa/Instituição: ${veiculo}%0A%0A` +
        `📞 DADOS DE CONTATO DIRETO:%0A` +
        `• WhatsApp: ${whats}`;

    enviarParaDestinatarios(mensagemTexto, { nome, veiculo, whats, tipo: "Contato Rápido" });
}

// Direcionamento e registro final do Lead
function enviarParaDestinatarios(mensagemHTML, dadosObjeto) {
    // 1. Simulação de salvamento local/Trello (visível no console de desenvolvedor)
    console.log("Lead salvo com sucesso no banco de dados da Ênio Max.Tech:", dadosObjeto);

    // 2. Redirecionamento Dinâmico para o WhatsApp do Assessor/Professor
    const telefoneAssessor = "5581997860554"; // WhatsApp real do Prof. Elton
    window.open(`https://api.whatsapp.com/send?phone=${telefoneAssessor}&text=${mensagemHTML}`, '_blank');
}

// app.js - Lógica e Funções de Conversão

// 1. Inicialização do Acervo e da Mídia assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    renderizarAcervo();
    renderizarMidia();
});

// Renderiza os cards de artigos dinamicamente baseando-se no dados.js
function renderizarAcervo() {
    const grid = document.getElementById("gridArtigos");
    if (!grid) return;

    grid.innerHTML = ACERVO_INTELECTUAL.map(item => `
        <div class="card-artigo">
            <div>
                <span class="categoria-tag">${item.categoria} — ${item.tipo}</span>
                <h4 style="margin: 8px 0; font-size:1.15rem; color:var(--cor-primaria); font-family:var(--fonte-serif);">${item.titulo}</h4>
                <p style="font-size:0.9rem; color:#666; margin-bottom: 15px;">Veículo: ${item.veiculo}</p>
            </div>
            <a href="${item.link}" target="_blank" style="color:var(--cor-secundaria); font-weight:bold; text-decoration:none; font-size:0.9rem; align-self: flex-start;">Acessar Conteúdo →</a>
        </div>
    `).join('');
}

// Renderiza os cards de mídia (vídeo ou foto) dinamicamente baseando-se no dados.js
function renderizarMidia() {
    const container = document.getElementById("listaMidia");
    if (!container) return;

    container.innerHTML = MIDIA_DESTAQUES.map(item => `
        <div class="bloco-video-focado">
            <div class="box-video-yt-novo">
                ${item.tipo === "video"
                    ? `<iframe src="https://www.youtube.com/embed/${item.videoId}" title="${item.titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
                    : `<img src="${item.imagem}" alt="${item.titulo}" class="midia-foto">`
                }
            </div>
            <div class="info-video-texto-novo">
                <span class="tag-canal-nova">${item.tag}</span>
                <h3 class="titulo-video-novo">${item.titulo}</h3>
                <p class="resumo-video-novo">${item.resumo}</p>
            </div>
        </div>
    `).join('');
}

// 2. Manipulação de Etapas do Simulador de Palestras
function definirEscolha(campo, valor, etapaAtual) {
    // Guarda a resposta (ex: formato = "Palestra Corporativa")
    simuladorState[campo] = valor;

    // Oculta a etapa atual e mostra a próxima
    document.getElementById(`passo${etapaAtual}`).style.display = "none";
    document.getElementById(`passo${etapaAtual + 1}`).style.display = "block";
}

// 3. Controle dos Modais (Abre e Fecha)
function toggleModal(idModal) {
    const modal = document.getElementById(idModal);
    const displayAtual = window.getComputedStyle(modal).display;
    modal.style.display = displayAtual === "none" ? "block" : "none";
}

// 4. Processamento dos Formulários e Disparos de Alertas com contatos completos

// Envio do Simulador Multietapas
function processarEnvio(evento) {
    evento.preventDefault();

    const nome = document.getElementById("simNome").value;
    const empresa = document.getElementById("simEmpresa").value;
    const email = document.getElementById("simEmail").value;
    const whats = document.getElementById("simWhats").value;

    // Montando Mensagem com dados de contato cruciais para retorno rápido
    const mensagemTexto = `🚨 NOVO CONTATO CAPTADO - ÊNIO MAX.TECH%0A%0A` +
        `• Tipo: Agendamento de Palestra (Simulador)%0A` +
        `• Nome do Solicitante: ${nome}%0A` +
        `• Empresa/Instituição: ${empresa}%0A` +
        `• Formato Escolhido: ${simuladorState.formato}%0A` +
        `• Tema Solicitado: ${simuladorState.tema}%0A%0A` +
        `📞 DADOS DE CONTATO DIRETO:%0A` +
        `• WhatsApp: ${whats}%0A` +
        `• E-mail: ${email}`;

    enviarParaDestinatarios(mensagemTexto, { nome, empresa, email, whats, tipo: "Simulador" });
}

// Envio do Contato Rápido (botão flutuante)
function enviarContatoUrgente(evento) {
    evento.preventDefault();

    const nome = document.getElementById("urgNome").value;
    const veiculo = document.getElementById("urgVeiculo").value;
    const whats = document.getElementById("urgWhats").value;

    const mensagemTexto = `🚨 NOVO CONTATO CAPTADO - ÊNIO MAX.TECH%0A%0A` +
        `• Tipo: Contato Rápido (Botão Flutuante)%0A` +
        `• Nome: ${nome}%0A` +
        `• Empresa/Instituição: ${veiculo}%0A%0A` +
        `📞 DADOS DE CONTATO DIRETO:%0A` +
        `• WhatsApp: ${whats}`;

    enviarParaDestinatarios(mensagemTexto, { nome, veiculo, whats, tipo: "Contato Rápido" });
}

// Direcionamento e registro final do Lead
function enviarParaDestinatarios(mensagemHTML, dadosObjeto) {
    // 1. Simulação de salvamento local/Trello (visível no console de desenvolvedor)
    console.log("Lead salvo com sucesso no banco de dados da Ênio Max.Tech:", dadosObjeto);

    // 2. Redirecionamento Dinâmico para o WhatsApp do Assessor/Professor
    const telefoneAssessor = "5581997860554"; // WhatsApp real do Prof. Elton
    window.open(`https://api.whatsapp.com/send?phone=${telefoneAssessor}&text=${mensagemHTML}`, '_blank');
}


// ==========================================================
// 5. SEÇÃO NOVA: SOLICITAÇÃO DE AGENDA (card da seção de Contato)
// Funções isoladas — não interferem no Simulador Multietapas acima.
// ==========================================================

let modalidadeAgendaSelecionada = null;

function selecionarModalidade(botao, modalidade) {
    // Remove destaque de todos os botões da Solicitação de Agenda
    document.querySelectorAll('.btn-opcao').forEach(btn => {
        btn.classList.remove('ativo');
    });

    // Destaca o botão clicado
    botao.classList.add('ativo');

    // Guarda a modalidade escolhida
    modalidadeAgendaSelecionada = modalidade;

    // Exibe a Etapa 2 (dados de contato) com o efeito cascata
    const dadosAgenda = document.getElementById('dadosAgenda');
    dadosAgenda.classList.add('visivel');

    // Rola a tela suavemente até o formulário
    dadosAgenda.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function enviarSolicitacao(event) {
    event.preventDefault();

    if (!modalidadeAgendaSelecionada) {
        alert('Por favor, selecione o tipo de contribuição desejada.');
        return;
    }

    // Captura os valores do formulário
    const instituicao = document.getElementById('instituicao').value.trim();
    const responsavel = document.getElementById('responsavel').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const email = document.getElementById('email').value.trim();
    const dataEvento = document.getElementById('dataEvento').value;
    const horaEvento = document.getElementById('horaEvento').value;

    // Formata a data para dd/mm/aaaa
    const dataFormatada = dataEvento
        ? new Date(dataEvento + 'T00:00:00').toLocaleDateString('pt-BR')
        : 'Não informada';

    // Monta a mensagem para o WhatsApp
    const mensagem =
        `*Solicitação de Agenda - Prof. Dr. Elton Gomes*\n\n` +
        `*Modalidade:* ${modalidadeAgendaSelecionada}\n` +
        `*Instituição/Empresa:* ${instituicao}\n` +
        `*Responsável:* ${responsavel}\n` +
        `*WhatsApp do contato:* ${whatsapp}\n` +
        `*E-mail:* ${email}\n` +
        `*Data pretendida:* ${dataFormatada}\n` +
        `*Horário pretendido:* ${horaEvento || 'Não informado'}`;

    // Mesmo número já usado nos outros formulários do site
    const numeroWhatsApp = '5581997860554';

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');

    // Reseta o formulário e o estado após o envio
    document.getElementById('formAgenda').reset();
    document.querySelectorAll('.btn-opcao').forEach(btn => btn.classList.remove('ativo'));
    dadosAgenda_reset();
}

function dadosAgenda_reset() {
    modalidadeAgendaSelecionada = null;
    const dadosAgenda = document.getElementById('dadosAgenda');
    if (dadosAgenda) dadosAgenda.classList.remove('visivel');
}