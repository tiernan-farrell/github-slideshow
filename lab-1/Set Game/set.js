import Deck from "./deck.js"

var playerScore = 0
function set() { 
    let canvas = document.getElementById("Board")
    canvas.height = 0
    canvas.width = 0
    var ctx = canvas.getContext("2d")
    // deck holds an array of size 81. each hand has the 4 features
    const deck = new Deck()
    var selected = []
    // shuffle the deck.
    // debugger
    deck.shuffle()
    // for(let i =0; i < deck.cards.length; i++) { 
    //     console.log(deck.cards[i].id)
    // }
    deck.deal()

    var img = document.getElementsByTagName("img")
    console.log(img)
    for (let i = 0; i < img.length; i++) { 
        img[i].onclick = function() { 
            const card = findCard(deck.board, img[i])
            if(selected.includes(card)) { 
                selected.pop(card)
                img[i].style.border = "1px solid black"
            } else { 
                if (selected.length < 3) { 
                    selected.push(card)
                    img[i].style.border = "3px solid black"

                    if (selected.length === 3){
                        console.log(selected[0])
                        console.log(selected[1])
                        console.log(selected[2])
                        if (deck.isSet(selected[0], selected[1], selected[2])) {
                            console.log(selected[0])
                            console.log(selected[1])
                            console.log(selected[2])
                            handleSet(selected, deck) 
                            console.log(deck.board)
                            drawDeck(ctx, deck.board)
                            alert("SET FOUND")
                            document.getElementById("player1").innerHTML = "player 1 score: " + ++playerScore;
                        }
                        else{
                            alert("Not a Set! Try again")
                            selected = []
                            for (let i = 0; i < img.length; i++){
                                img[i].style.border = "1px solid black"
                            }
                            
                        }
                    }
                }
            }
                
            
            }
            
    }

    // console.log(board[0].id)
    // console.log(board[1].id)
    // var setID = findSetCardID(board[0],board[1])
    // console.log(setID)

    drawDeck(ctx, deck.board)



}
// Called whenever a set is made 
function handleSet(selected, deck) { 
    // pop the set out of the selected array
    for (let i = 0; i  < 3; i++) { 
        const card = selected.pop()
        deck.release(card)
        console.log(card)

    } 
    // Change all images boreders back to unselected
    let img = document.getElementsByTagName("img")
    for (let j = 0; j <img.length; j++)  { 
        img[j].style.border = "1px solid black"
    }
    // replace cards with new deal 
    deck.updateBoard()

}
function drawDeck(ctx, board) { 
    let i = 0;
    console.log(board)
    for (let row = 0; row < 4; row++) { 
        for (let col = 0; col < 3; col++) {
            var img = document.getElementById("r" + row.toString() + "c" + col.toString())
            img.src = board[i].img
            ctx.drawImage(img,0, 0)
            i++
        }
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

function findCard(cards, img) { 
    for(let i = 0; i < 69; i++) { 
        let split = img.src.split("/")
        let name = "./images/" + split[4]
         if (cards[i].img === name) { 
             return cards[i]
         }

    }
}

set()