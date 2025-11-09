const BaseLevel = require('./BaseLevel.js');

class Level11 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 11;
    this.name = '技能测试';
    this.story = '面试官：现在做个技能测试，30分钟内完成';
    
    this.startedTest = false;
    this.finishedTest = false;
    
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
        x: 300,
        y: 300,
        width: 120,
        height: 100,
        clickable: true
      },
      {
        id: 'paper',
        name: '试题',
        type: 'object',
        x: 480,
        y: 380,
        width: 80,
        height: 60,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.startedTest = false;
    this.finishedTest = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'computer') {
        element.x = width * 0.5;
        element.y = height * 0.4;
        element.width = width * 0.25;
        element.height = height * 0.2;
      } else if (element.id === 'paper') {
        element.x = width * 0.75;
        element.y = baseY + 20;
        element.width = width * 0.15;
        element.height = height * 0.1;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'paper':
        if (!this.startedTest) {
          this.startedTest = true;
          wx.showToast({
            title: '看清楚题目要求...',
            icon: 'none',
            duration: 1500
          });
        } else {
          wx.showToast({
            title: '题目已经看过了',
            icon: 'none'
          });
        }
        break;
        
      case 'computer':
        if (this.startedTest && !this.finishedTest) {
          this.finishedTest = true;
          this.gameState = 'success';
          wx.showToast({
            title: '专心答题...',
            icon: 'success',
            duration: 1500
          });
        } else if (!this.startedTest) {
          wx.showToast({
            title: '先看看题目吧',
            icon: 'none',
            duration: 1500
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '测试完成！面试官：做得不错，基础很扎实！';
  }

  getFailMessage() {
    return '没有认真完成测试...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.finishedTest ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'computer') {
        this.drawElement(ctx, element, images, 'computer_bluescreen', Math.max(element.width, element.height), offsetY);
      } else if (element.id === 'paper') {
        this.drawElement(ctx, element, images, 'drawer', Math.max(element.width, element.height), offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.startedTest = false;
    this.finishedTest = false;
  }
}

module.exports = Level11;
