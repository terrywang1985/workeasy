/**
 * 主界面场景
 */

const BaseScene = require('../BaseScene.js');

class MainScene extends BaseScene {
  constructor(canvas, ctx, config, sceneManager) {
    super(canvas, ctx, config, sceneManager);
    this.startButton = null;
  }

  init() {
    // 绑定触摸事件
    this.touchEndHandler = (e) => this.onTouchEnd(e);
    wx.onTouchEnd(this.touchEndHandler);
  }

  render() {
    const { width, height } = this.config;
    const ctx = this.ctx;

    // 绘制背景
    ctx.fillStyle = '#F5E6D3';
    ctx.fillRect(0, 0, width, height);

    // 绘制游戏标题
    this.drawText('不正经的员工', width / 2, 150, 60, '#8B4513');

    // 绘制简笔画员工形象
    this.drawStickman(width / 2, 400, 2, 'happy');

    // 绘制"开始游戏"按钮
    const btnWidth = 300;
    const btnHeight = 80;
    const btnX = (width - btnWidth) / 2;
    const btnY = 650;
    
    this.startButton = this.drawButton(
      '开始游戏',
      btnX,
      btnY,
      btnWidth,
      btnHeight,
      '#fff',
      '#333'
    );

    // 绘制版本信息
    this.drawText('v1.0.0', width / 2, height - 50, 24, '#999');
  }

  onTouchEnd(e) {
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // 检测是否点击了开始按钮
    if (this.startButton && this.isPointInRect(x, y, this.startButton)) {
      console.log('点击开始游戏');
      this.sceneManager.switchScene('levels');
    }
  }

  destroy() {
    super.destroy();
  }
}

module.exports = MainScene;
