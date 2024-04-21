const questions = [
    { jumbledWord: "dwlro", answer: "world" },
    { jumbledWord: "neics", answer: "since" },
    { jumbledWord: "betal", answer: "table" }
];


//Variables
let current = 0; // Current question index
let tries = 5; // Number of maximum tries
let result = "";
let chance = 5;
let totalQuestions = questions.length;
let correctAnswer = 0;


// DOM elements
let scrambledQuestion = document.querySelector(".ques-container");
let inputs = document.querySelectorAll("input");
let remainingTries = document.querySelector(".remaining-tries");
let subContainer = document.querySelector(".sub-container");
let lostContainer = document.querySelector("#lost-game");
let importantNote = document.querySelector(".note");


//Buttons
let resetBtn = document.querySelector(".reset");

let guessBtn = document.querySelector(".guess");
guessBtn.disabled = true;

let hiddenBtn = document.querySelector("#hidden");


// Show the current question
const showQuestion = () => {
    scrambledQuestion.innerText = questions[current].jumbledWord;
};
showQuestion();


//Showing the remaining tries.
remainingTries.innerText = tries;


// Getting the values of the input and managing the automatic focus of the input.
inputs.forEach((inp, index) => {
    inp.addEventListener("input", () => {
        const valueLength = inp.value.length;
        const value = inp.value.toLowerCase();
        inp.disabled = true;

        // Entered a character and not the last field
        if (valueLength === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
            result += value; // Append the entire input value to result
            inp.disabled = true;
        }

        // Entered a character in the last field
        else if (valueLength === 1 && index === inputs.length - 1) {
            result += value;
            inp.disabled = true;

            const allFilled = Array.from(inputs).every(inp => inp.disabled);
            if (allFilled) {
                guessBtn.disabled = false;
                guessBtn.addEventListener("click", checkAnswer);
            }

        }
    });
});

//Function to check whether the inputted answer is correct or not.
const checkAnswer = () => {
    if (result == questions[current].answer) {
        alert("YaY!! Your guess is correct");
        correctAnswer++;

        if (current < questions.length - 1) {
            current++;
            showQuestion();
        }


        if (correctAnswer == questions.length) {
            showResult();
            importantNote.classList.add('hide');
            hiddenBtn.classList.remove('hide');

        }


    } else if (tries > 0) {
        alert("BOO! Your answer is wrong");

        tries--;
        remainingTries.innerText = tries;

        let chances = document.querySelector(`.chance${chance}`);
        chances.classList.add("chance-lost");
        chance--;

        if (tries == 0) {
            lostGame();
        }
    }

    resetInputs();
    result = "";
};


//Function for show result
const showResult = () => {
    subContainer.innerHTML = `
<div class="result-container" >
<h1>Total questions - ${totalQuestions}</h1>
<h1>Correct answers - ${correctAnswer}</h1>
</div>
`
}


//Function when you loose the game
const lostGame = () => {
    lostContainer.innerHTML = `<h1>Sorry You have lost <span class="emoji" >😞</span>!!!</h1>`
    lostContainer.classList.add("lost-container");
    subContainer.style.display = "none";
    importantNote.style.display = "none";
    hiddenBtn.classList.remove("hide");
}


//Function which resets the input fields.
const resetInputs = () => {
    inputs.forEach((inp) => {
        inp.value = "";
        inp.disabled = false;
    })
}


// Reset button functionality
resetBtn.addEventListener("click", () => {
    window.location.reload(true);
});
hiddenBtn.addEventListener("click", () => {
    window.location.reload(true);
});
