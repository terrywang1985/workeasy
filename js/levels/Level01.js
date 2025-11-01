/**
 * 第1关 - 打卡上班
 * 
 * 剧情：第一天上班，但你忘记带工卡了...
 * 
 * 解谜逻辑：
 * 1. 点击同事，发现他有备用工卡
 * 2. 点击咖啡，送给同事
 * 3. 同事开心了，借你工卡
 * 4. 点击打卡机成功打卡
 */

const BaseLevel = require('./BaseLevel.js');

class Level01 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 1;
    this.name = '打卡上班';
    this.story = '第一天上班，糟了！忘带工卡了...';
    
    this.hasCoffee = false;
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
        id: 'colleague',
        name: '同事',
        type: 'character',
        x: 250,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'machine',
        name: '打卡机',
        type: 'object',
        x: 400,
        y: 300,
        width: 80,
        height: 120,
        clickable: true
      },
      {
        id: 'coffee',
        name: '咖啡',
        type: 'item',
        x: 500,
        y: 400,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.hasCoffee = false;
    this.hasCard = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'colleague') {
        element.x = width * 0.45;
        element.y = baseY;
      } else if (element.id === 'machine') {
        element.x = width * 0.65;
        element.y = height * 0.35;
        element.width = width * 0.15;
        element.height = height * 0.2;
      } else if (element.id === 'coffee') {
        element.x = width * 0.8;
        element.y = baseY;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level01] 点击了: ${element.name}`);

    switch (element.id) {
      case 'coffee':
        if (!this.hasCoffee) {
          this.hasCoffee = true;
          element.visible = false;
          wx.showToast({
            title: '拿起了咖啡☕',
            icon: 'success',
            duration: 1000
          });
        }
        break;
        
      case 'colleague':
        if (this.hasCoffee && !this.hasCard) {
          this.hasCard = true;
          const colleague = this.elements.find(e => e.id === 'colleague');
          if (colleague) colleague.expression = 'happy';
          wx.showToast({
            title: '同事：谢啦！工卡借你~',
            icon: 'success',
            duration: 1500
          });
        } else if (!this.hasCoffee) {
          wx.showToast({
            title: '同事：我也要打卡呢...',
            icon: 'none',
            duration: 1500
          });
        }
        break;
        
      case 'machine':
        if (this.hasCard) {
          this.gameState = 'success';
          wx.showToast({
            title: '成功打卡！',
            icon: 'success'
          });
        } else {
          this.gameState = 'failed';
          wx.showToast({
            title: '没工卡不让进！',
            icon: 'none'
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '成功打卡上班！同事：下次记得带工卡哦~';
  }

  getFailMessage() {
    return '保安：没工卡不能进！';
  }

  customRender(ctx, images) {
    // 绘制所有元素
    this.elements.forEach(element => {
      if (element.id === 'player') {
        this.drawElement(ctx, element, images, 'player_sad', 120);
      } else if (element.id === 'colleague') {
        const imageKey = element.expression === 'happy' ? 'colleague_happy' : 'colleague_happy';
        this.drawElement(ctx, element, images, imageKey, 120);
      } else if (element.id === 'machine') {
        this.drawElement(ctx, element, images, 'clock_machine', Math.max(element.width, element.height));
      } else if (element.id === 'coffee') {
        this.drawElement(ctx, element, images, 'coffee', 80);
      }
    });
  }

  reset() {
    super.reset();
    this.hasCoffee = false;
    this.hasCard = false;
    
    const player = this.elements.find(e => e.id === 'player');
    if (player) player.expression = 'sad';
    
    const colleague = this.elements.find(e => e.id === 'colleague');
    if (colleague) colleague.expression = 'normal';
    
    const coffee = this.elements.find(e => e.id === 'coffee');
    if (coffee) coffee.visible = true;
  }
}

module.exports = Level01;
