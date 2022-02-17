import ComputerPlayer from "./computerPlayer.js"
import Deck from "./deck.js"
import Player from "./player.js"

const canvas = document.getElementById("Board")
canvas.height = 0
canvas.width = 0
var ctx = canvas.getContext("2d")
// deck holds an array of size 81. each hand has the 4 features
const deck = new Deck()
var selected = []
var timeSetFound

const p1 = new Player("p1")
const cpu = new ComputerPlayer("cpu")
// shuffle the deck
// debugger

deck.shuffle()
deck.deal();
setBorder()
addImagesEventListener("click", "img", e => { 
    const card = findCard(deck.board, e.target)
    // If the card needs to be removed
    console.log(selected)
    if (selected.includes(card))  { 
        selected = selected.filter(ele => ele!=card)
        const img = e.target
        console.log(selected)
        img.style.border = "2px solid black"
        // If the card needs to be added 
    } else { 
        if (selected.length < 3) { 
            e.target.style.border = "5px solid green"
            // add card 
            selected.push(card)
            console.log(selected)
        } 
        // Check for set 
        if (selected.length === 3) { 
            if (deck.isSet(selected[0], selected[1], selected[2])) { 
                setFound(p1)
                timeSetFound = document.getElementById("Timer").innerHTML
            } else { 
                alert("Not a Set! Try again")
                selected = []
                setBorder()
            }
        } 
    
    }
    
     
})

function addImagesEventListener(type, selector, callback) { 
    document.addEventListener(type, e => { 
        if(e.target.matches(selector)) callback(e)
    })
}


var intervalmove = setInterval(function computerMove() {
    var set = cpu.findSet(deck.board)
    console.log(set)
    if (set != -1) { 
        // for (let i = 0; i < 3; i++) { 
        //     const card = getCardById(set[i])
        //     selected.push(card)
        // }
        // console.log(deck.board)
        // setFound(cpu)
        // console.log(deck.board)
    } else { 
        selected = []
        deck.redeal()
        drawDeck(ctx)
        alert(
            "REDEAL, NO POSSIBLE SETS"
        )
        
    }

}, 20000)
   

drawDeck(ctx)
// Called whenever a set is made 
function wait(secs, p) { 
    setTimeout(() => {
        // pop the set out of the selected array
        for (let i = 0; i  < 3; i++) { 
            var poppedCard = selected.pop()
            deck.release(poppedCard) 
        } 
        // Change all images boreders back to unselected
        setBorder()
        // replace cards with new deal 
        deck.updateBoard()
        // Increase score for players
        updateInfo(p)
        drawDeck(ctx) }, secs*1000)
}

function setFound(p) { 
    console.log(selected)
    for(let j = 0; j < selected.length; j++) {
        document.getElementById(selected[j].boardId).style.animationPlayState= "running"
    }
    wait(2, p)
    for(let j = 0; j < selected.length; j++) {
        document.getElementById(selected[j].boardId).style.animationPlayState= "paused"
    }


}

function updateInfo(p) { 
    var p1Score = document.getElementById("p1Score")
    var p2Score = document.getElementById("p2Score")
    var cardsLeft = document.getElementById("cardsLeft")
    var p1time = document.getElementById("p1time")

    p.incrementScore()
    if(p === p1) { 
        p1Score.innerHTML = "Player 1 Score: " + p.score

    } else  {
        p2Score.innerHTML = "Player 2 Score: " + p.score
    }
    
    p1time.innerHTML += "<li>" + timeSetFound + "</li>"
    cardsLeft.innerHTML = "Cards left: " + deck.cards.length




}

function drawDeck(ctx) { 
    let i = 0;
    for (let row = 0; row < 4; row++) { 
        for (let col = 0; col < 3; col++) {
            deck.board[i].boardId = "r" + row.toString() + "c" + col.toString()
            const img = document.getElementById(deck.board[i].boardId)
            img.src = deck.board[i].img 
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

function setBorder () { 
    const img = document.getElementsByTagName("img")
        for (let j = 0; j <img.length; j++)  { 
            img[j].style.border = "2px solid black"
        }
}

function findCard(cards, img) { 

    for(let i = 0; i < deck.cards.length; i++) { 
        let split = img.src.split("/")
        let name = "./images/" + split[4]
        if (cards[i].img === name) { 
            return cards[i]
        }
    }
}

//TODO: need something to keep track of player scores. 
//function to show card count, will need to be called everytime card count is changed
//will increment player score 
function updateScoreBoard(deck){
    var cardCount = document.getElementById("numCards");
    cardCount.innerHTML = "Cards left in deck: " + deck.cards.length;

    var p1 = document.getElementById("p1Score");
    p1.innerHTML = "Player 1 score: " + 1;

    var p2 = document.getElementById("p2Score");
    p2.innerHTML = "Player 2 score: " + 1;

}

//function to check the winner of the game
//call to pass into endGame
function checkWinner(p1, p2){
    if(p1.score>p2.score){
        return p1.name
    }
        return p2.name
    
}

//call this function if the amount of cards is 0, will notify of completed game
//pass in the player.name of the winner
function endGame(name){
    //window.open("endGamePopup.html", "popup", "width=100,height=100")
    alert("Game over. Winner is "+ name + ". Refresh the page to play again!")
}


// Dropdown when the player clicks on the "Time Set Found" 
document.getElementById("reportbtn").onclick = function() {
    reportCard()
}
function reportCard() {
    document.getElementById("p1time").classList.toggle("show");
  }
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.reportbtn')) {
      var report = document.getElementsByClassName("report-content");
      var i;
      for (i = 0; i < report.length; i++) {
        var openDropdown = report[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

