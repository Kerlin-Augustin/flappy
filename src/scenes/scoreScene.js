import BaseScene from "./baseScene";

class ScoreScene extends BaseScene {

  constructor(config) {
    super('ScoreScene', {...config, canGoBack: true})
  }

  create() {
    super.create();
    const bestscoreText = localStorage.getItem('bestScore')
    const bestScore = this.add.text(...this.screenCenter, `Best Score: ${bestscoreText || 0}`, this.fontOptions)
      .setInteractive({ useHandCursor: true })
      .setOrigin(0.5)
  }
}

export default ScoreScene;