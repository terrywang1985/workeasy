const BaseLevel = require('./BaseLevel.js');

class Level15 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 15;
    this.name = '礼貌道别';
    this.story = '面试结束了！记得礼貌道别...';
    
    this.thanked = false;
    this.bowed = false;
    
    this.elements = [
      {
        id: 'player',
        name: '我',
        type: 'character',
        x: 100,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'interviewer',
        name: '面试官',
        type: 'character',
        x: 450,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'door',
        name: '门',
        type: 'object',
        x: 550,
        y: 300,
        width: 80,
        height: 150,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.thanked = false;
    this.bowed = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.25;
        element.y = baseY;
      } else if (element.id === 'interviewer') {
        element.x = width * 0.6;
        element.y = baseY;
      } else if (element.id === 'door') {
        element.x = width * 0.8;
        element.y = height * 0.4;
        element.width = width * 0.15;
        element.height = height * 0.25;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'player':
        if (!this.bowed) {
          this.bowed = true;
          wx.showToast({
            title: '鞠躬致意！',
            icon: 'success',
            duration: 1000
          });
        }
        break;
        
      case 'interviewer':
        if (!this.thanked) {
          this.thanked = true;
          wx.showToast({
            title: '谢谢您的时间！',
            icon: 'success',
            duration: 1000
          });
        }
        break;
        
      case 'door':
        if (this.thanked && this.bowed) {
          this.gameState = 'success';
          wx.showToast({
            title: '礼貌离开！',
            icon: 'success'
          });
        } else {
          const missing = [];
          if (!this.thanked) missing.push('道谢');
          if (!this.bowed) missing.push('鞠躬');
          
          wx.showToast({
            title: `还要: ${missing.join('、')}`,
            icon: 'none',
            duration: 1500
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '完美结束面试！面试官对你印象很好，回家等通知吧！';
  }

  getFailMessage() {
    return '忘记礼貌道别了...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = (this.thanked && this.bowed) ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'interviewer') {
        this.drawElement(ctx, element, images, 'boss', 120, offsetY);
      } else if (element.id === 'door') {
        this.drawElement(ctx, element, images, 'package_box', Math.max(element.width, element.height), offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.thanked = false;
    this.bowed = false;
  }
}

module.exports = Level15;
