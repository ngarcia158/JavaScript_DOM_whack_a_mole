//step 1 select objects on screen & define globals//
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");
let lastHole;
let timeUp = false;
let score = 0;
let countdown;
let timeLimit = 20000;
function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];
  if (hole === lastHole) {
    return pickRandomHole(holes);
  }
  lastHole = hole;
  return hole;
}
//step 2 add class 'up'//
function popOut() {
  const time = Math.random() * 1300 + 400;
  const hole = pickRandomHole(holes);
  hole.classList.add("up");
  setTimeout(function () {
    hole.classList.remove("up");
    if (!timeUp) popOut(); //if timeUp does not pop up, run popOut function
  }, time);
}
//step 3 dynamically change text content to countdown//
function startGame() {
  countdown = timeLimit / 20;
  scoreBoard.textContent = 0;
  scoreBoard.style.display = "block";
  countdownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  popOut();
  //will set a time litmit of when the end of the game will happen
  setTimeout(function () {
    timeUp = true;
  }, timeLimit);
  let startCountdown = setInterval(function(){
      countdown -= 1;
      countdownBoard.textContent = countdown;
      if (countdown < 0) {
          countdown = 0;
          clearInterval(startCountdown);
          countdownBoard.textContent = "Times Upp!! Thank you for protecting our planet! This is The Way!";

      }
  },1000 )
}

//step 4 adding event listeners//
startButton.addEventListener('click', startGame);
//listenes out for even and runs function
function whack(e){
    score++;
    this.style.backgroundImage = 'url("yoda2.png")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("yoda1.png")';
        this.style.pointerEvents = 'all';
    }, 800)
    scoreBoard.textContent = score;
}

//step 5 keep track of score with forEach// 
moles.forEach(mole => mole.addEventListener('click', whack));