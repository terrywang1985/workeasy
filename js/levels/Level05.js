/**
 * 第5关 - 厕所遇老板
 * 
 * 剧情：上厕所时遇到老板，赶紧假装很忙！
 * 
 * 解谜逻辑：
 * 1. 点击手机，假装在接客户电话
 * 2. 点击老板，成功糊弄过去
 */

const BaseLevel = require('./BaseLevel.js');

class Level05 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 5;
    this.name = '厕所遇老板';
    this.story = '糟了！在厕所遇到老板了...';
    
    this.hasPretended = false;
    
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
        id: 'boss',
        name: '老板',
        type: 'character',
        x: 400,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'phone',
        name: '手机',
        type: 'item',
        x: 250,
        y: 400,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.hasPretended = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.25;
        element.y = baseY;
      } else if (element.id === 'boss') {
        element.x = width * 0.65;
        element.y = baseY;
      } else if (element.id === 'phone') {
        element.x = width * 0.4;
        element.y = baseY;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level05] 点击了: ${element.name}`);

    switch (element.id) {
      case 'phone':
        if (!this.hasPretended) {
          this.hasPretended = true;
          element.visible = false;
          const player = this.elements.find(e => e.id === 'player');
          if (player) player.expression = 'normal';
          wx.showToast({
            title: '假装打电话：喂？王总？',
            icon: 'none',
            duration: 2000
          });
        }
        break;
        
      case 'boss':
        if (this.hasPretended) {
          this.gameState = 'success';
          wx.showToast({
            title: '成功糊弄过去！',
            icon: 'success'
          });
        } else {
          this.gameState = 'failed';
          wx.showToast({
            title: '老板：怎么上厕所这么久？',
            icon: 'none'
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '成功糊弄老板！老板：嗯，工作很积极嘛~';
  }

  getFailMessage() {
    return '老板：上厕所也要摸鱼？扣工资！';
  }

  reset() {
    super.reset();
    this.hasPretended = false;
    
    const player = this.elements.find(e => e.id === 'player');
    if (player) player.expression = 'sad';
    
    const phone = this.elements.find(e => e.id === 'phone');
    if (phone) phone.visible = true;
  }

  customRender(ctx, images) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = element.expression === 'normal' ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120);
      } else if (element.id === 'boss') {
        this.drawElement(ctx, element, images, 'boss', 120);
      } else if (element.id === 'phone') {
        this.drawElement(ctx, element, images, 'phone', 60);
      }
    });
  }
}

module.exports = Level05;
