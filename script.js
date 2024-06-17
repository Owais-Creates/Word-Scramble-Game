const questions = [
    {
        jumbledWord: "dwlro",
        answer: "world",
        hint: "This word describes the entire planet and everything on it."
    },
    {
        jumbledWord: "neics",
        answer: "since",
        hint: "This word often introduces a condition or a hypothetical situation."
    },
    {
        jumbledWord: "betal",
        answer: "table",
        hint: "It's a piece of furniture that gathers around it both sustenance and stories."
    },
    {
        jumbledWord: "ednry",
        answer: "nerdy",
        hint: "This word often describes someone who is deeply passionate about something."
    },
    {
        jumbledWord: "fulfb",
        answer: "bluff",
        hint: "Often used as a term for deception or misleading action."
    },
];

// Variables
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
let hint = document.querySelector(".hint");
let hintContainer = document.querySelector(".hint-container");
let hintSentence = document.querySelector(".hint-sentence");

// Buttons
let resetBtn = document.querySelector(".reset");
let guessBtn = document.querySelector(".guess");
guessBtn.disabled = true;

let hiddenBtn = document.querySelector("#hidden");

// Show the current question
const showQuestion = () => {
    scrambledQuestion.innerText = questions[current].jumbledWord;
    // Adding hint dynamically
    hintSentence.innerText = questions[current].hint;
};
showQuestion();

// Showing and hiding the hint when the button is clicked.
hint.addEventListener("click", () => {
    hintSentence.classList.toggle("hidden-hint");
});

// Showing the remaining tries.
remainingTries.innerText = tries;

// Getting the values of the input and managing the automatic focus of the input.
inputs.forEach((inp, index) => {
    inp.addEventListener("input", () => {
        const value = inp.value.toLowerCase();

        // Validate input
        if (!/^[a-z]$/.test(value)) {
            alert("Please enter only alphabetic characters!");
            inp.value = "";
            return;
        }

        const valueLength = inp.value.length;

        // Entered a character and not the last field
        if (valueLength === 1 && index < inputs.length - 1) {
            if (index > 0 && inputs[index - 1].value.length === 0) {
                alert("Please fill the previous box first!");
                inp.value = "";
                return;
            }
            inputs[index + 1].disabled = false; // Enable next input
            inputs[index + 1].focus();
            result += value; // Append the entire input value to result
            inp.disabled = true;
        }

        // Entered a character in the last field
        else if (valueLength === 1 && index === inputs.length - 1) {
            if (index > 0 && inputs[index - 1].value.length === 0) {
                alert("Please fill the previous box first!");
                inp.value = "";
                return;
            }
            result += value;
            inp.disabled = true;

            checkInputs();
        }
    });
});

// Function which checks if all the input are filled before submitting.
const checkInputs = () => {
    const allFilled = Array.from(inputs).every(inp => inp.disabled);
    if (allFilled) {
        guessBtn.disabled = false;
        guessBtn.addEventListener("click", checkAnswer);
    }
};

// Function to check whether the inputted answer is correct or not.
const checkAnswer = () => {
    if (result == questions[current].answer) {
        alert("YaY!! Your guess is correct");
        correctAnswer++;

        if (current < questions.length - 1) {
            current++;
            hintSentence.classList.add("hidden-hint");
            showQuestion();
        }

        if (correctAnswer == questions.length) {
            showResult();
            importantNote.classList.add('hide');
            hiddenBtn.classList.remove('hide');
            hintContainer.style.display = "none";
        }

    } else if (tries > 0) {
        alert("BOO! Your answer is wrong");

        tries--;
        remainingTries.innerText = tries;

        let chances = document.querySelector(`.chance${chance}`);
        chances.classList.add("chance-lost");
        chance--;

        if (tries == 0) {
            gameOver();
        }
    }
    resetInputs();
    result = "";
};

// Function to show result
const showResult = () => {
    subContainer.innerHTML = `
        <div class="result-container">
            <h1>Total questions - ${totalQuestions}</h1>
            <h1>Correct answers - ${correctAnswer}</h1>
        </div>
    `;
};

// Function when you lose the game
const gameOver = () => {
    lostContainer.innerHTML = `<h1>Sorry You have lost!!</h1>`;
    lostContainer.classList.add("lost-container");
    subContainer.style.display = "none";
    importantNote.style.display = "none";
    hiddenBtn.classList.remove("hide");
    hintContainer.style.display = "none";
};

// Function which resets the input fields.
const resetInputs = () => {
    inputs.forEach((inp) => {
        inp.value = "";
        inp.disabled = false;
    });
    inputs[0].focus();
};

// Initialize input fields
const initializeInputs = () => {
    inputs.forEach((inp, index) => {
        if (index === 0) {
            inp.disabled = false;
        } else {
            inp.disabled = true;
        }
    });
};

// Call the initialize function
initializeInputs();

// Reset button functionality
resetBtn.addEventListener("click", () => {
    window.location.reload(true);
});
hiddenBtn.addEventListener("click", () => {
    window.location.reload(true);
});
