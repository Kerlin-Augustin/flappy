import Phaser from "phaser";
import PlayScene from "./scenes/playScene";

const WIDTH = 800
const HEIGHT = 600
const BIRD_POSITION = {
  x: WIDTH / 10,
  y: HEIGHT / 2
}

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 400 },
      debug: true,
    },
  },
  scene: [new PlayScene(SHARED_CONFIG)]
};

new Phaser.Game(config);

const VELOCITY = 200
const PIPES_TO_RENDER = 4
const flapVelocity = 200
const initialBirdPosition = {
  x: config.width / 10,
  y: config.height / 2
}

let bird = null
let pipes = null

let pipeHorizontalDistance = 0

let pipeVerticalDistanceRange = [100, 150]
let pipeHorizontalDistanceRange = [300, 350]
let pipesVelocity = -200

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png')
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);

  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0);

    placePipe(upperPipe, lowerPipe)
  }

  pipes.setVelocityX(pipesVelocity)

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);

}

function update(time, delta) {
  if (bird.y >= config.height - bird.height || bird.y + bird.height <= 0) {
    restartBirdPosition()
  }
  recyclePipes()
}

function placePipe(uPipe, lPipe) {
  pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange)
  const rightMostX = getRightMostPipe()
  const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  const pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);

  uPipe.x = rightMostX + pipeHorizontalDistance
  uPipe.y = pipeVerticalPosition

  lPipe.x = uPipe.x
  lPipe.y = uPipe.y + pipeVerticalDistance

}

function recyclePipes(){
  const tempPipes = []
  pipes.getChildren().forEach(pipe => {
    if(pipe.getBounds().right <= 0){
      tempPipes.push(pipe)
      if(tempPipes.length === 2){
        placePipe(...tempPipes)
      }
    }
  })
}

function getRightMostPipe(){
  let rightMostX = 0
  pipes.getChildren().forEach(pipe => {
    rightMostX = Math.max(pipe.x, rightMostX)
  });
  return rightMostX
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x
  bird.y = initialBirdPosition.y
  bird.body.velocity.y = 0
}

function flap() {
  bird.body.velocity.y = -flapVelocity
}