const button = document.getElementById('button');
let difficolta = document.getElementById('difficolta');
const grid = document.getElementById('grid');
const resoult = document.querySelector('.result');
let resoultScore = document.createElement('p')

function startGame() {

    // creare le variabili
    let righe
    let colonne
    let totSquare
    let score = 0
    const btnReplay = document.createElement('button')
    // value del select
    const mode = parseInt(difficolta.value)
    let listaNumeri = []
    let listaBombe = []

    // confrontare il value del select
    switch (mode) {
        case 1:
            righe = 10
            colonne = 10
            break;
        case 2:
            righe = 8
            colonne = 8
            break;
        case 3:
            righe = 7
            colonne = 7
            break;
        default:
            righe = 10
            colonne = 10
    }

    totSquare = righe * colonne
    // console.log(`righe: ${righe}, colonne: ${colonne}, totSquare: ${totSquare}, mode: ${mode}`)

    // creazione numero random
    function getRandomIntInclusive(min, max) {
        min = Math.min(min);
        max = Math.max(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // inseriamo il numero random nella lista solo se non è già presente 
    do {
        const numeroRandom = getRandomIntInclusive(1, totSquare);
        if (!listaNumeri.includes(numeroRandom)) {
            listaNumeri.push(numeroRandom)
            // console.log(numeroRandom)  // test
        }
    } while (listaNumeri.length < totSquare)

    do {
        const bombe = getRandomIntInclusive(1, totSquare)
        if (!listaBombe.includes(bombe)) {
            listaBombe.push(bombe)
        }
    } while (listaBombe.length < 15)

    console.log(listaBombe)

    // cancelliamo il contenuto di grid prima di generarlo nuovamente
    grid.innerHTML = ''
    resoultScore.innerHTML = ''
    
    

    // funzione per agganciare l'eventListener alla griglia 
    function squareBomb(event) {
        if (listaBombe.includes(parseInt(event.target.dataset.number)) && listaNumeri.includes(parseInt(event.target.dataset.number))) {
            event.target.classList.add('bomb')
            grid.removeEventListener('click', squareBomb)
            btnReplay.classList.add('btn', 'btn-warning')
            btnReplay.innerHTML = 'Ritenta'
            btnReplay.addEventListener('click', startGame)
            resoultScore.classList.add('fs-4', 'fw-bolder', 'text-danger')
            resoultScore.innerHTML = `Hai Perso, il tuo punteggio é: ${score}`
            resoult.append(resoultScore)
            resoultScore.append(btnReplay)
        } else {
            if (!event.target.classList.contains('selected')) {
                score++
            }
            event.target.classList.add('selected')
            event.target.removeEventListener('click', squareBomb)
        //     console.dir(event.target.classList)
            console.log(score)
        }
    }

    grid.addEventListener('click', squareBomb)
    // funzione che inserisce la classe selected alla cella recuperata con il this
    // const squareBomb = function() {
    //     if (listaBombe.includes(parseInt(this.innerHTML)) && listaNumeri.includes(parseInt(this.innerHTML))) {
    //         this.innerHTML = ''
    //         // this.classList.remove('selected')
    //         this.classList.add('bomb')
    //         this.removeEventListener('click', squareBomb)
    //     } else {
    //         this.classList.add('selected')
    //         this.removeEventListener('click', squareBomb)
    //     }
    //     console.log(this.innerHTML)
    // }

    // creiamo il contenuto da visualizzare nell'html
    for (let i = 0; i < listaNumeri.length; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.dataset.number = listaNumeri[i];
        square.style.width = `calc( 100% / ${colonne} )`;
        // square.append(listaNumeri[i]);
        grid.append(square);
        // square.addEventListener('click', squareBomb)
        // console.log(square) // test
    }
    console.log(`righe: ${righe}, colonne: ${colonne}, totSquare: ${totSquare}, mode: ${mode}`)
}


button.addEventListener('click', startGame)