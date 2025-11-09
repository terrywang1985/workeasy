const BaseLevel = require('./BaseLevel.js');

class Level02 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 2;
    this.name = '准备简历';
    this.story = '找到心仪的职位了！先准备一份像样的简历...';
    
    this.hasPhoto = false;
    this.hasInfo = false;
    
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
        id: 'photo',
        name: '证件照',
        type: 'item',
        x: 200,
        y: 400,
        clickable: true
      },
      {
        id: 'notebook',
        name: '笔记本',
        type: 'object',
        x: 350,
        y: 380,
        width: 80,
        height: 60,
        clickable: true
      },
      {
        id: 'computer',
        name: '电脑',
        type: 'object',
        x: 500,
        y: 300,
        width: 120,
        height: 100,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.hasPhoto = false;
    this.hasInfo = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'photo') {
        element.x = width * 0.35;
        element.y = baseY;
      } else if (element.id === 'notebook') {
        element.x = width * 0.5;
        element.y = baseY + 20;
        element.width = width * 0.15;
        element.height = height * 0.1;
      } else if (element.id === 'computer') {
        element.x = width * 0.7;
        element.y = height * 0.4;
        element.width = width * 0.2;
        element.height = height * 0.18;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'photo':
        if (!this.hasPhoto) {
          this.hasPhoto = true;
          element.visible = false;
          wx.showToast({
            title: '拿到证件照了！',
            icon: 'success',
            duration: 1000
          });
        }
        break;
        
      case 'notebook':
        if (!this.hasInfo) {
          this.hasInfo = true;
          wx.showToast({
            title: '整理好个人信息了！',
            icon: 'success',
            duration: 1000
          });
        }
        break;
        
      case 'computer':
        if (this.hasPhoto && this.hasInfo) {
          this.gameState = 'success';
          wx.showToast({
            title: '简历制作完成！',
            icon: 'success'
          });
        } else if (!this.hasPhoto) {
          wx.showToast({
            title: '还需要证件照',
            icon: 'none',
            duration: 1500
          });
        } else {
          wx.showToast({
            title: '还需要整理个人信息',
            icon: 'none',
            duration: 1500
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '简历做好了！看起来很专业，可以投递了~';
  }

  getFailMessage() {
    return '简历还没准备好...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = (this.hasPhoto && this.hasInfo) ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'photo') {
        this.drawElement(ctx, element, images, 'usb_drive', 60, offsetY);
      } else if (element.id === 'notebook') {
        this.drawElement(ctx, element, images, 'drawer', Math.max(element.width, element.height), offsetY);
      } else if (element.id === 'computer') {
        this.drawElement(ctx, element, images, 'computer_bluescreen', Math.max(element.width, element.height), offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.hasPhoto = false;
    this.hasInfo = false;
    
    const photo = this.elements.find(e => e.id === 'photo');
    if (photo) photo.visible = true;
  }
}

module.exports = Level02;
