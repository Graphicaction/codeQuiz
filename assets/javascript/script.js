//Below code is for circular countdown timer:
var countdownNumberEl = document.getElementById('countdown-number');
var countdown = 75;

function startTimer(){
    countdownNumberEl.textContent = countdown;

    setInterval(function() {
        countdown = --countdown <= 0 ? 0 : countdown;
        if(countdown !=0) {
            countdownNumberEl.textContent = countdown;
        }else {
            if(countdown <= 0) {
                message = "Time Up!";
                setTimeout(() => {
                    clearStatusClass(document.body);
                    displayScore();    
                }, 1000)
            }
            countdownNumberEl.textContent = "";
        }
    }, 1000);        
}

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
var message = "All done!";
var currectQuestionIndex = 0;

//function when restart button is pressed.
function restart() {
    optionBlock.style.display = "block";
    quizBlock.style.display = "none";
}

//function to start quiz depending on the 'easy' and 'hard' options
function openQuiz() {
    var element = event.target;
    var currectQuestionIndex = 0;
    var qLength;
    if (element.innerText == "Easy") {
        qLength = 5;
        startTimer();
        loadQuestion(currectQuestionIndex, qLength);
    } else if (element.innerText == "Hard") {
        currectQuestionIndex = 5;
        qLength = 10;
        startTimer();
        loadQuestion(currectQuestionIndex, qLength);
    }   
    optionBlock.style.display = "none";
    quizBlock.style.display = "block";    
}
// function to check the selected choice, calculate scores and call to load next question

var audioC = document.getElementById("audioCorrect");
var audioInC = document.getElementById("audioIncorrect");
var inValid = false;
var correct = false;
function nextQuestion(qIndex, len) {
    btnNext.disabled = false;
    btnNext.addEventListener('click', function(e) {
        e.stopImmediatePropagation();
        
        var answer = $('input[name="choice"]:checked').next().text();
        //calculating scores  
        if(questions[qIndex].answer == answer) {
            score+=10;                      //adds 10 if answer is correct
            correct = true;
            audioC.play();
        } else {
            countdown -= 15;                //reduces 15s from timer if answer is incorrect
            correct = false;
            audioInC.play();
        }
        qIndex++;
        setStatusClass(document.body, correct);
        setTimeout(() => {
            if(qIndex === len - 1) {
                btnNext.textContent = 'Finish';
            }  
        }, 2000); 
        if(qIndex === len) {
            inValid = true;
            setTimeout(() => {
                clearStatusClass(document.body);
                displayScore();    
            }, 1500);
            return;
        }
        if(inValid) {
            return;
        } else {
            setTimeout(() => {
                loadQuestion(qIndex, len);  
            }, 2000);    
        }
    });
}

//function to load question and its choices and call to check answer and next question function

function loadQuestion(questionIndex, quesL) {
    btnNext.disabled = true;
    let q = questions[questionIndex];
    let i = 0;
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
    
    if(countdown < 0) {
        message = "Time Up!";
        displayScore();
        return;
    }
    choiceBlock.addEventListener("click", function(event) {
        event.stopImmediatePropagation();
        var element = event.target;
        if (element.matches("input")) {
            nextQuestion(questionIndex , quesL);
        }
    });
}

// setting and clearing status class for body element
function setStatusClass(element, correct) {
    console.log("answer " + correct);
    clearStatusClass(element);
    if(correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

//Displaying score container:
function displayScore() {
    quizBlock.style.display = "none";
    scoreBlock.style.display = "block";
    document.getElementById("doneText").textContent = message;
    document.getElementById("scoreText").textContent = "Your Score is: " + score;
}
//Submitting Highscores:
var user = {
    userInitial: "RS",
    userScore: 50,
};

function submitHighscores() {
    var txtInitial = document.getElementById("intialText").value.trim() ;
    if(txtInitial == "" || !(/^[A-Z]*$/.test(txtInitial))) {
        alert("Please enter valid initials(ex. AB)!");
        return;
    }
    //getting and checking for highscore
    var userStored = JSON.parse(localStorage.getItem("highScore"));
    var highScore = 0;
    if(userStored != null) {
        highScore = userStored.userScore;
        var highscoreUser = userStored.userInitial;
    }
    user.userInitial = txtInitial.toUpperCase();
    user.userScore = score;
    if(highScore !== null){
        if (score >= highScore) {
            localStorage.setItem("highScore", JSON.stringify(user));      
        }else {
            localStorage.setItem("highScore", JSON.stringify(userStored));
        }
    }
    scoreBlock.style.display = 'none';
    window.location.href = "highscore.html";
}

//function getting called from highscore.html: 

function viewScore() {
    highScores = JSON.parse(localStorage.getItem("highScore"));
    if(highScores != null) {
        userInitial = highScores.userInitial;
        userScore = highScores.userScore;
        userList = userInitial + " ---->  " + userScore;
        var newList = $("<li>");
        newList.text(userList);
        $("#highscoreList").append(newList);
    } else {
        clearScore();
    }
}

function back() {
    window.location.href = "index.html";
}

function clearScore() {
    localStorage.clear();
    $("#highS").empty();
}