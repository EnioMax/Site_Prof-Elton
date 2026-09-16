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
        tag: "📺 Participação | YouTube",
        titulo: "Programa Tardiar 17/05 — BRICS vai mudar o mundo? Dr. Elton Gomes analisa o futuro do bloco",
        resumo: "Análise em vídeo do Prof. Dr. Elton Gomes.",
        videoId: "91OQ6FXVmjU",
        automatico: true,
    },

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
        "titulo": "Pesquisa Quaest mostra como está a disputa para presidente",
        "veiculo": "Gazeta do Povo",
        "link": "https://www.gazetadopovo.com.br/eleicoes/2026/pesquisa-eleitoral-2026/quaest-pesquisa-presidente-agosto-2026/",
        "tag": "📰 Gazeta do Povo",
        "resumo": "",
        "imagem": "https://media.gazetadopovo.com.br/2026/08/11172001/pesquisa-presidente-3.png"
    },
    {
        "titulo": "Moraes autoriza X a retomar funcionamento no Brasil após multa",
        "veiculo": "Gazeta do Povo",
        "link": "https://www.gazetadopovo.com.br/republica/moraes-autoriza-x-a-retomar-funcionamento-no-brasil-apos-multa/",
        "tag": "📰 Gazeta do Povo",
        "resumo": "",
        "imagem": "https://media.gazetadopovo.com.br/2019/12/17112031/meta-image-gazeta-do-povo-new.png"
    },
    {
        "titulo": "Relação do PT com Foro de SP engaja oposição e pode pautar eleições de 2026",
        "veiculo": "Gazeta do Povo",
        "link": "https://www.gazetadopovo.com.br/republica/relacao-do-pt-com-foro-de-sp-engaja-oposicao-e-pode-pautar-eleicoes-de-2026/",
        "tag": "📰 Gazeta do Povo",
        "resumo": "",
        "imagem": "https://media.gazetadopovo.com.br/2026/01/05142435/52936060313_a7962d4de1_o-scaled.jpg"
    },
    {
        "titulo": "Boulos e João Campos ainda não animam a esquerda como futuros líderes do pós-Lula",
        "veiculo": "Gazeta do Povo",
        "link": "https://www.gazetadopovo.com.br/republica/boulos-e-joao-campos-ainda-nao-animam-a-esquerda-como-futuros-lideres-do-pos-lula/",
        "tag": "📰 Gazeta do Povo",
        "resumo": "",
        "imagem": "https://media.gazetadopovo.com.br/2023/04/24220940/img20230412200844923MED.jpg"
    },
    {
        "titulo": "Candidatura de Joaquim Barbosa nasce minada pela polarização",
        "veiculo": "Gazeta do Povo",
        "link": "https://www.gazetadopovo.com.br/eleicoes/2026/candidatura-de-joaquim-barbosa-ja-nasce-cercada-de-descrenca-e-obstaculos/",
        "tag": "📰 Gazeta do Povo",
        "resumo": "",
        "imagem": "https://media.gazetadopovo.com.br/2022/01/11120451/joaquim-barbosa-crop-20220111150435.jpg"
    },
    {
        "titulo": "Ciência Política: origens e formação",
        "veiculo": "YouTube",
        "link": "https://www.youtube.com/watch?v=saYf8xp2Lb0",
        "tag": "📰 YouTube",
        "resumo": "",
        "imagem": "https://i.ytimg.com/vi/saYf8xp2Lb0/maxres2.jpg?sqp=-oaymwEoCIAKENAF8quKqQMcGADwAQH4Ac4FgAKACooCDAgAEAEYZSBTKEUwDw==&amp;rs=AOn4CLDo5bPhNP82XUn11I4t4lkZVT294Q"
    },
    {
        "titulo": "Programa Tardiar 05/07 — A Tempestade no Oriente Médio: O Impacto Global do Conflito Israel-Irã",
        "veiculo": "YouTube",
        "link": "https://www.youtube.com/watch?v=LDFBiOECaNY",
        "tag": "📰 YouTube",
        "resumo": "",
        "imagem": "https://i.ytimg.com/vi/LDFBiOECaNY/hqdefault.jpg"
    },
    {
        "titulo": "Programa Tardiar 17/05 — BRICS vai mudar o mundo? Dr. Elton Gomes analisa o futuro do bloco",
        "veiculo": "YouTube",
        "link": "https://www.youtube.com/watch?v=ceQbAwpizO8",
        "tag": "📰 YouTube",
        "resumo": "",
        "imagem": "https://i.ytimg.com/vi/ceQbAwpizO8/maxresdefault.jpg"
    }
];
