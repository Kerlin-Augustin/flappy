import Phaser from "phaser";
import PlayScene from "./scenes/playScene";
import MenuScene from "./scenes/menuScene";
import PreloadScene from "./scenes/preloadScene";

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
  //WebGL (web graphics library) JS Api for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
     // arcade physics plugin, manages physics simulation
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: [PreloadScene, new MenuScene(SHARED_CONFIG), new PlayScene(SHARED_CONFIG)]
};

new Phaser.Game(config);