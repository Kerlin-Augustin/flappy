import BaseScene from "./baseScene";

class MenuScene extends BaseScene{
  constructor(config){
    super('MenuScene', config)

    this.menu = [
      {
        scene: 'PlayScene',
        text: 'Play',
      },
      {
        scene: 'ScoreScene',
        text: 'Score',
      },
      {
        scene: null,
        text: 'Exit',
      },
    ]
  }

  create(){
    super.create();
    this.createMenu(this.menu);
  }

  createBG(){
    this.add.image(0, 0, 'sky').setOrigin(0);
    
  }
}

export default MenuScene;