// Constructor function that makes new trivia questions
function QMaker(q, a, c1, c2, c3, img) {
    this.question = q;
    this.answer = [a, true];
    this.choiceOne = [c1, false];
    this.choiceTwo = [c2, false];
    this.choiceThree = [c3, false];
    this.image = img; //The img property must be entered relative to the index.html file
}
// ========================================================================

// Here I define the question objects using the QMaker constructor, and then enter the questions into an array
var questionOne = new QMaker(
    "The popular Pokemon franchise began as what?",
    "A videogame",
    "A trading card game",
    "A TV show",
    "A manga",
    "assets/images/pikachu.jpg"
);

var questionTwo = new QMaker(
    "As of 2017, what is the highest grossing film of all time (adjusted for inflation)?",
    "Gone With the Wind",
    "Titanic",
    "Avatar",
    "Star Wars: The Force Awakens",
    "assets/images/gonewiththewind.gif",
);

var questionThree = new QMaker(
    "The movie 'Blade Runner' is based off a book written by which famous science fiction author?",
    "Philip K. Dick",
    "Robert Heinlein",
    "Isaac Asimov",
    "Frank Herbert",
    "assets/images/roybatty.gif"
)

var questionArray = [
    questionOne,
    questionTwo,
    questionThree,
];
// ========================================================================

var choiceArray = [];
var timeHolder = 10;
var correct = 0;
var incorrect = 0;
var questionIndex = 0;

// This function shuffles the array of choices so that they will be in different button positions on each playthrough
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

// Populates the question and the four choices for each question.
function updateDisplay() {
    $("#question").text(questionArray[questionIndex].question);
    choiceArray = choiceShuffler(questionArray[questionIndex]);
    $("#choiceOne").text(choiceArray[0][0]).attr("value", choiceArray[0][1]);
    $("#choiceTwo").text(choiceArray[1][0]).attr("value", choiceArray[1][1]);
    $("#choiceThree").text(choiceArray[2][0]).attr("value", choiceArray[2][1]);
    $("#choiceFour").text(choiceArray[3][0]).attr("value", choiceArray[3][1]);
}

function endCheck() {
    $(".answerScreen").hide();
    if (questionIndex === questionArray.length) {
        $(".endScreen").show();
    } else {
        $(".gameDivs").show()
    }
}

function resetGame() {
    questionIndex = 0;
    correct = 0;
    incorrect = 0;
    updateDisplay();
    $(".endScreen").hide();
    $(".gameDivs").show();
}
function showAnswerScreen() {
    $(".gameDivs").hide();
    $(".answerScreen").show();
    setTimeout(endCheck, 5000)
};

function showInstructions() {
    $(".instructions").show();
    $(".gameDivs").hide();
    $(".answerScreen").hide();
    $(".endScreen").hide();
};

function newGame() {
    $(".gameDivs").hide();
    $(".answerScreen").hide();
    $(".endScreen").hide();
    $("#playButton").click(function() {
        $(".instructions").hide();
        $(".gameDivs").show();
    })

    // For an example of a timer, go to interval activity in week 5//
    $(".choice").click(function() {
        console.log(questionIndex);
        showAnswerScreen();
        if(this.value == 'true') {
            correct++;
            $("#check").text("You are correct!");
            $("#correctAnswer").text("The correct answer was " + questionArray[questionIndex].answer[0]);
            $("#answerImage").attr("src", questionArray[questionIndex].image)
        } else {
            incorrect++;
            $("#check").text("You are incorrect.");
            $("#correctAnswer").text("The correct answer was " + questionArray[questionIndex].answer[0]);
            $("#answerImage").attr("src", questionArray[questionIndex].image)
        }
        questionIndex++;
        if (questionIndex < questionArray.length) {
            updateDisplay();
        };
    })
    updateDisplay();
    
}

newGame()

$("#restartButton").click(resetGame);