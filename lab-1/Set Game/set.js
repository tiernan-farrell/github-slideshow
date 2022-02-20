import ComputerPlayer from "./computerPlayer.js"
import Deck from "./deck.js"
import Player from "./player.js"

const canvas = document.getElementById("Board")
canvas.height = 0
canvas.width = 0
// deck holds an array of size 81. each hand has the 4 features
const deck = new Deck()
const p1 = new Player("Player 1")
const cpu = new ComputerPlayer("Player 2")
const TIMESCALE = 1

var ctx = canvas.getContext("2d")
var selected = []
var timeSetFound = 0
var setHistory 
var hints = []
var score = ""

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
        //console.log(selected)
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
                hints = []
                setFound(p1)
                setHistory = document.getElementById("Timer").innerHTML
                score = "player1"
                timeSetFound = getTime()
                console.log("line 47 timeSetFound:", timeSetFound)
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

     // First check for no sets and redeal 
     if (set == -1) { 
         if (deck.cards.length == 0) { 
             endGame(checkWinner(p1, cpu))
         }
        while (set == -1) { 
            deck.redeal()
            selected = []
            hints = []
            set = cpu.findSet(deck.board)
        } 
        drawDeck(ctx)
    }


    for(let j = 0; j < 2; j++){
        hint(set[j])
    }

    function hint (target){
        deck.board.forEach (function(card){
            if (target == card.id){
                var cardImg = document.getElementsByClassName("row")
                for (let i = 0; i < 4; i++){
                    for (let j = 0; j < 3; j++){
                        if (cardImg[i].children[j].src) { 
                            let imgTag = cardImg[i].children[j].src

                            let split = imgTag.split("/")
                            let imgSrc = "./images/" + split[4]
        
                            if(imgSrc == card.img){
                            if(hints.length <= 2){
                                hints.push(cardImg[i].children[j])
                            }
                            else{
                                hints = []
                                hints.push(cardImg[i].children[j])
                            }
                                
                            }
                        }
                    }
                }   
            }
        })
    }

    document.getElementById("hint").onclick = function (){
        hints.forEach(function(hint){
            hint.style.border = "6px solid red"
        })
        
    }

   

    // Check for computer move 

    var time = getTime()
    console.log(cpu.level)
    var timeGoal = cpu.level*TIMESCALE+timeSetFound
    console.log(timeGoal)
    if(time > timeGoal) { 
        // update timeSetFound 
        timeSetFound += cpu.level*TIMESCALE
        //make move
        selected = []
        for (let i = 0; i < 3; i++) { 
            const card = getCardById(set[i])
            selected.push(card)
        }
        //console.log(deck.board)
        setFound(cpu)
        //console.log(deck.board)
        setHistory = document.getElementById("Timer").innerHTML
        score = "cpu"
    }   

}, 1000)
   

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
    for(let j = 0; j < selected.length; j++) {
        var card = document.getElementById(selected[j].boardId)
        if (card) card.style.animationPlayState= "running"
    }
    wait(2, p)
    for(let j = 0; j < selected.length; j++) {
        var card = document.getElementById(selected[j].boardId)
        if (card) card.style.animationPlayState= "paused"
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
        p1Score.style.animation = "scoreSize 2s infinite"
        p2Score.style.animation = ""

    } else  {
        p2Score.innerHTML = "Player 2 Score: " + p.score
        p2Score.style.animation = "scoreSize 2s infinite"
        p1Score.style.animation = ""
    }
    
    p1time.innerHTML += "<li>" + score + ": " + setHistory + "</li>"
    cardsLeft.innerHTML = "Cards left: " + deck.cards.length
}

function drawDeck(ctx) { 
    let i = 0;
    for (let row = 0; row < 4; row++) { 
        for (let col = 0; col < 3; col++) {
            if (i < deck.board.length) {
                deck.board[i].boardId = "r" + row.toString() + "c" + col.toString()
                const img = document.getElementById(deck.board[i].boardId)
                img.src = deck.board[i].img 
                ctx.drawImage(img,0, 0)
                i++
            } else {
                var img = document.getElementById( "r" + row.toString() + "c" + col.toString())
                img.parentNode.removeChild(img)
            }
        }
    }

}

// Gets the number of seconds that have passed since page has reloaded 
function getTime () { 
    var rtime = 0
    // Get timer html 
    var time = document.getElementById("Timer").innerHTML
    var split = time.split(":")
    var t1 = parseInt(split[0])
    var t2 = parseInt(split[1])
    // multiply minutes by 60 
    rtime = 60*t1 + t2
    return rtime
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
        console.log(split)
        let name = "./images/" + split[4]
        console.log(name)
        if (cards[i].img === name) { 
            return cards[i]
        }
    }
}

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

// Gets card on board from its id 
function getCardById(id) { 
    for (let i = 0; i < deck.board.length; i++) { 
        if (deck.board[i].id === id) { 
            return deck.board[i]
        }
    }
}

//call this function if the amount of cards is 0, will notify of completed game
//pass in the player.name of the winner
function endGame(name){
    //window.open("endGamePopup.html", "popup", "width=100,height=100")
    document.location.reload(true)
  
    alert("Game over. Winner is "+ name + ". Refresh the page to play again!") 

}



// Set the level buttons to change the difficulty of cpu level 
var levels = document.getElementsByClassName("level")
// Set easy to grey color as it is default selection to start 
levels[0].style.background = "grey"
for (let i = 0; i < levels.length; i++) { 
    levels[i].onclick = (e) => { 
        let level = e.target.innerHTML
        if(level === "Easy") { 
            cpu.level = 3
        } else if (level === "Medium") { 
            cpu.level = 2
        } else { 
            cpu.level = 1
        }
        e.target.style.background = "grey"
        for (let j = 0; j < levels.length; j++) { 
            if(j !== i) levels[j].style.background =  "#a80303"
        }
    }
}

// Dropdown when the player clicks on the "Time Set Found" 
document.getElementById("reportbtn").onclick = function() {
    document.getElementById("p1time").classList.toggle("show");
}

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.reportbtn')) {
      var report = document.getElementsByClassName("report-content")
      for (let i = 0; i < report.length; i++) {
        var openDropdown = report[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

