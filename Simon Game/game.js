var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNum];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColor);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");

  setTimeout (function(){
    $("#" + currentColor).removeClass("pressed")
  }, 100);

}

function checkAnswer(currentLevel) {


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    

    if (userClickedPattern.length === gamePattern.length){

      setTimeout (function(){
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}
