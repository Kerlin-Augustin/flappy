import BaseScene from "./baseScene";

class PauseScene extends BaseScene {
  constructor(config) {
    super('PauseScene', config)

    this.menu = [
      {
        scene: 'PlayScene',
        text: 'Continue',
      },
      {
        scene: 'MenuScene',
        text: 'Exit',
      },
    ]
  }

  create() {
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO
    textGO.setInteractive({useHandCursor: true});

    textGO.on('pointerover', () => {
      textGO.setStyle({fill: '#ff0', cursor: 'pointer'});
    })
    textGO.on('pointerout', () => {
      textGO.setStyle({fill: '#fff'});
    })
    textGO.on('pointerup', () => {
      console.log('clicking on some option')
    })
  }

  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0);

  }
}

export default PauseScene;