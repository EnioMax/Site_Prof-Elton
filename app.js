// app.js - Lógica e Funções de Conversão

// Escapa valores antes de interpolar no HTML (evita quebras e XSS)
function esc(valor) {
    return String(valor == null ? '' : valor)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// 1. Inicialização do Acervo e da Mídia assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    renderizarAcervo();
    renderizarMidia();
    prepararModais();
});

// Renderiza os cards de artigos dinamicamente baseando-se no dados.js
function renderizarAcervo() {
    const grid = document.getElementById("gridArtigos");
    if (!grid) return;

    grid.innerHTML = ACERVO_INTELECTUAL.map(item => `
        <article class="card-artigo">
            <div>
                <span class="categoria-tag">${esc(item.categoria)} — ${esc(item.tipo)}</span>
                <h4 class="titulo-artigo">${esc(item.titulo)}</h4>
                <p class="veiculo-artigo">Veículo: ${esc(item.veiculo)}</p>
            </div>
            <a class="link-conteudo" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">Acessar Conteúdo →</a>
        </article>
    `).join('');
}

// Renderiza as duas subseções de mídia (vídeos + matérias)
function renderizarMidia() {
    renderizarVideos();
    renderizarMaterias();
}

// Renderiza os cards de vídeos do YouTube
function renderizarVideos() {
    const container = document.getElementById("listaVideos");
    if (!container) return;

    if (!VIDEOS_YOUTUBE || VIDEOS_YOUTUBE.length === 0) {
        container.innerHTML = '<p class="sem-conteudo">Nenhum vídeo disponível no momento.</p>';
        return;
    }

    container.innerHTML = VIDEOS_YOUTUBE.map(item => {
        const ytUrl = 'https://www.youtube.com/watch?v=' + esc(item.videoId);
        const thumbUrl = 'https://i.ytimg.com/vi/' + esc(item.videoId) + '/hqdefault.jpg';
        return `
        <div class="bloco-video-focado">
            <a class="box-video-yt-novo box-video-thumb" href="${ytUrl}" target="_blank" rel="noopener noreferrer" aria-label="Assistir vídeo: ${esc(item.titulo)}">
                <img src="${thumbUrl}" alt="${esc(item.titulo)}" class="midia-foto" loading="lazy">
                <span class="play-yt-overlay"><i class="fab fa-youtube"></i></span>
            </a>
            <div class="info-video-texto-novo">
                <span class="tag-canal-nova">${esc(item.tag)}</span>
                <h3 class="titulo-video-novo"><a class="midia-titulo-link" href="${ytUrl}" target="_blank" rel="noopener noreferrer">${esc(item.titulo)}</a></h3>
                <p class="resumo-video-novo">${esc(item.resumo)}</p>
                <a class="link-conteudo" href="${ytUrl}" target="_blank" rel="noopener noreferrer">Assistir no YouTube →</a>
            </div>
        </div>`;
    }).join('');
}

// Renderiza os cards de matérias jornalísticas
function renderizarMaterias() {
    const container = document.getElementById("listaMaterias");
    if (!container) return;

    if (!MATERIAS_IMPRENSA || MATERIAS_IMPRENSA.length === 0) {
        container.innerHTML = '<p class="sem-conteudo">Nenhuma matéria disponível no momento.</p>';
        return;
    }

    container.innerHTML = MATERIAS_IMPRENSA.map(item => {
        const href = item.link ? esc(item.link) : null;
        return `
        <div class="bloco-video-focado">
            <div class="box-video-yt-novo ${item.imagem ? '' : 'sem-imagem'}">
                ${href
                    ? `<a class="midia-materia-link" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="Abrir matéria: ${esc(item.titulo)}">
                        ${item.imagem
                            ? `<img src="${esc(item.imagem)}" alt="${esc(item.titulo)}" class="midia-foto" loading="lazy">`
                            : `<span class="midia-materia-placeholder"><i class="fas fa-newspaper"></i><span>Matéria na imprensa</span></span>`
                        }
                       </a>`
                    : (item.imagem
                        ? `<img src="${esc(item.imagem)}" alt="${esc(item.titulo)}" class="midia-foto" loading="lazy">`
                        : `<span class="midia-materia-placeholder"><i class="fas fa-newspaper"></i><span>Matéria na imprensa</span></span>`)
                }
                <span class="midia-materia-badge"><i class="fas fa-newspaper"></i> ${esc(item.veiculo || item.tag)}</span>
            </div>
            <div class="info-video-texto-novo">
                <span class="tag-canal-nova">${esc(item.tag)}</span>
                <h3 class="titulo-video-novo">${href ? `<a class="midia-titulo-link" href="${href}" target="_blank" rel="noopener noreferrer">${esc(item.titulo)}</a>` : esc(item.titulo)}</h3>
                <p class="resumo-video-novo">${esc(item.resumo)}</p>
                ${href ? `<a class="link-conteudo" href="${href}" target="_blank" rel="noopener noreferrer">Ler matéria →</a>` : ''}
            </div>
        </div>`;
    }).join('');
}

// 2. Controle dos Modais (Abre, Fecha, ESC, clique fora e gestão de foco)
let ultimoFoco = null;

function prepararModais() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (evento) => {
            if (evento.target === modal) fecharModal(modal);
        });
    });
}

function toggleModal(idModal) {
    const modal = document.getElementById(idModal);
    if (!modal) return;

    if (modal.getAttribute('data-aberto') === 'true') {
        fecharModal(modal);
    } else {
        abrirModal(modal);
    }
}

function abrirModal(modal) {
    ultimoFoco = document.activeElement;
    modal.setAttribute('data-aberto', 'true');
    modal.style.display = 'block';
    const primeiroCampo = modal.querySelector('input');
    if (primeiroCampo) primeiroCampo.focus();
}

function fecharModal(modal) {
    modal.removeAttribute('data-aberto');
    modal.style.display = 'none';
    if (ultimoFoco && typeof ultimoFoco.focus === 'function') {
        ultimoFoco.focus();
    }
}

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        document.querySelectorAll('.modal[data-aberto="true"]').forEach(fecharModal);
    }
});

// 3. Envio do Contato Rápido (botão flutuante)
function enviarContatoUrgente(evento) {
    evento.preventDefault();

    const nome = document.getElementById("urgNome").value.trim();
    const veiculo = document.getElementById("urgVeiculo").value.trim();
    const whats = document.getElementById("urgWhats").value.trim();

    const mensagemTexto =
        "🚨 NOVO CONTATO CAPTADO - ÊNIO MAX.TECH\n\n" +
        "• Tipo: Contato Rápido (Botão Flutuante)\n" +
        `• Nome: ${nome}\n` +
        `• Empresa/Instituição: ${veiculo}\n\n` +
        "📞 DADOS DE CONTATO DIRETO:\n" +
        `• WhatsApp: ${whats}`;

    console.log("Lead captado:", { nome, veiculo, whats });

    window.open(
        `https://api.whatsapp.com/send?phone=5581997860554&text=${encodeURIComponent(mensagemTexto)}`,
        '_blank',
        'noopener'
    );
}

// ==========================================================
// 4. SEÇÃO: SOLICITAÇÃO DE AGENDA (card da seção de Contato)
// ==========================================================

let modalidadeAgendaSelecionada = null;

function selecionarModalidade(botao, modalidade) {
    document.querySelectorAll('.btn-opcao').forEach(btn => {
        btn.classList.remove('ativo');
    });

    botao.classList.add('ativo');
    modalidadeAgendaSelecionada = modalidade;

    const dadosAgenda = document.getElementById('dadosAgenda');
    dadosAgenda.classList.add('visivel');
    dadosAgenda.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function enviarSolicitacao(event) {
    event.preventDefault();

    if (!modalidadeAgendaSelecionada) {
        alert('Por favor, selecione o tipo de contribuição desejada.');
        return;
    }

    const instituicao = document.getElementById('instituicao').value.trim();
    const responsavel = document.getElementById('responsavel').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const email = document.getElementById('email').value.trim();
    const dataEvento = document.getElementById('dataEvento').value;
    const horaEvento = document.getElementById('horaEvento').value;

    const dataFormatada = dataEvento
        ? new Date(dataEvento + 'T00:00:00').toLocaleDateString('pt-BR')
        : 'Não informada';

    const mensagem =
        `*Solicitação de Agenda - Prof. Dr. Elton Gomes*\n\n` +
        `*Modalidade:* ${modalidadeAgendaSelecionada}\n` +
        `*Instituição/Empresa:* ${instituicao}\n` +
        `*Responsável:* ${responsavel}\n` +
        `*WhatsApp do contato:* ${whatsapp}\n` +
        `*E-mail:* ${email}\n` +
        `*Data pretendida:* ${dataFormatada}\n` +
        `*Horário pretendido:* ${horaEvento || 'Não informado'}`;

    const numeroWhatsApp = '5581997860554';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(urlWhatsApp, '_blank', 'noopener');

    document.getElementById('formAgenda').reset();
    document.querySelectorAll('.btn-opcao').forEach(btn => btn.classList.remove('ativo'));
    dadosAgenda_reset();
}

function dadosAgenda_reset() {
    modalidadeAgendaSelecionada = null;
    const dadosAgenda = document.getElementById('dadosAgenda');
    if (dadosAgenda) dadosAgenda.classList.remove('visivel');
}
