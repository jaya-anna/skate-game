// background intro
function generateRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  function changeBackgroundColor() {
    var colorBg =   document.getElementById("background-color")
    colorBg.style.backgroundColor = generateRandomColor();
  }

  function changeBackground() {
    changeBackgroundColor();
  }
  
  setInterval(changeBackground, 1000);

  // game board
const myCanvas = document.querySelector("canvas");
const ctx = myCanvas.getContext("2d");
myCanvas.style.border = "2px solid black";

const dinoImg = new Image()
dinoImg.src = '/skate-game/images/dinosaur.png'

//game variables
let gameOver = false

window.onload = () => {
    document.getElementById("start-button").onclick = () => {
    startGame();
    document.getElementById('background-color').style.display= 'none'
    };
}

function animate(){
ctx.drawImage
if (!gameOver) {
    animateId = requestAnimationFrame(animate)
} else {
    cancelAnimationFrame(animateId)
}
}

function startGame() {
animate();
}
