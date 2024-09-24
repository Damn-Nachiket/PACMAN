const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");

let craeteRect = (x, y, width, height, color) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};

let fps = 30;
let oneBlcokSize = 20;
let wallcolor = "#342DCA";
let wallSpaceWidth = oneBlcokSize / 1.5;
let wallOffSet = (oneBlcokSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";
let foodColor = "#FEB897";
let score = 0;
let ghosts = [];
let ghostCount = 4;
let lives = 3;
let foodCount = 0;

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

let ghostLocations = [
  { x: 0, y: 0 },
  { x: 176, y: 0 },
  { x: 0, y: 121 },
  { x: 176, y: 121 },
];

let map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

for(let i =0 ; i<map.length ; i++){
  for(let j = 0 ; j<map[0].length ; j++){
    if(map [i][j] == 2){
      foodCount++;
    }
  }
}

let randomTargetsForGhosts = [
  { x: 1 * oneBlcokSize, y: 1 * oneBlcokSize },
  { x: 1 * oneBlcokSize, y: (map.length - 2) * oneBlcokSize },
  { x: (map[0].length - 2) * oneBlcokSize, y: oneBlcokSize },
  {
    x: (map[0].length - 2) * oneBlcokSize,
    y: (map.length - 2) * oneBlcokSize,
  },
];

let gameLoop = () => {
  draw();
  update();
};

let update = () => {
  pacman.moveProcess();
  pacman.eat();
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].moveProcess();
  }

  if (pacman.checkGhostCollison()) {
    console.log("Hit");
    restartGame();
  }
  if(score >= foodCount){
    drawWin();
    clearInterval(gameInterval);
  }
};

let restartGame = () => {
  createNewPacman();
  createGhosts();
  lives--;
  if (lives == 0) {
    gameOver();
  }
};

let gameOver = () => {
  drawGameOver();
  clearInterval(gameInterval);
};

let drawGameOver = () => {
  canvasContext.fillText("Game Over!" , 0 , 200);
  canvasContext.font = "20px Emulogic";
  canvasContext.fillStyle = "white";
};

let drawWin = () => {
  canvasContext.fillText("Hooray Winner!" , 0 , 200);
  canvasContext.font = "20px Emulogic";
  canvasContext.fillStyle = "white";
};

let drawLives = () => {
  canvasContext.font = "20px Emulogic";
  canvasContext.fillStyle = "white";
  canvasContext.fillText("Lives : ", 230, oneBlcokSize * (map.length + 1) + 10
  );
  for (let i = 0; i < lives; i++) {
    canvasContext.drawImage(
      pacmanFrames, 
      2 * oneBlcokSize,
      0,
      oneBlcokSize,
      oneBlcokSize,
      370 + i * oneBlcokSize,
      oneBlcokSize * map.length + 10,
      oneBlcokSize,
      oneBlcokSize
    );
  }
};

let drawFoods = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 2) {
        craeteRect(
          j * oneBlcokSize + oneBlcokSize / 3,
          i * oneBlcokSize + oneBlcokSize / 3,
          oneBlcokSize / 3,
          oneBlcokSize / 3,
          foodColor
        );
      }
    }
  }
};

let drawScore = () => {
  canvasContext.font = "20px Emulogic";
  canvasContext.fillStyle = "white";
  canvasContext.fillText(
    "Score : " + score,
    0,
    oneBlcokSize * (map.length + 1) + 10
  );
};

let drawGhosts = () => {
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].draw();
  }
};

let draw = () => {
  craeteRect(0, 0, canvas.width, canvas.height, "black");
  drawWalls();
  drawFoods();
  pacman.draw();
  drawScore();
  drawGhosts();
  drawLives();
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

let drawWalls = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 1) {
        // then it is wall
        craeteRect(
          j * oneBlcokSize,
          i * oneBlcokSize,
          oneBlcokSize,
          oneBlcokSize,
          wallcolor
        );
        if (j > 0 && map[i][j - 1] == 1) {
          craeteRect(
            j * oneBlcokSize,
            i * oneBlcokSize + wallOffSet,
            wallSpaceWidth + wallOffSet,
            wallSpaceWidth,
            wallInnerColor
          );
        }
        if (j < map[0].length - 1 && map[i][j + 1] == 1) {
          craeteRect(
            j * oneBlcokSize + wallOffSet,
            i * oneBlcokSize + wallOffSet,
            wallSpaceWidth + wallOffSet,
            wallSpaceWidth,
            wallInnerColor
          );
        }
        if (i > 0 && map[i - 1][j] == 1) {
          craeteRect(
            j * oneBlcokSize + wallOffSet,
            i * oneBlcokSize,
            wallSpaceWidth,
            wallSpaceWidth + wallOffSet,
            wallInnerColor
          );
        }
        if (i < map.length - 1 && map[i + 1][j] == 1) {
          craeteRect(
            j * oneBlcokSize + wallOffSet,
            i * oneBlcokSize + wallOffSet,
            wallSpaceWidth,
            wallSpaceWidth + wallOffSet,
            wallInnerColor
          );
        }
      }
    }
  }
};

let createNewPacman = () => {
  pacman = new Pacman(
    oneBlcokSize,
    oneBlcokSize,
    oneBlcokSize,
    oneBlcokSize,
    oneBlcokSize / 5
  );
};

let createGhosts = () => {
  ghosts = [];
  for (let i = 0; i < ghostCount; i++) {
    let newGhost = new Ghost(
      9 * oneBlcokSize + (i % 2 == 0 ? 0 : 1) * oneBlcokSize,
      10 * oneBlcokSize + (i % 2 == 0 ? 0 : 1) * oneBlcokSize,
      oneBlcokSize,
      oneBlcokSize,
      pacman.speed / 2,
      ghostLocations[i % 4].x,
      ghostLocations[i % 4].y,
      124,
      116,
      6 + i
    );
    ghosts.push(newGhost);
  }
};

createNewPacman();
createGhosts();
gameLoop();

window.addEventListener("keydown", (event) => {
  let k = event.keyCode;

  setTimeout(() => {
    if (k == 37 || k == 65) {
      //left
      pacman.nextDirection = DIRECTION_LEFT;
    } else if (k == 38 || k == 87) {
      //up
      pacman.nextDirection = DIRECTION_UP;
    } else if (k == 39 || k == 68) {
      //right
      pacman.nextDirection = DIRECTION_RIGHT;
    } else if (k == 40 || k == 83) {
      //down
      pacman.nextDirection = DIRECTION_BOTTOM;
    }
  }, 1);
});
