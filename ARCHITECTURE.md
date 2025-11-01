# 项目架构图

## 整体架构

```mermaid
graph TB
    A[game.js 游戏入口] --> B[SceneManager 场景管理器]
    B --> C[MainScene 主界面]
    B --> D[LevelsScene 选关界面]
    B --> E[GameScene 游戏场景]
    E --> F[levels.js 关卡数据]
    C --> G[BaseScene 基类]
    D --> G
    E --> G
```

## 场景流转

```mermaid
graph LR
    A[主界面] -->|点击开始| B[选关界面]
    B -->|点击返回| A
    B -->|点击关卡| C[游戏场景]
    C -->|点击返回| B
    C -->|通关成功| B
    C -->|重试| C
```

## 游戏主循环

```mermaid
graph TD
    A[启动游戏] --> B[初始化 Canvas]
    B --> C[创建 SceneManager]
    C --> D[注册三个场景]
    D --> E[切换到主界面]
    E --> F[进入游戏循环]
    F --> G[清空画布]
    G --> H[更新当前场景]
    H --> I[渲染当前场景]
    I --> J{继续运行?}
    J -->|是| F
    J -->|否| K[结束]
```

## 关卡系统

```mermaid
graph TD
    A[关卡数据 levels.js] --> B[GameScene 读取]
    B --> C[绘制场景元素]
    C --> D[监听触摸事件]
    D --> E{点击了什么?}
    E -->|扫帚| F[玩家伪装]
    E -->|门已伪装| G[通关成功]
    E -->|门未伪装| H[失败]
    E -->|其他| I[显示提示]
    F --> D
    G --> J[显示成功弹窗]
    H --> K[显示失败弹窗]
    I --> D
```

## 文件依赖关系

```
game.js
├── SceneManager.js
│   ├── MainScene.js
│   │   └── BaseScene.js
│   ├── LevelsScene.js
│   │   ├── BaseScene.js
│   │   └── levels.js
│   └── GameScene.js
│       ├── BaseScene.js
│       └── levels.js
```

## 类结构

```
BaseScene (基类)
├── 属性
│   ├── canvas
│   ├── ctx
│   ├── config
│   └── sceneManager
├── 方法
│   ├── init()
│   ├── update()
│   ├── render()
│   ├── destroy()
│   ├── drawText()
│   ├── drawButton()
│   ├── drawCircleButton()
│   ├── drawStickman()
│   ├── isPointInRect()
│   └── isPointInCircle()

MainScene extends BaseScene
├── 属性
│   └── startButton
└── 方法
    ├── init()
    ├── render()
    └── onTouchEnd()

LevelsScene extends BaseScene
├── 属性
│   ├── levels
│   ├── backButton
│   ├── helpButton
│   └── levelButtons
└── 方法
    ├── init()
    ├── render()
    ├── drawTopBar()
    ├── drawLevelGrid()
    └── onTouchEnd()

GameScene extends BaseScene
├── 属性
│   ├── levelId
│   ├── levelData
│   ├── gameState
│   ├── clickedItems
│   ├── playerDisguised
│   └── elements
└── 方法
    ├── init()
    ├── render()
    ├── drawTopInfo()
    ├── drawSceneElements()
    ├── drawCharacter()
    ├── drawObject()
    ├── drawItem()
    ├── drawGameResult()
    ├── handleElementClick()
    ├── onElementClick()
    └── handleLevel31Click()
```

## 数据流

```
用户点击
    ↓
wx.onTouchEnd
    ↓
Scene.onTouchEnd()
    ↓
碰撞检测
    ↓
业务逻辑处理
    ↓
更新游戏状态
    ↓
下一帧渲染
```

## Canvas 绘制层次

```
Canvas 画布
├── 背景色 (fillRect)
├── 场景元素层
│   ├── 公司大门 (矩形 + 门把手)
│   ├── 角色 (简笔画)
│   └── 道具 (扫帚、箱子)
├── UI层
│   ├── 顶部信息栏
│   ├── 剧情文字框
│   └── 按钮
└── 弹窗层 (成功/失败)
    ├── 半透明遮罩
    ├── 弹窗背景
    ├── 提示文字
    └── 重试按钮
```

---

**说明**：以上架构图展示了整个游戏的核心结构和数据流向
