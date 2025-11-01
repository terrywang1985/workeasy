/**
 * 场景管理器
 * 负责场景切换、更新和渲染
 */

class SceneManager {
  constructor(canvas, ctx, config) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.config = config;
    this.scenes = new Map();
    this.currentScene = null;
    this.sceneData = {}; // 场景间传递的数据
  }

  /**
   * 注册场景
   */
  registerScene(name, SceneClass) {
    this.scenes.set(name, SceneClass);
  }

  /**
   * 切换场景
   */
  switchScene(name, data = {}) {
    const SceneClass = this.scenes.get(name);
    if (!SceneClass) {
      console.error(`场景 ${name} 未注册`);
      return;
    }

    // 销毁当前场景
    if (this.currentScene && this.currentScene.destroy) {
      this.currentScene.destroy();
    }

    // 创建新场景
    this.sceneData = data;
    this.currentScene = new SceneClass(this.canvas, this.ctx, this.config, this);
    
    // 初始化场景
    if (this.currentScene.init) {
      this.currentScene.init(data);
    }

    console.log(`切换到场景: ${name}`);
  }

  /**
   * 更新当前场景
   */
  update(deltaTime) {
    if (this.currentScene && this.currentScene.update) {
      this.currentScene.update(deltaTime);
    }
  }

  /**
   * 渲染当前场景
   */
  render() {
    if (this.currentScene && this.currentScene.render) {
      this.currentScene.render();
    }
  }
}

module.exports = SceneManager;
