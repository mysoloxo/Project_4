/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor() {
        this.missed = 0;
         this.phrases = this.createPhrases();
        this.activePhrase = null ;
        }
        
        createPhrases(){
            const phrases = 
            [
            new Phrase("Change the world be being yourself "),
            new Phrase("And still i rise"),
            new Phrase("Strive for greatness"),
            new Phrase("Positive change"),
            new Phrase("Just smile"),
            new Phrase("Be the change"),
            new Phrase("life is short"),
            new Phrase("Never give up"),
            new Phrase("Dream big"),
            new Phrase("Feed the brain"),
            new Phrase("Live today"),
            new Phrase("Gratitude"),
            new Phrase("Enjoy life"),
            new Phrase("Love yourself first"),
            new Phrase("It always works out"),
            new Phrase("Just belive in yourself"),
            new Phrase("Follow your heart"),
            new Phrase("Life starts when you take risk"),
            new Phrase("Life is a beautiful journey"),
            new Phrase("Failing is part of the process")
        ];
                    
        return phrases;
            
    }

    //creating the random   phrase generator
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    //getting method for the player that is playing
    get isPlaying() {
        return $("#phrase .letter.hide").length !== 0 && // Check if player hasn't won
            this.missed < this.totalHearts;              // and hasn't lost
    }

    // getting the game difficulty
    get difficulty() {
        return $("#difficulty").val();
    }

    // Determine the number of hearts that the player has
    get totalHearts() {
        // Considering the difficulty value, return the number of hearts corresponding to it
        switch (this.difficulty) {
            // 5 hearts for Easy
            case "easy":   
                return 5;

            // 3 hearts for mediun
            case "medium":  
                return 3;

            // 1 heart for hard
            case "hard":   
                return 2;
        }
    }

    //creating the start game method. 
    startGame(){
        //selecting the overlay id and making its display equals 'none'
        document.getElementById("overlay").style.display = "none";
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        this.resetGame();


        this.missed = 0;

            // Clear overlay game over text
            $("#overlay #game-over-message")
                .text("");

            // Remove all hearts
            $("#scoreboard li")
                .remove()

        //looping throug totalHearts
        for (let i = 0; i < this.totalHearts; i++) {
            const $heartImage = $("<img />", {
                src: "images/liveHeart.png",
                alt: "Heart Icon",
                height: 35,
                width: 30,
               
            });

            $("<li>", { class: "tries" })
                .append($heartImage)
                .appendTo("#scoreboard ol");
        }



    }


    //Creating the handleInteraction to handle the logic of the game
    // matching the buttons to the letter in the phrase.
    handleInteraction(letterButton) {
        if (letterButton.tagName == 'BUTTON') {

            let letter = letterButton.textContent
            letterButton.disabled = true;
                       
            if (!game.activePhrase.checkLetter(letter)) {
                letterButton.className = ('wrong');
                this.removeLife();
            } else {
                letterButton.className = ('chosen');
                // game.activePhrase = Phrase.showMatchedLetter(letter);
                Phrase.showMatchedLetter(letter);
                this.checkForWin();     
            }

           

            
        } 
    
        let keyPressed = [];
        
        //Adding a keyup listener on the physical keyboard and calling the handleInteraction method
        $(document).keypress( (e) => {
            let keyPress = e.key;
            if ( !keyPressed.includes(keyPress) ) {
              $('.key').each( (index, key) => {
                if ( $(key).text() === keyPress ) {
                  game.handleInteraction(key);
                }
              });
              keyPressed.push(keyPress);
            }
          });
         
    }


    checkForWin() {
        // Check if there are no more letters hidden
        const hideLetters = $("#phrase .letter.hide").length === 0;

        // If the player has won, end the game with a "win" result
        if (hideLetters)
        this.gameOver(true);
          
    }




    //method for removing life on losses. 
     removeLife() {
        // Increment miss counter
        this.missed += 1;

        // Remove a heart from the board
        const $heart = $("#scoreboard .tries img[src$='liveHeart.png']")
            .last();

       
            
                $heart.attr("src", "images/lostHeart.png");

                // Ending the gameIf miss counter is greater than or equal to the total number of hearts
                
                if (this.missed >= this.totalHearts) {
                    // Reveal what the phrase was
                    $("#phrase li.letter.hide")
                        .removeClass("hide")
                        .addClass("show");
                        this.gameOver(false);
                }
                
            
    }
    
    //creating the gameOver method 
    gameOver(gameWon){
        //selecting the overlay and adding a display of flex
        document.getElementById('overlay').style.display = 'flex';
        //creating an if else statkement for win and lose
        if(gameWon === true){
            document.getElementById('game-over-message').innerText = 'You won!';
            document.getElementById('overlay').className = 'win';
            document.getElementById("btn__reset").textContent= "Play again";
           
        } else {
            document.getElementById('game-over-message').innerText = "Sorry you lost";
            document.getElementById('overlay').className = 'lose';
            document.getElementById("btn__reset").textContent = "Try again";
           
        }
    }
    //creating the reset method for resetting the game 
    resetGame() {
        const ul = document.querySelector('ul');
        const li = ul.querySelectorAll('li');
        const qwertyDiv = document.getElementById('qwerty');
        const buttons = qwertyDiv.querySelectorAll('button');
        const img = document.querySelectorAll('img');
        this.missed = 0;
        //creating a for loop to remove the li one at a time. 
        for (let i = 0; i < li.length; i++) {
            li[i].remove();       
        }
        
            this.activePhrase = this.getRandomPhrase();
            this.activePhrase.addPhraseToDisplay();

            //creating a for loop for enabling button on at a time
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = false;
                buttons[i].className = 'key';
        }

            img.forEach(image => image.src = 'images/liveHeart.png'); 
    }
    
}
