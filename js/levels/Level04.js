/**
 * 第4关 - 电脑蓝屏
 * 
 * 剧情：下午要写报告，但电脑突然蓝屏了！
 * 
 * 解谜逻辑：
 * 1. 点击IT同事求助
 * 2. IT说：试试重启？
 * 3. 点击电源键重启
 * 4. 电脑恢复正常
 */

const BaseLevel = require('./BaseLevel.js');

class Level04 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 4;
    this.name = '电脑蓝屏';
    this.story = '啊！电脑蓝屏了，报告还没写完！';
    
    this.askedIT = false;
    
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
        id: 'it',
        name: 'IT同事',
        type: 'character',
        x: 450,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'computer',
        name: '电脑',
        type: 'object',
        x: 250,
        y: 300,
        width: 100,
        height: 80,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.askedIT = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'it') {
        element.x = width * 0.7;
        element.y = baseY;
      } else if (element.id === 'computer') {
        element.x = width * 0.4;
        element.y = height * 0.4;
        element.width = width * 0.2;
        element.height = height * 0.15;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level04] 点击了: ${element.name}`);

    switch (element.id) {
      case 'it':
        if (!this.askedIT) {
          this.askedIT = true;
          wx.showToast({
            title: 'IT：试试重启？',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: 'IT：重启能解决90%问题',
            icon: 'none',
            duration: 1500
          });
        }
        break;
        
      case 'computer':
        if (this.askedIT) {
          this.gameState = 'success';
          wx.showToast({
            title: '电脑恢复正常了！',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '不知道怎么修...',
            icon: 'none',
            duration: 1500
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '电脑修好了！IT：重启能解决90%的问题~';
  }

  getFailMessage() {
    return '还是不会修，求助IT同事吧！';
  }

  reset() {
    super.reset();
    this.askedIT = false;
  }

  customRender(ctx, images) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        this.drawElement(ctx, element, images, 'player_sad', 120);
      } else if (element.id === 'it') {
        this.drawElement(ctx, element, images, 'colleague_happy', 120);
      } else if (element.id === 'computer') {
        this.drawElement(ctx, element, images, 'computer_bluescreen', Math.max(element.width, element.height));
      }
    });
  }
}

module.exports = Level04;
