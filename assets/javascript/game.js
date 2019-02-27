let scoreCorrect = 0;
let scoreWrong = 0;


class Hangman {

    constructor(correct = 0, wrong = 0) {
        // These will all be internal variables 
        this.wordBank = ["Awkward", "Bagpipes", "Banjo", "Bungler", "Croquet", "Crypt", "Dwarves", "Fervid", "Fishhook", "Fjord", "Gazebo", "Gypsy", "Haiku", "Hphazard", "Hyphen", "Ivory", "Jazzy", "Jiffy", "Jinx", "Jukebox", "Kayak", "Kiosk", "Klutz", "Memento", "Mystify", "Numbskull", "Ostracize", "Oxygen", "Pajama", "Phlegm", "Pixel", "Polka", "Quad", "Quip", "Rhythmic", "Rogue", "Sphinx", "Squawk", "Swivel", "Toady", "Twelfth", "Unzip", "Waxy", "Wildebeest", "Yacht", "Zealous", "Zigzag", "Zippy", "Zombie"];
        this.guessCounter = 0;
        this.lettersGuessed = [];
        this.gamesPlayed = correct + wrong;
        this.word = "";
    }

    // Change image based on a number (which will come from guess number)
    updateImage(num) {
        const img = document.getElementById("hangman_img");
        if (num >= 0 && num <= 10) {
            img.src = `assets/images/hangman/${num}.jpg`

        } else {
            img.src = "assets/images/hangman/0.jpg"
        }
        const height = parseInt(document.getElementById("right_container").clientHeight);
        img.style.height = `${height}` + "px";
    }

    // Change number of guesses based guessCounter
    updateGuesses(num) {
        const counter = document.getElementById("guesses_remaining");
        counter.innerHTML = 10 - num;
        if (num >= 7) {
            counter.style.color = "red";
        } else {
            counter.style.color = "green";
        }
    }

    // Change the display of the letters that have been guessed
    updateGuessed(letters) {
        const guessed = document.getElementById("letters_guessed");
        if (letters.length === 0) {
            guessed.innerHTML = "None";
        } else {
            guessed.innerHTML = letters.join("  ");
        }
    }

    // Set scoreboard to display
    startScoreboard() {
        const welcome = document.getElementById("instructions");
        const scoreboard = document.getElementById("scoreboard");
        welcome.classList.add("d-none");
        scoreboard.classList.remove("d-none");
    }

    // Set score
    setScore(correct, wrong) {
        const correctScore = document.getElementById("score_correct");
        const wrongScore = document.getElementById("score_wrong");
        correctScore.innerHTML = "Games won: " + correct;
        wrongScore.innerHTML = "Games lost: " + wrong;

    }

    // Random Integer Generator
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Get all indices of letter in word
    indx(word, element) {
        let indxs = []
        var idx = word.indexOf(element);
        do {
            indxs.push(idx);
            idx = word.indexOf(element, idx + 1);
        } while (idx != -1)
        return indxs
    }

    // Display correctly guessed letters
    updateLetters(word, guessed) {
        const blanks = document.getElementById("word_progress");
        let underscores = [];
        for (let i = 0; i < word.length; i++) {
            underscores.push("__ ")
        }
        guessed.forEach(function (letter) {
            let positions = this.indx(word, letter);
            for (let j = 0; j < positions.length; j++) {
                if (positions[j] !== -1) {
                    underscores[positions[j]] = letter.toUpperCase()
                } else {
                    this.guessCounter += 1
                }
            }
        });

        blanks.innerHTML = underscores.join("");
        if (underscores.join("") === word) {
            // win() Need to define a function for this!
        }
    }

    // function that runs on click
    guess(letter) {
        if (this.lettersGuessed.indexOf(letter) === -1) {
            this.lettersGuessed.push(letter)
            this.updateLetters(this.word, this.lettersGuessed)
            this.updateGuessed(this.lettersGuessed)
            this.updateGuesses(this.guessCounter)
            this.updateImage(this.guessCounterWrong)
        }
    }

    // Initialize a new game
    newGame() {
        this.word = this.wordBank[this.getRndInteger(0, this.wordBank.length)];
        this.lettersGuessed = [];
        this.guessCounter = 0;
        this.updateImage(this.guessCounter);
        this.updateGuessed(this.lettersGuessed);
        this.updateGuesses(this.guessCounter);
        this.updateLetters(this.word, this.lettersGuessed);
        this.setScore(this.scoreCorrect, this.scoreWrong);
        this.startScoreboard();
    }
}



// document.onkeyup = function(event) {
// .textContent = event.key;
// }