let scoreCorrect = 0;
let scoreWrong = 0;

// These will all be internal variables 
const wordBank = ["Awkward", "Bagpipes", "Banjo", "Bungler", "Croquet", "Crypt", "Dwarves", "Fervid", "Fishhook", "Fjord", "Gazebo", "Gypsy", "Haiku", "Hphazard", "Hyphen", "Ivory", "Jazzy", "Jiffy", "Jinx", "Jukebox", "Kayak", "Kiosk", "Klutz", "Memento", "Mystify", "Numbskull", "Ostracize", "Oxygen", "Pajama", "Phlegm", "Pixel", "Polka", "Quad", "Quip", "Rhythmic", "Rogue", "Sphinx", "Squawk", "Swivel", "Toady", "Twelfth", "Unzip", "Waxy", "Wildebeest", "Yacht", "Zealous", "Zigzag", "Zippy", "Zombie"];
let guessCounter = 0;
let lettersGuessed = [];

// Change image based on a number (which will come from guess number)
function setImage(num) {
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
function setGuesses(num) {
    const counter = document.getElementById("guesses_remaining");
    counter.innerHTML = 10 - num;
    if (num >= 7) {
        counter.style.color = "red";
    } else {
        counter.style.color = "green";
    }
}


// Change the display of the letters that have been guessed
function updateGuessed(letters) {
    const guessed = document.getElementById("letters_guessed");
    if (letters.length === 0) {
        guessed.innerHTML = "None";
    } else {
        guessed.innerHTML = letters.join("  ");
    }
}

// Set scoreboard to display
function startScoreboard() {
    const welcome = document.getElementById("instructions");
    const scoreboard = document.getElementById("scoreboard");
    welcome.classList.add("d-none");
    scoreboard.classList.remove("d-none");
}

// Set score
function setScore(correct, wrong) {
    const correctScore = document.getElementById("score_correct");
    const wrongScore = document.getElementById("score_wrong");
    correctScore.innerHTML = "Games won: " + correct;
    wrongScore.innerHTML = "Games lost: " + wrong;

}

// Random Integer Generator
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Get all indices of letter in array
function indices(array, element) {
    let indxs = []
    var idx = array.indexOf(element);
    while (idx != -1) {
        indxs.push(idx);
        idx = array.indexOf(element, idx + 1);
    }
    return indxs
}

// Display correctly guessed letters
function updateLetters(word, guessed) {
    const blanks = document.getElementById("word_progress");
    let underscores = [];
    for (let i = 0; i < word.length; i++) {
        underscores.push("__ ")
    }
    guessed.forEach(function (letter) {
        let positions = indices(word, letter)
        for (let j = 0; j < positions.length; j++) {
            if (positions[j] !== -1) {
                underscores[positions[j]] = letter.toUpperCase()
            }
        }
    });

    blanks.innerHTML = underscores.join("");
    if (underscores.join("") === word) {
        // win() Need to define a function for this!
    }
}

// Initialize a new game
function newGame() {
    const word = wordBank[getRndInteger(0, wordBank.length)];
    lettersGuessed = [];
    guessCounter = 0;
    setImage(guessCounter);
    updateGuessed(lettersGuessed);
    setGuesses(guessCounter);
    updateLetters(word, lettersGuessed);
    setScore(scoreCorrect, scoreWrong);
    startScoreboard();
}