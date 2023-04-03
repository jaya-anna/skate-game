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

// variables

const footer = document.querySelector(".footer");

let scoreSpan = document.getElementById("score");

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

const cometImg = new Image();
cometImg.src = "/skate-game/images/comet.png";

const house2Img = new Image();
house2Img.src = "/skate-game/images/house2.png";

const audio = new Audio("/skate-game/images/background_music.mp3");
audio.volume = 0.5;

const gameOverAudio = new Audio(
  "/skate-game/images/audio_fail-trombone-03.mp3"
);
gameOverAudio.volume = 0.9;

const gameWinAudio = new Audio("/skate-game/images/game-win.wav");
gameWinAudio.volume = 0.9;

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

const house2Width = 80;
const house2Height = 80;
let house2X = myCanvas.width - 130;
let house2Y = 400;

const cometWidth = 50;
const cometHeight = 100;
let cometX = 500;
let cometY = 5;

let isMovingRight = false;
let isMovingLeft = false;
let isMovingUp = false;
let isMovingDown = false;

let gameOver = false;
let animateId;

let score = 0;
let intervallId;

let obstacles = [];
let obstacle2 = [];
let obstacle3 = [];

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

  house2Obstacle() {
    ctx.drawImage(house2Img, this.xPos, this.yPos, this.width, this.height);
  }

  cometObstacle() {
    ctx.drawImage(cometImg, this.xPos, this.yPos, this.width, this.height);
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

  checkCollision2() {
    if (
      cometX < this.xPos + this.width &&
      cometX + cometWidth > this.xPos &&
      cometY < this.yPos + this.height &&
      cometHeight + cometY > this.yPos
    ) {
      gameOver = true;
    }
  }
}

function animate() {
  ctx.drawImage(bgImg1, bg1X, 0, myCanvas.width, myCanvas.height);
  ctx.drawImage(bgImg2, bg2X, 0, myCanvas.width, myCanvas.height);

  ctx.drawImage(dinoImg, dinoX, dinoY, dinoWidth, dinoHeight);

  ctx.font = "30px monospace";
  ctx.fillStyle = "black";
  ctx.fillText(`SCORE: ${score}`, 1200, 60);
  ctx.fill()

  if (animateId % 100 === 0) {
    obstacles.push(
      new Obstacle(
        myCanvas.width,
        myCanvas.height * Math.random(),
        houseWidth,
        houseHeight
      )
    );
  }

  if (animateId % 300 === 0) {
    obstacle2.push(
      new Obstacle(
        myCanvas.width * Math.random(),
        -myCanvas.height,
        cometWidth,
        cometHeight
      )
    );
  }

  if (animateId % 200 === 0) {
    obstacle3.push(
      new Obstacle(
        myCanvas.width,
        myCanvas.height * Math.random(),
        house2Width,
        house2Height
      )
    );
  }

  obstacles.forEach((obstacle) => {
    obstacle.checkCollision();
    obstacle.houseObstacle();
    obstacle.xPos -= 5;
  });

  obstacle2.forEach((obstacle) => {
    obstacle.checkCollision();
    obstacle.cometObstacle();
    obstacle.yPos += 6;
  });

  obstacle3.forEach((obstacle) => {
    obstacle.checkCollision();
    obstacle.house2Obstacle();
    obstacle.xPos -= 2;
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
    if (score === 50) {
      playAgain();
      audio.pause();
      gameWinAudio.play();
    } else {
      stopGame();
      clearInterval(intervallId);
      audio.pause();
      gameOverAudio.play();
    }
  } else {
    animateId = requestAnimationFrame(animate);
  }
}

const startGame = () => {
  document.getElementById("background-color").style.display = "none";
  document.getElementById("game-board").style.display = "block";
  document.getElementById("game-won").style.display = "none";
  document.getElementById("game-over").style.display = "none";
  footer.style.display = "none";

  audio.play();
  audio.loop = true;
  animate();

  intervallId = setInterval(() => {
    score++;
    if (score === 50) {
      gameOver = true;
      clearInterval(intervallId);
    }
  }, 400);
};

const stopGame = () => {
  document.getElementById("game-board").style.display = "none";
  document.getElementById("game-won").style.display = "none";
  document.getElementById("game-over").style.display = "block";
  footer.style.display = "none";
  scoreSpan.innerText = score;
};

const playAgain = () => {
  document.getElementById("game-board").style.display = "none";
  document.getElementById("game-over").style.display = "none";
  document.getElementById("game-won").style.display = "block";
  footer.style.display = "none";
};

window.addEventListener("load", () => {
  document.getElementById("game-board").style.display = "none";
  document.getElementById("game-won").style.display = "none";
  document.getElementById("game-over").style.display = "none";
  document.getElementById("start-button1").onclick = () => {
    startGame();
  };

  document.querySelector("#start-button2").onclick = () => {
    gameOver = false;
    dinoX = 50;
    dinoY = myCanvas.height / 2 - dinoHeight / 2;

    houseX = myCanvas.width - 130;
    houseY = 400;

    house2X = myCanvas.width - 130;
    house2Y = 400;

    cometX = 500;
    cometY = 5;
    score = 0;
    obstacles = [];
    obstacle2 = [];
    obstacle3 = [];

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

    house2X = myCanvas.width - 130;
    house2Y = 400;

    cometX = 500;
    cometY = 5;
    score = 0;
    obstacles = [];
    obstacle2 = [];
    obstacle3 = [];

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
