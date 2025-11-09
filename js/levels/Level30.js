/**
 * 第30关 - 下班打卡
 * 
 * 剧情：终于熬到下班了，但还有很多人在加班...
 * 
 * 解谜逻辑：
 * 1. 直接点打卡机，被老板看到
 * 2. 先点电脑，假装还在工作
 * 3. 等老板离开
 * 4. 偷偷点打卡机下班
 */

const BaseLevel = require('./BaseLevel.js');

class Level30 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 30;
    this.name = '下班打卡';
    this.story = '终于6点了！但老板还在...敢走吗？';
    
    this.pretendedWork = false;
    this.bossLeft = false;
    
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
        id: 'computer',
        name: '电脑',
        type: 'object',
        x: 200,
        y: 350,
        width: 100,
        height: 80,
        clickable: true
      },
      {
        id: 'boss',
        name: '老板',
        type: 'character',
        x: 450,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'machine',
        name: '打卡机',
        type: 'object',
        x: 350,
        y: 300,
        width: 70,
        height: 100,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.pretendedWork = false;
    this.bossLeft = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'computer') {
        element.x = width * 0.35;
        element.y = height * 0.45;
        element.width = width * 0.18;
        element.height = height * 0.15;
      } else if (element.id === 'boss') {
        element.x = width * 0.7;
        element.y = baseY;
      } else if (element.id === 'machine') {
        element.x = width * 0.52;
        element.y = height * 0.38;
        element.width = width * 0.13;
        element.height = height * 0.18;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level10] 点击了: ${element.name}`);

    switch (element.id) {
      case 'computer':
        if (!this.pretendedWork) {
          this.pretendedWork = true;
          wx.showToast({
            title: '假装敲代码中...',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '等老板走...',
            icon: 'none'
          });
        }
        break;
        
      case 'boss':
        if (this.pretendedWork && !this.bossLeft) {
          this.bossLeft = true;
          const boss = this.elements.find(e => e.id === 'boss');
          if (boss) boss.visible = false;
          wx.showToast({
            title: '老板终于走了！',
            icon: 'success',
            duration: 1500
          });
        } else if (!this.pretendedWork) {
          wx.showToast({
            title: '老板盯着你...',
            icon: 'none'
          });
        }
        break;
        
      case 'machine':
        if (this.bossLeft) {
          this.gameState = 'success';
          wx.showToast({
            title: '成功下班！',
            icon: 'success'
          });
        } else if (this.pretendedWork) {
          wx.showToast({
            title: '老板还在，再等等...',
            icon: 'none',
            duration: 1500
          });
        } else {
          this.gameState = 'failed';
          wx.showToast({
            title: '被老板看到了！',
            icon: 'none'
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '成功下班！明天继续搬砖~晚安！';
  }

  getFailMessage() {
    return '老板：这么早就想走？今晚加班！';
  }

  reset() {
    super.reset();
    this.pretendedWork = false;
    this.bossLeft = false;
    
    const boss = this.elements.find(e => e.id === 'boss');
    if (boss) boss.visible = true;
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        this.drawElement(ctx, element, images, 'player_sad', 120, offsetY);
      } else if (element.id === 'computer') {
        this.drawElement(ctx, element, images, 'computer_bluescreen', Math.max(element.width, element.height), offsetY);
      } else if (element.id === 'boss') {
        this.drawElement(ctx, element, images, 'boss', 120, offsetY);
      } else if (element.id === 'machine') {
        this.drawElement(ctx, element, images, 'clock_machine', Math.max(element.width, element.height), offsetY);
      }
    });
  }
}

module.exports = Level30;
