/**
 * 选关界面场景
 */

const BaseScene = require('../BaseScene.js');
const { generateLevelsList } = require('../levels/index.js');

class LevelsScene extends BaseScene {
  constructor(canvas, ctx, config, sceneManager) {
    super(canvas, ctx, config, sceneManager);
    this.levels = [];
    this.backButton = null;
    this.helpButton = null;
    this.levelButtons = [];
  }

  init() {
    // 生成关卡列表
    this.levels = generateLevelsList();

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

    // 绘制顶部栏
    this.drawTopBar();

    // 绘制关卡网格
    this.drawLevelGrid();
  }

  drawTopBar() {
    const { width, safeAreaTop } = this.config;
    const topOffset = Math.max(safeAreaTop, 20);

    // 绘制返回按钮（左上角）
    this.backButton = this.drawCircleButton('←', 60, topOffset + 40, 40, '#fff', '#333');

    // 绘制帮助按钮（右上角）
    this.helpButton = this.drawCircleButton('?', width - 60, topOffset + 40, 40, '#fff', '#333');

    // 绘制标题
    this.drawText('选择关卡', width / 2, topOffset + 40, 40, '#333');
  }

  drawLevelGrid() {
    const { width, height, safeAreaTop } = this.config;
    const cols = 5; // 5列
    
    // 根据屏幕宽度动态计算格子大小
    const padding = 40; // 左右边距
    const gap = Math.floor(width * 0.03); // 间距为屏幕宽度的3%
    const cellSize = Math.floor((width - padding * 2 - gap * (cols - 1)) / cols);
    
    const startX = (width - (cols * cellSize + (cols - 1) * gap)) / 2;
    const topOffset = Math.max(safeAreaTop, 20);
    const startY = topOffset + 120; // 在顶部按钮下方

    this.levelButtons = [];

    this.levels.forEach((level, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = startX + col * (cellSize + gap);
      const y = startY + row * (cellSize + gap);

      if (level.unlocked) {
        // 可玩关卡 - 白色方块 + 黑色数字
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(x, y, cellSize, cellSize);
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(x, y, cellSize, cellSize);
        
        this.drawText(level.id.toString(), x + cellSize / 2, y + cellSize / 2, 36, '#333');
        
        this.levelButtons.push({
          level,
          rect: { x, y, width: cellSize, height: cellSize }
        });
      } else {
        // 锁定关卡 - 灰色方块
        this.ctx.fillStyle = '#ccc';
        this.ctx.fillRect(x, y, cellSize, cellSize);
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(x, y, cellSize, cellSize);
        
        // 绘制锁定图标（简化为文字）
        this.drawText('🔒', x + cellSize / 2, y + cellSize / 2 - 10, 30, '#666');
        this.drawText('敬请期待', x + cellSize / 2, y + cellSize / 2 + 20, 20, '#666');
        
        this.levelButtons.push({
          level,
          rect: { x, y, width: cellSize, height: cellSize }
        });
      }
    });
  }

  onTouchEnd(e) {
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // 检测返回按钮
    if (this.backButton && this.isPointInCircle(x, y, this.backButton)) {
      console.log('返回主界面');
      this.sceneManager.switchScene('main');
      return;
    }

    // 检测帮助按钮
    if (this.helpButton && this.isPointInCircle(x, y, this.helpButton)) {
      console.log('显示帮助（暂未实现）');
      wx.showToast({
        title: '帮助功能待开发',
        icon: 'none'
      });
      return;
    }

    // 检测关卡按钮
    for (const btn of this.levelButtons) {
      if (this.isPointInRect(x, y, btn.rect)) {
        if (btn.level.unlocked) {
          console.log(`进入关卡 ${btn.level.id}`);
          this.sceneManager.switchScene('game', { levelId: btn.level.id });
        } else {
          wx.showToast({
            title: '该关卡暂未开放，敬请期待！',
            icon: 'none',
            duration: 2000
          });
        }
        return;
      }
    }
  }

  destroy() {
    super.destroy();
  }
}

module.exports = LevelsScene;
