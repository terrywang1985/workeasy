const BaseLevel = require('./BaseLevel.js');

class Level04 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 4;
    this.name = '接面试电话';
    this.story = '有公司打电话来了！快接电话，可能是面试通知！';
    
    this.pickedPhone = false;
    this.tookNote = false;
    
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
        id: 'phone',
        name: '手机',
        type: 'item',
        x: 300,
        y: 400,
        clickable: true
      },
      {
        id: 'pen',
        name: '笔',
        type: 'item',
        x: 420,
        y: 400,
        clickable: true
      },
      {
        id: 'notebook',
        name: '记事本',
        type: 'object',
        x: 500,
        y: 380,
        width: 70,
        height: 50,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.pickedPhone = false;
    this.tookNote = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'phone') {
        element.x = width * 0.4;
        element.y = baseY;
      } else if (element.id === 'pen') {
        element.x = width * 0.6;
        element.y = baseY;
      } else if (element.id === 'notebook') {
        element.x = width * 0.75;
        element.y = baseY + 20;
        element.width = width * 0.13;
        element.height = height * 0.08;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'phone':
        if (!this.pickedPhone) {
          this.pickedPhone = true;
          wx.showToast({
            title: '喂？您好！是的，我方便！',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: 'HR：请记下面试时间地址',
            icon: 'none',
            duration: 1500
          });
        }
        break;
        
      case 'pen':
        if (this.pickedPhone) {
          wx.showToast({
            title: '拿起了笔！',
            icon: 'success',
            duration: 1000
          });
        } else {
          wx.showToast({
            title: '先接电话吧',
            icon: 'none'
          });
        }
        break;
        
      case 'notebook':
        if (this.pickedPhone && !this.tookNote) {
          this.tookNote = true;
          this.gameState = 'success';
          wx.showToast({
            title: '记下面试信息了！',
            icon: 'success'
          });
        } else if (!this.pickedPhone) {
          wx.showToast({
            title: '先接电话吧',
            icon: 'none'
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '太好了！明天下午2点面试，记得准时到！';
  }

  getFailMessage() {
    return '错过了面试通知...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.pickedPhone ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'phone') {
        this.drawElement(ctx, element, images, 'phone', 60, offsetY);
      } else if (element.id === 'pen') {
        this.drawElement(ctx, element, images, 'usb_drive', 50, offsetY);
      } else if (element.id === 'notebook') {
        this.drawElement(ctx, element, images, 'drawer', Math.max(element.width, element.height), offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.pickedPhone = false;
    this.tookNote = false;
  }
}

module.exports = Level04;
