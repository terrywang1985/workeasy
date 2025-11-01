/**
 * 第8关 - 会议室抢座
 * 
 * 剧情：要开会了，但会议室座位不够！
 * 
 * 解谜逻辑：
 * 1. 点击普通椅子，被别人抢了
 * 2. 点击角落的折叠椅
 * 3. 成功找到座位
 */

const BaseLevel = require('./BaseLevel.js');

class Level08 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 8;
    this.name = '会议室抢座';
    this.story = '会议马上开始了，但座位不够...';
    
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
        id: 'chair1',
        name: '好椅子',
        type: 'object',
        x: 280,
        y: 350,
        width: 60,
        height: 80,
        clickable: true
      },
      {
        id: 'foldChair',
        name: '折叠椅',
        type: 'object',
        x: 480,
        y: 380,
        width: 50,
        height: 70,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'chair1') {
        element.x = width * 0.45;
        element.y = height * 0.45;
        element.width = width * 0.12;
        element.height = height * 0.15;
      } else if (element.id === 'foldChair') {
        element.x = width * 0.7;
        element.y = height * 0.5;
        element.width = width * 0.1;
        element.height = height * 0.13;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level08] 点击了: ${element.name}`);

    switch (element.id) {
      case 'chair1':
        wx.showToast({
          title: '被同事抢先坐了！',
          icon: 'none',
          duration: 1500
        });
        break;
        
      case 'foldChair':
        this.gameState = 'success';
        wx.showToast({
          title: '找到座位了！',
          icon: 'success'
        });
        break;
    }
  }

  getSuccessMessage() {
    return '成功找到座位！虽然是折叠椅，但能坐就行~';
  }

  getFailMessage() {
    return '没座位了，只能站着开会...';
  }

  reset() {
    super.reset();
  }

  customRender(ctx, images) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        this.drawElement(ctx, element, images, 'player_sad', 120);
      } else if (element.id === 'chair1') {
        this.drawElement(ctx, element, images, 'office_chair', Math.max(element.width, element.height));
      } else if (element.id === 'foldChair') {
        this.drawElement(ctx, element, images, 'folding_chair', Math.max(element.width, element.height));
      }
    });
  }
}

module.exports = Level08;
