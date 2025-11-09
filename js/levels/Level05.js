const BaseLevel = require('./BaseLevel.js');

class Level05 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 5;
    this.name = '准备面试材料';
    this.story = '明天就要面试了！检查一下需要带什么材料...';
    
    this.hasResume = false;
    this.hasId = false;
    this.hasPortfolio = false;
    
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
        id: 'resume',
        name: '简历',
        type: 'item',
        x: 230,
        y: 400,
        clickable: true
      },
      {
        id: 'idcard',
        name: '身份证',
        type: 'item',
        x: 340,
        y: 400,
        clickable: true
      },
      {
        id: 'portfolio',
        name: '作品集',
        type: 'item',
        x: 450,
        y: 400,
        clickable: true
      },
      {
        id: 'bag',
        name: '背包',
        type: 'object',
        x: 550,
        y: 360,
        width: 80,
        height: 100,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.hasResume = false;
    this.hasId = false;
    this.hasPortfolio = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.15;
        element.y = baseY;
      } else if (element.id === 'resume') {
        element.x = width * 0.3;
        element.y = baseY;
      } else if (element.id === 'idcard') {
        element.x = width * 0.45;
        element.y = baseY;
      } else if (element.id === 'portfolio') {
        element.x = width * 0.6;
        element.y = baseY;
      } else if (element.id === 'bag') {
        element.x = width * 0.8;
        element.y = height * 0.48;
        element.width = width * 0.15;
        element.height = height * 0.16;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'resume':
        if (!this.hasResume) {
          this.hasResume = true;
          element.visible = false;
          wx.showToast({
            title: '拿好简历了！',
            icon: 'success',
            duration: 1000
          });
        }
        break;
        
      case 'idcard':
        if (!this.hasId) {
          this.hasId = true;
          element.visible = false;
          wx.showToast({
            title: '带上身份证！',
            icon: 'success',
            duration: 1000
          });
        }
        break;
        
      case 'portfolio':
        if (!this.hasPortfolio) {
          this.hasPortfolio = true;
          element.visible = false;
          wx.showToast({
            title: '准备好作品集！',
            icon: 'success',
            duration: 1000
          });
        }
        break;
        
      case 'bag':
        const itemCount = (this.hasResume ? 1 : 0) + (this.hasId ? 1 : 0) + (this.hasPortfolio ? 1 : 0);
        
        if (itemCount === 3) {
          this.gameState = 'success';
          wx.showToast({
            title: '材料都装好了！',
            icon: 'success'
          });
        } else {
          const missing = [];
          if (!this.hasResume) missing.push('简历');
          if (!this.hasId) missing.push('身份证');
          if (!this.hasPortfolio) missing.push('作品集');
          
          wx.showToast({
            title: `还缺: ${missing.join('、')}`,
            icon: 'none',
            duration: 2000
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '材料都准备好了！明天加油，相信自己！';
  }

  getFailMessage() {
    return '材料还没准备齐全...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const allReady = this.hasResume && this.hasId && this.hasPortfolio;
        const imageKey = allReady ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'resume' && element.visible !== false) {
        this.drawElement(ctx, element, images, 'usb_drive', 60, offsetY);
      } else if (element.id === 'idcard' && element.visible !== false) {
        this.drawElement(ctx, element, images, 'coffee', 60, offsetY);
      } else if (element.id === 'portfolio' && element.visible !== false) {
        this.drawElement(ctx, element, images, 'drawer', 80, offsetY);
      } else if (element.id === 'bag') {
        this.drawElement(ctx, element, images, 'package_box', Math.max(element.width, element.height), offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.hasResume = false;
    this.hasId = false;
    this.hasPortfolio = false;
    
    this.elements.forEach(element => {
      if (['resume', 'idcard', 'portfolio'].includes(element.id)) {
        element.visible = true;
      }
    });
  }
}

module.exports = Level05;
