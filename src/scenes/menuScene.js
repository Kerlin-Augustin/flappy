import BaseScene from "./baseScene";

class MenuScene extends BaseScene{
  constructor(config){
    super('MenuScene', config)
    this.config = config;
  }
  // preload(){
   
  // }

  create(){
    super.create();
    this.scene.start('PlayScene')
  }

  // update(){

  // }

  createBG(){
    this.add.image(0, 0, 'sky').setOrigin(0);
    
  }
}

export default MenuScene;