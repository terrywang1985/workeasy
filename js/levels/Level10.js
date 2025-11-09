const BaseLevel = require('./BaseLevel.js');

class Level10 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 10;
    this.name = '展示作品集';
    this.story = '面试官：能展示一下你的作品吗？';
    
    this.openedPortfolio = false;
    
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
        id: 'interviewer',
        name: '面试官',
        type: 'character',
        x: 500,
        y: 400,
        clickable: false,
        expression: 'normal'
      },
      {
        id: 'bag',
        name: '背包',
        type: 'object',
        x: 250,
        y: 380,
        width: 80,
        height: 80,
        clickable: true
      },
      {
        id: 'portfolio',
        name: '作品集',
        type: 'item',
        x: 350,
        y: 380,
        clickable: true,
        visible: false
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.openedPortfolio = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'interviewer') {
        element.x = width * 0.75;
        element.y = baseY;
      } else if (element.id === 'bag') {
        element.x = width * 0.4;
        element.y = baseY + 20;
        element.width = width * 0.15;
        element.height = width * 0.15;
      } else if (element.id === 'portfolio') {
        element.x = width * 0.55;
        element.y = baseY + 20;
        element.visible = false;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'bag':
        if (!this.openedPortfolio) {
          this.openedPortfolio = true;
          const portfolio = this.elements.find(e => e.id === 'portfolio');
          if (portfolio) portfolio.visible = true;
          wx.showToast({
            title: '从包里拿出作品集',
            icon: 'success',
            duration: 1000
          });
        } else {
          wx.showToast({
            title: '已经拿出来了',
            icon: 'none'
          });
        }
        break;
        
      case 'portfolio':
        if (this.openedPortfolio) {
          this.gameState = 'success';
          wx.showToast({
            title: '展示作品集给面试官',
            icon: 'success'
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '面试官：作品很不错！看得出你很用心！';
  }

  getFailMessage() {
    return '忘记展示作品集了...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        this.drawElement(ctx, element, images, 'colleague_happy', 120, offsetY);
      } else if (element.id === 'interviewer') {
        this.drawElement(ctx, element, images, 'boss', 120, offsetY);
      } else if (element.id === 'bag') {
        this.drawElement(ctx, element, images, 'package_box', Math.max(element.width, element.height), offsetY);
      } else if (element.id === 'portfolio' && element.visible) {
        this.drawElement(ctx, element, images, 'drawer', 100, offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.openedPortfolio = false;
    
    const portfolio = this.elements.find(e => e.id === 'portfolio');
    if (portfolio) portfolio.visible = false;
  }
}

module.exports = Level10;
