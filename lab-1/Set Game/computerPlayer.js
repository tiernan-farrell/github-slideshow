
export default class ComputerPlayer{ 
    constructor(name, level=3)  {
        this.name = name
        this.score = 0
        this.level = level
    }
    
    //Increments the score
    incrementScore() { 
        this.score += 1
    }

    // Finds the id of the card that forms a set with the given two cards.
    findSetCardID(card1, card2) { 
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

    // Function that searches the board for a card id and returns index in board 
    // if it is found and -1 otherwise 
    checkBoard(board, id) { 
        for(let i = 0; i < board.length; i++) { 
            if (board[i]) { 
                if (board[i].id === id) { 
                    return i
                }
            }
            
        }
        return -1
    }
    

    //Finds a set on the board if one exists
    findSet(board) { 
        for (let i = 0; i < board.length - 1; i ++) { 
            var card1 = board[i]
            var card2 = board[i+1]
            var idForMatch = this.findSetCardID(card1, card2)
            if(this.checkBoard(board, idForMatch) >= 0) { 
                var set = [board[i].id, board[i+1].id, idForMatch]
                return set 
            }
        }

        // If execution reaches here, there is no set on the board and a redeal should happen 
        return -1
    }


}