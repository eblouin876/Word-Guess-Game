class Hangman {

    constructor(correct = 0, wrong = 0) {
        // These will all be internal variables 
        this.wordBank = ["Awkward", "Bagpipes", "Banjo", "Bungler", "Croquet", "Crypt", "Dwarves", "Fervid", "Fishhook", "Fjord", "Gazebo", "Gypsy", "Haiku", "Hphazard", "Hyphen", "Ivory", "Jazzy", "Jiffy", "Jinx", "Jukebox", "Kayak", "Kiosk", "Klutz", "Memento", "Mystify", "Numbskull", "Ostracize", "Oxygen", "Pajama", "Phlegm", "Pixel", "Polka", "Quad", "Quip", "Rhythmic", "Rogue", "Sphinx", "Squawk", "Swivel", "Toady", "Twelfth", "Unzip", "Waxy", "Wildebeest", "Yacht", "Zealous", "Zigzag", "Zippy", "Zombie"];
        this.guessCounter = 0;
        this.lettersGuessed = [];
        this.gamesPlayed = correct + wrong;
        this.word = "";
        this.scoreCorrect = 0;
        this.scoreWrong = 0;
        this.lastGuess = "";
        this.newGame()
    }

    // Change image based on a number (which will come from guess number)
    updateImage(num) {
        const img = document.getElementById("hangman_img");
        if (num >= 0 && num <= 10) {
            img.src = `assets/images/hangman/${num}.jpg`;

        } else {
            img.src = "assets/images/hangman/0.jpg";
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

    // Get all indices of letter in word
    indx(word, element) {
        let indxs = [];
        let idx = word.indexOf(element);
        indxs.push(idx);
        while (idx != -1) {
            indxs.push(idx);
            idx = word.indexOf(element, idx + 1);
        }
        return indxs
    }

    // Display correctly guessed letters
    updateLetters(word, guessed) {
        const blanks = document.getElementById("word_progress");
        let underscores = [];
        for (let i = 0; i < word.length; i++) {
            underscores.push("__")
        }

        for (let x = 0; x < guessed.length; x++) {
            let positions = this.indx(word, guessed[x]);
            for (let j = 0; j < positions.length; j++) {
                if (positions[j] !== -1) {
                    underscores[positions[j]] = guessed[x].toUpperCase()
                }
            }
        };

        blanks.innerHTML = underscores.join(" ");

        this.checkCondition()
    }

    // Update guess counter
    updateGuessCounter() {
        let currentCount = 0;
        for (let i = 0; i < this.lettersGuessed.length; i++) {
            if (this.word.indexOf(this.lettersGuessed[i]) === -1) {
                currentCount += 1
            }
        }
        this.guessCounter = currentCount;
    }

    // function that runs on click
    guess(letter) {
        var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        if (alpha.indexOf(letter) !== -1) {
            if (this.lettersGuessed.indexOf(letter) === -1) {
                this.lastGuess = letter;
                this.lettersGuessed.push(letter);
                this.updateGuessCounter();
                this.updateGuessed(this.lettersGuessed);
                this.updateGuesses(this.guessCounter);
                this.updateImage(this.guessCounter);
                this.updateLetters(this.word, this.lettersGuessed);
            }
        }
    }

    // Check for win or loss
    checkCondition() {
        const mainTitle = document.getElementById("main_title");
        const winLose = document.getElementById("win_lose");


        if (document.getElementById("word_progress").textContent.replace(/ /g, '') === this.word) {
            this.scoreCorrect += 1;
            // Yay you win! Display fun things!
            mainTitle.classList.add("d-none");
            winLose.classList.remove("d-none");
            winLose.textContent = `Great job getting ${this.word.toLowerCase()}! Try your luck on this one!`
            // Need some form of wait
            this.newGame()
        }

        if (this.guessCounter >= 10) {
            this.scoreWrong += 1;
            // Sorry, you lose! Display sad things!
            mainTitle.classList.add("d-none");
            winLose.classList.remove("d-none");
            winLose.textContent = `Good try! Your word was ${this.word.toLowerCase()}. Better luck this time!`
            // Need some form of wait here
            this.newGame()
        }
    }

    // Initialize a new game
    newGame() {
        this.word = this.wordBank[Math.floor(Math.random() * this.wordBank.length)].toUpperCase();
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

document.onkeyup = function (event) {
    hangman = new Hangman()
    document.onkeyup = function (event) {
        hangman.guess(event.key.toUpperCase())
    }
}