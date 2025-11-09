const BaseLevel = require('./BaseLevel.js');

class Level17 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 17;
    this.name = '入职第一天';
    this.story = '第一天上班！先去人事部报到...';
    
    this.foundHR = false;
    this.gotBadge = false;
    
    this.elements = [
      {
        id: 'player',
        name: '我',
        type: 'character',
        x: 100,
        y: 400,
        clickable: false,
        expression: 'normal'
      },
      {
        id: 'colleague',
        name: '同事',
        type: 'character',
        x: 280,
        y: 400,
        clickable: true,
        expression: 'happy'
      },
      {
        id: 'hr',
        name: 'HR',
        type: 'character',
        x: 480,
        y: 400,
        clickable: true,
        expression: 'happy'
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.foundHR = false;
    this.gotBadge = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'colleague') {
        element.x = width * 0.45;
        element.y = baseY;
      } else if (element.id === 'hr') {
        element.x = width * 0.7;
        element.y = baseY;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'colleague':
        if (!this.foundHR) {
          this.foundHR = true;
          wx.showToast({
            title: '同事：HR在那边！',
            icon: 'none',
            duration: 1500
          });
        } else {
          wx.showToast({
            title: '同事：加油，欢迎加入！',
            icon: 'none',
            duration: 1500
          });
        }
        break;
        
      case 'hr':
        if (!this.gotBadge) {
          this.gotBadge = true;
          this.gameState = 'success';
          wx.showToast({
            title: 'HR：欢迎！这是你的工卡',
            icon: 'success',
            duration: 2000
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '入职手续办完了！HR带你去工位~';
  }

  getFailMessage() {
    return '还没完成入职手续...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.gotBadge ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'colleague' || element.id === 'hr') {
        this.drawElement(ctx, element, images, 'colleague_happy', 120, offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.foundHR = false;
    this.gotBadge = false;
  }
}

module.exports = Level17;
