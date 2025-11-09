const BaseLevel = require('./BaseLevel.js');

class Level16 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 16;
    this.name = '收到offer';
    this.story = '太好了！收到offer通知了！';
    
    this.readOffer = false;
    this.signedContract = false;
    
    this.elements = [
      {
        id: 'player',
        name: '我',
        type: 'character',
        x: 100,
        y: 400,
        clickable: false,
        expression: 'happy'
      },
      {
        id: 'email',
        name: '邮件',
        type: 'object',
        x: 300,
        y: 350,
        width: 100,
        height: 100,
        clickable: true
      },
      {
        id: 'contract',
        name: '合同',
        type: 'object',
        x: 480,
        y: 380,
        width: 80,
        height: 60,
        clickable: true,
        visible: false
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.readOffer = false;
    this.signedContract = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'email') {
        element.x = width * 0.5;
        element.y = height * 0.45;
        element.width = width * 0.2;
        element.height = width * 0.2;
      } else if (element.id === 'contract') {
        element.x = width * 0.75;
        element.y = baseY + 20;
        element.width = width * 0.15;
        element.height = height * 0.1;
        element.visible = false;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'email':
        if (!this.readOffer) {
          this.readOffer = true;
          const contract = this.elements.find(e => e.id === 'contract');
          if (contract) contract.visible = true;
          wx.showToast({
            title: '收到offer了！',
            icon: 'success',
            duration: 1500
          });
        } else {
          wx.showToast({
            title: '已经看过了',
            icon: 'none'
          });
        }
        break;
        
      case 'contract':
        if (this.readOffer && !this.signedContract) {
          this.signedContract = true;
          this.gameState = 'success';
          wx.showToast({
            title: '签署合同！',
            icon: 'success'
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '恭喜！你正式成为公司的一员了！下周一入职报到！';
  }

  getFailMessage() {
    return '还没签署合同...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        this.drawElement(ctx, element, images, 'colleague_happy', 120, offsetY);
      } else if (element.id === 'email') {
        this.drawElement(ctx, element, images, 'email_icon', Math.max(element.width, element.height), offsetY);
      } else if (element.id === 'contract' && element.visible) {
        this.drawElement(ctx, element, images, 'drawer', Math.max(element.width, element.height), offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.readOffer = false;
    this.signedContract = false;
    
    const contract = this.elements.find(e => e.id === 'contract');
    if (contract) contract.visible = false;
  }
}

module.exports = Level16;
