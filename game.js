/**
 * 不正经的员工 - 微信小游戏主入口
 */

const SceneManager = require('./js/SceneManager.js');
const MainScene = require('./js/scenes/MainScene.js');
const LevelsScene = require('./js/scenes/LevelsScene.js');
const GameScene = require('./js/scenes/GameScene.js');

// 获取 Canvas 实例
const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');

// 获取屏幕信息并适配分辨率
const systemInfo = wx.getSystemInfoSync();
const screenWidth = systemInfo.screenWidth;
const screenHeight = systemInfo.screenHeight;
const pixelRatio = systemInfo.pixelRatio;

// 设置 Canvas 尺寸（物理像素）
canvas.width = screenWidth * pixelRatio;
canvas.height = screenHeight * pixelRatio;

// 缩放绘图上下文以适配屏幕
ctx.scale(pixelRatio, pixelRatio);

// 游戏配置（使用逻辑像素）
const config = {
  width: screenWidth,
  height: screenHeight,
  pixelRatio: pixelRatio
};

// 初始化场景管理器
const sceneManager = new SceneManager(canvas, ctx, config);

// 注册场景
sceneManager.registerScene('main', MainScene);
sceneManager.registerScene('levels', LevelsScene);
sceneManager.registerScene('game', GameScene);

// 启动游戏，进入主界面
sceneManager.switchScene('main');

// 游戏主循环
let lastTime = Date.now();

function gameLoop() {
  const now = Date.now();
  const deltaTime = now - lastTime;
  lastTime = now;

  // 清空画布
  ctx.clearRect(0, 0, config.width, config.height);
  
  // 更新和渲染当前场景
  sceneManager.update(deltaTime);
  sceneManager.render();
  
  // 继续循环
  requestAnimationFrame(gameLoop);
}

// 开始游戏循环
gameLoop();

// 导出场景管理器供全局使用
module.exports = sceneManager;
