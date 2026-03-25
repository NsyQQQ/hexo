---
title: Cocos Creator 入门指南
date: 2025-07-10 11:05:00
tags: [Cocos Creator, 游戏开发, 入门]
categories: [技术教程, 游戏开发]
---

Cocos Creator 是一款面向中小型开发者的国产游戏引擎，采用 TypeScript/JavaScript 作为开发语言，支持一键发布到 Web、iOS、Android、HarmonyOS 等多平台。本文将带领你快速上手 Cocos Creator。

<!-- more -->

## 1. 环境准备

### 1.1 下载安装

访问 Cocos Creator 官网（https://www.cocos.com/creator）下载最新版本。

**系统要求：**
- Windows 10 及以上 / macOS 10.14 及以上
- 至少 8GB 内存
- 支持 WebGL 2.0 的显卡

### 1.2 安装 Node.js

Cocos Creator 需要 Node.js 环境，建议安装 LTS 版本：

```bash
# Windows
# 前往 https://nodejs.org 下载安装

# macOS
brew install nodejs

# Linux
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

验证安装：
```bash
node -v
npm -v
```

## 2. 第一个项目

### 2.1 创建项目

1. 打开 Cocos Creator
2. 点击「新建项目」
3. 选择「Hello World」模板
4. 设置项目路径和名称
5. 点击「创建」

### 2.2 项目结构

```
my-game/
├── assets/           # 资源文件夹
│   ├── scenes/      # 场景文件
│   ├── scripts/     # 脚本文件
│   ├── prefabs/     # 预制体
│   └── textures/   # 纹理图片
├── build/           # 构建输出
├── settings/        # 项目设置
└── project.json     # 项目配置
```

## 3. 核心概念

### 3.1 场景（Scene）

场景是游戏的基本单位，包含游戏的所有内容。

- **根节点**：场景最顶层的节点
- **层级管理器**：管理场景中所有节点

### 3.2 节点（Node）

节点是场景的基本元素，可以包含组件来实现各种功能。

```typescript
// 创建一个新节点
const node = new cc.Node('myNode');
this.node.addChild(node);

// 设置节点位置
node.setPosition(100, 200);
```

### 3.3 组件（Component）

组件赋予节点各种功能。

**常用组件：**
- `Sprite`：显示图片
- `Label`：显示文本
- `Button`：按钮
- `RichText`：富文本
- `Animation`：动画
- `RigidBody`：物理刚体
- `Collider`：碰撞体

### 3.4 预制体（Prefab）

预制体是可复用的节点模板，类似于 Unity 的 Prefab。

```typescript
// 加载预制体
cc.resources.load('prefab/enemy', cc.Prefab, (err, prefab) => {
    const enemy = cc.instantiate(prefab);
    this.node.addChild(enemy);
});
```

## 4. 脚本开发

### 4.1 创建脚本

在 `assets/scripts` 目录下新建 TypeScript 文件：

```typescript
// Player.ts
import { _decorator, Component, Sprite, Input, input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(Sprite)
    sprite: Sprite = null;

    @property
    speed: number = 200;

    onLoad() {
        // 注册键盘输入
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.node.setPosition(this.node.position.x - this.speed * 0.1, this.node.position.y);
                break;
            case KeyCode.ARROW_RIGHT:
                this.node.setPosition(this.node.position.x + this.speed * 0.1, this.node.position.y);
                break;
        }
    }
}
```

### 4.2 组件系统

Cocos Creator 采用组件化架构：

```typescript
import { _decorator, Component } from 'cc';

@ccclass('GameManager')
export class GameManager extends Component {
    private static _instance: GameManager = null;
    
    public static get instance(): GameManager {
        return GameManager._instance;
    }

    onLoad() {
        GameManager._instance = this;
    }

    start() {
        console.log('游戏开始！');
    }

    update(dt: number) {
        // 每帧调用
    }
}
```

## 5. 常用功能

### 5.1 资源加载

```typescript
// 加载图片
cc.resources.load('textures/hero', cc.SpriteFrame, (err, spriteFrame) => {
    this.getComponent(Sprite).spriteFrame = spriteFrame;
});

// 加载音频
cc.resources.load('audio/bgm', cc.AudioClip, (err, clip) => {
    cc.audioEngine.playMusic(clip, true);
});
```

### 5.2 场景切换

```typescript
// 切换场景
cc.director.loadScene('MainScene');

// 预加载场景
cc.director.preloadScene('MainScene', () => {
    console.log('场景预加载完成');
});
```

### 5.3 本地存储

```typescript
// 存储数据
cc.sys.localStorage.setItem('playerName', 'Hero');
cc.sys.localStorage.setItem('score', '1000');

// 读取数据
const name = cc.sys.localStorage.getItem('playerName');
const score = parseInt(cc.sys.localStorage.getItem('score'));
```

### 5.4 触摸事件

```typescript
import { _decorator, Component, Node, Touch, EventTouch } from 'cc';

@ccclass('TouchExample')
export class TouchExample extends Component {
    onEnable() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(touch: Touch, event: EventTouch) {
        console.log('触摸开始');
    }

    onTouchMove(touch: Touch, event: EventTouch) {
        const delta = touch.getDelta();
        this.node.setPosition(this.node.position.x + delta.x, this.node.position.y + delta.y);
    }

    onTouchEnd(touch: Touch, event: EventTouch) {
        console.log('触摸结束');
    }
}
```

## 6. 发布项目

### 6.1 Web 发布

1. 点击菜单「项目」→「构建发布」
2. 选择「Web」平台
3. 配置发布选项
4. 点击「构建」
5. 构建完成后点击「运行」预览

### 6.2 原生发布

**iOS：**
- 需要 macOS 和 Xcode
- 配置 App ID 和证书
- 构建后用 Xcode 打开并打包

**Android：**
- 配置 JDK 和 Android SDK
- 设置包名和签名
- 构建 APK/AAB

### 6.3 微信小游戏

1. 安装微信开发者工具
2. 选择「微信小游戏」平台构建
3. 使用小游戏适配器

## 7. 调试技巧

### 7.1 日志输出

```typescript
console.log('普通日志');
console.warn('警告信息');
console.error('错误信息');
```

### 7.2 断点调试

1. 在 VS Code 中安装 Cocos Creator 扩展
2. 点击「调试」→「启动调试」
3. 设置断点进行调试

### 7.3 性能分析

使用 Profiler 工具查看：
- FPS 帧率
- 内存占用
- 绘制调用次数
- 物理计算耗时

## 8. 学习资源

- [Cocos Creator 官方文档](https://docs.cocos.com/creator/manual/zh/)
- [Cocos Creator API](https://docs.cocos.com/creator/api/zh/)
- [Cocos Store 资源商店](https://store.cocos.com/)
- [Cocos 论坛](https://forum.cocos.com/)

## 总结

本文介绍了 Cocos Creator 的基本使用方法，包括：

1. 环境配置和项目创建
2. 核心概念（场景、节点、组件、预制体）
3. TypeScript 脚本开发
4. 常用功能（资源加载、场景切换、存储）
5. 项目发布流程
6. 调试技巧

掌握这些基础后，你就可以开始自己的游戏开发之旅了！祝你开发愉快 🎮
