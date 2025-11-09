const BaseLevel = require('./BaseLevel.js');

class Level07 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 7;
    this.name = '路上堵车';
    this.story = '糟了！路上堵车了，要迟到了！怎么办？';
    
    this.calledHR = false;
    
    this.elements = [
      {
        id: 'player',
        name: '我',
        type: 'character',
        x: 100,
        y: 400,
        clickable: false,
        expression: 'sad'
      },
      {
        id: 'taxi',
        name: '出租车',
        type: 'object',
        x: 300,
        y: 350,
        width: 120,
        height: 80,
        clickable: true
      },
      {
        id: 'phone',
        name: '手机',
        type: 'item',
        x: 480,
        y: 400,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.calledHR = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'taxi') {
        element.x = width * 0.5;
        element.y = height * 0.47;
        element.width = width * 0.25;
        element.height = height * 0.15;
      } else if (element.id === 'phone') {
        element.x = width * 0.75;
        element.y = baseY;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'taxi':
        wx.showToast({
          title: '堵车了，车动不了...',
          icon: 'none',
          duration: 1500
        });
        break;
        
      case 'phone':
        if (!this.calledHR) {
          this.calledHR = true;
          this.gameState = 'success';
          wx.showToast({
            title: '打电话给HR说明情况',
            icon: 'success',
            duration: 2000
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return 'HR表示理解，让你不要着急，注意安全！';
  }

  getFailMessage() {
    return '没有提前通知，给HR留下不好印象...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.calledHR ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'taxi') {
        this.drawElement(ctx, element, images, 'package_box', Math.max(element.width, element.height), offsetY);
      } else if (element.id === 'phone') {
        this.drawElement(ctx, element, images, 'phone', 60, offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.calledHR = false;
  }
}

module.exports = Level07;
