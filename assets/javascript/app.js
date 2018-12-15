// Constructor function that makes new trivia questions
function QMaker(q, a, c1, c2, c3) {
    this.question = q;
    this.answer = [a, true];
    this.choiceOne = [c1, false];
    this.choiceTwo = [c2, false];
    this.choiceThree = [c3, false];
}
// ========================================================================

// Here I define the question objects using the QMaker constructor, and then enter the questions into an array
var questionOne = new QMaker(
    "The popular Pokemon franchise began as what?",
    "A videogame",
    "A trading card game",
    "A TV show",
    "A manga",
);

var questionTwo = new QMaker(
    "As of 2017, what is the highest grossing film of all time (adjusted for inflation)?",
    "Gone With the Wind",
    "Titanic",
    "Avatar",
    "Star Wars: The Force Awakens",
);

var questionArray = [
    questionOne,
    questionTwo,
];
// ========================================================================

var choiceArray = [];
var timeHolder = 10;
var correct = 0;
var incorrect = 0;
var questionIndex = 0;

function choiceShuffler(q) {
    var choices = [
        q.answer,
        q.choiceOne,
        q.choiceTwo,
        q.choiceThree,
    ];
    var j, x, i;
    for (i = choices.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = choices[i];
        choices[i] = choices[j];
        choices[j] = x;
    };
    
    return choices;

}

// ========================================================================
function newGame() {
    function updateDisplay() {
        $("#question").text(questionArray[questionIndex].question);
        choiceArray = choiceShuffler(questionArray[questionIndex]);
        console.log(choiceArray)
        $("#choiceOne").text(choiceArray[0][0]).attr("value", choiceArray[0][1]);
        $("#choiceTwo").text(choiceArray[1][0]).attr("value", choiceArray[1][1]);
        $("#choiceThree").text(choiceArray[2][0]).attr("value", choiceArray[2][1]);
        $("#choiceFour").text(choiceArray[3][0]).attr("value", choiceArray[3][1]);
    }

    $(".btn").click(function() {
        console.log(this.value)
        if(this.value == 'true') {
            alert('Correct!')
            questionIndex++;
            correct++;
            updateDisplay()
        } else {
            console.log('you lose');
            questionIndex++;
            incorrect++;
            updateDisplay()
        }
    })
    updateDisplay();
    
}
newGame()