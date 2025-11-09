const BaseLevel = require('./BaseLevel.js');

class Level18 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 18;
    this.name = '熟悉同事';
    this.story = '来到工位了！先认识一下新同事吧...';
    
    this.metCount = 0;
    
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
        id: 'colleague1',
        name: '小王',
        type: 'character',
        x: 250,
        y: 400,
        clickable: true,
        expression: 'happy'
      },
      {
        id: 'colleague2',
        name: '小李',
        type: 'character',
        x: 380,
        y: 400,
        clickable: true,
        expression: 'happy'
      },
      {
        id: 'colleague3',
        name: '小张',
        type: 'character',
        x: 510,
        y: 400,
        clickable: true,
        expression: 'happy'
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.metCount = 0;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.15;
        element.y = baseY;
      } else if (element.id === 'colleague1') {
        element.x = width * 0.35;
        element.y = baseY;
      } else if (element.id === 'colleague2') {
        element.x = width * 0.55;
        element.y = baseY;
      } else if (element.id === 'colleague3') {
        element.x = width * 0.75;
        element.y = baseY;
      }
    });
  }

  onElementClick(element) {
    if (element.id.startsWith('colleague') && element.visible !== false) {
      this.metCount++;
      element.visible = false;
      
      wx.showToast({
        title: `${element.name}：你好！欢迎！`,
        icon: 'success',
        duration: 1000
      });
      
      if (this.metCount >= 3) {
        setTimeout(() => {
          this.gameState = 'success';
          wx.showToast({
            title: '认识了所有同事！',
            icon: 'success'
          });
        }, 1200);
      }
    }
  }

  getSuccessMessage() {
    return '同事们都很友好！融入团队啦~';
  }

  getFailMessage() {
    return '还需要多认识几个同事...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.metCount >= 3 ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id.startsWith('colleague') && element.visible !== false) {
        this.drawElement(ctx, element, images, 'colleague_happy', 120, offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.metCount = 0;
    
    this.elements.forEach(element => {
      if (element.id.startsWith('colleague')) {
        element.visible = true;
      }
    });
  }
}

module.exports = Level18;
