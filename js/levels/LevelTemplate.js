/**
 * 关卡模板 - Level[XX]
 * 
 * 使用方法：
 * 1. 复制此文件
 * 2. 重命名为 Level[关卡编号].js，例如 Level32.js
 * 3. 修改 constructor 中的关卡信息
 * 4. 实现 onElementClick 方法中的解谜逻辑
 * 5. 在 js/levels/index.js 中导入并注册
 */

const BaseLevel = require('./BaseLevel.js');

class LevelTemplate extends BaseLevel {
  constructor() {
    super();
    
    // ========== 关卡基本信息 ==========
    this.id = 32; // 关卡编号
    this.name = '关卡名称'; // 关卡名称
    this.story = '这里是关卡剧情描述...'; // 剧情文字
    
    // ========== 关卡状态变量 ==========
    // 在此定义关卡特有的状态变量
    // 例如：
    // this.doorOpened = false;
    // this.hasKey = false;
    
    // ========== 场景元素配置 ==========
    this.elements = [
      // 角色类型元素
      {
        id: 'player',           // 元素唯一ID
        name: '玩家',           // 显示名称
        type: 'character',      // 类型：character（角色）
        x: 100,                 // X坐标
        y: 400,                 // Y坐标
        clickable: false,       // 是否可点击
        expression: 'normal'    // 表情：normal, happy, sad
      },
      
      // 对象类型元素（矩形碰撞）
      {
        id: 'door',
        name: '门',
        type: 'object',         // 类型：object（物体）
        x: 280,
        y: 200,
        width: 120,             // 宽度（矩形必须）
        height: 180,            // 高度（矩形必须）
        clickable: true
      },
      
      // 道具类型元素（圆形碰撞）
      {
        id: 'key',
        name: '钥匙',
        type: 'item',           // 类型：item（道具）
        x: 450,
        y: 400,
        clickable: true
      }
    ];
  }

  /**
   * 初始化关卡
   * 每次进入关卡时调用
   */
  init(sceneContext) {
    super.init(sceneContext);
    
    // 重置关卡状态变量
    // this.doorOpened = false;
    // this.hasKey = false;
  }

  /**
   * 处理元素点击
   * 这是关卡的核心逻辑
   */
  onElementClick(element) {
    console.log(`[LevelTemplate] 点击了: ${element.name}`);

    // 根据点击的元素ID执行不同逻辑
    switch (element.id) {
      case 'key':
        this.handleKeyClick();
        break;
      case 'door':
        this.handleDoorClick();
        break;
      // 添加更多元素的处理...
    }
  }

  /**
   * 处理钥匙点击
   */
  handleKeyClick() {
    // 示例逻辑
    wx.showToast({
      title: '拿到了钥匙！',
      icon: 'success',
      duration: 1000
    });
    
    // 更新状态
    // this.hasKey = true;
    
    // 隐藏钥匙元素
    const keyElement = this.elements.find(e => e.id === 'key');
    if (keyElement) {
      keyElement.visible = false;
    }
  }

  /**
   * 处理门点击
   */
  handleDoorClick() {
    // 示例逻辑：检查是否有钥匙
    // if (this.hasKey) {
    //   this.gameState = 'success';
    //   wx.showToast({
    //     title: '通关成功！',
    //     icon: 'success'
    //   });
    // } else {
    //   wx.showToast({
    //     title: '需要钥匙才能开门',
    //     icon: 'none',
    //     duration: 1500
    //   });
    // }
  }

  /**
   * 自定义渲染
   * 在标准元素渲染之后调用
   * 可以在此绘制特殊效果
   */
  customRender(ctx) {
    // 示例：如果门打开了，绘制开门效果
    // if (this.doorOpened) {
    //   const door = this.elements.find(e => e.id === 'door');
    //   if (door) {
    //     ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
    //     ctx.fillRect(door.x, door.y, door.width, door.height);
    //   }
    // }
  }

  /**
   * 获取成功消息
   */
  getSuccessMessage() {
    return '太棒了！你成功通关了！';
  }

  /**
   * 获取失败消息
   */
  getFailMessage() {
    return '失败了，再想想办法吧！';
  }

  /**
   * 重置关卡
   * 点击"重新开始"时调用
   */
  reset() {
    super.reset();
    
    // 重置关卡特有的状态
    // this.doorOpened = false;
    // this.hasKey = false;
    
    // 重置元素可见性
    this.elements.forEach(element => {
      if (element.visible === false) {
        element.visible = true;
      }
    });
  }
}

module.exports = LevelTemplate;
