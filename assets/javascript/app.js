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

var questionFour = new QMaker(
    "The days of the week have been given names that are derived from the pantheon of which ancient mythology?",
    "Norse",
    "Greek",
    "Babylonian",
    "Egyptian",
    "assets/images/thor.gif"
)

var questionFive = new QMaker(
    "What is the highest selling videogame console of all time?",
    "Playstation 2",
    "Nintendo DS",
    "Xbox 360",
    "Gameboy",
    "assets/images/bike.gif",
)

var questionArray = [
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
    questionFive,
];
// ========================================================================

var choiceArray = [];
var timeHolder = 10;
var correct = 0;
var incorrect = 0;
var questionIndex = 0;
var questionAnswered = false;
var intervalId;

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
function updateQuestion() {
    questionAnswered = false;
    console.log(questionIndex);
    resetTimer();
    $("#timer").text(timeHolder);
    console.log(questionArray[questionIndex].question)
    $("#question").text(questionArray[questionIndex].question);
    choiceArray = choiceShuffler(questionArray[questionIndex]);
    $("#choiceOne").text(choiceArray[0][0]).attr("value", choiceArray[0][1]);
    $("#choiceTwo").text(choiceArray[1][0]).attr("value", choiceArray[1][1]);
    $("#choiceThree").text(choiceArray[2][0]).attr("value", choiceArray[2][1]);
    $("#choiceFour").text(choiceArray[3][0]).attr("value", choiceArray[3][1]);
}

function endCheck() {
    $(".answerScreen").hide();
    if (questionIndex === questionArray.length - 1) {
        clearInterval(intervalId);
        $(".endScreen").show();
        $("#correct").text(correct);
        $("#incorrect").text(incorrect);
    } else {
        questionIndex++;
        updateQuestion();
        $(".gameDivs").show()
    }
   
}

function resetGame() {
    console.log(questionIndex)
    questionIndex = 0;
    console.log(questionIndex)
    correct = 0;
    incorrect = 0;
    updateQuestion();
    $(".endScreen").hide();
    $(".gameDivs").show();
}

function showAnswerScreen() {
    $(".gameDivs").hide();
    $(".answerScreen").show();
    setTimeout(endCheck, 5000);
};

function showQuestion() {
    updateQuestion();
    $(".instructions").hide();
    $(".gameDivs").show();
}

function answerChecker(clicked) {
    if (clicked.target.attributes.value.nodeValue == 'true') {
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
}

function showInstructions() {
    $(".instructions").show();
    $(".gameDivs").hide();
    $(".answerScreen").hide();
    $(".endScreen").hide();
};

function resetTimer() {
    timeHolder = 10
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    
}

function decrement() {
    --timeHolder;
    $("#timer").text(timeHolder);
    if (timeHolder === 0) {
        incorrect++
        resetTimer();
        showAnswerScreen();
        $("#check").text("Time's Up!");
        $("#correctAnswer").text("The correct answer was " + questionArray[questionIndex].answer[0]);
        $("#answerImage").attr("src", questionArray[questionIndex].image)
    }
}


function newGame() {
    showInstructions();
    $("#playButton").click(showQuestion);
    console.log("correct: " + correct);
    console.log("incorrect: " + incorrect);
    $(".choice").click(function(event) {
        clearInterval(intervalId);
        answerChecker(event);
        console.log("correct: " + correct);
        console.log("incorrect: " + incorrect);
        showAnswerScreen()
    });
    
    $("#restartButton").click(resetGame);
};

newGame()

