const BaseLevel = require('./BaseLevel.js');

class Level06 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 6;
    this.name = '选择正装';
    this.story = '面试日到了！穿什么衣服好呢？要穿得正式一点...';
    
    this.hasShirt = false;
    this.hasPants = false;
    
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
        id: 'tshirt',
        name: 'T恤',
        type: 'item',
        x: 250,
        y: 400,
        clickable: true
      },
      {
        id: 'shirt',
        name: '衬衫',
        type: 'item',
        x: 350,
        y: 400,
        clickable: true
      },
      {
        id: 'jeans',
        name: '牛仔裤',
        type: 'item',
        x: 450,
        y: 400,
        clickable: true
      },
      {
        id: 'pants',
        name: '西裤',
        type: 'item',
        x: 550,
        y: 400,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.hasShirt = false;
    this.hasPants = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.15;
        element.y = baseY;
      } else if (element.id === 'tshirt') {
        element.x = width * 0.3;
        element.y = baseY;
      } else if (element.id === 'shirt') {
        element.x = width * 0.45;
        element.y = baseY;
      } else if (element.id === 'jeans') {
        element.x = width * 0.6;
        element.y = baseY;
      } else if (element.id === 'pants') {
        element.x = width * 0.75;
        element.y = baseY;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'tshirt':
        wx.showToast({
          title: 'T恤太随便了...',
          icon: 'none',
          duration: 1500
        });
        break;
        
      case 'shirt':
        if (!this.hasShirt) {
          this.hasShirt = true;
          element.visible = false;
          wx.showToast({
            title: '穿上衬衫！',
            icon: 'success',
            duration: 1000
          });
          
          if (this.hasShirt && this.hasPants) {
            setTimeout(() => {
              this.gameState = 'success';
            }, 1200);
          }
        }
        break;
        
      case 'jeans':
        wx.showToast({
          title: '牛仔裤不够正式...',
          icon: 'none',
          duration: 1500
        });
        break;
        
      case 'pants':
        if (!this.hasPants) {
          this.hasPants = true;
          element.visible = false;
          wx.showToast({
            title: '穿上西裤！',
            icon: 'success',
            duration: 1000
          });
          
          if (this.hasShirt && this.hasPants) {
            setTimeout(() => {
              this.gameState = 'success';
            }, 1200);
          }
        }
        break;
    }
  }

  getSuccessMessage() {
    return '穿戴整齐！看起来很专业，出发吧！';
  }

  getFailMessage() {
    return '穿着不够正式...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = (this.hasShirt && this.hasPants) ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.visible !== false) {
        this.drawElement(ctx, element, images, 'package_box', 60, offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.hasShirt = false;
    this.hasPants = false;
    
    this.elements.forEach(element => {
      if (['shirt', 'pants'].includes(element.id)) {
        element.visible = true;
      }
    });
  }
}

module.exports = Level06;
