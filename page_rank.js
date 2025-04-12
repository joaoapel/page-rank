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

    console.log(indices)

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
                    matriz[idxDestino][idxOrigem] = 1; // Transposta: destino -> origem
                }


            }
        }

        console.log("\nMatriz de Adjacência:");
        console.table(matriz);

        return matriz;
    };

    const normalizarColunas = matriz => {
        const N = matriz.length;
        const resultado = Array.from({ length: N }, () => Array(N).fill(0));

        // Para cada coluna col, somamos todos os valores dela (de cima para baixo).

        // Essa soma representa o total de "links saindo" de um nó (já que a matriz está transposta).

        //resultado[0][0] = 0 / 2 = 0

        //resultado[1][0] = 1 / 2 = 0.5

        //resultado[2][0] = 1 / 2 = 0.5

        for (let col = 0; col < N; col++) {
            let soma = 0;
            for (let row = 0; row < N; row++) {
                soma += matriz[row][col];
            }
            for (let row = 0; row < N; row++) {
                resultado[row][col] = soma === 0 ? 1 / N : matriz[row][col] / soma;
            }
        }
        console.log("\nMatriz Normalizada:");
        console.table(resultado)
        return resultado;
    };

    const aplicarPageRank = (matriz, damping = 0.85, tolerancia = 1e-6, maxIter = 100) => {
        const N = matriz.length;
        let ranks = Array(N).fill(1 / N);
        let convergiu = false;

        console.log("\nIteração inicial:", ranks);

        for (let i = 0; i < maxIter && !convergiu; i++) {
            const novaDistribuicao = math.multiply(matriz, ranks)
                .map(val => (damping * val) + ((1 - damping) / N));

            // Calcula a diferença absoluta total (norma L1) entre os ranks anteriores e os novos. Isso mede o quanto o vetor mudou. 
            
            // diff = |0.333 - 0.1665| + |0.333 - 0.606| + |0.333 - 0.1665| ≈ 0.5

            const diff = math.norm(math.subtract(ranks, novaDistribuicao), 1);

            convergiu = diff < tolerancia;
            ranks = novaDistribuicao;

            console.log(`Iteração ${i + 1} - diferença: ${diff.toFixed(10)}`);
            console.log("Ranks:", ranks.map(v => v.toFixed(5)));
        }

        return ranks;
    };

    const exibirTopRank = (nomes, ranks, top = 10) => {
        return nomes
            .map((nome, i) => ({ nome, rank: ranks[i] }))
            .sort((a, b) => b.rank - a.rank)
            .slice(0, top);
    };


    const matrizAdj = construirMatrizAdjacencia(dadosArtistas, indices);

    const matrizTransicao = normalizarColunas(matrizAdj);

    const ranks = aplicarPageRank(matrizTransicao);

    const top = exibirTopRank(nomes, ranks);

    console.log("\nTop artistas por influência:");
    top.forEach((el, i) => console.log(`${i + 1}. ${el.nome} - ${el.rank.toFixed(5)}`));

};

pageRankSimplificado();