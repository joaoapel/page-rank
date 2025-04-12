# Page Rank Simplificado em Javascript e Node.js

Esta é uma implementação baseada no vídeo de Barry Van Veen: [Network Graphs and Page Rank Algorithm](https://www.youtube.com/watch?v=ztc6sYgapwA). Objetivos principais:

- Definir a matriz de adjacência

- Definir a matriz normalizada

- Definir a matriz de probabilidade de transição

- Ilustrar os conceitos que fundamentam o algoritmo Page Rank

## Dependências

Para utilizar a API de linguagem natural do Google é necessário criar uma conta e fazer o download do arquivo .json para autenticação. 

Depois temos que colocar o caminho deste arquivo na variável de ambiente ```GOOGLE_APPLICATION_CREDENTIALS``` presente no início do script.

Foram feitas modificações nas letras das músicas para criar os links entre elas.

Foi utilizada a biblioteca [mathjs](https://mathjs.org/) para executar as operações matriciais.

## Conclusão

Saída final do algoritmo com o ranking entre os artistas:

Top artistas por influência:
1. skank - 0.50443
2. joao gilberto - 0.20619
3. gabriel o pensador - 0.14469
4. chico buarque - 0.14469