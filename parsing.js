// Imports the Google Cloud client library
const language = require('@google-cloud/language').v2;

const musicas = require('./musicas')

// Creates a client
const client = new language.LanguageServiceClient();

process.env.GOOGLE_APPLICATION_CREDENTIALS='/home/joao/Documentos/chave-api/curious-sandbox-456314-a8-490f7fb376f0.json'

const text = Object.values(musicas)[0][0];

console.log(text)

// Prepares a document, representing the provided text
const document = {
    content: text.letra,
    type: 'PLAIN_TEXT',
  };
  

  (async function parseEntidades() {
    const entidades = await client.analyzeEntities({ document: document });

    const lista = await entidades[0].entities;  

    const listaFiltrada = await lista.filter((entidade) => {
        return entidade.type = 'PERSON'
    }).map(user => user.name);    
    
    console.log(listaFiltrada)
   
  })();

