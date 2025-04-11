const language = require('@google-cloud/language').v2;

const musicas = require('./musicas')

const client = new language.LanguageServiceClient();

process.env.GOOGLE_APPLICATION_CREDENTIALS = '/home/joao/Documentos/chave-api/curious-sandbox-456314-a8-490f7fb376f0.json'

const listaLetras = musicas.musicas.map(musicas => musicas.letra)

async function parseEntidades(letra) {
  const document = {
    content: letra,
    type: 'PLAIN_TEXT',
  };

  const entidades = await client.analyzeEntities({ document: document });

  const lista = await entidades[0].entities;

  const listaFiltrada = await lista.filter((entidade) => {
    return entidade.type = 'PERSON'
  }).map(user => user.name);

  console.log(listaFiltrada)

}

listaLetras.flatMap(elemento => parseEntidades(elemento))