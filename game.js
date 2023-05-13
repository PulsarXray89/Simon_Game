const buttonColor = ["red", "blue", "green", "yellow"];
var randomNumber;
var randomChosenColor;
var audio;
var hasStarted = false;
var level = 0;

var userClickedPattern = [];
var gamePattern = [];

$(".btn").click(function (e) {
    userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playAudio(userChosenColor);
    animateButtonPress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColor[randomNumber];
    animateButtonPress(randomChosenColor);
    gamePattern.push(randomChosenColor);
    level++;
    $("h1").text("You're on level " + level);
}

function fadeButton() {
    $("#" + randomChosenColor).fadeToggle(100);
    $("#" + randomChosenColor).fadeToggle(100);
}

function playAudio(audio) {
    audio = new Audio("sounds/" + audio + ".mp3")
    audio.play();
}

function animateButtonPress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function startOver(){
    level = 0;
    gamePattern = [];
    hasStarted = false;
    $("h1").text("Press A Key to Start");
}

function checkAnswer(userAnswerIndex) {
    if (gamePattern[userAnswerIndex] === userClickedPattern[userAnswerIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100)
        startOver();
    }
}

$(document).keypress(function (e) {
    if (!hasStarted) {
        nextSequence();
        hasStarted = !hasStarted;
    }
});
