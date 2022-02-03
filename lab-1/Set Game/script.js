import Deck from "./deck.js"

// deck holds an array of size 81. each hand has the 4 features
const deck = new Deck()

// shuffle the deck.
deck.shuffle()

// test with the first 3 hands of cards. output to the console
console.log(deck.isSet(deck.cards[0], deck.cards[1], deck.cards[2]))
console.log(deck.cards[0])
console.log(deck.cards[1])
console.log(deck.cards[2])
console.log(deck.cards)

