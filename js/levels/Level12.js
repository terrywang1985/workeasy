const BaseLevel = require('./BaseLevel.js');

class Level12 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 12;
    this.name = '回答问题';
    this.story = '面试官：为什么想加入我们公司？';
    
    this.answered = false;
    
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
        id: 'interviewer',
        name: '面试官',
        type: 'character',
        x: 500,
        y: 400,
        clickable: false,
        expression: 'normal'
      },
      {
        id: 'answer1',
        name: '工资高',
        type: 'object',
        x: 200,
        y: 300,
        width: 100,
        height: 50,
        clickable: true
      },
      {
        id: 'answer2',
        name: '认同公司文化',
        type: 'object',
        x: 400,
        y: 300,
        width: 120,
        height: 50,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.answered = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.25;
        element.y = baseY;
      } else if (element.id === 'interviewer') {
        element.x = width * 0.7;
        element.y = baseY;
      } else if (element.id === 'answer1') {
        element.x = width * 0.3;
        element.y = height * 0.35;
        element.width = width * 0.18;
        element.height = height * 0.08;
      } else if (element.id === 'answer2') {
        element.x = width * 0.6;
        element.y = height * 0.35;
        element.width = width * 0.25;
        element.height = height * 0.08;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'answer1':
        this.gameState = 'failed';
        wx.showToast({
          title: '面试官：嗯...好的...',
          icon: 'none',
          duration: 1500
        });
        break;
        
      case 'answer2':
        this.answered = true;
        this.gameState = 'success';
        wx.showToast({
          title: '很好的回答！',
          icon: 'success'
        });
        break;
    }
  }

  getSuccessMessage() {
    return '面试官：你对公司做了功课，很用心！';
  }

  getFailMessage() {
    return '面试官：这个回答...嗯...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.answered ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'interviewer') {
        this.drawElement(ctx, element, images, 'boss', 120, offsetY);
      } else if (element.id.startsWith('answer')) {
        const x = element.x - element.width / 2;
        const y = element.y - element.height / 2 + offsetY;
        
        ctx.fillStyle = '#4CAF50';
        ctx.fillRect(x, y, element.width, element.height);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, element.width, element.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(element.name, element.x, element.y + offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.answered = false;
  }
}

module.exports = Level12;
