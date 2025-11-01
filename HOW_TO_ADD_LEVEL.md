# 如何添加新关卡

## 快速开始（3步搞定）

### 第1步：创建关卡文件

1. 复制模板文件：`js/levels/LevelTemplate.js`
2. 重命名为：`js/levels/Level[编号].js`
   - 例如：`Level32.js`（第32关）
   - 例如：`Level33.js`（第33关）

### 第2步：编辑关卡内容

打开新建的关卡文件，修改以下内容：

```javascript
class Level32 extends BaseLevel {  // ← 改类名
  constructor() {
    super();
    
    // 修改关卡信息
    this.id = 32;              // ← 改关卡编号
    this.name = '加班危机';     // ← 改关卡名称
    this.story = '老板突然要求加班...'; // ← 改剧情
    
    // 配置场景元素
    this.elements = [
      // 添加你的元素...
    ];
  }
  
  // 实现解谜逻辑
  onElementClick(element) {
    // 编写你的逻辑...
  }
}

export default Level32;  // ← 改导出名
```

### 第3步：注册关卡

打开 `js/levels/index.js`，添加两行代码：

```javascript
import Level31 from './Level31.js';
import Level32 from './Level32.js';  // ← 添加这行

const levelRegistry = {
  31: Level31,
  32: Level32,  // ← 添加这行
};
```

**完成！** 🎉 现在可以在选关界面看到新关卡了！

---

## 详细教程

### 关卡文件结构

```javascript
const BaseLevel = require('./BaseLevel.js');

class Level32 extends BaseLevel {
  constructor() {
    super();
    
    // 1. 基本信息
    this.id = 32;
    this.name = '关卡名称';
    this.story = '剧情描述';
    
    // 2. 状态变量（可选）
    this.hasKey = false;
    this.doorOpened = false;
    
    // 3. 场景元素
    this.elements = [ /* ... */ ];
  }
  
  // 4. 点击处理（必须实现）
  onElementClick(element) { /* ... */ }
  
  // 5. 自定义渲染（可选）
  customRender(ctx) { /* ... */ }
  
  // 6. 自定义消息（可选）
  getSuccessMessage() { return '成功消息'; }
  getFailMessage() { return '失败消息'; }
  
  // 7. 重置逻辑（可选）
  reset() { /* ... */ }
}

module.exports = Level32;
```

---

## 元素类型详解

### 1. 角色类型（character）

```javascript
{
  id: 'player',           // 唯一ID
  name: '玩家',           // 显示名称
  type: 'character',      // 类型
  x: 100,                 // X坐标
  y: 400,                 // Y坐标
  clickable: false,       // 是否可点击
  expression: 'normal'    // 表情：normal, happy, sad
}
```

**特点**：
- 自动绘制简笔画人物
- 支持三种表情
- 圆形碰撞检测（半径50）

### 2. 对象类型（object）

```javascript
{
  id: 'door',
  name: '门',
  type: 'object',
  x: 280,
  y: 200,
  width: 120,    // 必须：宽度
  height: 180,   // 必须：高度
  clickable: true
}
```

**特点**：
- 需要自定义绘制（在 GameScene.js 的 drawObject 方法中）
- 矩形碰撞检测

### 3. 道具类型（item）

```javascript
{
  id: 'key',
  name: '钥匙',
  type: 'item',
  x: 450,
  y: 400,
  clickable: true
}
```

**特点**：
- 需要自定义绘制（在 GameScene.js 的 drawItem 方法中）
- 圆形碰撞检测（半径50）

### 4. 动态隐藏元素

```javascript
// 在点击处理中隐藏元素
onElementClick(element) {
  if (element.id === 'key') {
    element.visible = false;  // 设置为不可见
  }
}
```

---

## 解谜逻辑示例

### 示例1：顺序点击

```javascript
constructor() {
  super();
  this.clickSequence = [];  // 记录点击顺序
  this.correctSequence = ['button1', 'button2', 'button3'];
}

onElementClick(element) {
  this.clickSequence.push(element.id);
  
  // 检查顺序
  if (this.clickSequence.join(',') === this.correctSequence.join(',')) {
    this.gameState = 'success';
  }
}
```

### 示例2：收集道具

```javascript
constructor() {
  super();
  this.items = [];  // 已收集的道具
}

onElementClick(element) {
  if (element.type === 'item') {
    this.items.push(element.id);
    element.visible = false;  // 隐藏已收集的道具
    
    // 检查是否收集齐全
    if (this.items.length === 3) {
      this.gameState = 'success';
    }
  }
}
```

### 示例3：条件判断

```javascript
constructor() {
  super();
  this.hasKey = false;
}

onElementClick(element) {
  if (element.id === 'key') {
    this.hasKey = true;
    wx.showToast({ title: '拿到钥匙！' });
  } else if (element.id === 'door') {
    if (this.hasKey) {
      this.gameState = 'success';
    } else {
      wx.showToast({ title: '需要钥匙', icon: 'none' });
    }
  }
}
```

---

## 自定义绘制

### 在关卡中绘制特效

```javascript
customRender(ctx) {
  // 绘制进度条
  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(50, 50, this.progress * 2, 20);
  
  // 绘制文字提示
  ctx.fillStyle = '#333';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`收集进度: ${this.items.length}/3`, 300, 100);
}
```

### 为元素添加高亮

```javascript
customRender(ctx) {
  if (this.highlightElement) {
    const elem = this.elements.find(e => e.id === this.highlightElement);
    if (elem) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 5;
      ctx.strokeRect(elem.x - 10, elem.y - 10, elem.width + 20, elem.height + 20);
    }
  }
}
```

---

## 添加新物体类型

如果要添加关卡特有的物体，需要在 `GameScene.js` 中添加绘制逻辑：

### 1. 在 drawObject 方法中添加

```javascript
drawObject(element) {
  const ctx = this.ctx;

  if (element.id === 'door') {
    // 现有的门绘制逻辑...
  } else if (element.id === 'computer') {  // ← 新增
    // 绘制电脑
    ctx.fillStyle = '#333';
    ctx.fillRect(element.x, element.y, element.width, element.height);
    ctx.fillStyle = '#4A90E2';
    ctx.fillRect(element.x + 5, element.y + 5, element.width - 10, element.height - 10);
  }
}
```

### 2. 在关卡中使用

```javascript
this.elements = [
  {
    id: 'computer',
    name: '电脑',
    type: 'object',
    x: 200,
    y: 300,
    width: 100,
    height: 80,
    clickable: true
  }
];
```

---

## 完整示例：第32关

```javascript
/**
 * 第32关 - 修电脑
 */
const BaseLevel = require('./BaseLevel.js');

class Level32 extends BaseLevel {
  constructor() {
    super();
    
    this.id = 32;
    this.name = '修电脑';
    this.story = '电脑坏了，IT说要重启试试...';
    
    this.isRebooted = false;
    
    this.elements = [
      {
        id: 'player',
        name: '我',
        type: 'character',
        x: 100,
        y: 400,
        clickable: false,
        expression: 'sad'
      },
      {
        id: 'computer',
        name: '电脑',
        type: 'object',
        x: 250,
        y: 250,
        width: 100,
        height: 80,
        clickable: true
      },
      {
        id: 'powerButton',
        name: '电源键',
        type: 'item',
        x: 450,
        y: 350,
        clickable: true
      }
    ];
  }

  onElementClick(element) {
    if (element.id === 'powerButton') {
      if (!this.isRebooted) {
        this.isRebooted = true;
        wx.showToast({
          title: '重启中...',
          icon: 'loading',
          duration: 2000
        });
        
        setTimeout(() => {
          wx.showToast({
            title: '重启完成！',
            icon: 'success'
          });
        }, 2000);
      }
    } else if (element.id === 'computer') {
      if (this.isRebooted) {
        this.gameState = 'success';
      } else {
        wx.showToast({
          title: '电脑还是黑屏的...',
          icon: 'none'
        });
      }
    }
  }

  getSuccessMessage() {
    return 'IT：看吧，重启就好了！';
  }

  reset() {
    super.reset();
    this.isRebooted = false;
  }
}

module.exports = Level32;
```

---

## 常见问题

### Q: 元素点击没反应？
A: 检查 `clickable: true` 是否设置，并确保坐标正确

### Q: 如何调试关卡？
A: 在 `onElementClick` 中使用 `console.log()` 查看点击信息

### Q: 如何修改元素位置？
A: 直接修改 `this.elements` 数组中的 `x` 和 `y` 值

### Q: 如何添加计时器？
A: 在 `init()` 中启动计时器，在 `customRender()` 中显示时间

---

## 最佳实践

1. **命名规范**：元素ID使用驼峰命名，如 `powerButton`
2. **状态管理**：所有状态变量在 `constructor` 中定义
3. **重置逻辑**：记得在 `reset()` 中重置所有状态
4. **用户提示**：使用 `wx.showToast()` 给出明确反馈
5. **注释说明**：在文件顶部写清楚解谜思路

---

**祝您开发愉快！** 🎮

有问题欢迎查看 `LevelTemplate.js` 和 `Level31.js` 的代码！
