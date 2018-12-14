// Constructor function that makes new trivia questions
function QMaker(q, a, c1, c2, c3) {
    this.question = q;
    this.answer = [a, true];
    this.choiceOne = [c1, false];
    this.choiceTwo = [c2, false];
    this.choiceThree = [c3, false];
}


var questionOne = new QMaker(
    "The popular Pokemon franchise began as what?",
    "A videogame",
    "A trading card game",
    "A TV show",
    "A manga",
);

var questionTwo = new QMaker(
    "As of 2017, what is the highest grossing film of all time (adjusted for inflation)?",
    ["Gone With the Wind", true],
    ["Titanic", false],
    ["Avatar", false],
    ["Star Wars: The Force Awakens", false],
);

var questionArray = [
    questionOne,
    questionTwo,
];

var choiceArray = []

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
    return choices
}


function newGame() {
    var questionNumber = 0
    function display() {
        choiceArray = choiceShuffler(questionArray[questionNumber]);
        console.log(choiceArray)
        $("#choiceOne").text(choiceArray[0][0]);
        $("#choiceTwo").text(choiceArray[1][0]);
        $("#choiceThree").text(choiceArray[2][0]);
        $("#choiceFour").text(choiceArray[3][0]);
    }
    display();
    
}
newGame()