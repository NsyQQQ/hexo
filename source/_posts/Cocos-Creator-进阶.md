---
title: Cocos Creator 进阶教程
date: 2025-06-11 11:01:00
tags: [Cocos Creator, 游戏开发, 进阶, TypeScript]
categories: [技术教程, 游戏开发]
---

Cocos Creator 是一款面向中小型开发者的国产游戏引擎，采用 TypeScript/JavaScript 作为开发语言，支持一键发布到 Web、iOS、Android、HarmonyOS 等多平台。本文将带领你快速上手 Cocos Creator。

<!-- more -->

## 进阶开发的核心技能

本文是《Cocos Creator 入门指南》的进阶篇，将深入讲解物理系统、动画系统、性能优化等高级内容，帮助你构建更复杂的游戏项目。

## 1. 物理系统

### 1.1 刚体与碰撞体

Cocos Creator 内置了 Box2D 物理引擎，支持刚体、碰撞体等物理组件。

```typescript
import { _decorator, Component, RigidBody, BoxCollider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PhysicsPlayer')
export class PhysicsPlayer extends Component {
    @property(RigidBody)
    rigidBody: RigidBody = null;

    @property
    jumpForce: number = 500;

    start() {
        // 启用物理
        this.rigidBody.enabled = true;
    }

    jump() {
        // 施加向上的力
        this.rigidBody.applyForceToCenter(cc.v3(0, this.jumpForce, 0));
    }

    // 碰撞回调
    onBeginContact(selfCollider: BoxCollider, otherCollider: BoxCollider, contact: any) {
        console.log('碰撞开始');
    }
}
```

### 1.2 物理类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| Dynamic | 动态刚体，受重力影响 | 玩家、敌人 |
| Static | 静态刚体，不移动 | 地面、墙壁 |
| Kinematic | 运动学刚体，可手动控制移动 | 移动平台 |

### 1.3 碰撞检测

```typescript
// 触发器检测
onBeginContact(selfCollider: BoxCollider, otherCollider: BoxCollider, contact: any) {
    if (otherCollider.group === 1) { // 收集金币
        this.collectCoin(otherCollider.node);
    }
}

// 射线检测
update() {
    const origin = this.node.position;
    const direction = cc.v3(0, -1, 0);
    const result = PhysicsSystem.instance.raycast(origin, direction, 1);
    
    if (result.length > 0) {
        console.log('检测到物体:', result[0].collider.node.name);
    }
}
```

## 2. 动画系统

### 2.1 骨骼动画

Cocos Creator 支持 Spine 和 DragonBones 骨骼动画。

```typescript
import { _decorator, Component, Skeleton } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterAnim')
export class CharacterAnim extends Component {
    @property(Skeleton)
    skeleton: Skeleton = null;

    playAnim(animName: string, loop: boolean = true) {
        this.skeleton.setAnimation(0, animName, loop);
    }

    // 动画事件
    setAnimEvent() {
        const track = this.skeleton.getAnimationState(0);
        track.setEventListener((entry: any, event: any) => {
            console.log('动画事件:', event.data.name);
        });
    }
}
```

### 2.2 动画状态机

```typescript
import { _decorator, Component, Animation, AnimationState } from 'cc';

@ccclass('AnimController')
export class AnimController extends Component {
    private anim: Animation = null;
    private stateMap: Map<string, AnimationState> = new Map();

    onLoad() {
        this.anim = this.node.getComponent(Animation)!;
    }

    changeState(stateName: string) {
        // 停止当前动画
        this.anim.stop();
        
        // 播放新动画
        const state = this.anim.play(stateName);
        this.stateMap.set(stateName, state);
    }

    // 带过渡的切换
    crossFade(stateName: string, duration: number = 0.3) {
        this.anim.crossFade(stateName, duration);
    }
}
```

### 2.3 粒子系统

```typescript
import { _decorator, Component, ParticleSystem } from 'cc';

@ccclass('VFXManager')
export class VFXManager extends Component {
    @property(ParticleSystem)
    explosionFX: ParticleSystem = null;

    playExplosion(position: cc.Vec3) {
        this.explosionFX.node.setPosition(position);
        this.explosionFX.play();
        
        // 自动停止
        this.explosionFX.stop();
        setTimeout(() => {
            this.explosionFX.node.destroy();
        }, 2000);
    }
}
```

## 3. UI 高级应用

### 3.1 适配策略

```typescript
// 监听屏幕尺寸变化
import { screen } from 'cc';

screen.on('window-resize', () => {
    console.log('屏幕尺寸变化');
    this.adjustUI();
});

// 智能适配
adjustUI() {
    const designSize = cc.view.getDesignResolutionSize();
    const visibleSize = cc.view.getVisibleSize();
    
    // 根据比例调整
    const scale = Math.min(
        visibleSize.width / designSize.width,
        visibleSize.height / designSize.height
    );
    
    this.node.setScale(scale, scale);
}
```

### 3.2 动态创建 UI

```typescript
createButton(callback: Function, target: any) {
    const btnNode = new cc.Node('DynamicButton');
    btnNode.addComponent(cc.Sprite);
    btnNode.addComponent(cc.Button);
    
    const label = new cc.Node('Label');
    label.addComponent(cc.Label);
    label.getComponent(cc.Label)!.string = '点击我';
    btnNode.addChild(label);
    
    // 添加点击事件
    const button = btnNode.getComponent(cc.Button)!;
    button.clickEvents.push({
        target: target,
        component: target.getTypeName(),
        handler: 'onButtonClick',
        customEventData: 'someData'
    });
    
    this.node.addChild(btnNode);
}
```

### 3.3 列表渲染

```typescript
import { _decorator, Component, ScrollView, Prefab, Node } from 'cc';
import { instantiate } from 'cc';

@ccclass('ItemList')
export class ItemList extends Component {
    @property(ScrollView)
    scrollView: ScrollView = null;

    @property(Prefab)
    itemPrefab: Prefab = null;

    private itemData: any[] = [];

    init(data: any[]) {
        this.itemData = data;
        this.render();
    }

    render() {
        const content = this.scrollView.content!;
        content.removeAllChildren();
        
        this.itemData.forEach((item, index) => {
            const itemNode = instantiate(this.itemPrefab);
            itemNode.getChildByName('Label')!.getComponent(cc.Label)!.string = item.name;
            content.addChild(itemNode);
        });
    }
}
```

## 4. 性能优化

### 4.1 节点池

```typescript
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';

@ccclass('ObjectPool')
export class ObjectPool extends Component {
    private pool: Node[] = [];
    
    @property(Prefab)
    prefab: Prefab = null;

    get(): Node {
        if (this.pool.length > 0) {
            const node = this.pool.pop()!;
            node.active = true;
            return node;
        }
        return instantiate(this.prefab);
    }

    put(node: Node) {
        node.active = false;
        this.pool.push(node);
    }
}
```

### 4.2 资源预加载

```typescript
// 批量预加载
preloadAssets() {
    const resources = [
        'textures/hero',
        'textures/enemy',
        'prefabs/bullet',
        'audio/bgm'
    ];
    
    let loadedCount = 0;
    resources.forEach(res => {
        cc.resources.load(res, (err) => {
            loadedCount++;
            if (loadedCount === resources.length) {
                console.log('全部预加载完成');
                this.onLoadComplete();
            }
        });
    });
}
```

### 4.3 帧率控制

```typescript
// 设置目标帧率
cc.game.setFrameRate(60);

// 根据设备性能动态调整
const isLowEndDevice = () => {
    return cc.sys.platform === cc.sys.ANDROID || 
           cc.sys.platform === cc.sys.IPHONE;
};

if (isLowEndDevice()) {
    cc.game.setFrameRate(30);
}
```

### 4.4 渲染优化

```typescript
// 静态合批
enableStaticBatching() {
    const sprite = this.node.getComponent(cc.Sprite);
    if (sprite) {
        sprite.enableDynamicAtlas();
    }
}

// 禁用不在屏幕内的节点
checkVisible() {
    const camera = cc.find('MainCamera').getComponent(cc.Camera);
    const isVisible = camera.isNodeVisible(this.node);
    this.node.active = isVisible;
}
```

## 5. 脚本通信

### 5.1 事件系统

```typescript
// 发送全局事件
import { Director, EventTarget } from 'cc';

const gameEvents = new EventTarget();

// 发送事件
gameEvents.emit('scoreUpdate', { score: 100 });

// 监听事件
gameEvents.on('scoreUpdate', (data) => {
    console.log('得分:', data.score);
});

// 一次性监听
gameEvents.once('gameStart', () => {
    console.log('游戏开始');
});
```

### 5.2 消息总线

```typescript
// 消息类型定义
enum MessageType {
    PLAYER_JUMP = 'PLAYER_JUMP',
    ENEMY_DEAD = 'ENEMY_DEAD',
    SCORE_CHANGE = 'SCORE_CHANGE'
}

// 消息中心
class MessageCenter {
    private listeners: Map<string, Function[]> = new Map();

    subscribe(type: string, callback: Function) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type)!.push(callback);
    }

    publish(type: string, data?: any) {
        const callbacks = this.listeners.get(type);
        if (callbacks) {
            callbacks.forEach(cb => cb(data));
        }
    }
}

export const messageCenter = new MessageCenter();
```

### 5.3 模块间通信

```typescript
// 通过节点访问
const player = cc.find('Player');
const playerScript = player.getComponent('Player');

// 通过系统单例
class GameManager {
    private static _instance: GameManager = null;
    public static get instance() {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager();
        }
        return GameManager._instance;
    }
    
    public score: number = 0;
    public level: number = 1;
}

// 使用
GameManager.instance.score += 10;
```

## 6. 网络与存储

### 6.1 HTTP 请求

```typescript
import { _decorator, Component, HttpRequest } from 'cc';

@ccclass('NetworkManager')
export class NetworkManager extends Component {
    private httpRequest(url: string, callback: Function) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                callback(null, data);
            } else {
                callback(new Error('请求失败'));
            }
        };
        
        xhr.send();
    }

    // POST 请求
    post(url: string, data: any, callback: Function) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(null, JSON.parse(xhr.responseText));
            }
        };
        
        xhr.send(JSON.stringify(data));
    }
}
```

### 6.2 WebSocket

```typescript
class SocketManager {
    private ws: WebSocket = null;

    connect(url: string) {
        this.ws = new WebSocket(url);
        
        this.ws.onopen = () => {
            console.log('连接成功');
        };
        
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
        };
        
        this.ws.onclose = () => {
            console.log('连接关闭');
        };
    }

    send(type: string, data: any) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, data }));
        }
    }

    private handleMessage(data: any) {
        console.log('收到消息:', data);
    }
}
```

### 6.3 数据持久化

```typescript
// 本地存储封装
class StorageManager {
    static setItem(key: string, value: any) {
        const data = JSON.stringify(value);
        cc.sys.localStorage.setItem(key, data);
    }

    static getItem<T>(key: string, defaultValue?: T): T {
        const data = cc.sys.localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return defaultValue || null;
    }

    static removeItem(key: string) {
        cc.sys.localStorage.removeItem(key);
    }
}

// 使用
StorageManager.setItem('playerData', { name: 'Hero', level: 10 });
const player = StorageManager.getItem('playerData');
```

## 7. 常用第三方库

### 7.1 数据结构

```typescript
// 使用 Sets 和 Maps
const enemySet = new Set<string>();
enemySet.add('skeleton');
enemySet.add('orc');
console.log(enemySet.has('skeleton'));

// 字典
const skillMap = new Map<string, any>();
skillMap.set('fire', { damage: 100, cost: 50 });
skillMap.set('ice', { damage: 80, cost: 40 });
```

### 7.2 数学计算

```typescript
// 向量运算
const pos1 = cc.v3(1, 2, 3);
const pos2 = cc.v3(4, 5, 6);

// 距离
const distance = pos1.sub(pos2).length();

// 点积
const dot = pos1.dot(pos2);

// 插值
const lerpPos = pos1.lerp(pos2, 0.5);

// 角度
const angle = cc.math.radToDeg(Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x));
```

### 7.3 正则表达式

```typescript
// 验证输入
const validateName = (name: string): boolean => {
    return /^[a-zA-Z0-9_]{3,16}$/.test(name);
};

// 解析URL
const parseURL = (url: string) => {
    const match = url.match(/(\w+):\/\/([^\/]+)\/(.*)$/);
    if (match) {
        return { protocol: match[1], host: match[2], path: match[3] };
    }
    return null;
};
```

## 8. 调试与发布

### 8.1 日志系统

```typescript
class Logger {
    static debug(msg: string, ...args: any[]) {
        if (CC_DEBUG) {
            console.debug(`[DEBUG] ${msg}`, ...args);
        }
    }

    static info(msg: string, ...args: any[]) {
        console.log(`[INFO] ${msg}`, ...args);
    }

    static warn(msg: string, ...args: any[]) {
        console.warn(`[WARN] ${msg}`, ...args);
    }

    static error(msg: string, ...args: any[]) {
        console.error(`[ERROR] ${msg}`, ...args);
    }
}
```

### 8.2 构建配置

```json
{
  "android": {
    "packageName": "com.example.mygame",
    "versionName": "1.0.0",
    "versionCode": 1,
    "keystore": "release.keystore",
    "alias": "release"
  },
  "ios": {
    "bundleId": "com.example.mygame",
    "version": "1.0.0"
  }
}
```

## 总结

本文介绍了 Cocos Creator 的进阶开发技巧，包括：

1. **物理系统** - 刚体、碰撞体、射线检测
2. **动画系统** - 骨骼动画、状态机、粒子效果
3. **UI 高级应用** - 适配策略、动态创建、列表渲染
4. **性能优化** - 对象池、资源预加载、渲染优化
5. **脚本通信** - 事件系统、消息总线、模块通信
6. **网络与存储** - HTTP、WebSocket、本地存储
7. **常用工具** - 数据结构、数学计算、正则表达式
8. **调试发布** - 日志系统、构建配置

掌握这些技能后，你就可以开发更复杂的游戏项目了。祝你开发愉快 🎮
