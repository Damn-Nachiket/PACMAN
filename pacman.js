class Pacman {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION_RIGHT;
    this.nextDirection = this.direction;
    this.currentFrame = 1;
    this.frameCount = 7;

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  moveProcess() {
    this.changeDirectionIfPossible();
    this.moveForward();
    if (this.checkCollison()) {
      this.moveBackword();
    }
  }

  eat() {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] == 2 && this.getMapX() == j && this.getMapY() == i) {
          map[i][j] = 3;
          score++;
        }
      }
    }
  }

  moveBackword() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x -= this.speed;
        break;
      case DIRECTION_UP:
        this.y += this.speed;
        break;
      case DIRECTION_LEFT:
        this.x += this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y -= this.speed;
        break;
    }
  }

  moveForward() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x += this.speed;
        break;
      case DIRECTION_UP:
        this.y -= this.speed;
        break;
      case DIRECTION_LEFT:
        this.x -= this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y += this.speed;
        break;
    }
  }

  checkCollison() {
    // let isCollided = false;
    if (
      map[this.getMapY()][this.getMapX()] == 1 ||
      map[this.getMapYRightSide()][this.getMapX()] == 1 ||
      map[this.getMapY()][this.getMapXRightSide()] == 1 ||
      map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
    ) {
      return true;
    }
    return false;
  }

  checkGhostCollison() {
    for(let i=0 ; i < ghosts.length ; i++){
      let ghost = ghosts[i];
      if(
        ghost.getMapX() == this.getMapX() &&
        ghost.getMapY() == this.getMapY()
      ){
        return true;
      }
    }
    return false;
  }

  changeDirectionIfPossible() {
    if (this.direction == this.nextDirection) return;

    let tempDirection = this.direction;
    this.direction = this.nextDirection;
    this.moveForward();
    if (this.checkCollison()) {
      this.moveBackword();
      this.direction = tempDirection;
    } else {
      this.moveBackword();
    }
  }

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw() {
    canvasContext.save();
    canvasContext.translate(
      this.x + oneBlcokSize / 2,
      this.y + oneBlcokSize / 2
    );
    canvasContext.rotate((this.direction * 90 * Math.PI) / 180);

    canvasContext.translate(
      -this.x - oneBlcokSize / 2,
      -this.y - oneBlcokSize / 2
    );

    canvasContext.drawImage(
      pacmanFrames,
      (this.currentFrame - 1) * oneBlcokSize,
      0,
      oneBlcokSize,
      oneBlcokSize,
      this.x,
      this.y,
      this.width,
      this.height
    );
    canvasContext.restore();
  }

  getMapX() {
    return parseInt(this.x / oneBlcokSize);
  }
  getMapY() {
    return parseInt(this.y / oneBlcokSize);
  }
  getMapXRightSide() {
    return parseInt((this.x + 0.9999 * oneBlcokSize) / oneBlcokSize);
  }
  getMapYRightSide() {
    return parseInt((this.y + 0.9999 * oneBlcokSize) / oneBlcokSize);
  }
}
