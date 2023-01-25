// background intro
function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function changeBackgroundColor() {
  var colorBg = document.getElementById("background-color");
  colorBg.style.backgroundColor = generateRandomColor();
}

function changeBackground() {
  changeBackgroundColor();
}

setInterval(changeBackground, 1000);

// game
const myCanvas = document.querySelector("canvas");
const ctx = myCanvas.getContext("2d");

const bgImg1 = new Image();
bgImg1.src = "/skate-game/images/brick-wall-painted-white.jpg";

const bgImg2 = new Image();
bgImg2.src = "/skate-game/images/brick-wall-painted-white.jpg";

const dinoImg = new Image();
dinoImg.src = "/skate-game/images/dinosaur.png";

const houseImg = new Image();
houseImg.src = "/skate-game/images/house1.png";

let bg1X = 0;
let bg2X = myCanvas.width;

const dinoWidth = 180;
const dinoHeight = 150;
let dinoX = 50;
let dinoY = myCanvas.height / 2 - dinoHeight / 2;

const houseWidth = 80;
const houseHeight = 80;
let houseX = myCanvas.width - 130;
let houseY = 400;

let isMovingRight = false;
let isMovingLeft = false;
let isMovingUp = false;
let isMovingDown = false;

let gameOver = false;
let animateId;

let score = 0;

let obstacles = [];

class Obstacle {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
  }

  houseObstacle() {
    ctx.drawImage(houseImg, this.xPos, this.yPos, this.width, this.height);
  }

  checkCollision() {
    if (
      dinoX < this.xPos + this.width &&
      dinoX + dinoWidth > this.xPos &&
      dinoY < this.yPos + this.height &&
      dinoHeight + dinoY > this.yPos
    ) {
      gameOver = true;
    }
  }
}

function animate() {
  //ctx.clearRect(0, 0,myCanvas.width, myCanvas.height)
  ctx.drawImage(bgImg1, bg1X, 0, myCanvas.width, myCanvas.height);
  ctx.drawImage(bgImg2, bg2X, 0, myCanvas.width, myCanvas.height);

  ctx.drawImage(dinoImg, dinoX, dinoY, dinoWidth, dinoHeight);

  ctx.font = "bold 30px Verdana";
  ctx.fillText(`SCORE: ${score}`, 750, 40);

  if (animateId % 80 === 0) {
    obstacles.push(
      new Obstacle(
        myCanvas.width,
        myCanvas.height * Math.random(),
        houseWidth,
        houseHeight
      )
    );
  }

  obstacles.forEach((obstacle) => {
    obstacle.checkCollision();
    obstacle.houseObstacle();
    obstacle.xPos -= 5;
  });

  bg1X -= 2;
  bg2X -= 2;

  if (bg1X < -myCanvas.width) {
    bg1X = myCanvas.width;
  }

  if (bg2X < -myCanvas.width) {
    bg2X = myCanvas.width;
  }

  if (isMovingLeft && dinoX > -60) {
    dinoX -= 5;
  }
  if (isMovingRight && dinoX < myCanvas.width - 170) {
    dinoX += 5;
  }
  if (isMovingUp && dinoY > -20) {
    dinoY -= 5;
  }
  if (isMovingDown && dinoY < myCanvas.height - 150) {
    dinoY += 5;
  }

  if (gameOver) {
    cancelAnimationFrame(animateId);
    if (score === 10) {
      playAgain();
    } else {
      stopGame();
    }
  } else {
    animateId = requestAnimationFrame(animate);
  }
}

const startGame = () => {
  document.getElementById("background-color").style.display = "none";

  animate();

  const intervallId = setInterval(() => {
    score++;
    if (score === 10) {
      gameOver = true;
      clearInterval(intervallId);
    }
  }, 500);
};

const stopGame = () => {
  document.getElementById("game-board").style.display = "none";
  document.getElementById("game-won").style.display = "none";
  document.getElementById("game-over").style.display = "block";
};

const playAgain = () => {
  document.getElementById("game-board").style.display = "none";
  document.getElementById("game-over").style.display = "none";
  document.getElementById("game-won").style.display = "block";
};

window.addEventListener("load", () => {
  document.getElementById("start-button1").onclick = () => {
    startGame();
  };

  document.querySelector("#start-button2").onclick = () => {
    gameOver = false;
    dinoX = 50;
    dinoY = myCanvas.height / 2 - dinoHeight / 2;
    houseX = myCanvas.width - 130;
    houseY = 400;
    score = 0;
    obstacles = [];

    document.getElementById("game-board").style.display = "block";
    document.getElementById("game-won").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    myCanvas.style.display = "block";
    startGame();
  };

  document.querySelector("#start-button3").onclick = () => {
    gameOver = false;
    dinoX = 50;
    dinoY = myCanvas.height / 2 - dinoHeight / 2;
    houseX = myCanvas.width - 130;
    houseY = 400;
    score = 0;
    obstacles = [];

    document.getElementById("game-board").style.display = "block";
    document.getElementById("game-won").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    myCanvas.style.display = "block";
    startGame();
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "a") {
      isMovingLeft = true;
    }
    if (event.key === "d") {
      isMovingRight = true;
    }
    if (event.key === "w") {
      isMovingUp = true;
    }
    if (event.key === "s") {
      isMovingDown = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "a") {
      isMovingLeft = false;
    }
    if (event.key === "d") {
      isMovingRight = false;
    }
    if (event.key === "w") {
      isMovingUp = false;
    }
    if (event.key === "s") {
      isMovingDown = false;
    }
  });
});
