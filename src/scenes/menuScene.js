import Phaser from "phaser";

class MenuScene extends Phaser.Scene{
  constructor(config){
    super('MenuScene')
    this.config = config;
  }
  // preload(){
   
  // }

  create(){
    this.createBG();
  }

  // update(){

  // }

  createBG(){
    this.add.image(0, 0, 'sky').setOrigin(0);
    
  }
}

export default MenuScene;