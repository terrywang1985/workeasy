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
    
    // 图片资源缓存
    this.images = {};
    this.loadImages();
  }

  loadImages() {
    // 预加载游戏图片资源
    const imageList = [
      { key: 'coffee', path: 'images/game_assets/coffee.png' },
      { key: 'clock_machine', path: 'images/game_assets/clock_machine.png' },
      { key: 'colleague_happy', path: 'images/game_assets/colleague_happy.png' },
      { key: 'player_sad', path: 'images/game_assets/player_sad.png' },
      { key: 'broom', path: 'images/game_assets/broom.png' },
      { key: 'copier', path: 'images/game_assets/copier.png' },
      { key: 'lunch_card', path: 'images/game_assets/lunch_card.png' },
      { key: 'computer_bluescreen', path: 'images/game_assets/computer_bluescreen.png' },
      { key: 'toilet_door', path: 'images/game_assets/toilet_door.png' },
      { key: 'instant_coffee', path: 'images/game_assets/instant_coffee.png' },
      { key: 'package_box', path: 'images/game_assets/package_box.png' },
      { key: 'folding_chair', path: 'images/game_assets/folding_chair.png' },
      { key: 'usb_drive', path: 'images/game_assets/usb_drive.png' },
      { key: 'boss', path: 'images/game_assets/boss.png' },
      { key: 'company_door', path: 'images/game_assets/company_door.png' },
      { key: 'phone', path: 'images/game_assets/phone.png' },
      { key: 'water_dispenser', path: 'images/game_assets/water_dispenser.png' },
      { key: 'office_chair', path: 'images/game_assets/office_chair.png' },
      { key: 'email_icon', path: 'images/game_assets/email_icon.png' },
      { key: 'drawer', path: 'images/game_assets/drawer.png' },
      { key: 'canteen_window', path: 'images/game_assets/canteen_window.png' }
    ];

    imageList.forEach(item => {
      const img = wx.createImage();
      img.src = item.path;
      img.onload = () => {
        console.log(`图片加载成功: ${item.key}`);
      };
      img.onerror = (err) => {
        console.error(`图片加载失败: ${item.key}`, err);
      };
      this.images[item.key] = img;
    });
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

    // 绘制场景元素（关卡自己实现 customRender 方法）
    this.drawSceneElements();

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
    // 关卡自己负责绘制所有元素
    // GameScene 只提供图片资源和绘图上下文
    if (this.currentLevel && this.currentLevel.customRender) {
      this.currentLevel.customRender(this.ctx, this.images);
    }
  }

  // 已删除 drawCharacter、drawObject、drawItem 方法
  // 现在由每个关卡自己实现 customRender() 来绘制元素

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
