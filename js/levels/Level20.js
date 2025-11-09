const BaseLevel = require('./BaseLevel.js');

class Level20 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 20;
    this.name = '第一个任务';
    this.story = '老板安排了第一个任务！加油完成它！';
    
    this.readTask = false;
    this.askedColleague = false;
    this.completed = false;
    
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
        id: 'boss',
        name: '老板',
        type: 'character',
        x: 250,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'colleague',
        name: '老同事',
        type: 'character',
        x: 400,
        y: 400,
        clickable: true,
        expression: 'happy'
      },
      {
        id: 'computer',
        name: '电脑',
        type: 'object',
        x: 530,
        y: 350,
        width: 100,
        height: 80,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.readTask = false;
    this.askedColleague = false;
    this.completed = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.15;
        element.y = baseY;
      } else if (element.id === 'boss') {
        element.x = width * 0.35;
        element.y = baseY;
      } else if (element.id === 'colleague') {
        element.x = width * 0.55;
        element.y = baseY;
      } else if (element.id === 'computer') {
        element.x = width * 0.78;
        element.y = height * 0.47;
        element.width = width * 0.18;
        element.height = height * 0.15;
      }
    });
  }

  onElementClick(element) {
    switch (element.id) {
      case 'boss':
        if (!this.readTask) {
          this.readTask = true;
          wx.showToast({
            title: '老板：做个简单的需求分析',
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '老板：有问题找老同事',
            icon: 'none',
            duration: 1500
          });
        }
        break;
        
      case 'colleague':
        if (this.readTask && !this.askedColleague) {
          this.askedColleague = true;
          wx.showToast({
            title: '老同事：我来教你怎么做',
            icon: 'success',
            duration: 2000
          });
        } else if (!this.readTask) {
          wx.showToast({
            title: '老同事：先问老板要任务吧',
            icon: 'none',
            duration: 1500
          });
        }
        break;
        
      case 'computer':
        if (this.readTask && this.askedColleague && !this.completed) {
          this.completed = true;
          this.gameState = 'success';
          wx.showToast({
            title: '认真完成任务中...',
            icon: 'success',
            duration: 2000
          });
        } else if (!this.readTask) {
          wx.showToast({
            title: '还不知道要做什么...',
            icon: 'none',
            duration: 1500
          });
        } else if (!this.askedColleague) {
          wx.showToast({
            title: '不太会，先请教同事吧',
            icon: 'none',
            duration: 1500
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '完美完成第一个任务！老板：干得不错，继续保持！';
  }

  getFailMessage() {
    return '任务还没完成...';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = this.completed ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'boss') {
        this.drawElement(ctx, element, images, 'boss', 120, offsetY);
      } else if (element.id === 'colleague') {
        this.drawElement(ctx, element, images, 'colleague_happy', 120, offsetY);
      } else if (element.id === 'computer') {
        this.drawElement(ctx, element, images, 'computer_bluescreen', Math.max(element.width, element.height), offsetY);
      }
    });
  }

  reset() {
    super.reset();
    this.readTask = false;
    this.askedColleague = false;
    this.completed = false;
  }
}

module.exports = Level20;
