const BaseLevel = require('./BaseLevel.js');

class Level19 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 19;
    this.name = '配置电脑';
    this.story = '该配置工作电脑了！需要装一些软件...';
    
    this.installedCount = 0;
    
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
        clickable: false
      },
      {
        id: 'software1',
        name: '开发工具',
        type: 'item',
        x: 450,
        y: 380,
        clickable: true
      },
      {
        id: 'software2',
        name: '通讯软件',
        type: 'item',
        x: 520,
        y: 380,
        clickable: true
      },
      {
        id: 'software3',
        name: '办公软件',
        type: 'item',
        x: 485,
        y: 440,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.installedCount = 0;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'computer') {
        element.x = width * 0.45;
        element.y = height * 0.4;
        element.width = width * 0.25;
        element.height = height * 0.2;
      } else if (element.id === 'software1') {
        element.x = width * 0.7;
        element.y = baseY - 20;
      } else if (element.id === 'software2') {
        element.x = width * 0.8;
        element.y = baseY - 20;
      } else if (element.id === 'software3') {
        element.x = width * 0.75;
        element.y = baseY + 40;
      }
    });
  }

  onElementClick(element) {
    if (element.id.startsWith('software') && element.visible !== false) {
      this.installedCount++;
      element.visible = false;
      
      wx.showToast({
        title: `安装${element.name}中...`,
        icon: 'success',
        duration: 1000
      });
      
      if (this.installedCount >= 3) {
        setTimeout(() => {
          this.gameState = 'success';
          wx.showToast({
            title: '所有软件安装完成！',
            icon: 'success'
          });
        }, 1200);
      }
    }
  }

  getSuccessMessage() {
    return '电脑配置完成！可以开始工作了~';
  }

  getFailMessage() {
    return '软件还没装完...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.installedCount >= 3 ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'computer') {
        this.drawElement(ctx, element, images, 'computer_bluescreen', Math.max(element.width, element.height), offsetY);
      } else if (element.id.startsWith('software') && element.visible !== false) {
        this.drawElement(ctx, element, images, 'package_box', 60, offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.installedCount = 0;
    
    this.elements.forEach(element => {
      if (element.id.startsWith('software')) {
        element.visible = true;
      }
    });
  }
}

module.exports = Level19;
