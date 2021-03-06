class Caixa {
  // Recebe uma lsita de objetos [{ titulo, altura, largura, comprimento }]
  // Devolve valores da caixa, caso limite não sejam ultrapassados
  // Devolve valor false, caso limite seja ultrapassado
  getDimensions(items){
    // Dados sobre a dimensão da caixa de frete que serão retornados na saída.
    let boxDim = {altura: 0, comprimento: 0, largura: 0};
    // Ajustando dimensões para melhor ajuste na caixa
    const organizedItems = this.Organize(items);
  
    // Encontrando o item de maior volume (servirá como referência para dimensões do fundo da caixa)
    let maxVol = this.findMaxVol(organizedItems);
    boxDim.altura = maxVol.altura;
    boxDim.comprimento = maxVol.comprimento;
    boxDim.largura = maxVol.largura;
  
    // Descontando item unitário de maior volume
    this.discount(organizedItems, maxVol);
  
    // Guardando informação de último item encaixotado
    let lastItem = maxVol;
  
    // Espaço disponível na pilha de itens
    let freeTopW = boxDim.largura;
  
    // Acumulador de peso e volume
    boxDim.peso = 0;
    boxDim.volItems = 0;
  
    if(organizedItems.length > 0){
      // Encaixotando itens restantes
      while(organizedItems.length > 0){
        // Buscando novo item de maior volume
        maxVol = this.findMaxVol(organizedItems);
    
        // Caso não haja nenhum item no topo
        if(freeTopW === boxDim.largura){
          // Largura do item cabe
          if(maxVol.largura <= freeTopW){
            freeTopW -= maxVol.largura;
    
            // Caso item extrapole comprimento
            if(maxVol.comprimento > boxDim.comprimento)
              boxDim.comprimento = maxVol.comprimento;
    
            // Salvando último item e descontando da lista
            lastItem = maxVol;
            boxDim.peso += maxVol.peso;
            boxDim.volItems += maxVol.comprimento * maxVol.altura * maxVol.largura;
            this.discount(organizedItems, maxVol);
    
          }
          // Lagura do item não cabe 
          else {
            boxDim.largura = maxVol.largura;
    
            // Caso item extrapole comprimento
            if(maxVol.comprimento > boxDim.comprimento)
              boxDim.comprimento = maxVol.comprimento;
    
            // Salvando último item e descontando da lista
            lastItem = maxVol;
            boxDim.peso += maxVol.peso;
            boxDim.volItems += maxVol.comprimento * maxVol.altura * maxVol.largura;
            this.discount(organizedItems, maxVol);
    
          }
    
        }
        // Caso já exista itens no topo 
        else {
          // Largura do item cabe
          if(maxVol.largura <= freeTopW){
            freeTopW -= maxVol.largura;
    
            // Caso item extrapole comprimento
            if(maxVol.comprimento > boxDim.comprimento)
              boxDim.comprimento = maxVol.comprimento;
    
            // Item será considerado como último se sua altura for a maior do topo
            if(maxVol.altura > lastItem.altura)
              lastItem = maxVol;
    
            boxDim.peso += maxVol.peso;
            boxDim.volItems += maxVol.comprimento * maxVol.altura * maxVol.largura;
            this.discount(organizedItems, maxVol);
                
          }
          // Caso a largura do item não caiba, um novo nível é formado
          else {
            boxDim.altura += lastItem.altura;
            freeTopW = boxDim.largura;
          }
    
        }
      }

      boxDim.altura += lastItem.altura;
      boxDim.peso += lastItem.peso;
          
    }
    
    boxDim.volItems += lastItem.comprimento * lastItem.altura * lastItem.largura;
    boxDim.vol = boxDim.altura * boxDim.comprimento * boxDim.largura;
    boxDim.volVazio = boxDim.vol - boxDim.volItems;  
     
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
      else if(item.largura === maior || item.largura === menor) inter = item.largura;
      else if(item.comprimento === maior || item.comprimento === menor) inter = item.comprimento;
      
      const newItem = {
        id: item.id,
        titulo: parseFloat(item.titulo),
        altura: parseFloat(menor),
        largura: parseFloat(inter),
        comprimento: parseFloat(maior),
        qtd: parseFloat(item.qtd),
        peso: parseFloat(item.peso)
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
  
    if(itemsList[index].qtd > 1) itemsList[index].qtd =  itemsList[index].qtd - 1;
    else itemsList.splice(index, 1);
  
  }
  
  // Testa se lista de itens formam uma caixa com certos limites
  test(itemsList){
    const alturaMax = 105;
    const compMax = 105;
    const larguraMax = 105;
    const somaMax = 200;
    const pesoMax = 30000;
  
    const boxDim = this.getDimensions(itemsList);
    if(boxDim.altura > alturaMax || boxDim.comprimento > compMax
      || boxDim.largura > larguraMax || boxDim.peso > pesoMax
      || somaMax < boxDim.altura + boxDim.comprimento + boxDim.largura)
      return false;
      
    return true;
  
  }
  
}

module.exports = Caixa;