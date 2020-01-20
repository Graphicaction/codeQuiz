//Below code is for circular countdown timer:
var countdownNumberEl = document.getElementById('countdown-number');
var countdown = 5;

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
var quizBlock =document.getElementById("quizDiv");

function openQuiz() {
    optionBlock.style.display = "none";
    quizBlock.style.display = "block";
}