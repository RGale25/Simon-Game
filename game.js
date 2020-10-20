var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var inplay = false;

function nextSequence() {
  var rand = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[rand];

  level ++;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];

  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  playSound(randomChosenColour);
}

function playSound(name) {
  switch (name) {
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "wrong":
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      break;
    default:
      console.log("error playing sound with input " + name);
      break;
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000)
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  inplay = false;
  level = 0
  gamePattern = [];
}

//This section of code controls the users pressing of each of the buttons

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

//This section of code controls the start of the game

$(document).on("keydown", function () {
  $("#level-title").text("Level " + level);
  if (inplay === false) {
    inplay = true
    nextSequence();
  }
});
