const questions = [
    { jumbledWord: "dwlro", answer: "world" },
    { jumbledWord: "neics", answer: "since" },
    { jumbledWord: "betal", answer: "table" }
];

let current = 0; // Current question index

// DOM elements
let scrambledQuestion = document.querySelector(".ques-container");
let inputs = document.querySelectorAll("input");

// Show the current question
const showQuestion = () => {
    scrambledQuestion.innerText = questions[current].jumbledWord;
};
showQuestion();

// Next and previous input selection logic.
inputs.forEach((inp, index) => {

    inp.addEventListener("keyup", (event) => {
        const valueLength = inp.value.length;

        // Entered a character and not the last field
        if (valueLength === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus(); 
        }

        // Button navigation function.
        navigate()


    });
});

//Function to navigate the input fields through buttons.
const navigate = () => {

    inputs.forEach((inp, index) => {
        inp.addEventListener("keyup", (event) => {

            ; if (event.key === "Backspace" && index > 0) {
                inputs[index - 1].focus();

            } else if (event.key === "ArrowRight" && index < (inputs.length - 1)) {
                inputs[index + 1].focus();

            } else if (event.key === "LeftArrow" && index > 0) {
                inputs[index - 1].focus()
            }
        });
    });

}