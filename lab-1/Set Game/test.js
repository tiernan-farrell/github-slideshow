import Deck from "./deck.js"


function test() { 
    let canvas = document.getElementsByClassName("Screen")
    let ctx = canvas.getContext("2d")
    
    
    // deck holds an array of size 81. each hand has the 4 features
    const deck = new Deck()

    // shuffle the deck.
    // debugger
    deck.shuffle()
    // display image for all cards in deck 
    for (let i = 0; i < 81; i++) { 
        var im = document.createElement("img")
        im.src = deck.cards[i].img
        document.body.appendChild(im)
        console.log(im.src)
    }

    // manually test the isSet function in deck.js

    deck.cards[0].color = 'red'
    deck.cards[1].color = 'green'
    deck.cards[2].color = 'red'

    deck.cards[0].number = 'one'
    deck.cards[1].number = 'two'
    deck.cards[2].number = 'one'

    deck.cards[0].shading = 'empty'
    deck.cards[1].shading = 'empty'
    deck.cards[2].shading = 'striped'

    deck.cards[0].shape = 'diamond'
    deck.cards[1].shape = 'diamond'
    deck.cards[2].shape = 'square'


    // Test for actual set 
    deck.cards[3].color = 'green'
    deck.cards[4].color = 'green'
    deck.cards[5].color = 'green'

    deck.cards[3].number = 'one'
    deck.cards[4].number = 'one'
    deck.cards[5].number = 'one'

    deck.cards[3].shading = 'empty'
    deck.cards[4].shading = 'solid'
    deck.cards[5].shading = 'striped'

    deck.cards[3].shape = 'diamond'
    deck.cards[4].shape = 'diamond'
    deck.cards[5].shape = 'diamond'


    // Test for actual set 
    deck.cards[6].color = 'green'
    deck.cards[7].color = 'red'
    deck.cards[8].color = 'blue'

    deck.cards[6].number = 'one'
    deck.cards[7].number = 'one'
    deck.cards[8].number = 'one'

    deck.cards[6].shading = 'empty'
    deck.cards[7].shading = 'empty'
    deck.cards[8].shading = 'empty'

    deck.cards[6].shape = 'diamond'
    deck.cards[7].shape = 'diamond'
    deck.cards[8].shape = 'diamond'


    // Test for actual set 
    deck.cards[9].color = 'green'
    deck.cards[10].color = 'red'
    deck.cards[11].color = 'blue'

    deck.cards[9].number = 'one'
    deck.cards[10].number = 'three'
    deck.cards[11].number = 'two'

    deck.cards[9].shading = 'empty'
    deck.cards[10].shading = 'solid'
    deck.cards[11].shading = 'striped'

    deck.cards[9].shape = 'diamond'
    deck.cards[10].shape = 'square'
    deck.cards[11].shape = 'circle'

    // test with the first 3 hands of cards.
    console.log(deck.isSet(deck.cards[0], deck.cards[1], deck.cards[2]))
    console.log(deck.isSet(deck.cards[3], deck.cards[4], deck.cards[5]))
    console.log(deck.isSet(deck.cards[6], deck.cards[7], deck.cards[8]))
    console.log(deck.isSet(deck.cards[9], deck.cards[10], deck.cards[11]))


    // let i =0; 
    // while (i < deck.numberOfCards-3) { 
    //     console.log(deck.cards[i])
    //     console.log(deck.cards[i+1])
    //     console.log(deck.cards[i+2])
    //     console.log(deck.isSet(deck.cards[i], deck.cards[i+1], deck.cards[i+2]))
    //     i += 1
    // }
    //console.log(deck.cards[0]['number'])
    // console.log(deck.cards[1])
    // console.log(deck.cards[2])
    // console.log(deck.cards)

}
test()   
