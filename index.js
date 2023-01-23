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

const bgImg1 = new Image();
bgImg1.src = "/skate-game/images/backgroundSkateGame.jpg";

const bgImg2 = new Image();
bgImg2.src = "/skate-game/images/backgroundSkateGame.jpg";

const dinoImg = new Image();
dinoImg.src = '/skate-game/images/dinosaur.png';

let bg1X = 0
let bg2X = myCanvas.width

const dinoWidth = 180
const dinoHeight = 150
let dinoX = 0
let dinoY = myCanvas.height / 2 - dinoHeight / 2

let isMovingRight = false
let isMovingLeft = false
let isMovingUp = false
let isMovingDown = false

let gameOver = false
let animateId



function animate(){
//ctx.clearRect(0, 0,myCanvas.width, myCanvas.height)
ctx.drawImage(bgImg1,bg1X, 0, myCanvas.width, myCanvas.height)
ctx.drawImage(bgImg2,bg2X, 0, myCanvas.width, myCanvas.height)

ctx.drawImage(dinoImg, dinoX, dinoY, dinoWidth, dinoHeight)

bg1X -= 2
bg2X -= 2

   if(bg1X < myCanvas.width){
    bg1X = -myCanvas.width
   }

   if(bg2X < myCanvas.width){
    bg2X = myCanvas.width
   }
  
   animateId = requestAnimationFrame(animate)
   
if(isMovingLeft && dinoX > -60){
  dinoX -= 5
 }
 if(isMovingRight && dinoX < myCanvas.width -170 ){
  dinoX += 5
 }
 if(isMovingUp && dinoY > -20 ){
  dinoY -= 5
 }
   if(isMovingDown && dinoY < myCanvas.height -150 ){
  dinoY += 5
 }

 if (gameOver) {
  cancelAnimationFrame(animateId)
} else {
  animateId = requestAnimationFrame(animate)
}
}

const startGame = () => {
  document.getElementById('background-color').style.display= 'none'
  animate();
  }

  window.addEventListener('load', () => {
    document.getElementById('start-button').onclick = () => {
      startGame()
}

document.addEventListener('keydown', (event) => { 
  if(event.key === 'a'){
   isMovingLeft = true
  }
  if(event.key === 'd'){
    isMovingRight = true
  }
  if(event.key === 'w'){
    isMovingUp= true
  }
  if(event.key === 's'){
    isMovingDown= true
  }
  })

document.addEventListener('keyup', (event) => {
  
  if (event.key === 'a') {
    isMovingLeft = false
  }
  if (event.key === 'd') {
    isMovingRight = false
  }
  if (event.key === 'w') {
    isMovingUp = false
  }
  if (event.key === 's') {
    isMovingDown = false
  }
  })
})