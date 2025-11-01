/**
 * 第31关 - 上班迟到
 * 
 * 剧情：玩家早上迟到，需偷偷进入公司，避开正在门口检查的老板
 * 
 * 解谜逻辑：
 * 1. 先点击扫帚伪装成清洁工
 * 2. 再点击大门进入公司
 */

const BaseLevel = require('./BaseLevel.js');

class Level31 extends BaseLevel {
  constructor() {
    super();
    
    // 关卡基本信息
    this.id = 31;
    this.name = '上班迟到';
    this.story = '早上起晚了，老板正在门口查岗，赶紧想办法进去！';
    
    // 关卡状态
    this.playerDisguised = false; // 玩家是否伪装
    
    // 场景元素配置
    this.elements = [
      {
        id: 'player',
        name: '玩家',
        type: 'character',
        x: 100,
        y: 400,
        clickable: false,
        expression: 'sad'
      },
      {
        id: 'door',
        name: '公司大门',
        type: 'object',
        x: 280,
        y: 200,
        width: 120,
        height: 180,
        clickable: true
      },
      {
        id: 'boss',
        name: '老板',
        type: 'character',
        x: 300,
        y: 400,
        clickable: true,
        expression: 'normal'
      },
      {
        id: 'broom',
        name: '扫帚',
        type: 'item',
        x: 450,
        y: 400,
        clickable: true
      },
      {
        id: 'box',
        name: '快递箱',
        type: 'object',
        x: 500,
        y: 450,
        width: 60,
        height: 60,
        clickable: true
      }
    ];
  }

  /**
   * 初始化关卡
   */
  init(sceneContext) {
    super.init(sceneContext);
    this.playerDisguised = false;
    
    // 根据屏幕尺寸调整元素位置
    const { width, height } = sceneContext.config;
    
    // 重新计算元素位置（基于屏幕宽度）
    const baseY = height * 0.6; // 角色基准线（屏幕高度的60%）
    
    this.elements.forEach(element => {
      if (element.id === 'player') {
        element.x = width * 0.2;  // 屏幕宽度的20%
        element.y = baseY;
      } else if (element.id === 'boss') {
        element.x = width * 0.55; // 屏幕宽度的55%
        element.y = baseY;
      } else if (element.id === 'door') {
        element.x = width * 0.4;  // 屏幕宽度的40%
        element.y = height * 0.3; // 屏幕高度的30%
        element.width = width * 0.25;
        element.height = height * 0.25;
      } else if (element.id === 'broom') {
        element.x = width * 0.75; // 屏幕宽度的75%
        element.y = baseY;
      } else if (element.id === 'box') {
        element.x = width * 0.82; // 屏幗宽度的82%
        element.y = baseY + 50;
        element.width = width * 0.12;
        element.height = width * 0.12;
      }
    });
  }

  /**
   * 处理元素点击
   */
  onElementClick(element) {
    console.log(`[Level31] 点击了: ${element.name}`);

    switch (element.id) {
      case 'broom':
        this.handleBroomClick();
        break;
      case 'door':
        this.handleDoorClick();
        break;
      case 'boss':
        this.handleBossClick();
        break;
      case 'box':
        this.handleBoxClick();
        break;
    }
  }

  /**
   * 点击扫帚
   */
  handleBroomClick() {
    if (!this.playerDisguised) {
      this.playerDisguised = true;
      this.clickedItems.push('broom');
      
      // 更新玩家表情
      const player = this.elements.find(e => e.id === 'player');
      if (player) {
        player.expression = 'happy';
      }
      
      wx.showToast({
        title: '拿起了扫帚！',
        icon: 'success',
        duration: 1000
      });
    } else {
      wx.showToast({
        title: '已经拿着扫帚了',
        icon: 'none',
        duration: 1000
      });
    }
  }

  /**
   * 点击大门
   */
  handleDoorClick() {
    if (this.playerDisguised) {
      // 伪装后进门 - 成功
      this.gameState = 'success';
      wx.showToast({
        title: '通关成功！',
        icon: 'success',
        duration: 1000
      });
    } else {
      // 未伪装进门 - 失败
      this.gameState = 'failed';
      wx.showToast({
        title: '被老板发现了！',
        icon: 'none',
        duration: 1000
      });
    }
  }

  /**
   * 点击老板
   */
  handleBossClick() {
    wx.showToast({
      title: '老板正在严肃地查岗...',
      icon: 'none',
      duration: 1500
    });
  }

  /**
   * 点击快递箱
   */
  handleBoxClick() {
    wx.showToast({
      title: '现在用不上...',
      icon: 'none',
      duration: 1500
    });
  }

  /**
   * 自定义渲染
   */
  customRender(ctx) {
    // 如果玩家伪装了，给玩家绘制扫帚
    if (this.playerDisguised) {
      const player = this.elements.find(e => e.id === 'player');
      if (player) {
        ctx.save();
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(player.x + 30, player.y - 20);
        ctx.lineTo(player.x + 30, player.y + 40);
        ctx.stroke();
        
        // 扫帚头
        ctx.fillStyle = '#D2691E';
        ctx.fillRect(player.x + 20, player.y + 40, 20, 30);
        ctx.restore();
      }
    }
    
    // 如果扫帚被拿走了，不显示扫帚元素
    const broomElement = this.elements.find(e => e.id === 'broom');
    if (broomElement && this.playerDisguised) {
      broomElement.visible = false;
    } else if (broomElement) {
      broomElement.visible = true;
    }
  }

  /**
   * 获取成功消息
   */
  getSuccessMessage() {
    return '成功混进公司！老板：嗯，清洁工很勤奋嘛~';
  }

  /**
   * 获取失败消息
   */
  getFailMessage() {
    return '老板：又迟到！扣工资！';
  }

  /**
   * 重置关卡
   */
  reset() {
    super.reset();
    this.playerDisguised = false;
    
    // 重置玩家表情
    const player = this.elements.find(e => e.id === 'player');
    if (player) {
      player.expression = 'sad';
    }
  }
}

module.exports = Level31;
