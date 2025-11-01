# 快速开始指南

## 准备工作

1. **下载微信开发者工具**
   - 访问：https://developers.weixin.qq.com/minigame/dev/devtools/download.html
   - 下载并安装微信开发者工具

2. **创建小游戏项目**
   - 打开微信开发者工具
   - 选择 "小游戏" 项目类型（重要！）
   - 导入本项目目录

## 项目结构说明

```
weixin_workeasy/
├── game.js              ← 游戏主入口（类似于小程序的 app.js）
├── game.json            ← 游戏配置
├── project.config.json  ← 项目配置
├── js/
│   ├── SceneManager.js  ← 场景管理器
│   ├── BaseScene.js     ← 场景基类
│   ├── scenes/          ← 三个核心场景
│   │   ├── MainScene.js     # 主界面
│   │   ├── LevelsScene.js   # 选关界面
│   │   └── GameScene.js     # 游戏界面
│   └── data/
│       └── levels.js    ← 关卡数据配置
└── README.md
```

## 运行步骤

1. 打开微信开发者工具
2. 点击 "+" 新建项目
3. 项目类型选择：**小游戏**（不是小程序！）
4. 项目目录：选择 `weixin_workeasy` 文件夹
5. AppID：选择 "测试号" 或使用自己的 AppID
6. 点击 "确定" 创建项目
7. 等待编译完成，即可在模拟器中看到游戏

## 游戏玩法

### 主界面
- 点击 "开始游戏" 进入选关界面

### 选关界面
- 第一关（31关）可点击进入
- 其他关卡为灰色锁定状态
- 左上角可返回主界面

### 第一关（31关）- 上班迟到
**目标**：偷偷进入公司，避开老板检查

**解谜步骤**：
1. 先点击右侧的 **扫帚**（玩家会拿起扫帚伪装）
2. 再点击中间的 **公司大门**（伪装成清洁工进入）
3. 成功！🎉

**错误示例**：
- 直接点门（未伪装）→ 失败，老板会发现
- 点击快递箱 → 提示"现在用不上..."
- 点击老板 → 提示"老板正在严肃地查岗..."

## 常见问题

### Q1: 为什么打开后是空白的？
A: 请确保选择的是 "小游戏" 项目类型，而不是 "小程序"

### Q2: 提示找不到 game.js？
A: 检查项目目录是否正确，game.js 应该在项目根目录

### Q3: 如何调试？
A: 
- 点击微信开发者工具顶部的 "调试器"
- 查看 Console 面板的日志输出
- 使用 `console.log()` 添加调试信息

### Q4: 如何添加新关卡？
A: 参考 `README.md` 中的 "如何添加新关卡" 章节

## 技术要点

### 微信小游戏 vs 微信小程序

| 特性 | 小游戏 | 小程序 |
|------|--------|--------|
| 入口文件 | game.js | app.js |
| 渲染方式 | Canvas | WXML + WXSS |
| 适用场景 | 游戏、动画 | 应用、表单 |
| 性能 | 高（直接绘制） | 中（DOM渲染） |

### Canvas 绘制
- 使用 `wx.createCanvas()` 创建画布
- 通过 `ctx.fillRect()`, `ctx.arc()` 等 API 绘制图形
- 使用游戏循环 `requestAnimationFrame()` 持续渲染

### 事件处理
- `wx.onTouchStart()` - 触摸开始
- `wx.onTouchEnd()` - 触摸结束
- `wx.onTouchMove()` - 触摸移动

## 下一步

1. **运行游戏**：按照上述步骤运行游戏，体验第一关
2. **查看代码**：阅读各个场景的代码，理解实现逻辑
3. **添加关卡**：尝试添加第二关（32关）
4. **美化界面**：优化简笔画绘制，添加更多细节
5. **扩展功能**：添加音效、动画、存档等功能

## 获取帮助

- 微信小游戏开发文档：https://developers.weixin.qq.com/minigame/dev/guide/
- Canvas API 文档：https://developers.weixin.qq.com/minigame/dev/api/render/canvas/Canvas.html

---

**祝您开发愉快！** 🎮
