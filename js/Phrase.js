/* Treehouse FSJS Techdegree
    * Project 4 - OOP Game App
    * Phrase.js */


    //Phrase regex for matching words and spaces only. 
    requiredPhraseRegex = /^[A-z][A-z ]+$/;
    //creating the phrase class 
class Phrase {
        
    constructor(phrase) {
        //making sure that phrase passes the Regex test. 
        if (requiredPhraseRegex.test(phrase)){
        // Converting phrase to lower case 
        this.phrase = phrase.toLowerCase();
            
            }
    }

            
  // Adding letter placeholders to be displayed appropriately when the game starts and replacing each placeholder with correctly guessed letter.
            
  //creating an addPhraseToDisplay method

    addPhraseToDisplay() {
        
     // selecting phrase ul
     const Ul = $("#phrase ul");

        // Splitting phrase into single characters
     const Characters = this.phrase.split("");

        // Adding each character to ul
        Characters.forEach(char => {
        
            // adding space class for space characters and letter class for letters, 
            //also making sure they display using css classes 'space' and 'letter'
            const classList = `hide ${
            char === " " ?      
            "space" :           
            `letter ${char}`    
            }`;

            // Create and add character class and appending to ul 
         $("<li></li>")             
            .text(char)             
            .addClass(classList)   
                .appendTo(Ul);   
        });    
            
    }

    //Checking if selected letter matches a letter in the phrase
        checkLetter(letter) {
             if (this.phrase.includes(letter)){
                 return true;
             }
             else{
                return false;
                }
            }


    
            // Showing letter that matches selection
            // we are using static to call the class directly rather than its instance. 
            static showMatchedLetter(letter) {
                $(`#phrase .${letter}`)     
                    .removeClass("hide")    
                    .addClass("show")      
            }
}
   
