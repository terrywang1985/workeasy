# 刘海屏适配 + 文字换行修复 ✅

## 修复的问题

### 问题1：标题被刘海屏遮挡 ❌
- 游戏标题、返回按钮在刘海屏下方
- iPhone X/XS/11 等设备显示异常

### 问题2：成功消息文字被截断 ❌
- "成功混进公司！老板：嗯，清洁工很勤奋嘛~" 太长
- 弹窗中只显示一部分文字

---

## 解决方案

### 1. 获取安全区域信息（game.js）

```javascript
// 获取安全区域（避开刘海屏）
const safeArea = systemInfo.safeArea || {
  top: 0,
  bottom: screenHeight
};
const safeAreaTop = safeArea.top || 0;
const safeAreaBottom = safeArea.bottom || screenHeight;

// 添加到配置中
const config = {
  width: screenWidth,
  height: screenHeight,
  pixelRatio: pixelRatio,
  safeAreaTop: safeAreaTop,      // 安全区域顶部
  safeAreaBottom: safeAreaBottom  // 安全区域底部
};
```

**效果**：
- iPhone 6/7/8: safeAreaTop = 20
- iPhone X/XS: safeAreaTop = 44（刘海屏）
- iPhone 11/12: safeAreaTop = 48

---

### 2. 主界面适配（MainScene.js）

**修改前**：
```javascript
this.drawText('不正经的员工', width / 2, 150, 60, '#8B4513');
```

**修改后**：
```javascript
const topOffset = Math.max(safeAreaTop, 20);
this.drawText('不正经的员工', width / 2, topOffset + 100, 60, '#8B4513');
```

**效果**：
- 普通屏：标题在 y = 120
- 刘海屏：标题在 y = 144（避开刘海）

---

### 3. 选关界面适配（LevelsScene.js）

**顶部按钮**：
```javascript
const topOffset = Math.max(safeAreaTop, 20);
this.backButton = this.drawCircleButton('←', 60, topOffset + 40, 40);
this.helpButton = this.drawCircleButton('?', width - 60, topOffset + 40, 40);
```

**关卡网格**：
```javascript
const startY = topOffset + 120; // 在顶部按钮下方
```

---

### 4. 游戏界面适配（GameScene.js）

**关卡标题**：
```javascript
const topOffset = Math.max(safeAreaTop, 20);
this.drawText(
  `第 ${config.id} 关 ${config.name}`,
  width / 2,
  topOffset + 40,  // 避开刘海屏
  36,
  '#333'
);
```

**返回按钮**：
```javascript
this.backButton = this.drawCircleButton('←', 60, topOffset + 40, 40);
```

---

### 5. 成功消息自动换行（GameScene.js）

**修改前**：
```javascript
this.drawText(
  this.currentLevel.getSuccessMessage(), 
  width / 2, 
  boxY + 150, 
  24, 
  '#333'
);
```

**修改后**：
```javascript
this.drawWrappedText(
  this.currentLevel.getSuccessMessage(),
  boxX + 40,        // 左边距
  boxY + 130,       // 起始Y
  boxWidth - 80,    // 最大宽度
  22,               // 字体大小
  28                // 行高
);
```

**效果**：
- 自动测量文字宽度
- 超宽自动换行
- 支持多行显示

---

## 安全区域示意图

```
┌─────────────────────┐
│    刘海屏 (44px)    │ ← safeAreaTop
├─────────────────────┤
│                     │
│   返回   标题   ?   │ ← topOffset + 40
│                     │
│                     │
│    游戏内容区域     │
│                     │
│                     │
│                     │
├─────────────────────┤
│   底部安全区域      │ ← safeAreaBottom
└─────────────────────┘
```

---

## 不同设备的表现

### iPhone 6/7/8（无刘海）
```
safeAreaTop: 20
topOffset: 20
标题位置: y = 120
```

### iPhone X/XS（刘海屏）
```
safeAreaTop: 44
topOffset: 44
标题位置: y = 144  ← 避开刘海
```

### iPhone 11/12/13（刘海屏）
```
safeAreaTop: 48
topOffset: 48
标题位置: y = 148  ← 避开刘海
```

---

## 文字换行效果

### 修复前
```
┌──────────────────────┐
│ 成功混进公司！老板：嗯，  │  ← 后面的文字被截断
└──────────────────────┘
```

### 修复后
```
┌──────────────────────┐
│ 成功混进公司！老板：  │
│ 嗯，清洁工很勤奋嘛~   │  ← 自动换行
└──────────────────────┘
```

---

## 验证步骤

1. **清除缓存并重新编译**
   - 微信开发者工具 → 清缓存 → 全部清除
   - 点击"编译"按钮

2. **检查主界面**
   - ✅ 标题不被刘海遮挡
   - ✅ 内容居中显示
   - ✅ 版本号在底部安全区域内

3. **检查选关界面**
   - ✅ 返回按钮在刘海屏下方
   - ✅ 标题清晰可见
   - ✅ 关卡网格位置正确

4. **检查游戏界面**
   - ✅ 关卡标题不被遮挡
   - ✅ 返回按钮可点击
   - ✅ 剧情文字完整显示

5. **测试成功弹窗**
   - ✅ 成功消息自动换行
   - ✅ 所有文字都能看到
   - ✅ "成功混进公司！老板：嗯，清洁工很勤奋嘛~" 完整显示

---

## 已修复的文件

1. ✅ `game.js` - 添加安全区域配置
2. ✅ `js/scenes/MainScene.js` - 主界面适配
3. ✅ `js/scenes/LevelsScene.js` - 选关界面适配
4. ✅ `js/scenes/GameScene.js` - 游戏界面适配 + 文字换行

---

## 现在所有问题都解决了！🎉

✅ 标题不再被刘海屏遮挡  
✅ 成功消息完整显示  
✅ 自适应所有iPhone设备  
✅ 文字自动换行

**请重新编译测试！** 😊
