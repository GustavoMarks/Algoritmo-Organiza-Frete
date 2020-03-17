class Caixa {
  // Recebe uma lsita de objetos [{ titulo, altura, largura, comprimento }]
  // Devolve valores da caixa, caso limite não sejam ultrapassados
  // Devolve valor false, caso limite seja ultrapassado
  getDimensions(items){
    const organizedItems = this.Organize(items);
    console.log('Itens reorganizados:');
    console.table(organizedItems);
    console.log(this.findMaxVol(items));

  }

  // Reorganiza as propriedades dos itens
  // Altura deve ser a menos dimensão, seguida de largura e comprimento
  Organize(items){
    let maior, inter, menor;
    let outPutItems = [];

    items.forEach(item => {
      // Decidindo maior
      maior = item.altura;
      if(item.comprimento > maior) maior = item.comprimento;
      if(item.largura > maior) maior = item.largura;

      // Decidindo menor
      menor = item.altura;
      if(item.comprimento < menor) menor = item.comprimento;
      if(item.largura < menor) menor = item.largura;

      // Decidindo intermediário
      if(item.comprimento < maior && item.comprimento > menor) inter = item.comprimento;
      else if(item.largura < maior && item.largura > menor) inter = item.largura;
      else if(item.largura == maior || item.largura == menor) inter = item.largura;
      else if(item.comprimento == maior || item.comprimento == menor) inter = item.comprimento;
    
      const newItem = { titulo: item.titulo, altura: menor, largura: inter, comprimento: maior};
      outPutItems.push(newItem);

    });

    return outPutItems;
  }

  // Encontra o item de maior volume para iniciar alocação dos demais itens
  // Retorna o idex do item de maior volume
  findMaxVol(items){
    let outPut, vol;
    let maxVol = 0;

    items.forEach(item => {
      vol = item.altura * item.comprimento * item.largura;
      if (vol > maxVol){
        maxVol = vol;
        outPut = item;

      };

    })

    return outPut;
  }

}

module.exports = Caixa;