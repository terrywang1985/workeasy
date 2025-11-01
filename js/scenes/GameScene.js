/**
 * 游戏关卡场景
 */

const BaseScene = require('../BaseScene.js');
const { getLevelInstance } = require('../levels/index.js');

class GameScene extends BaseScene {
  constructor(canvas, ctx, config, sceneManager) {
    super(canvas, ctx, config, sceneManager);
    this.levelId = null;
    this.currentLevel = null; // 当前关卡实例
    this.backButton = null;
    this.retryButton = null;
  }

  init(data) {
    this.levelId = data.levelId;
    this.currentLevel = getLevelInstance(this.levelId);
    
    if (!this.currentLevel) {
      console.error(`关卡 ${this.levelId} 不存在`);
      this.sceneManager.switchScene('levels');
      return;
    }

    // 初始化关卡
    this.currentLevel.init({
      ctx: this.ctx,
      config: this.config
    });

    // 绑定触摸事件
    this.touchEndHandler = (e) => this.onTouchEnd(e);
    wx.onTouchEnd(this.touchEndHandler);
  }

  render() {
    const { width, height, safeAreaTop } = this.config;

    // 绘制背景
    this.ctx.fillStyle = '#F5E6D3';
    this.ctx.fillRect(0, 0, width, height);

    // 绘制顶部信息
    this.drawTopInfo();

    // 绘制场景元素
    this.drawSceneElements();

    // 绘制关卡自定义内容
    if (this.currentLevel && this.currentLevel.customRender) {
      this.currentLevel.customRender(this.ctx);
    }

    // 绘制游戏状态提示
    if (this.currentLevel && (this.currentLevel.checkSuccess() || this.currentLevel.checkFailed())) {
      this.drawGameResult();
    }

    // 绘制返回按钮（避开刘海屏）
    const topOffset = Math.max(safeAreaTop, 20);
    this.backButton = this.drawCircleButton('←', 60, topOffset + 40, 40, '#fff', '#333');
  }

  drawTopInfo() {
    const { width, safeAreaTop } = this.config;
    const config = this.currentLevel.getConfig();
    
    // 计算顶部偏移（避开刘海屏）
    const topOffset = Math.max(safeAreaTop, 20);

    // 绘制关卡标题
    this.drawText(
      `第 ${config.id} 关 ${config.name}`,
      width / 2,
      topOffset + 40,
      36,
      '#333'
    );

    // 绘制剧情文字框（自适应宽度）
    const padding = 30;
    const boxWidth = width - padding * 2;
    const boxHeight = 100;
    const boxX = padding;
    const boxY = topOffset + 90;
    
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    this.ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
    
    // 绘制文字（自动换行）
    this.drawWrappedText(
      config.story,
      boxX + 20,
      boxY + 30,
      boxWidth - 40,
      24,
      30
    );
  }

  drawSceneElements() {
    const config = this.currentLevel.getConfig();
    const elements = config.elements;

    // 根据关卡元素绘制场景
    elements.forEach(element => {
      // 检查元素是否可见（支持动态隐藏）
      if (element.visible === false) {
        return;
      }
      
      if (element.type === 'character') {
        this.drawCharacter(element);
      } else if (element.type === 'object') {
        this.drawObject(element);
      } else if (element.type === 'item') {
        this.drawItem(element);
      }
    });
  }

  drawCharacter(element) {
    const expression = element.expression || 'normal';
    
    this.drawStickman(element.x, element.y, 1.5, expression);
    
    // 绘制角色名称
    this.drawText(element.name, element.x, element.y + 100, 20, '#666');
  }

  drawObject(element) {
    const ctx = this.ctx;

    if (element.id === 'door') {
      // 绘制公司大门
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(element.x, element.y, element.width, element.height);
      
      // 门把手
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(element.x + element.width - 20, element.y + element.height / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // 门牌
      ctx.fillStyle = '#fff';
      ctx.fillRect(element.x + 20, element.y + 20, 60, 40);
      this.drawText('公司', element.x + 50, element.y + 40, 20, '#333');
      
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 4;
      ctx.strokeRect(element.x, element.y, element.width, element.height);
    } else if (element.id === 'box') {
      // 绘制快递箱
      ctx.fillStyle = '#D2691E';
      ctx.fillRect(element.x, element.y, element.width, element.height);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.strokeRect(element.x, element.y, element.width, element.height);
      
      // 快递标签
      this.drawText('📦', element.x + element.width / 2, element.y + element.height / 2, 30, '#333');
    }
  }

  drawItem(element) {
    const ctx = this.ctx;

    if (element.id === 'broom') {
      // 绘制扫帚
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(element.x, element.y - 40);
      ctx.lineTo(element.x, element.y + 20);
      ctx.stroke();
      
      // 扫帚头
      ctx.fillStyle = '#D2691E';
      ctx.fillRect(element.x - 10, element.y + 20, 20, 30);
      
      this.drawText('扫帚', element.x, element.y + 70, 18, '#666');
    }
  }

  drawGameResult() {
    const { width, height } = this.config;

    // 半透明遮罩
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, width, height);

    // 结果框（根据屏幕宽度调整）
    const boxWidth = Math.min(400, width * 0.8);
    const boxHeight = height * 0.4;
    const boxX = (width - boxWidth) / 2;
    const boxY = (height - boxHeight) / 2;

    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 5;
    this.ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    if (this.currentLevel.checkSuccess()) {
      // 成功提示
      this.drawText('🎉 通关成功！', width / 2, boxY + 80, 40, '#4CAF50');
      
      // 绘制成功消息（自动换行）
      this.drawWrappedText(
        this.currentLevel.getSuccessMessage(),
        boxX + 40,
        boxY + 130,
        boxWidth - 80,
        22,
        28
      );
      
      // 继续按钮（暂时返回选关）
      const btnWidth = 200;
      const btnHeight = 60;
      this.retryButton = this.drawButton(
        '返回选关',
        (width - btnWidth) / 2,
        boxY + boxHeight - 80,
        btnWidth,
        btnHeight,
        '#4CAF50',
        '#333'
      );
    } else if (this.currentLevel.checkFailed()) {
      // 失败提示
      this.drawText('❌ 失败了！', width / 2, boxY + 80, 40, '#F44336');
      
      // 绘制失败消息（自动换行）
      this.drawWrappedText(
        this.currentLevel.getFailMessage(),
        boxX + 40,
        boxY + 130,
        boxWidth - 80,
        22,
        28
      );
      
      // 重试按钮
      const btnWidth = 200;
      const btnHeight = 60;
      this.retryButton = this.drawButton(
        '重新开始',
        (width - btnWidth) / 2,
        boxY + boxHeight - 80,
        btnWidth,
        btnHeight,
        '#F44336',
        '#333'
      );
    }
  }

  onTouchEnd(e) {
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // 如果游戏结束，只处理重试/返回按钮
    if (this.currentLevel && (this.currentLevel.checkSuccess() || this.currentLevel.checkFailed())) {
      if (this.retryButton && this.isPointInRect(x, y, this.retryButton)) {
        if (this.currentLevel.checkSuccess()) {
          this.sceneManager.switchScene('levels');
        } else {
          // 重置关卡
          this.currentLevel.reset();
        }
      }
      return;
    }

    // 检测返回按钮
    if (this.backButton && this.isPointInCircle(x, y, this.backButton)) {
      this.sceneManager.switchScene('levels');
      return;
    }

    // 检测场景元素点击
    this.handleElementClick(x, y);
  }

  handleElementClick(x, y) {
    const config = this.currentLevel.getConfig();
    const elements = config.elements;
    
    for (const element of elements) {
      if (!element.clickable) continue;
      if (element.visible === false) continue; // 跳过隐藏元素

      let hit = false;

      if (element.type === 'character' || element.type === 'item') {
        // 圆形碰撞检测
        const dx = x - element.x;
        const dy = y - element.y;
        hit = dx * dx + dy * dy <= 50 * 50;
      } else if (element.type === 'object') {
        // 矩形碰撞检测
        hit = x >= element.x && x <= element.x + element.width &&
              y >= element.y && y <= element.y + element.height;
      }

      if (hit) {
        // 调用关卡的点击处理
        this.currentLevel.onElementClick(element);
        return;
      }
    }
  }

  destroy() {
    super.destroy();
  }
}

module.exports = GameScene;
