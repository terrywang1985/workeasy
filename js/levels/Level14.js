const BaseLevel = require('./BaseLevel.js');

class Level14 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 14;
    this.name = '提问环节';
    this.story = '面试官：你有什么想问我的吗？';
    
    this.asked = false;
    
    this.elements = [
      {
        id: 'player',
        name: '我',
        type: 'character',
        x: 100,
        y: 400,
        clickable: false,
        expression: 'normal'
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
        id: 'question1',
        name: '没有了',
        type: 'object',
        x: 200,
        y: 300,
        width: 100,
        height: 50,
        clickable: true
      },
      {
        id: 'question2',
        name: '团队氛围如何',
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
    this.asked = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.25;
        element.y = baseY;
      } else if (element.id === 'interviewer') {
        element.x = width * 0.7;
        element.y = baseY;
      } else if (element.id === 'question1') {
        element.x = width * 0.3;
        element.y = height * 0.35;
        element.width = width * 0.18;
        element.height = height * 0.08;
      } else if (element.id === 'question2') {
        element.x = width * 0.6;
        element.y = height * 0.35;
        element.width = width * 0.23;
        element.height = height * 0.08;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'question1':
        this.gameState = 'failed';
        wx.showToast({
          title: '没有问题？不够积极...',
          icon: 'none',
          duration: 1500
        });
        break;
        
      case 'question2':
        this.asked = true;
        this.gameState = 'success';
        wx.showToast({
          title: '很好的问题！',
          icon: 'success'
        });
        break;
    }
  }

  getSuccessMessage() {
    return '面试官：我们团队氛围很好，期待你的加入！';
  }

  getFailMessage() {
    return '面试官：好的...今天就到这里吧...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.asked ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'interviewer') {
        this.drawElement(ctx, element, images, 'boss', 120, offsetY);
      } else if (element.id.startsWith('question')) {
        const x = element.x - element.width / 2;
        const y = element.y - element.height / 2 + offsetY;
        
        ctx.fillStyle = '#9C27B0';
        ctx.fillRect(x, y, element.width, element.height);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, element.width, element.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = '15px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(element.name, element.x, element.y + offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.asked = false;
  }
}

module.exports = Level14;
