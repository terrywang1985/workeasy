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
   * @param {Object} sceneContext - 游戏场景上下文（包含 ctx, config 等）
   */
  init(sceneContext) {
    this.sceneContext = sceneContext;
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
   * 子类可选实现
   * @param {CanvasRenderingContext2D} ctx 
   */
  customRender(ctx) {
    // 子类可以重写此方法添加自定义渲染
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
