/**
 * 基础场景类
 */

class BaseScene {
  constructor(canvas, ctx, config, sceneManager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.config = config;
    this.sceneManager = sceneManager;
    this.touchStartHandler = null;
    this.touchEndHandler = null;
  }

  /**
   * 初始化场景
   */
  init(data) {
    // 子类实现
  }

  /**
   * 更新场景
   */
  update(deltaTime) {
    // 子类实现
  }

  /**
   * 渲染场景
   */
  render() {
    // 子类实现
  }

  /**
   * 销毁场景
   */
  destroy() {
    // 移除事件监听
    if (this.touchStartHandler) {
      wx.offTouchStart(this.touchStartHandler);
    }
    if (this.touchEndHandler) {
      wx.offTouchEnd(this.touchEndHandler);
    }
  }

  /**
   * 绘制文本（居中）
   */
  drawText(text, x, y, fontSize = 40, color = '#333', align = 'center') {
    this.ctx.fillStyle = color;
    this.ctx.font = `bold ${fontSize}px Arial`;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, y);
  }

  /**
   * 绘制自动换行文本
   */
  drawWrappedText(text, x, y, maxWidth, fontSize = 24, lineHeight = 30) {
    this.ctx.fillStyle = '#333';
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    
    const words = text.split('');
    let line = '';
    let currentY = y;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i];
      const metrics = this.ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && line !== '') {
        this.ctx.fillText(line, x, currentY);
        line = words[i];
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    
    this.ctx.fillText(line, x, currentY);
  }

  /**
   * 绘制矩形按钮
   */
  drawButton(text, x, y, width, height, bgColor = '#fff', borderColor = '#333') {
    // 绘制边框
    this.ctx.strokeStyle = borderColor;
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(x, y, width, height);
    
    // 绘制背景
    this.ctx.fillStyle = bgColor;
    this.ctx.fillRect(x, y, width, height);
    
    // 绘制文字
    this.drawText(text, x + width / 2, y + height / 2, 32, '#333');
    
    return { x, y, width, height };
  }

  /**
   * 绘制圆形按钮
   */
  drawCircleButton(text, x, y, radius, bgColor = '#fff', borderColor = '#333') {
    // 绘制边框
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.strokeStyle = borderColor;
    this.ctx.lineWidth = 4;
    this.ctx.stroke();
    
    // 绘制背景
    this.ctx.fillStyle = bgColor;
    this.ctx.fill();
    
    // 绘制文字
    this.drawText(text, x, y, 40, '#333');
    
    return { x, y, radius };
  }

  /**
   * 检测点击是否在矩形内
   */
  isPointInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.width &&
           y >= rect.y && y <= rect.y + rect.height;
  }

  /**
   * 检测点击是否在圆形内
   */
  isPointInCircle(x, y, circle) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
  }

  /**
   * 绘制简笔画人物
   */
  drawStickman(x, y, scale = 1, expression = 'normal') {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    // 头部
    ctx.beginPath();
    ctx.arc(0, -30, 20, 0, Math.PI * 2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 眼睛
    if (expression === 'happy') {
      // 笑眼
      ctx.beginPath();
      ctx.arc(-8, -35, 2, 0, Math.PI * 2);
      ctx.arc(8, -35, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();
    } else if (expression === 'sad') {
      // 难过
      ctx.beginPath();
      ctx.moveTo(-10, -35);
      ctx.lineTo(-6, -33);
      ctx.moveTo(6, -33);
      ctx.lineTo(10, -35);
      ctx.stroke();
    } else {
      // 正常
      ctx.beginPath();
      ctx.arc(-8, -35, 2, 0, Math.PI * 2);
      ctx.arc(8, -35, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();
    }
    
    // 嘴巴
    if (expression === 'happy') {
      ctx.beginPath();
      ctx.arc(0, -25, 8, 0, Math.PI);
      ctx.stroke();
    } else if (expression === 'sad') {
      ctx.beginPath();
      ctx.arc(0, -20, 8, Math.PI, 0);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(-6, -25);
      ctx.lineTo(6, -25);
      ctx.stroke();
    }
    
    // 身体
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(0, 30);
    ctx.stroke();
    
    // 手臂
    ctx.beginPath();
    ctx.moveTo(-20, 10);
    ctx.lineTo(0, 0);
    ctx.lineTo(20, 10);
    ctx.stroke();
    
    // 腿
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(-15, 60);
    ctx.moveTo(0, 30);
    ctx.lineTo(15, 60);
    ctx.stroke();
    
    ctx.restore();
  }
}

module.exports = BaseScene;
