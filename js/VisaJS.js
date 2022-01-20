function populate() {
    if (quiz.isEnded()) {
    showScores();
    } else {
    // show question
    let element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;
    
    // show options
    let choices = quiz.getQuestionIndex().choices;
    for (let i = 0; i < choices.length; i++) {
    let element = document.getElementById("choice" + i);
    element.innerHTML = images[choices[i]]? '<img src="'+images[choices[i]]+'"/>':choices[i];
    guess("btn" + i, choices[i]);
    }
    
    showProgress();
    }
};
    
function guess(id, guess) {
    let button = document.getElementById(id);
        button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
    
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
    
    function showScores() {
    let gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    let element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    };

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    }

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
    }
        
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
        
Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
}
    this.questionIndex++;
}
        
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

let images = {
    "Eiffel Tower"  : "images/eiffelTower.jpg",
    "Giza" : "images/Giza.jpg",
    "Statue of Liberty" : "images/statueOfLiberty.jpg",
    "Stonehenge"   : "images/Stonehenge.jpg",
    "The Colosseum"   : "images/theColosseum.jpg",
    "Grand Canyon"   : "images/grandCanyon.jpg",
    "Great Wall of China"   : "images/greatWallOfChina.jpg",
    "Golden Gate Bridge"   : "images/goldenGateBridge.jpg"
}

// create questions
let questions = [
    new Question("Which of these is located in <u>France?<u/>", ["Golden Gate Bridge", "The Colosseum", "Giza", "Eiffel Tower"], "Eiffel Tower"),
    new Question("Which of these can be seen in <u>Egypt?<u/>", ["Grand Canyon", "Giza", "Statue of Liberty", "Great Wall of China"], "Giza"),
    new Question("Which of these was built in <u>Rome?<u/>", ["The Colosseum", "Stonehenge", "Golden Gate Bridge",  "Eiffel Tower"], "The Colosseum"),
    new Question("Which of these is located in <u>New York City?<u/>", ["Stonehenge", "Grand Canyon", "Statue of Liberty", "Giza"], "Statue of Liberty"),
    new Question("Which of these can be seen in <u>England?<u/>", ["Golden Gate Bridge", "Statue of Liberty", "Stonehenge", "The Colosseum"], "Stonehenge")
];
        
// create quiz
let quiz = new Quiz(questions);
        
// display quiz
populate();
        