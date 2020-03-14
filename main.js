const Caixa = require('./Caixa');

const itens = [
  {
    titulo: 'item 1',
    altura: 7,
    comprimento: 8,
    largura: 9,
  },{
    titulo: 'item 2',
    altura: 12,
    comprimento: 18,
    largura: 13,
  },{
    titulo: 'item 3',
    altura: 14,
    comprimento: 15,
    largura: 16,
  },
  ,{
    titulo: 'item 4',
    altura: 14,
    comprimento: 15,
    largura: 14,
  },
  ,{
    titulo: 'item 5',
    altura: 16,
    comprimento: 16,
    largura: 16,
  },
  ,{
    titulo: 'item 5',
    altura: 12,
    comprimento: 16,
    largura: 16,
  },
];

console.table(itens);

let caixa = new Caixa;
caixa.getDimensions(itens);