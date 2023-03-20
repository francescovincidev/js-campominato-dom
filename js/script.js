// DICHIARAZIONI
const playBtn = document.querySelector("div button");
let box = document.querySelector(".box");
let squareDimension = document.getElementsByClassName("square");
let arrayDimension;
let arrayNumbers = [];
let numberOfBombs = 16;
let arrayBombs = [];
let points = 0;
let game = "continua";
let message = "";


// EVENTI AL CLICK
playBtn.addEventListener("click", function () {


    // reset griglia
    arrayNumbers = [];
    box.innerHTML = "";
    points = 0;
    document.querySelector("h2.message").innerHTML = ``;
    document.querySelector("h2.points").innerHTML = `Punteggio: `;

    


    //  prende il valore della difficoltà
    const difficulty = document.getElementById("difficulty").value;

    // SE difficile
    if (difficulty === "difficile") {


        // diamo 100 alla dimensione dall'array
        arrayDimension = 100;

    } else if (difficulty === "medio") {

        // diamo 81 alla dimensione dall'array
        arrayDimension = 81;

    } else {

        // diamo 49 alla dimensione dall'array
        arrayDimension = 49;

    }
    
    // creiamo l'array di bombe
    arrayBombs = createBombs(numberOfBombs, arrayDimension);
    console.log(arrayBombs);


    arrayNumbers = gridDimension(arrayDimension);

    // creazione della tabella
    for (let i = 0; i < arrayNumbers.length; i++) {
        let newsquare = gridCreation(arrayNumbers[i]);
        box.append(newsquare);
        squareDimension[i].classList.add(`s-${arrayDimension}`);

        // controlliamo se il numero che clicchiamo è una bomba o no
        squareDimension[i].addEventListener("click", findBombs);
    }

    
    
    
})







// FUNCTIONS

/**
 * Description
 * @param {number} gridNumber
 * @returns {array}
 */
function gridDimension(gridNumber) {

    for (let i = 1; i <= gridNumber; i++) {
        arrayNumbers[i - 1] = i;

    }

    return arrayNumbers;
}

// creazione div con classe square e contenuto da input
/**
 * Description
 * @param {text} text
 * @returns {text}
 */
function gridCreation(text) {
    let newSquare = document.createElement("div");
    newSquare.classList.add("square");
    newSquare.innerHTML = `<span>${text}</span>`;
    return newSquare;
}

// funzione per trovare le bombe 
/**
 * Description
 * @returns {any}
 */
function findBombs() {

    const clickedNumber = parseInt(this.textContent);

    // controlliamo se il numero cliccato è presente nell'array bombe
    // SE si
    if (arrayBombs.includes(clickedNumber)) {
        console.log("BOMBAAAAA");
        console.log(`Hai perso, il tuo punteggio è ${points}`);
        // dai colore rosso come sfondo
        this.classList.add("red");

        // rimuoviamo la pssibilità di cliccare altro dato che abbiamo perso
        for (let i = 0; i < arrayNumbers.length; i++) {
            squareDimension[i].removeEventListener("click", findBombs);
        }

        document.querySelector("h2.message").innerHTML = `Hai perso, il tuo punteggio è ${points}`;
       
        // SE non è presentr
    } else {
        // diamo sfondo blu e aumentiamo il punteggio
        this.classList.add("blue");
        points++;

        // rimuoviamo la possibilità di cliccare
        this.removeEventListener("click", findBombs);
         document.querySelector("h2.points").innerHTML = `Punteggio: ${points}`;

        //  se clicchi tutti i numeri non bomba vinci
         if(points === arrayNumbers.length - numberOfBombs){
        document.querySelector("h2.message").innerHTML = `Hai vinto, il tuo punteggio è ${points}`;
        for (let i = 0; i < arrayNumbers.length; i++) {
            squareDimension[i].removeEventListener("click", findBombs);
        }


         }

    }

    
}



/**
 * Description
 * @param {number} numberBombs
 * @param {number} max
 * @returns {array}
 */
function createBombs(numberBombs, max) {
    let bombsNumber = [];
    let i = 0;
    while (bombsNumber.length < numberBombs) {
        rndNumber = Math.floor(Math.random() * (max - 1 + 1)) + 1;
        if (!bombsNumber.includes(rndNumber)) {
            bombsNumber[i] = rndNumber;

            i++;
        }

    }
    return bombsNumber;
}
