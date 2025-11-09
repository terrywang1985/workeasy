/**
 * 第23关 - 午饭时间
 * 
 * 剧情：中午了，要去食堂吃饭，但发现饭卡不见了！
 * 
 * 解谜逻辑：
 * 1. 点击抽屉，找到饭卡
 * 2. 点击食堂窗口，成功打饭
 */

const BaseLevel = require('./BaseLevel.js');

class Level23 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 23;
    this.name = '午饭时间';
    this.story = '肚子好饿...糟了，饭卡在哪儿？';
    
    this.hasCard = false;
    
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
        id: 'drawer',
        name: '抽屉',
        type: 'object',
        x: 200,
        y: 380,
        width: 80,
        height: 60,
        clickable: true
      },
      {
        id: 'window',
        name: '食堂窗口',
        type: 'object',
        x: 400,
        y: 300,
        width: 120,
        height: 150,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.hasCard = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'drawer') {
        element.x = width * 0.35;
        element.y = baseY + 20;
        element.width = width * 0.15;
        element.height = height * 0.1;
      } else if (element.id === 'window') {
        element.x = width * 0.6;
        element.y = height * 0.35;
        element.width = width * 0.25;
        element.height = height * 0.25;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level03] 点击了: ${element.name}`);

    switch (element.id) {
      case 'drawer':
        if (!this.hasCard) {
          this.hasCard = true;
          const player = this.elements.find(e => e.id === 'player');
          if (player) player.expression = 'happy';
          wx.showToast({
            title: '找到饭卡了！💳',
            icon: 'success',
            duration: 1000
          });
        } else {
          wx.showToast({
            title: '已经拿了',
            icon: 'none'
          });
        }
        break;
        
      case 'window':
        if (this.hasCard) {
          this.gameState = 'success';
          wx.showToast({
            title: '成功打饭！',
            icon: 'success'
          });
        } else {
          this.gameState = 'failed';
          wx.showToast({
            title: '没饭卡不能吃饭！',
            icon: 'none'
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '成功吃上午饭！阿姨：多吃点，下午好干活~';
  }

  getFailMessage() {
    return '阿姨：没饭卡不能打饭哦！';
  }

  reset() {
    super.reset();
    this.hasCard = false;
    
    const player = this.elements.find(e => e.id === 'player');
    if (player) player.expression = 'sad';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = element.expression === 'happy' ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'drawer') {
        this.drawElement(ctx, element, images, 'drawer', Math.max(element.width, element.height), offsetY);
      } else if (element.id === 'window') {
        this.drawElement(ctx, element, images, 'canteen_window', Math.max(element.width, element.height), offsetY);
      }
    });
  }
}

module.exports = Level23;
