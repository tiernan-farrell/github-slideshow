const NUMBER = ['one', 'two', 'three']
const SHAPE = ['dimond', 'circle', 'square']
const COLOR = ['red', 'green', 'blue']
const SHADING = ['solid', 'open','striped']

export default class Deck {
    constructor(cards = freshDeck()){
        this.cards = cards
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

    // Check if the 3 given cards form a set (all features different, all features same)
    isSet(c1, c2, c3){
        let feature = ['number', 'shape', 'color', 'shading']
        let matched = 0
        
        for (let i = 0; i<4 ; i++){
            if ( (c1[feature[i]] == c2[feature[i]] && c2[feature[i]] == c3[feature[i]]) || (c1[feature[i]] != c2[feature[i]] && c2[feature[i]]  != c3[feature[i]] && c3[feature[i]] != c1[feature[i]]))
            {
                matched += 1
            }
            if (matched == 3){
                matched = true
            }
            else {
                matched = false
            }
        }
        return matched;
    }
}

// constructor for the Card class. Used to creat each card object last line in the freshDeck function
class Card {
    constructor(number, shape, color, shading){
        this.number = number
        this.shape = shape
        this.color = color
        this.shading = shading
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


