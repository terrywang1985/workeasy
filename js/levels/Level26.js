/**
 * 第26关 - 下午茶时间
 * 
 * 剧情：下午困了，需要咖啡续命，但咖啡机坏了！
 * 
 * 解谜逻辑：
 * 1. 点击同事A，他说没咖啡了
 * 2. 点击同事B，她有速溶咖啡
 * 3. 点击热水，冲咖啡
 * 4. 喝咖啡，成功续命
 */

const BaseLevel = require('./BaseLevel.js');

class Level26 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 26;
    this.name = '下午茶时间';
    this.story = '下午好困...需要咖啡续命！';
    
    this.gotCoffee = false;
    this.gotWater = false;
    
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
        id: 'colleagueA',
        name: '同事A',
        type: 'character',
        x: 250,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'colleagueB',
        name: '同事B',
        type: 'character',
        x: 400,
        y: 400,
        clickable: true,
        expression: 'happy'
      },
      {
        id: 'water',
        name: '热水',
        type: 'item',
        x: 500,
        y: 400,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.gotCoffee = false;
    this.gotWater = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.15;
        element.y = baseY;
      } else if (element.id === 'colleagueA') {
        element.x = width * 0.35;
        element.y = baseY;
      } else if (element.id === 'colleagueB') {
        element.x = width * 0.55;
        element.y = baseY;
      } else if (element.id === 'water') {
        element.x = width * 0.75;
        element.y = baseY;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level06] 点击了: ${element.name}`);

    switch (element.id) {
      case 'colleagueA':
        wx.showToast({
          title: '同事A：咖啡机坏了...',
          icon: 'none',
          duration: 1500
        });
        break;
        
      case 'colleagueB':
        if (!this.gotCoffee) {
          this.gotCoffee = true;
          wx.showToast({
            title: '同事B：我有速溶咖啡~',
            icon: 'success',
            duration: 1500
          });
        } else {
          wx.showToast({
            title: '同事B：已经给你了哦',
            icon: 'none'
          });
        }
        break;
        
      case 'water':
        if (this.gotCoffee) {
          this.gameState = 'success';
          wx.showToast({
            title: '成功冲了咖啡！',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '光喝热水不管用...',
            icon: 'none',
            duration: 1500
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '成功喝上咖啡！瞬间清醒，可以继续搬砖了~';
  }

  getFailMessage() {
    return '没有咖啡，困死了...';
  }

  reset() {
    super.reset();
    this.gotCoffee = false;
    this.gotWater = false;
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        this.drawElement(ctx, element, images, 'player_sad', 120, offsetY);
      } else if (element.id === 'colleagueA') {
        this.drawElement(ctx, element, images, 'colleague_happy', 120, offsetY);
      } else if (element.id === 'colleagueB') {
        this.drawElement(ctx, element, images, 'colleague_happy', 120, offsetY);
      } else if (element.id === 'water') {
        this.drawElement(ctx, element, images, 'water_dispenser', 100, offsetY);
      }
    });
  }
}

module.exports = Level26;
