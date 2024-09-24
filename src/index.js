
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 400 },
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  }
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
let upperPipe = null
let lowerPipe = null
let pipeHorizontalDistance = 0
let pipeVerticalDistanceRange = [100,150]
let pipeHorizontalDistanceRange = [380,420]

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png')
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);
  
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400

  for(let i = 0; i < PIPES_TO_RENDER; i++){
    pipeHorizontalDistance += Phaser.Math.Between(...pipeHorizontalDistanceRange)
    let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    let pipeVerticalPosition = Phaser.Math.Between(20, config.height - 20 - pipeVerticalDistance);
    upperPipe = this.physics.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0, 1);
    lowerPipe = this.physics.add.sprite(upperPipe.x, upperPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0);

  }

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);

}

function update(time, delta) {
  if (bird.y >= config.height - bird.height || bird.y + bird.height <= 0) {
    restartBirdPosition()
  }
}

function restartBirdPosition() {
  bird.x = initialBirdPosition.x
  bird.y = initialBirdPosition.y
  bird.body.velocity.y = 0
}

function flap() {
  bird.body.velocity.y = -flapVelocity
}