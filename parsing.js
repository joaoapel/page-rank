// Imports the Google Cloud client library
const language = require('@google-cloud/language').v2;

// Creates a client
const client = new language.LanguageServiceClient();

 // https://www.tenhomaisdiscosqueamigos.com/2024/04/03/musicas-referencias-outros-artistas/


process.env.GOOGLE_APPLICATION_CREDENTIALS='./curious-sandbox-456314-a8-490f7fb376f0.json'

const text = `Há muito tempo tá rolando essa festa maneira
Da música popular brasileira
Ninguém me convidou mas eu queria entrar
Peguei o 175 e vim directo pra cá
Prá...
Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
Na...
Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
Na portaria o segurança pediu o crachá do Gilberto Gil
Ele apenas sorriu
Acompanhado por Caetano, Djavan, Pepeu, Elba, Moraes, Alceu Valência
('xá comigo! Dá licença! Abre essa porta, cabra da peste)
E foi assim que eu penetrei com a galera do Nordeste
Baby tá na área, senti firmeza! E aí Sandra de Sá!
"Bye bye tristeza..."
Birinight à vontade a noite inteira
Olha o Ed Motta assaltando a geladeira
Olha quanta gata bonita e gostosa!
Olha o Tiririca com uma negra cheirosa
Ué! Cadê os críticos?! Ninguém convidou? "Barrados do Baile uouou"
Não é festa do cabide mas o Ney tirou a roupa
Bzzz... Paulinho Moska pousou na minha sopa
Cidade Negra apresentou um reggae nota cem
Tá rolando um Skank também! E o Tim Maia até agora nem pintou
Mas o Jorge Benjor trouxe a banda que chegou "Pra animar a festa"
É a Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
Na...
Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
A festa tá correndo bem
O Lobão até agora não falou mal de ninguém
O Barão e o Titãs tão tocando Raulzito
A Rita Lee tá vindo ali...ãh? Não acredito!
Ela olhou pra mim e disse "Baila comigo"
Eu senti aquele frio no umbigo
Mas é claro que adorei o convite e fui dançar
Ouvindo o som do Kid Abelha, Paralamas e a Blitz
"Segura o tchan, amarra o tchan" (Xô, Satanás!)
Há há! Lulu Santos acabou de chegar com a pimenta malagueta pro planeta balançar
O Chico César, Science, e o Buarque observam um pessoal dançando break no chão
E no andar lá de cima um do donos da festa. Tá na boa, tá em paz, tá tocando um violão:
"Festa estranha com gente esquisita, eu não tô legal, não aguento mais birita"
É a Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
Na..
Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
Chopp na tulipa, vinho na taça (camisinha na boquinha da garrafa)...
Salve-se quem puder!
Ih... o João Gordo vomitou no meu pé
Fui limpar e dei de cara com os Raimundos
Que me contaram que entraram pelos fundos
Perguntei pelo banheiro e fiz papel de Mané
Os sacanas me mandaram pro banheiro de mulher
As meninas tavam lá e foi só eu entrar que a Cássia Eller,
Zizi Possi e a Gal comçaram a gritar (Ahhhhh!)
Quanta saúde! Fernanda Abreu, Daniela Mercury, Marisa Monte, Daúde...
Calma, eu não vi nada!
A Ângela Rô Rô queria me dar porrada
Mas os três malandros, Moreira, Bezerra e Dicró, me ajudaram a escapar da pior
Fui pro fundo de quintal, casa de bamba todo mundo bebe todo mundo samba
Beth Carvalho, Alcione, Zeca Pagodinho, Neguinho da Beija-Flor...Diz aí Martinho!
Com'é que é, professor?
"É devagar, é devagar, devagarinho"
Na Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
Na... Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
Essa festa é uma loucura
Olha lá o Carlinhos Brown com o pessoal do Sepultura
Vieram com os índios Xavantes
E a polícia veio atrás tentando dar flagrante
E-e-e-ê! O índio tem apito e eu não entendi porquê
Começaram a apitar quando a polícia chegou
Mas a galera do Cachimbo da Paz nem escutou
Porque o Olodum tava fazendo um batuque maneiro
Até chegarem milhares de funkeiros
Eram tantas duplas que eu até me confundi
Chamei Leandro & Leonardo de MC!
E o Zezé de Camargo & Luciano ficaram me zuando
E o funk rolando! Aah... vocês tinham que ver!
Chitãozinho & Xororó gritando "Uh! Tererê!"
O pessoal da Jovem Guarda agitando sem parar
Estavam em outra festa mas vieram pra cá
Passei ali por perto e ouvi o Roberto Carlos comentar:
"Ê hei! Que onda de festa de arromba!"
(Existem mil garotas querendo passear comigo... Bye!)
Todo mundo no maior astral mas rolou um boato que preocupou o pessoal
Diziam as más linguas, à boca pequena,
que o Michael Jackson tava chegando pra roubar a cena
E foi aí que a Marina ouviu uma buzina e todos foram pra janela na maior adrenalina
Uma Brasília amarela dobrava a esquina
Adivinha quem era?
É a... Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
Na... Festa da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jobim
Todo mundo tá presente e não tem hora pra acabar
E muita gente ainda tá pra chegar
Aqui na Festa... da Música Tupiniquim
Que tá rolando aqui na rua António Carlos Jo... BIM-BIM-BIm-bim
Todo mundo tá presente rapá...
E muita gente ainda tá pra chegar... Uh uuhh`;

// Prepares a document, representing the provided text
const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  

  (async () => {
    const entidades = await client.analyzeEntities({ document: document });

    const lista = await entidades[0].entities;  

    const listaFiltrada = await lista.filter((entidade) => {
        return entidade.type = 'PERSON'
    }).map(user => user.name);    
    
    console.log(listaFiltrada)
   
  })();