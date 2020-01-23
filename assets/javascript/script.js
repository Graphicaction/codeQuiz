//Below code is for circular countdown timer:
var countdownNumberEl = document.getElementById('countdown-number');
var countdown = 30;

countdownNumberEl.textContent = countdown;

setInterval(function() {
    countdown = --countdown <= 0 ? 0 : countdown;
    if(countdown !=0) {
        countdownNumberEl.textContent = countdown;
    }else {
        countdownNumberEl.textContent = "";
    }
}, 1000);

//Code for code quiz goes down:

var optionBlock = document.getElementById("optionDiv");
var choiceBlock = document.getElementById("choiceDiv");
var scoreBlock = document.getElementById("scoreDiv");
var quizBlock = document.getElementById("quizDiv");
var questionText = document.getElementById("questionTxt");
var optionDiv = document.getElementById("optionRadio"); 
var btnNext = document.getElementById("nextBtn");
var btnRestart = document.getElementById("restartBtn");
var btnEasy = document.getElementById("easyBtn");
var btnHard = document.getElementById("hardBtn");

var score = 0;
var highScore = 0;
var currectQuestionIndex = 0;

function restart() {
    optionBlock.style.display = "block";
    quizBlock.style.display = "none";
}

function openQuiz() {
    var element = event.target;
    var currectQuestionIndex = 0;
    var qLength;
    if (element.innerText == "Easy") {
        qLength = 5;
        loadQuestion(currectQuestionIndex, qLength);
    } else if (element.innerText == "Hard") {
        currectQuestionIndex = 5;
        qLength = 10;
        loadQuestion(currectQuestionIndex, qLength);
    }   
    optionBlock.style.display = "none";
    quizBlock.style.display = "block";    
}
// function to check the selected choice, calculate scores and call to load next question

var inValid = false;
function nextQuestion(qIndex, len) {
    
    console.log("nextQuestion called with qIndex:"+qIndex);
    btnNext.disabled = false;
    btnNext.addEventListener('click', function(e) {
        e.stopImmediatePropagation();
        
        var answer = $('input[name="choice"]:checked').next().text();
        console.log("selected answer: "+answer);
        if(questions[qIndex].answer == answer) {
            score+=10;
        }
        qIndex++;
        if(qIndex === len - 1) {
            btnNext.textContent = 'Finish';
        }
        if(qIndex === len) {
            highScore = score;
            localStorage.setItem("highscore", highScore);
            quizBlock.style.display = "none";
            scoreBlock.style.display = "block";
            document.getElementById("scoreText").textContent = "Your Score is: " + score;
            inValid = true;
            return;
        }
        if(inValid) {
            return;
        } else {
            loadQuestion(qIndex, len);   
        }
    });
}

//function to load question and its choices and call to check answer and next question function

function loadQuestion(questionIndex, quesL) {
    btnNext.disabled = true;
    let q = questions[questionIndex];
    let i = 0;
    console.log("loadQuestion called with questionIndex: "+questionIndex);
    questionText.textContent = (questionIndex + 1) + '. ' + q.title;
    choiceBlock.innerHTML="";
    q.choices.forEach(choice => {
        i++;
        let id = "option" + i;
        let rowDiv = document.createElement('div');
        rowDiv.setAttribute('class','row');
        choiceBlock.appendChild(rowDiv);
        let radioBtn = document.createElement('input');
        radioBtn.setAttribute('type', 'radio');
        radioBtn.setAttribute('name','choice');
        radioBtn.setAttribute('id', id);
        rowDiv.appendChild(radioBtn);
        let label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = choice;
        rowDiv.appendChild(label);
    });
            
    choiceBlock.addEventListener("click", function(event) {
        event.stopImmediatePropagation();
        var element = event.target;
        if (element.matches("input")) {
            nextQuestion(questionIndex , quesL);
        }
    });
}