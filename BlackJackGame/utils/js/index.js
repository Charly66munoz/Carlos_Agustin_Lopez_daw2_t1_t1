
let name;
nameNotNull();
function nameNotNull(){
    name = prompt("Porfavor ingrese el nombre del jugador");

    if (name === null){
    alert("Debe ingresar el nombre del jugador");
    nameNotNull()
    }
}

let startButtonContainer = document.querySelector("#startButtonContainer");
let startButton = document.querySelector("#startButton");
//contenido de 
let cpuChangger = document.querySelector("#cpuChangger") 
//contador de imgCpu:
let divCpu = document.querySelector("#cpuDiv")
let imagCard = document.querySelector("#cardImg")

let divPlayer = document.querySelector("#playerDivbuttons")

let playerChangger = document.querySelector("#playerChangger")
let playerDivpuntos = document.querySelector("#playerDivpuntos")

let puntosGame =[0,0];

startButton.addEventListener('click',()=>{
    let cons = new Mazo;
    cons.generateMazo();

    startButtonContainer.innerHTML = "";
    
    let puntos = 0;
    let contadorArray = 0
    let limite = dealerPlay(cons.getCardCollection());
    let inter = setInterval(()=>{
        
        if (contadorArray > limite){
            
            clearInterval(inter)
            puntosGame[0] = puntos; 
            if (puntos < 22){
                alert("Es su turno")
                abrirStart();
            }else{
                resultados()
            }
            return
        }
            
        

        let card = new Card(cons.getCardCollection()[contadorArray].getCard());
        let nuevaImg = document.createElement("img");
        
        nuevaImg.classList.add("animate__animated", "animate__backInRight",);
        nuevaImg.src = `utils/img/baraja/${card.getCard()}.png`;
        cpuChangger.innerHTML = ""
        cpuChangger.appendChild(nuevaImg)

        contadorArray++;

        puntos += card.descontructor();
                
        
        let h3Contador = document.createElement("h3");
        h3Contador.classList.add( "w-100", "text-center", "contadorStyle");
        h3Contador.textContent = `Puntos banca: ${puntos}`;
        
        divCpu.innerHTML = "";
        divCpu.appendChild(h3Contador);
    },2000)
})

function abrirStart(){
    let playerCards = new Mazo;
    playerCards.generateMazo()

    let botonS = document.createElement("button");
    botonS.classList.add("btn", "btn-success", "w-50");
    botonS.textContent = `Comenzar su turno`
    botonS.id= `playPlayer`
    divPlayer.append(botonS);

    botonS.addEventListener("click" ,()=>{
        puntosGame[1] = 0;
        let butonAgregar = document.createElement("btn")
        butonAgregar.classList.add("btn", "btn-success");
        butonAgregar.textContent = "Pedir"

        let butonStop = document.createElement("btn")
        butonStop.classList.add("btn", "btn-danger");
        butonStop.textContent = "Stop"

        let contenedorBotones = document.createElement("div");
        contenedorBotones.classList.add("d-flex", "gap-2");

        contenedorBotones.appendChild(butonAgregar)
        contenedorBotones.appendChild(butonStop)
        
        divPlayer.innerHTML = ""
        
        divPlayer.appendChild(contenedorBotones)

        let contador = 0; 
        let puntos = 0;

        butonAgregar.addEventListener("click", ()=>{
            let card = new Card(playerCards.getCardCollection()[contador].getCard());
            let nuevaImg = document.createElement("img");

            nuevaImg.classList.add("animate__animated", "animate__backInRight",);
            nuevaImg.src = `utils/img/baraja/${card.getCard()}.png`;
            playerChangger.innerHTML = ""
            playerChangger.appendChild(nuevaImg)

            puntosGame[1] += card.descontructor();
                  
            console.log(puntos+ " aqui")
            
            let h3Contador = document.createElement("h3")
            h3Contador.classList.add( "w-100", "text-center", "contadorStyle");
            h3Contador.textContent = `Puntos ${name}: ${puntosGame[1]}`
            if(playerDivpuntos.firstChild){ playerDivpuntos.removeChild(playerDivpuntos.firstChild)};
            playerDivpuntos.appendChild(h3Contador)
            
            if (puntosGame[1] >= 21){
                setTimeout(() => {
                    resultados();
                }, 2000);
                return
            }
            contador++
        })
        
        butonStop.addEventListener("click", ()=>{
            puntosGame[1]
            console.log(puntos)
            resultados()
        })        
    })
};

function dealerPlay(cons){
    let newCons = cons;
    let contador = 0;
    let i= 0;
    for (let index = 0; index < newCons.length ; index++) {  
        if (contador < 18){        
            let card = new Card(newCons[index].getCard())   
            contador += card.descontructor();
            console.log(contador+" "+index)
        }else{
            i = index
            break;
        }  
    }
    console.log(i)
    return i-1
}

function resultados(){
    if (puntosGame[0] > 21 || puntosGame[1] > 21){
        let texto = puntosGame[0] > 21 ? `${name} ha ganado, la banca ha sumado más de 21, presione "Comenzar juego" para jugar otra ronda` : `La banca ha ganado, ${name} ha sumado más de 21, presione "Comenzar juego" para jugar otra ronda`;
        
        Swal.fire({

            text: `${texto}`,
        }); 
    }else{
        mostrarResultados()

    }

    if (cpuChangger.firstChild) {
        cpuChangger.firstChild.src = `utils/img/baraja/red.png`;
    }
        
    startButtonContainer.append(startButton);
    if (divCpu.firstChild) {
        divCpu.removeChild(divCpu.firstChild);
    }
    if (puntosGame[1] !== 0){
        if (playerChangger.firstChild) {
            playerChangger.firstChild.src = `utils/img/baraja/blue.png`;
        }
        if (divPlayer.firstChild) {
            divPlayer.removeChild(divPlayer.firstChild);
        }
        if (playerDivpuntos.firstChild) {
            playerDivpuntos.removeChild(playerDivpuntos.firstChild);
        }
    }
}

function mostrarResultados(){
    if (puntosGame[0] === puntosGame[1]){
        Swal.fire({
            title: "¡Empate!",
            text: `Empate! presione "Comenzar juego" para jugar otra ronda`,
        });
    }else if (puntosGame[0] > puntosGame[1]){
        Swal.fire({
            title: "¡Has perdido!",
            text: `La banca ha ganado!, presione "Comenzar juego" para jugar otra ronda`,
        });
        
    } else{
        Swal.fire({
            title: "Has Ganado",
            text: `${name} ha ganado! presione "Comenzar juego" para jugar otra ronda`,
        });
    }
}


    
    
    
    
    
    
    
    
    
    
    

