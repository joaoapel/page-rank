const math = require('mathjs')

const vetor1 = [0, 1, 0, 0, 0];

const vetor2 = [1, 0, 0, 0, 0];

const vetor3 = [0, 1, 0, 1, 0];

const vetor4 = [0, 0, 1, 0, 1];

const vetor5 = [1, 1, 1, 1, 0];


const matrizAdjacencia = math.matrix([vetor1, vetor2, vetor3, vetor4, vetor5])

console.log(matrizAdjacencia)

const coluna1 = matrizAdjacencia.subset(math.index([0, 1 , 2, 3, 4], [0])) 

console.log(coluna1)

const vetorNormalizado = vetor => {
    let sum = 0;

    vetor.forEach(num => {
        sum += num;
    });

    const vetorNorm = vetor.map((x) => x / sum);
    
    return vetorNorm

}


console.log(vetorNormalizado(coluna1))

//const fatorAmortecimento = 0.01

//const numeroNos = 5

const transicao = (n) => {

    return ((1 - 0.01) * n) + (0.01 / 5)

};

const matrizTransicao = math.matrix([[0, 0.33, 0, 0, 0], [0.5, 0, 0, 0, 0], [0, 0.33, 0, 0.5, 0], [0, 0, 0.5, 0, 1], [0.5, 0.33, 0.5, 0.5, 0]]);

const matrizQ = math.map(matrizTransicao, transicao)

//math.multiply(transicao(), matrizTransicao);

console.log(matrizQ)

const vetorInicial = math.matrix([0.2, 0.2, 0.2, 0.2, 0.2])

let vetorQ1 = math.multiply(matrizQ, vetorInicial)

console.log(vetorQ1.toArray())