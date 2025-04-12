const language = require('@google-cloud/language').v2;

const math = require('mathjs');

const musicas = require('./musicas_link')

const client = new language.LanguageServiceClient();

process.env.GOOGLE_APPLICATION_CREDENTIALS = '/home/joao/Documentos/chave-api/curious-sandbox-456314-a8-490f7fb376f0.json'

async function parseEntidades(letra) {
    try {
        const document = {
            content: letra,
            type: 'PLAIN_TEXT',
        };

        const entidades = await client.analyzeEntities({ document: document });

        const lista = await entidades[0].entities;

        const listaFiltrada = await lista.filter((entidade) => {
            return entidade.type = 'PERSON'
        }).map(user => user.name);

        return listaFiltrada

    } catch (error) { console.log('Erro no parsing :/'); }
}

async function listaParseada() {
    const resultados = await Promise.all(
        musicas.musicas_link.map(async elemento => {
            const entidades = await parseEntidades(elemento.letra);
            return {
                artista: elemento.artista,
                entidades: entidades,
            };
        })
    );
    return resultados;
}

async function pageRankSimplificado() {

    const dadosArtistas = await listaParseada();

    const normalizar = nome => nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/\s+/g, " ")            // remove espaços duplicados
        .trim();

    // Criando Set, pois temos valores unicos    
    const nomes = [...new Set(
        dadosArtistas.map(e => normalizar(e.artista)))];

    // Criando a estrutura {'gabriel o pensador': 0, 'chico buarque': 1}        
    const criarIndice = nomes => Object.fromEntries(nomes.map((nome, indice) => [nome, indice]));


    const indices = criarIndice(nomes);

    const construirMatrizAdjacencia = (dados, indices) => {
        const N = Object.keys(indices).length;
        const matriz = Array.from({ length: N }, () => Array(N).fill(0));

        for (const item of dados) {
            const artistaOriginal = item.artista;
            const origem = normalizar(artistaOriginal);

            //indices['skank'] => retorna o indice 2
            const idxOrigem = indices[origem];

            console.log(`\nArtista: ${artistaOriginal} (normalizado: ${origem}) - índice: ${idxOrigem}`);

            const entidadesValidas = (item.entidades || []).filter(ent => ent !== ent.toLowerCase());
            for (const entidade of entidadesValidas) {
                const entidadeOriginal = entidade;
                const destino = normalizar(entidadeOriginal);
                const idxDestino = indices[destino];

                //const entidadeOriginal = 'Michael Jackson';
                //const destino = normalizar(entidadeOriginal); // => 'michael jackson'
                //const idxDestino = indices[destino]; // => undefined (pois Michael Jackson não está na lista)

                console.log(`  Entidade: ${entidadeOriginal} (normalizada: ${destino}) - índice: ${idxDestino}`);

                //matriz[0][1] = 1; // Gabriel → Chico
                //matriz[0][2] = 1; // Gabriel → Skank

                if (idxDestino !== undefined && idxDestino !== idxOrigem) {
                    matriz[idxOrigem][idxDestino] = 1;
                }
            }
        }

        console.log("\nMatriz de Adjacência:");
        console.table(matriz);

        return matriz;
    };

    const matrizAdj = construirMatrizAdjacencia(dadosArtistas, indices);

};


pageRankSimplificado();