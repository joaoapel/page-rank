const language = require('@google-cloud/language').v2;

const musicas = require('./musicas')

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

    return console.log(listaFiltrada)

  } catch (error) { console.log('Erro no parsing :/'); }
}

const listaParseada = musicas.musicas.map(elemento => [{artista: elemento.artista, entidades: parseEntidades(elemento.letra)}])

console.log(listaParseada)