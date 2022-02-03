import Deck from "./deck.js"


function set() { 
    let canvas = document.getElementById("Board")
    canvas.width = innerWidth
    canvas.height = innerHeight
    let ctx = canvas.getContext("2d")
    // deck holds an array of size 81. each hand has the 4 features
    const deck = new Deck()
    // shuffle the deck.
    // debugger
    deck.shuffle()

    for(let i =0; i < deck.cards.length; i++) { 
        console.log(deck.cards[i].id)
    }

    drawDeck(ctx)

}

function drawDeck(ctx) { 
    ctx.fillRect(100, 100, 200, 200)

}
set()