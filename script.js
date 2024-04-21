const questions = [
    { jumbledWord: "dwlro", answer: "world" },
    { jumbledWord: "neics", answer: "since" },
    { jumbledWord: "betal", answer: "table" }
];


//Variables
let current = 0; // Current question index
let tries = 5; // Number of maximum tries
let result = "";


// DOM elements
let scrambledQuestion = document.querySelector(".ques-container");
let inputs = document.querySelectorAll("input");
let remainingTries = document.querySelector(".remaining-tries");


//Buttons
let resetBtn = document.querySelector(".reset");
let guessBtn = document.querySelector(".guess");


// Show the current question
const showQuestion = () => {
    scrambledQuestion.innerText = questions[current].jumbledWord;
};
showQuestion();


//Showing the remaining tries.
remainingTries.innerText = tries;


inputs.forEach((inp, index) => {

    inp.addEventListener("input", (event) => {
        const valueLength = inp.value.length;
        const value = inp.value;

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
        }

    });

});


// Reset button functionality
resetBtn.addEventListener("click", () => {
    window.location.reload(true);
});