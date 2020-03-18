const Caixa = require('./Caixa');

const itens = [
  {
    id: 1,
    titulo: 'item 1',
    altura: 7,
    comprimento: 8,
    largura: 9,
    quantidade: 1
  },{
    id: 2,
    titulo: 'item 2',
    altura: 12,
    comprimento: 18,
    largura: 13,
    quantidade: 2,
  },{
    id: 3,
    titulo: 'item 3',
    altura: 14,
    comprimento: 15,
    largura: 16,
    quantidade: 3,
  },{
    id: 4,
    titulo: 'item 4',
    altura: 14,
    comprimento: 15,
    largura: 14,
    quantidade: 1,
  },{
    id: 5,
    titulo: 'item 5',
    altura: 16,
    comprimento: 16,
    largura: 16,
    quantidade: 2,
  },{
    id: 6,
    titulo: 'item 5',
    altura: 12,
    comprimento: 16,
    largura: 16,
    quantidade: 1,
  },
];

console.table(itens);

let caixa = new Caixa;
caixa.getDimensions(itens);