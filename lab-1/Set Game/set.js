import Deck from "./deck.js"


function set() { 
    let canvas = document.getElementById("Board")
    canvas.height = 0
    canvas.width = 0
    var ctx = canvas.getContext("2d")
    // deck holds an array of size 81. each hand has the 4 features
    const deck = new Deck()
    // shuffle the deck.
    // debugger
    deck.shuffle()

    // for(let i =0; i < deck.cards.length; i++) { 
    //     console.log(deck.cards[i].id)
    // }
    var board = deck.deal()
    console.log(board[0].id)
    console.log(board[1].id)
    var setID = findSetCardID(board[0],board[1])
    console.log(setID)
    drawDeck(ctx, board)

}

function drawDeck(ctx, board) { 
    for (let i = 0; i < 12; i++) { 
        var img = document.createElement("img");
        img.src = board[i].img
        document.body.appendChild(img)
        ctx.drawImage(img,0, 0)
        console.log(ctx)
        console.log(img)
    }
    


}
// Finds the id of the card that forms a set with the given two cards.
function findSetCardID(card1, card2) { 
    let id = ''
    for (let i = 0; i < 4; i++) { 
        if (card1.id.charAt(i) == card2.id.charAt(i)) { 
            id += card1.id.charAt(i);
        } else { 
            let nums = "012"
            nums = nums.replace(card1.id.charAt(i), "")
            nums = nums.replace(card2.id.charAt(i), "")
            id += nums
        }
    }
    return id
}
set()