class Card{

    card;
    
    constructor(card){
        this.card = card
        
    }


    createCard(){
        let letra = ["C","D","P","T"]
        let number = Math.floor(Math.random()*13)+1;
        let index = Math.floor(Math.random()*4);
        
        this.card =  `${number}${letra[index]}`;

    }

    descontructor(){
        
        let arrays = this.card.match(/^(\d+)([A-Z])$/); 
        let valor = parseInt(arrays[1],10)
        if (valor > 10){
            valor = 10;
        }
        return valor;
    }

    mostrarCarta(){
        console.log(this.card)
    }
    
    setCard(card){
        this.card = card;
    }

    getCard(){
        return this.card;
    }


}