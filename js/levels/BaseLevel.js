/**
 * 关卡基类
 * 所有关卡继承此类
 */

class BaseLevel {
  constructor() {
    this.id = 0;
    this.name = '';
    this.story = '';
    this.elements = [];
    this.gameState = 'playing'; // playing, success, failed
    this.clickedItems = [];
  }

  /**
   * 初始化关卡
   * @param {Object} sceneContext - 游戏场景上下文（包含 ctx, config, topUIOffset 等）
   */
  init(sceneContext) {
    this.sceneContext = sceneContext;
    this.topUIOffset = sceneContext.topUIOffset || 0; // 整体下移偏移量
    this.gameState = 'playing';
    this.clickedItems = [];
  }

  /**
   * 获取关卡配置信息
   */
  getConfig() {
    return {
      id: this.id,
      name: this.name,
      story: this.story,
      elements: this.elements
    };
  }

  /**
   * 处理元素点击事件
   * 子类必须实现此方法
   * @param {Object} element - 被点击的元素
   */
  onElementClick(element) {
    // 子类实现具体逻辑
    console.warn('子类应该实现 onElementClick 方法');
  }

  /**
   * 自定义渲染（在标准元素渲染之后）
   * 子类必须实现
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Object} images - 图片资源对象
   * @param {number} offsetY - Y轴内容偏移量
   */
  customRender(ctx, images, offsetY = 0) {
    // 子类必须重写此方法添加自定义渲染
  }

  /**
   * 通用的绘制元素方法（供子类调用）
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Object} element - 元素对象
   * @param {Object} images - 图片资源对象
   * @param {string} imageKey - 图片key
   * @param {number} size - 图片大小
   * @param {number} offsetY - Y轴偏移量（默认使用this.topUIOffset）
   */
  drawElement(ctx, element, images, imageKey, size = 100, offsetY = null) {
    if (element.visible === false) return;

    // 使用传入的offsetY或默认的topUIOffset
    const actualOffsetY = offsetY !== null ? offsetY : (this.topUIOffset || 0);

    // 绘制图片
    if (imageKey && images[imageKey] && images[imageKey].complete) {
      if (element.type === 'object') {
        // object类型：以矩形中心为原点
        ctx.drawImage(
          images[imageKey],
          element.x + element.width / 2 - size / 2,
          element.y + element.height / 2 - size / 2 + actualOffsetY,
          size,
          size
        );
      } else {
        // character/item类型：以坐标为中心
        ctx.drawImage(
          images[imageKey],
          element.x - size / 2,
          element.y - size / 2 + actualOffsetY,
          size,
          size
        );
      }
    }

    // 绘制文字标签
    if (element.name) {
      ctx.fillStyle = '#333';
      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      if (element.type === 'object') {
        ctx.fillText(element.name, element.x + element.width / 2, element.y + element.height + 10 + actualOffsetY);
      } else if (element.type === 'character') {
        ctx.fillText(element.name, element.x, element.y + 70 + actualOffsetY);
      } else {
        ctx.fillText(element.name, element.x, element.y + 50 + actualOffsetY);
      }
    }
  }

  /**
   * 检查是否通关
   */
  checkSuccess() {
    return this.gameState === 'success';
  }

  /**
   * 检查是否失败
   */
  checkFailed() {
    return this.gameState === 'failed';
  }

  /**
   * 获取成功消息
   */
  getSuccessMessage() {
    return '恭喜通关！';
  }

  /**
   * 获取失败消息
   */
  getFailMessage() {
    return '失败了，再试一次吧！';
  }

  /**
   * 重置关卡
   */
  reset() {
    this.gameState = 'playing';
    this.clickedItems = [];
  }
}

module.exports = BaseLevel;
