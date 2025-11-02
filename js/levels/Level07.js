/**
 * 第7关 - 快递小哥
 * 
 * 剧情：快递到了，但在上班时间不能取快递！
 * 
 * 解谜逻辑：
 * 1. 点击老板，发现他在开会
 * 2. 趁老板不注意，点击快递
 * 3. 成功偷偷拿快递
 */

const BaseLevel = require('./BaseLevel.js');

class Level07 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 7;
    this.name = '快递小哥';
    this.story = '快递到了！但老板在旁边...';
    
    this.bossDistracted = false;
    
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
        x: 450,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'package',
        name: '快递',
        type: 'object',
        x: 280,
        y: 420,
        width: 60,
        height: 60,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.bossDistracted = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'boss') {
        element.x = width * 0.7;
        element.y = baseY;
      } else if (element.id === 'package') {
        element.x = width * 0.45;
        element.y = baseY + 20;
        element.width = width * 0.12;
        element.height = width * 0.12;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level07] 点击了: ${element.name}`);

    switch (element.id) {
      case 'boss':
        if (!this.bossDistracted) {
          this.bossDistracted = true;
          const boss = this.elements.find(e => e.id === 'boss');
          if (boss) boss.expression = 'happy';
          wx.showToast({
            title: '老板接了个电话，走开了',
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '老板还在打电话...',
            icon: 'none'
          });
        }
        break;
        
      case 'package':
        if (this.bossDistracted) {
          this.gameState = 'success';
          wx.showToast({
            title: '成功拿到快递！',
            icon: 'success'
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
    return '成功拿到快递！老板没发现，真棒~';
  }

  getFailMessage() {
    return '老板：上班时间取什么快递！扣奖金！';
  }

  reset() {
    super.reset();
    this.bossDistracted = false;
    
    const boss = this.elements.find(e => e.id === 'boss');
    if (boss) boss.expression = 'normal';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = element.expression === 'happy' ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'boss') {
        this.drawElement(ctx, element, images, 'boss', 120, offsetY);
      } else if (element.id === 'package') {
        this.drawElement(ctx, element, images, 'package_box', Math.max(element.width, element.height), offsetY);
      }
    });
  }
}

module.exports = Level07;
