const NUMBER = ['one', 'two', 'three']
const SHAPE = ['diamond', 'oval', 'wave']
const COLOR = ['red', 'green', 'blue']
const SHADING = ['solid', 'open','striped']

var start = new Date().getTime();
var stop = null;
var timer = document.getElementById(“Timer");
var update_timer = setInterval(function() {
    if (stop === null)  {
        var current = new Date().getTime();
        var elapsed_time = current - start;
        var seconds = Math.floor(elapsed_time / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var display_min = (minutes % 60).toString().padStart(2, '0');
        var display_sec = (seconds % 60).toString().padStart(2, '0');
        var time = display_min + ":" + display_sec;
        timer.innerHTML = time;
    } else {
        //add style, location, color choices
        timer.innerHTML = stop;
}
}, 1000);

export default class Deck {
    constructor(cards = freshDeck()){
        this.cards = cards
        this.board = []
    }

    get numberOfCards(){
        return this.cards.length
    }

    // shuffle the 81 deck of cards in the form of array, each with 4 features (number, shape, color, shading)
    shuffle() {

        // starting from the end of the 81 deck of cards at position i
        for(let i = this.numberOfCards - 1; i > 0; i--){
            // pick a random number from 0 to 1, multiply it by the current index i we are in + 1, round it down to get a new random index
            const randomIndex = Math.floor(Math.random() * (i+1)) 
            const newvalue = this.cards[randomIndex] // keep the value of the new random index (place holder)
            this.cards[randomIndex] = this.cards[i] // change the value of the random index to the value with current index i
            this.cards[i] = newvalue // change the value of the current index i to the value with the random index
        }
    }

    // Deal the board by adding 12 cards from the deck that should be shuffled before this is called
    deal() { 
        for(let i = 0; i < 12; i++) { 
            this.board.push(this.cards.pop())
        }
        // console.log(this.cards)
        // console.log(this.board)
        return this.board
    }

    // After a set is taken off the board, update the board by adding three more cards from the deck 
    updateBoard() { 
        for (let i = 0; i < 3; i++) { 
            this.board.push(this.cards.pop())
        }
        return this.board
    }

    // Check if the 3 given cards form a set (all features different, all features same)
    isSet(c1, c2, c3){
        let feature = ['number', 'shape', 'color', 'shading']
        let matched = 0;
        
        for (let i = 0; i<4 ; i++){
            // If feature i is all the same or all different for each card then it is a set, if not then no set 
            // Generate a counter and if it is 3 at the end then it is a set. 
            if ( (c1[feature[i]] === c2[feature[i]] && c2[feature[i]] === c3[feature[i]]) || (c1[feature[i]] !== c2[feature[i]] && c2[feature[i]]  !== c3[feature[i]] && c3[feature[i]] !== c1[feature[i]]))
            {
                matched += 1;
            }
      
        }
        if (matched == 4) 
        { 
            matched = true; 
        } 
        else 
        {
            matched = false; 
        }
        return matched;
    }

    findSet(c1, c2) { 
        
    }
}

// constructor for the Card class. Used to creat each card object last line in the freshDeck function
class Card {
    constructor(number, shape, color, shading){
        this.number = number
        this.shape = shape
        this.color = color
        this.shading = shading
        this.img = "./images/"+number+shape+color+shading+".png"
        this.id = NUMBER.indexOf(number).toString() + SHAPE.indexOf(shape).toString() + COLOR.indexOf(color).toString() + SHADING.indexOf(shading).toString()
    }
}


// creat an array of length 81, each with 4 different features. 2d array of 81 by 4. Not shuffled
function freshDeck(){
    return NUMBER.flatMap(number => {
        return SHAPE.flatMap(shape => {
            return COLOR.flatMap(color => {
                return SHADING.map(shading => {
                    return new Card (number, shape, color, shading)
                })
            })
        })
    }) 
}


