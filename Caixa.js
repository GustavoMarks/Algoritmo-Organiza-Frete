class Caixa {
  // Recebe uma lsita de objetos [{ titulo, altura, largura, comprimento }]
  // Devolve valores da caixa, caso limite não sejam ultrapassados
  // Devolve valor false, caso limite seja ultrapassado
  getDimensions(items){
    // Dados sobre a dimensão da caixa de frete que serão retornados na saída.
    let boxDim = {altura: 0, comprimento: 0, largura: 0};
    // Ajustando dimensões para melhor ajuste na caixa
    const organizedItems = this.Organize(items);
    console.log('Itens reorganizados:');
    console.table(organizedItems);

    // Encontrando o item de maior volume (servirá como referência para dimensões do fundo da caixa)
    let maxVol = this.findMaxVol(organizedItems);
    console.log('Item de maior volume:');
    console.log(maxVol);
    boxDim.altura = maxVol.altura;
    boxDim.comprimento = maxVol.comprimento;
    boxDim.largura = maxVol.largura;

    // Descontando item unitário de maior volume
    this.discount(organizedItems, maxVol);

    // Guardando informação de último item encaixotado
    let lastItem = maxVol;

    // Espaço disponível na pilha de itens
    let freeTopW = boxDim.largura;
    let count = 0;

    // Encaixotando itens restantes
    while(organizedItems.length > 0){
      console.log(count);
      console.log(freeTopW);
      console.log(boxDim);
      console.table(organizedItems);
      // Buscando novo item de maior volume
      maxVol = this.findMaxVol(organizedItems);
      console.log(maxVol);

      // Caso não haja nenhum item no topo
      if(freeTopW === boxDim.largura){
        // Largura do item cabe
        if(maxVol.largura <= freeTopW){
          freeTopW -= maxVol.largura;

          if(maxVol.comprimento > boxDim.comprimento)
            boxDim.comprimento = maxVol.comprimento;

          lastItem = maxVol;
          this.discount(organizedItems, maxVol);

        } else {
          // Largura do item cabe
          if(maxVol.largura <= freeTopW){
            freeTopW -= maxVol.largura;

            if(maxVol.comprimento > boxDim.comprimento)
              boxDim.comprimento = maxVol.comprimento;

            if(maxVol.altura > lastItem.altura)
              lastItem = maxVol;

            this.discount(organizedItems, maxVol);
            
          } else {
            boxDim.altura += lastItem.altura;
            freeTopW = boxDim.largura;

          }

        }
      }

      count++;

    }

    console.log('saiu do loop');
    boxDim.altura += lastItem.altura;
    return boxDim;


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
    
      const newItem = { id: item.id,
        titulo: item.titulo,
        altura: menor,
        largura: inter,
        comprimento: maior,
        quantidade: item.quantidade
      };
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

  // Remover uma unidade da lista de itens
  discount(itemsList, item){
    const index = itemsList.findIndex((element) => {
      return element.id === item.id;
    });

    if(itemsList[index].quantidade > 1) itemsList[index].quantidade =  itemsList[index].quantidade - 1;
    else itemsList.splice(index, 1);

  }

}

module.exports = Caixa;