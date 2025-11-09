const BaseLevel = require('./BaseLevel.js');

class Level03 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 3;
    this.name = '投递简历';
    this.story = '简历准备好了！开始海投吧，多投几家增加机会！';
    
    this.sentCount = 0;
    
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
        id: 'company1',
        name: 'A公司',
        type: 'object',
        x: 250,
        y: 350,
        width: 80,
        height: 100,
        clickable: true
      },
      {
        id: 'company2',
        name: 'B公司',
        type: 'object',
        x: 380,
        y: 350,
        width: 80,
        height: 100,
        clickable: true
      },
      {
        id: 'company3',
        name: 'C公司',
        type: 'object',
        x: 510,
        y: 350,
        width: 80,
        height: 100,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.sentCount = 0;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'company1') {
        element.x = width * 0.35;
        element.y = height * 0.45;
        element.width = width * 0.15;
        element.height = height * 0.18;
      } else if (element.id === 'company2') {
        element.x = width * 0.55;
        element.y = height * 0.45;
        element.width = width * 0.15;
        element.height = height * 0.18;
      } else if (element.id === 'company3') {
        element.x = width * 0.75;
        element.y = height * 0.45;
        element.width = width * 0.15;
        element.height = height * 0.18;
      }
    });
  }

  onElementClick(element) {
    if (element.id.startsWith('company') && element.visible !== false) {
      this.sentCount++;
      element.visible = false;
      
      const player = this.elements.find(e => e.id === 'player');
      if (player) player.expression = 'happy';
      
      wx.showToast({
        title: `投递成功！已投${this.sentCount}家`,
        icon: 'success',
        duration: 1000
      });
      
      if (this.sentCount >= 3) {
        setTimeout(() => {
          this.gameState = 'success';
          wx.showToast({
            title: '太棒了！投了3家公司！',
            icon: 'success'
          });
        }, 1200);
      }
    }
  }

  getSuccessMessage() {
    return '简历投递完成！接下来就等通知吧~';
  }

  getFailMessage() {
    return '还需要多投几家公司...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = element.expression === 'happy' ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id.startsWith('company') && element.visible !== false) {
        this.drawElement(ctx, element, images, 'package_box', Math.max(element.width, element.height), offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.sentCount = 0;
    
    const player = this.elements.find(e => e.id === 'player');
    if (player) player.expression = 'normal';
    
    this.elements.forEach(element => {
      if (element.id.startsWith('company')) {
        element.visible = true;
      }
    });
  }
}

module.exports = Level03;
