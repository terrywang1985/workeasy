# 快速参考

## 📂 项目结构速查

```
weixin_workeasy/
├── game.js                  # 入口文件
├── game.json                # 游戏配置
├── js/
│   ├── SceneManager.js      # 场景管理器
│   ├── BaseScene.js         # 场景基类
│   ├── scenes/              # 场景目录
│   │   ├── MainScene.js     # 主界面
│   │   ├── LevelsScene.js   # 选关界面
│   │   └── GameScene.js     # 游戏界面
│   └── levels/              # 关卡目录（每关一个文件）
│       ├── BaseLevel.js     # 关卡基类
│       ├── index.js         # 关卡注册表
│       ├── Level31.js       # 第31关
│       └── LevelTemplate.js # 关卡模板
└── 文档/
    ├── README.md            # 项目说明
    ├── QUICKSTART.md        # 快速开始
    ├── HOW_TO_ADD_LEVEL.md  # 添加关卡教程
    └── PROJECT_SUMMARY.md   # 项目总览
```

---

## ⚡ 快速命令

### 添加新关卡（3步）

```bash
# 1. 复制模板
cp js/levels/LevelTemplate.js js/levels/Level32.js

# 2. 编辑 Level32.js
# 3. 在 js/levels/index.js 中注册
```

### 运行项目

1. 打开微信开发者工具
2. 选择"小游戏"项目类型
3. 导入 `weixin_workeasy` 目录
4. 编译运行

---

## 🎮 关卡文件模板

```javascript
import BaseLevel from './BaseLevel.js';

class Level32 extends BaseLevel {
  constructor() {
    super();
    this.id = 32;
    this.name = '关卡名称';
    this.story = '剧情描述...';
    this.elements = [
      // 场景元素配置
    ];
  }

  onElementClick(element) {
    // 点击处理逻辑
    if (element.id === 'xxx') {
      this.gameState = 'success'; // 通关
    }
  }
}

export default Level32;
```

---

## 📋 元素类型速查

### 角色（character）
```javascript
{
  id: 'player',
  name: '玩家',
  type: 'character',
  x: 100, y: 400,
  clickable: false,
  expression: 'normal' // normal, happy, sad
}
```

### 对象（object）
```javascript
{
  id: 'door',
  name: '门',
  type: 'object',
  x: 280, y: 200,
  width: 120, height: 180,
  clickable: true
}
```

### 道具（item）
```javascript
{
  id: 'key',
  name: '钥匙',
  type: 'item',
  x: 450, y: 400,
  clickable: true
}
```

---

## 🔧 常用方法

### 关卡基类方法

| 方法 | 说明 | 必须实现 |
|------|------|----------|
| `onElementClick(element)` | 处理元素点击 | ✅ |
| `customRender(ctx)` | 自定义渲染 | ❌ |
| `getSuccessMessage()` | 成功消息 | ❌ |
| `getFailMessage()` | 失败消息 | ❌ |
| `reset()` | 重置关卡 | ❌ |

### 显示提示

```javascript
// 成功提示
wx.showToast({
  title: '成功！',
  icon: 'success',
  duration: 1000
});

// 普通提示
wx.showToast({
  title: '提示文字',
  icon: 'none',
  duration: 1500
});
```

### 元素控制

```javascript
// 隐藏元素
element.visible = false;

// 修改表情
element.expression = 'happy';

// 通关
this.gameState = 'success';

// 失败
this.gameState = 'failed';
```

---

## 🎨 配色方案

| 用途 | 颜色值 | 预览 |
|------|--------|------|
| 背景 | `#F5E6D3` | 米黄色 |
| 主色 | `#8B4513` | 棕色 |
| 文字 | `#333` | 深灰 |
| 成功 | `#4CAF50` | 绿色 |
| 失败 | `#F44336` | 红色 |

---

## 🐛 常见问题

### Q: 点击没反应？
```javascript
// 检查1：clickable 是否为 true
clickable: true

// 检查2：坐标是否正确
console.log(`点击了: ${element.name}`);
```

### Q: 元素不显示？
```javascript
// 检查：visible 是否为 false
element.visible = true;
```

### Q: 如何调试？
```javascript
// 在 onElementClick 中添加日志
onElementClick(element) {
  console.log('点击:', element);
}
```

---

## 📞 获取帮助

- 📖 详细文档：`README.md`
- 🎯 添加关卡：`HOW_TO_ADD_LEVEL.md`
- 🚀 快速开始：`QUICKSTART.md`
- 📊 项目总览：`PROJECT_SUMMARY.md`

---

## 🎯 开发检查清单

创建新关卡时：
- [ ] 复制 `LevelTemplate.js` 并重命名
- [ ] 修改 `id`, `name`, `story`
- [ ] 配置 `elements` 数组
- [ ] 实现 `onElementClick()` 方法
- [ ] 在 `index.js` 中导入关卡
- [ ] 在 `levelRegistry` 中注册
- [ ] 测试通关和失败流程
- [ ] 测试重置功能

---

**提示**：保存此文件以便随时查阅！📌
