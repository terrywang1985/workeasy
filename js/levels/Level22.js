/**
 * 第22关 - 复印机卡纸
 * 
 * 剧情：老板让你复印文件，但复印机卡纸了！
 * 
 * 解谜逻辑：
 * 1. 直接点复印机 → 卡纸了
 * 2. 点击说明书，学会修理
 * 3. 点击复印机，成功修好
 */

const BaseLevel = require('./BaseLevel.js');

class Level22 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 22;
    this.name = '复印机卡纸';
    this.story = '老板：快去复印这份文件！但是复印机好像坏了...';
    
    this.readManual = false;
    
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
        id: 'copier',
        name: '复印机',
        type: 'object',
        x: 300,
        y: 300,
        width: 120,
        height: 150,
        clickable: true
      },
      {
        id: 'manual',
        name: '说明书',
        type: 'item',
        x: 500,
        y: 420,
        clickable: true
      }
    ];
  }

  init(sceneContext) {
    super.init(sceneContext);
    this.readManual = false;
    
    const { width, height } = sceneContext.config;
    const baseY = height * 0.6;
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;
        element.y = baseY;
        element.expression = 'sad';
      } else if (element.id === 'copier') {
        element.x = width * 0.5;
        element.y = height * 0.35;
        element.width = width * 0.25;
        element.height = height * 0.22;
      } else if (element.id === 'manual') {
        element.x = width * 0.75;
        element.y = baseY;
      }
    });
  }

  onElementClick(element) {
    console.log(`[Level02] 点击了: ${element.name}`);

    switch (element.id) {
      case 'manual':
        if (!this.readManual) {
          this.readManual = true;
          const player = this.elements.find(e => e.id === 'player');
          if (player) player.expression = 'happy';
          wx.showToast({
            title: '学会了！先拔电源，再取纸',
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '我已经会了！',
            icon: 'none',
            duration: 1000
          });
        }
        break;
        
      case 'copier':
        if (this.readManual) {
          this.gameState = 'success';
          wx.showToast({
            title: '修好了！',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '啊！手指被夹了！',
            icon: 'none',
            duration: 1500
          });
        }
        break;
    }
  }

  getSuccessMessage() {
    return '复印机修好了！老板：不错嘛，还会修机器~';
  }

  getFailMessage() {
    return '手指被复印机夹了，疼死了！';
  }

  customRender(ctx, images, offsetY = 0) {
    this.elements.forEach(element => {
      if (element.id === 'player') {
        const imageKey = element.expression === 'happy' ? 'colleague_happy' : 'player_sad';
        this.drawElement(ctx, element, images, imageKey, 120, offsetY);
      } else if (element.id === 'copier') {
        this.drawElement(ctx, element, images, 'copier', Math.max(element.width, element.height), offsetY);
      } else if (element.id === 'manual') {
        // 绘制说明书（像一本书）
        if (element.visible !== false) {
          const bookW = 50;
          const bookH = 65;
          const bookX = element.x - bookW / 2;
          const bookY = element.y - bookH / 2 + offsetY;
          
          // 书的侧面（立体感）
          ctx.fillStyle = '#6B4423';
          ctx.fillRect(bookX + 3, bookY + 3, bookW, bookH);
          
          // 书的封面
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(bookX, bookY, bookW, bookH);
          
          // 书脉
          ctx.strokeStyle = '#5D3A1A';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(bookX + bookW / 2, bookY);
          ctx.lineTo(bookX + bookW / 2, bookY + bookH);
          ctx.stroke();
          
          // 边框
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 2;
          ctx.strokeRect(bookX, bookY, bookW, bookH);
          
          // 标题（竖向文字）
          ctx.save();
          ctx.fillStyle = '#FFD700';
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.translate(bookX + bookW / 2, bookY + bookH / 2);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText('说明书', 0, 5);
          ctx.restore();
          
          // 名称标签
          ctx.fillStyle = '#333';
          ctx.font = '18px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(element.name, element.x, element.y + 40 + offsetY);
        }
      }
    });
  }

  reset() {
    super.reset();
    this.readManual = false;
    
    const player = this.elements.find(e => e.id === 'player');
    if (player) player.expression = 'sad';
  }
}

module.exports = Level22;
