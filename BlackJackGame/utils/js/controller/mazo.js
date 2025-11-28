class Mazo{
    cardCollection = []

    constructor(cardCollection = []) {
        this.cardCollection = cardCollection;
    }

    generateMazo() {
        do {
            let card = new Card();
            card.createCard()
            if (this.cardCollection.length === 0){
                this.cardCollection.push(card);
                
            }else  {
                let encontrados = this.cardCollection.find(
                    item => item.getCard() === card.getCard()
                );
                if (!encontrados){
                    this.cardCollection.push(card)
                }               
            } 
            
            
        } while (this.cardCollection.length < 20);
        
    
   }

   mostrarMazo(){
        for (let item of this.cardCollection){
            item.mostrarCarta()
        }
   }

   lengthMazo(){
    return this.cardCollection.length
   }

   getCardCollection(){
     return this.cardCollection;
   }

}