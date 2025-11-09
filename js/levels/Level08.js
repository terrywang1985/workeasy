const BaseLevel = require('./BaseLevel.js');

class Level08 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 8;
    this.name = '前台签到';
    this.story = '终于到公司了！先在前台签到...';
    
    this.hasCheckedIn = false;
    this.gotBadge = false;
    
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
        id: 'receptionist',
        name: '前台',
        type: 'character',
        x: 350,
        y: 400,
        clickable: true,
        expression: 'happy'
      },
      {
        id: 'form',
        name: '签到表',
        type: 'object',
        x: 480,
        y: 380,
        width: 80,
        height: 60,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.hasCheckedIn = false;
    this.gotBadge = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'receptionist') {
        element.x = width * 0.55;
        element.y = baseY;
      } else if (element.id === 'form') {
        element.x = width * 0.75;
        element.y = baseY + 20;
        element.width = width * 0.15;
        element.height = height * 0.1;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'receptionist':
        if (!this.hasCheckedIn) {
          wx.showToast({
            title: '前台：您好，请先签到',
            icon: 'none',
            duration: 1500
          });
        } else if (!this.gotBadge) {
          this.gotBadge = true;
          this.gameState = 'success';
          wx.showToast({
            title: '前台：这是访客牌，请佩戴',
            icon: 'success',
            duration: 1500
          });
        }
        break;
        
      case 'form':
        if (!this.hasCheckedIn) {
          this.hasCheckedIn = true;
          element.visible = false;
          wx.showToast({
            title: '签到完成！',
            icon: 'success',
            duration: 1000
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '签到完成！前台带你去面试会议室~';
  }

  getFailMessage() {
    return '还没完成签到流程...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.gotBadge ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'receptionist') {
        this.drawElement(ctx, element, images, 'colleague_happy', 120, offsetY);
      } else if (element.id === 'form' && element.visible !== false) {
        this.drawElement(ctx, element, images, 'drawer', Math.max(element.width, element.height), offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.hasCheckedIn = false;
    this.gotBadge = false;
    
    const form = this.elements.find(e => e.id === 'form');
    if (form) form.visible = true;
  }
}

module.exports = Level08;
