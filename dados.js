// dados.js - Repositório de Capital Intelectual do Prof. Elton Gomes
const ACERVO_INTELECTUAL = [
    {
        titulo: "Ação do Brasil na OMC contra tarifas dos EUA: Análise Geopolítica",
        tipo: "Análise na Imprensa",
        veiculo: "G1 / Economia",
        link: "https://g1.globo.com/economia/noticia/2026/07/30/mais-simbolico-do-que-efetivo-por-que-o-brasil-foi-a-omc-contra-o-tarifaco-mesmo-com-o-orgao-enfraquecido.ghtml",
        categoria: "Geopolítica"
    },
    {
        titulo: "Reconciliação com Michelle empolga campanha de Flávio Bolsonaro e sugere nova fase",
        tipo: "Análise na Imprensa",
        veiculo: "Gazeta do Povo",
        link: "https://www.gazetadopovo.com.br/republica/reconciliacao-com-michelle-empolga-campanha-de-flavio-bolsonaro-e-sugere-nova-fase/",
        categoria: "Política Nacional"
    },
    {
        titulo: "ND Mais: Como o Congresso Nacional ampliou seu poder através das emendas parlamentares",
        tipo: "Parecer de Especialista",
        veiculo: "ND Mais",
        link: "https://ndmais.com.br/politica/emendas-parlamentares-como-o-congresso-ganhou-poder/",
        categoria: "Política Nacional"
    }
];

// Vídeos do YouTube - Participações em vídeo
const VIDEOS_YOUTUBE = [
    {
        tipo: "video",
        tag: "📺 Participação Especial | TV Meio Norte",
        titulo: "Ciência Política - Análise de Conjuntura",
        resumo: "Nesta participação, o Prof. Dr. Elton Gomes apresenta análise de conjuntura política ao vivo na TV Meio Norte, discutindo cenário eleitoral, alianças partidárias e perspectivas para as eleições 2026.",
        videoId: "OXhVkjFn8F4"
    }
];

// Matérias jornalísticas - Publicações na imprensa
const MATERIAS_IMPRENSA = [
    {
        tipo: "materia",
        tag: "Gazeta do Povo",
        titulo: "Pesquisa Quaest mostra como está a disputa para presidente",
        resumo: "Análise do Prof. Dr. Elton Gomes sobre pesquisa eleitoral e cenário político para as eleições de 2026.",
        veiculo: "Gazeta do Povo",
        link: "https://www.gazetadopovo.com.br/eleicoes/2026/pesquisa-eleitoral-2026/quaest-pesquisa-presidente-agosto-2026/",
        imagem: "https://media.gazetadopovo.com.br/2026/08/11172001/pesquisa-presidente-3.png",
        automatico: true
    },
    {
        tipo: "materia",
        tag: "Gazeta do Povo",
        titulo: "Moraes autoriza X a retomar funcionamento no Brasil após multa",
        resumo: "Análise do Prof. Dr. Elton Gomes sobre decisão judicial e liberdade de expressão no Brasil.",
        veiculo: "Gazeta do Povo",
        link: "https://www.gazetadopovo.com.br/republica/moraes-autoriza-x-a-retomar-funcionamento-no-brasil-apos-multa/",
        imagem: "https://media.gazetadopovo.com.br/2019/12/17112031/meta-image-gazeta-do-povo-new.png",
        automatico: true
    },
    {
        tipo: "materia",
        tag: "Gazeta do Povo",
        titulo: "Relação do PT com Foro de SP engaja oposição e pode pautar eleições de 2026",
        resumo: "Análise do Prof. Dr. Elton Gomes sobre alianças políticas e o impacto do Foro de São Paulo nas eleições.",
        veiculo: "Gazeta do Povo",
        link: "https://www.gazetadopovo.com.br/republica/relacao-do-pt-com-foro-de-sp-engaja-oposicao-e-pode-pautar-eleicoes-de-2026/",
        imagem: "https://media.gazetadopovo.com.br/2026/01/05142435/52936060313_a7962d4de1_o-scaled.jpg",
        automatico: true
    }
];