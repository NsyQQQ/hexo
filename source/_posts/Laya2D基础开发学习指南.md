---
title: Laya2D 入门指南
date: 2025-05-11 00:00:00
tags: [游戏开发, Laya2D]
categories: 技术教程
---

LayaAir是一款高性能的HTML5游戏引擎，支持2D和3D开发。本文将介绍Laya2D开发的基础知识和核心概念，帮助你快速入门Laya游戏开发。

<!-- more -->

## 一、LayaAir简介

LayaAir是layabox公司推出的HTML5游戏引擎，具有以下特点：

- **高性能**：采用WebGL加速，渲染效率高
- **多语言**：支持TypeScript、JavaScript、ActionScript
- **全平台**：支持Web、iOS、Android
- **工具完善**：提供可视化编辑器LayaAir IDE

---

## 二、开发环境搭建

### 2.1 安装Node.js

```bash
# 检查Node.js版本
node -v

# 建议使用LTS版本
# 下载地址：https://nodejs.org
```

### 2.2 安装LayaAir CLI

```bash
# 全局安装LayaAir CLI
npm install -g layaair-cli

# 创建项目
layair create MyGame

# 进入项目目录
cd MyGame

# 安装依赖
npm install

# 编译项目
npm run build

# 开启开发服务器
npm run dev
```

### 2.3 项目结构

```
MyGame/
├── src/
│   ├── Main.ts              # 入口文件
│   ├── GameConfig.ts        # 游戏配置
│   └── scenes/              # 场景目录
│       └── GameScene.ts
├── bin/                     # 编译输出目录
├── layaair.config           # 项目配置
└── package.json
```

---

## 三、TypeScript基础

Laya2D推荐使用TypeScript进行开发。

### 3.1 变量与类型

```typescript
// 基础类型
let name: string = '玩家';
let level: number = 1;
let health: number = 100.5;
let isAlive: boolean = true;

// 数组
let skills: string[] = ['火球术', '冰冻术'];
let enemies: Array<number> = [1, 2, 3, 4, 5];

// 枚举
enum ItemType {
    Weapon = 1,
    Armor = 2,
    Potion = 3
}

// 接口
interface Player {
    name: string;
    level: number;
    health: number;
    attack(): number;
}
```

### 3.2 类与继承

```typescript
class GameObject {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    getPosition(): {x: number, y: number} {
        return { x: this.x, y: this.y };
    }
}

class Enemy extends GameObject {
    hp: number;
    speed: number;
    
    constructor(x: number, y: number, hp: number) {
        super(x, y);
        this.hp = hp;
        this.speed = 2;
    }
    
    move(direction: number): void {
        this.x += this.speed * direction;
    }
}
```

---

## 四、Laya2D核心概念

### 4.1 舞台与场景

```typescript
import Laya from 'laya';

// 初始化舞台
Laya.init(750, 1334, Laya.WebGL);

// 获取舞台引用
let stage = Laya.stage;

// 设置舞台背景色
stage.bgColor = '#000000';
```

### 4.2 精灵 Sprite

```typescript
import Sprite from 'laya/display/Sprite';

// 创建精灵
let sprite = new Sprite();

// 绘制矩形
sprite.graphics.drawRect(0, 0, 100, 100, '#ff0000');

// 设置位置
sprite.x = 100;
sprite.y = 200;

// 添加到舞台
Laya.stage.addChild(sprite);
```

### 4.3 节点操作

```typescript
// 添加子节点
container.addChild(sprite);

// 移除子节点
container.removeChild(sprite);

// 销毁节点
sprite.destroy();

// 设置层级（显示在最前）
sprite.zOrder = 1;

// 设置锚点
sprite.pivotX = 50;
sprite.pivotY = 50;
```

---

## 五、显示图片

### 5.1 加载单张图片

```typescript
import Texture from 'laya/resource/Texture';

// 方法1：直接加载
let img = new Sprite();
img.graphics.drawTexture(Texture.load('res/player.png'), 0, 0);
Laya.stage.addChild(img);

// 方法2：使用Image组件
import Image from 'laya/ui/Image';
let image = new Image();
image.skin = 'res/player.png';
Laya.stage.addChild(image);
```

### 5.2 加载图集

```typescript
import Animation from 'laya/display/Animation';

// 加载图集
Animation.createFrames(['res/hero/run1.png', 'res/hero/run2.png'], 'run');

// 播放动画
let anim = new Animation();
anim.play(0, true, 'run');
anim.interval = 100; // 播放间隔（毫秒）
Laya.stage.addChild(anim);
```

---

## 六、文本显示

### 6.1 文字文本

```typescript
import Text from 'laya/display/Text';

let text = new Text();
text.text = 'Hello Laya!';
text.font = 'Microsoft YaHei';
text.fontSize = 24;
text.color = '#ffffff';
text.x = 100;
text.y = 100;
Laya.stage.addChild(text);
```

### 6.2 位图字体

```typescript
import BitmapFont from 'laya/display/BitmapFont';

// 加载位图字体
let font = new BitmapFont();
font.loadFont('res/font/test.fnt', new Text());

// 使用位图字体
let text = new Text();
text.bitmapFont = font;
text.text = '分数：1000';
Laya.stage.addChild(text);
```

---

## 七、事件系统

### 7.1 鼠标/触摸事件

```typescript
// 开启交互
sprite.mouseEnabled = true;

// 点击事件
sprite.on(Laya.Event.CLICK, this, this.onSpriteClick);

// 鼠标按下/抬起
sprite.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
sprite.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);

// 鼠标移入/移出
sprite.on(Laya.Event.MOUSE_OVER, this, this.onMouseOver);
sprite.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);

private onSpriteClick(): void {
    console.log('点击了精灵');
}
```

### 7.2 常用事件类型

| 事件 | 说明 |
|------|------|
| CLICK | 点击 |
| MOUSE_DOWN | 按下 |
| MOUSE_UP | 抬起 |
| MOUSE_MOVE | 移动 |
| MOUSE_OVER | 移入 |
| MOUSE_OUT | 移出 |
| DRAG_START | 开始拖拽 |
| DRAG_MOVE | 拖拽中 |
| DRAG_END | 结束拖拽 |

### 7.3 拖拽示例

```typescript
// 启用拖拽
sprite.dragEnable = true;

// 自定义拖拽
sprite.on(Laya.Event.MOUSE_DOWN, this, this.startDrag);
sprite.on(Laya.Event.MOUSE_MOVE, this, this.doDrag);
sprite.on(Laya.Event.MOUSE_UP, this, this.endDrag);

private startDrag(): void {
    this.dragOffsetX = this.sprite.x - Laya.stage.mouseX;
    this.dragOffsetY = this.sprite.y - Laya.stage.mouseY;
}

private doDrag(): void {
    this.sprite.x = Laya.stage.mouseX + this.dragOffsetX;
    this.sprite.y = Laya.stage.mouseY + this.dragOffsetY;
}
```

---

## 八、动画与缓动

### 8.1 帧动画

```typescript
import Animation from 'laya/display/Animation';

// 创建动画
let anim = new Animation();

// 加载动画图集
anim.loadAtlas('res/animations/hero.json');

// 播放动画
anim.play(0, true, 'run');  // 从第0帧开始，循环播放，动画名为run

// 设置播放速度
anim.scale = 1.5;  // 1.5倍速

Laya.stage.addChild(anim);
```

### 8.2 简单缓动动画

```typescript
import Tween from 'laya/utils/Tween';
import Ease from 'laya/utils/Ease';

// 位移动画
Tween.to(sprite, { x: 500, y: 300 }, 1000, Ease.quadOut);

// 渐变动画
Tween.to(sprite, { alpha: 0 }, 500);

// 缩放动画
Tween.to(sprite, { scaleX: 1.5, scaleY: 1.5 }, 300);

// 链式动画
Tween.to(sprite, { x: 300 }, 500)
    .to(sprite, { y: 300 }, 500)
    .to(sprite, { x: 0 }, 500);
```

### 8.3 常用缓动函数

- `linear` - 线性
- `quadOut` / `quadIn` - 二次缓动
- `cubicOut` / `cubicIn` - 三次缓动
- `elasticOut` - 弹性缓动
- `bounceOut` - 弹跳缓动

---

## 九、UI组件

### 9.1 按钮 Button

```typescript
import Button from 'laya/ui/Button';
import Skin from 'laya/ui/Skin';

let btn = new Button('res/btn.png', '开始游戏');
btn.pos(200, 300);
btn.size(200, 60);
btn.labelFont = 'Microsoft YaHei';
btn.labelSize = 24;
btn.labelColors = '#ffffff,#ffffff,#cccccc';

btn.on(Laya.Event.CLICK, this, this.onBtnClick);
Laya.stage.addChild(btn);

private onBtnClick(): void {
    console.log('按钮被点击');
}
```

### 9.2 进度条 ProgressBar

```typescript
import ProgressBar from 'laya/ui/ProgressBar';

let progress = new ProgressBar('res/progress_bg.png', 'res/progress_bar.png');
progress.pos(100, 200);
progress.size(400, 30);
progress.value = 0.5;  // 0-1之间
Laya.stage.addChild(progress);

// 动态更新
progress.value = 0.8;
```

### 9.3 列表 List

```typescript
import List from 'laya/ui/List';
import Box from 'laya/ui/Box';

// 创建列表
let list = new List();
list.itemRender = ItemBox;
list.repeatX = 4;  // 列数
list.repeatY = 2;  // 行数
list.spaceX = 10;
list.spaceY = 10;

// 设置数据源
list.array = [
    { name: 'Item1', icon: 'res/icon1.png' },
    { name: 'Item2', icon: 'res/icon2.png' },
    // ...
];

Laya.stage.addChild(list);

// ItemBox类
class ItemBox extends Box {
    constructor() {
        super();
        this.size(100, 100);
        // 添加显示内容
    }
}
```

---

## 十、碰撞检测

### 10.1 矩形碰撞

```typescript
// 检测两个矩形是否碰撞
function hitTestRect(obj1: Laya.Sprite, obj2: Laya.Sprite): boolean {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}
```

### 10.2 圆形碰撞

```typescript
// 检测两个圆形是否碰撞
function hitTestCircle(x1: number, y1: number, r1: number,
                       x2: number, y2: number, r2: number): boolean {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (r1 + r2);
}
```

### 10.3 Laya物理引擎（可选）

```typescript
import Box2D from 'layaBox2D';

// 初始化物理世界
let world = new Box2D.b2World(new Box2D.b2Vec2(0, 10));

// 创建刚体
let bodyDef = new Box2D.b2BodyDef();
bodyDef.position.Set(100, 100);
let body = world.CreateBody(bodyDef);

// 创建形状
let shape = new Box2D.b2PolygonShape();
shape.SetAsBox(50, 50);

// 创建夹具
let fixtureDef = new Box2D.b2FixtureDef();
fixtureDef.shape = shape;
fixtureDef.density = 1;
body.CreateFixture(fixtureDef);
```

---

## 十一、资源管理

### 11.1 预加载资源

```typescript
import Loader from 'laya/net/Loader';

// 预加载单个资源
Loader.load('res/image/bg.jpg', Laya.Handler.create(this, () => {
    console.log('加载完成');
}));

// 预加载多个资源
let resources = [
    'res/image/bg.jpg',
    'res/image/player.png',
    'res/atlas/hero.json'
];
Loader.load(resources, Laya.Handler.create(this, () => {
    console.log('全部加载完成');
}), Laya.Handler.create(this, (progress) => {
    console.log('加载进度:', progress);
}));
```

### 11.2 图集加载

```typescript
// 加载图集
Loader.loadAtlas('res/atlas/hero.json', Laya.Handler.create(this, () => {
    // 使用图集中的图片
    let img = new Sprite();
    img.graphics.drawTexture(Loader.getRes('res/hero/attack1.png'), 0, 0);
    Laya.stage.addChild(img);
}));
```

---

## 十二、常用技巧

### 12.1 屏幕适配

```typescript
import Stage from 'laya/display/Stage';

// 适配模式
Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
// SCALE_SHOWALL - 显示全部，保持宽高比
// SCALE_EXACTFIT - 强制完全显示，可能变形
// SCALE_NOSCALE - 不缩放
// SCALE_FULL - 全屏显示
```

### 12.2 定时器

```typescript
import Timer from 'laya/utils/Timer';

// 延迟执行
Laya.timer.once(1000, this, this.doSomething);

// 循环执行
Laya.timer.loop(1000, this, this.doLoop);

// 停止定时器
Laya.timer.clear(this, this.doLoop);
```

### 12.3 本地存储

```typescript
// 保存数据
localStorage.setItem('playerName', 'hero');
localStorage.setItem('score', '1000');

// 读取数据
let name = localStorage.getItem('playerName');
let score = parseInt(localStorage.getItem('score'));
```

---

## 十三、学习路线建议

### 阶段一：环境搭建与基础（1周）
- 安装LayaAir CLI
- 创建第一个项目
- 了解TypeScript基础
- 掌握Sprite和Graphics

### 阶段二：核心功能（1-2周）
- 事件系统
- 动画与缓动
- UI组件开发
- 资源加载

### 阶段三：游戏开发（2-3周）
- 碰撞检测
- 常用游戏逻辑
- 完整项目实战

---

## 十四、总结

Laya2D是一个功能强大的HTML5游戏引擎：

1. **高性能** - WebGL加速，渲染流畅
2. **TypeScript** - 支持强类型，开发效率高
3. **工具完善** - LayaAir IDE可视化开发
4. **社区活跃** - 丰富的教程和示例

建议多动手实践，从简单Demo开始，逐步掌握游戏开发的技巧。祝你学习愉快！🎮

---

