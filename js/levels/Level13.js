const BaseLevel = require('./BaseLevel.js');

class Level13 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 13;
    this.name = '薪资谈判';
    this.story = '面试官：你的期望薪资是多少？';
    
    this.negotiated = false;
    
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
        id: 'salary1',
        name: '越高越好',
        type: 'object',
        x: 180,
        y: 300,
        width: 100,
        height: 50,
        clickable: true
      },
      {
        id: 'salary2',
        name: '参考市场行情',
        type: 'object',
        x: 350,
        y: 300,
        width: 120,
        height: 50,
        clickable: true
      },
      {
        id: 'salary3',
        name: '什么都行',
        type: 'object',
        x: 520,
        y: 300,
        width: 100,
        height: 50,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.negotiated = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.25;
        element.y = baseY;
      } else if (element.id === 'interviewer') {
        element.x = width * 0.7;
        element.y = baseY;
      } else if (element.id === 'salary1') {
        element.x = width * 0.25;
        element.y = height * 0.35;
        element.width = width * 0.18;
        element.height = height * 0.08;
      } else if (element.id === 'salary2') {
        element.x = width * 0.5;
        element.y = height * 0.35;
        element.width = width * 0.23;
        element.height = height * 0.08;
      } else if (element.id === 'salary3') {
        element.x = width * 0.75;
        element.y = height * 0.35;
        element.width = width * 0.18;
        element.height = height * 0.08;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'salary1':
        this.gameState = 'failed';
        wx.showToast({
          title: '太贪心了...',
          icon: 'none',
          duration: 1500
        });
        break;
        
      case 'salary2':
        this.negotiated = true;
        this.gameState = 'success';
        wx.showToast({
          title: '合理的期望！',
          icon: 'success'
        });
        break;
        
      case 'salary3':
        this.gameState = 'failed';
        wx.showToast({
          title: '太没有原则了...',
          icon: 'none',
          duration: 1500
        });
        break;
    }
  }

  getSuccessMessage() {
    return '面试官：你对市场有了解，这个薪资是合理的！';
  }

  getFailMessage() {
    return '面试官：关于薪资，我们再考虑考虑...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.negotiated ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'interviewer') {
        this.drawElement(ctx, element, images, 'boss', 120, offsetY);
      } else if (element.id.startsWith('salary')) {
        const x = element.x - element.width / 2;
        const y = element.y - element.height / 2 + offsetY;
        
        ctx.fillStyle = '#FF9800';
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
    this.negotiated = false;
  }
}

module.exports = Level13;
