/**
 * 第29关 - PPT救场
 * 
 * 剧情：要汇报了，但PPT打不开！
 * 
 * 解谜逻辑：
 * 1. 点击U盘，发现文件损坏
 * 2. 点击邮箱，找到备份
 * 3. 成功打开PPT
 */

const BaseLevel = require('./BaseLevel.js');

class Level29 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 29;
    this.name = 'PPT救场';
    this.story = '马上要汇报了，但PPT打不开！';
    
    this.checkedUSB = false;
    
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
        id: 'usb',
        name: 'U盘',
        type: 'item',
        x: 280,
        y: 400,
        clickable: true
      },
      {
        id: 'email',
        name: '邮箱',
        type: 'object',
        x: 420,
        y: 300,
        width: 100,
        height: 100,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.checkedUSB = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
      } else if (element.id === 'usb') {
        element.x = width * 0.45;
        element.y = baseY;
      } else if (element.id === 'email') {
        element.x = width * 0.65;
        element.y = height * 0.4;
        element.width = width * 0.2;
        element.height = height * 0.18;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level09] 点击了: ${element.name}`);

    switch (element.id) {
      case 'usb':
        if (!this.checkedUSB) {
          this.checkedUSB = true;
          element.visible = false;
          wx.showToast({
            title: '糟了！文件损坏了！',
            icon: 'none',
            duration: 2000
          });
        }
        break;
        
      case 'email':
        if (this.checkedUSB) {
          this.gameState = 'success';
          wx.showToast({
            title: '找到邮箱备份了！',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '先用U盘试试...',
            icon: 'none',
            duration: 1500
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '成功找到备份！老板：还好你有备份，不错~';
  }

  getFailMessage() {
    return 'PPT打不开，汇报泡汤了...';
  }

  reset() {
    super.reset();
    this.checkedUSB = false;
    
    const usb = this.elements.find(e => e.id === 'usb');
    if (usb) usb.visible = true;
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        this.drawElement(ctx, element, images, 'player_sad', 120, offsetY);
      } else if (element.id === 'usb') {
        this.drawElement(ctx, element, images, 'usb_drive', 60, offsetY);
      } else if (element.id === 'email') {
        this.drawElement(ctx, element, images, 'email_icon', Math.max(element.width, element.height), offsetY);
      }
    });
  }
}

module.exports = Level29;
