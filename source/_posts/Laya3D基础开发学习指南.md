---
title: Laya3D入门
date: 2025-10-10 00:00:00
tags: [游戏开发, Laya3D, 3D游戏]
categories: 技术教程
---

LayaAir不仅支持2D开发，还提供了强大的3D游戏开发能力。本文将介绍Laya3D开发的基础知识和核心概念，帮助你快速入门3D游戏开发。

<!-- more -->

## 一、Laya3D简介

LayaAir是layabox推出的HTML5 3D游戏引擎，具有以下特点：

- **高性能3D渲染**：基于WebGL，支持数十万面数的3D场景
- **多语言支持**：TypeScript、JavaScript、ActionScript
- **全平台发布**：Web、iOS、Android
- **完善的工作流**：支持主流3D模型格式（FBX、OBJ等）

---

## 二、开发环境搭建

### 2.1 安装LayaAir CLI

```bash
# 全局安装LayaAir CLI
npm install -g layaair-cli

# 创建3D项目
layair create My3DGame --type 3d

# 进入项目目录
cd My3DGame

# 安装依赖
npm install

# 编译项目
npm run build

# 开启开发服务器
npm run dev
```

### 2.2 项目结构

```
My3DGame/
├── src/
│   ├── Main.ts              # 入口文件
│   ├── GameConfig.ts        # 游戏配置
│   ├── scenes/              # 场景目录
│   │   └── GameScene.ts
│   └── scripts/             # 脚本目录
├── assets/                  # 资源目录
│   ├── models/              # 3D模型
│   ├── textures/            # 纹理贴图
│   └── scenes/              # 场景文件
├── bin/                     # 编译输出目录
├── layaair.config           # 项目配置
└── package.json
```

---

## 三、TypeScript基础

Laya3D推荐使用TypeScript进行开发。

### 3.1 变量与类型

```typescript
// 基础类型
let playerName: string = 'Hero';
let level: number = 1;
let health: number = 100.5;
let isAlive: boolean = true;

// 3D向量
import Vector3 from 'laya/d3/math/Vector3';
let position: Vector3 = new Vector3(0, 0, 0);
let direction: Vector3 = new Vector3(1, 0, 0);

// 数组
let skills: string[] = ['火球术', '冰冻术'];
let vertices: Float32Array = new Float32Array(1000);
```

### 3.2 类与继承

```typescript
import Sprite3D from 'laya/d3/core/Sprite3D';

class Character extends Sprite3D {
    hp: number = 100;
    speed: number = 5;
    
    constructor(name: string) {
        super(name);
    }
    
    move(direction: Vector3, delta: number): void {
        let pos = this.transform.position;
        Vector3.add(pos, direction, pos);
        this.transform.position = pos;
    }
    
    takeDamage(damage: number): void {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die();
        }
    }
    
    private die(): void {
        this.destroy();
    }
}
```

---

## 四、Laya3D核心概念

### 4.1 初始化3D引擎

```typescript
import Laya from 'laya';
import Config from 'laya/Config3D';

class Main {
    constructor() {
        // 初始化3D引擎
        Laya3D.init(0, 0, true, Config3D.default TransparentBlack);
        
        // 获取舞台
        let stage = Laya.stage;
        
        // 设置屏幕适配
        stage.scaleMode = Laya.Stage.SCALE_FULL;
        stage.screenMode = Laya.Stage.SCREEN_NONE;
        
        // 加载场景
        this.loadScene();
    }
    
    private loadScene(): void {
        // 创建场景
        let scene = Laya.Scene3D.load('res/scene/MainScene.ls');
        Laya.stage.addChild(scene);
    }
}

new Main();
```

### 4.2 场景 Scene3D

```typescript
import Scene3D from 'laya/d3/core/Scene3D';
import DirectionLight from 'laya/d3/core light/DirectionLight';
import Vector3 from 'laya/d3/math/Vector3';

// 创建场景
let scene = new Scene3D();

// 添加方向光
let light = new DirectionLight();
light.direction = new Vector3(-1, -1, -1);
light.intensity = 1.0;
scene.addChild(light);

// 添加环境光
scene.ambientColor = new Vector3(0.5, 0.5, 0.5);

// 添加雾效果
scene.fogColor = new Vector3(0.7, 0.7, 0.7);
scene.fogStart = 50;
scene.fogRange = 200;
```

### 4.3 摄像机 Camera

```typescript
import Camera from 'laya/d3/core/Camera';
import Vector3 from 'laya/d3/math/Vector3';

// 创建摄像机
let camera = new Camera();
camera.transform.position = new Vector3(0, 10, 20);
camera.transform.lookAt(new Vector3(0, 0, 0));

// 设置视野角度
camera.fieldOfView = 60;

// 设置近远裁剪面
camera.nearPlane = 0.1;
camera.farPlane = 1000;

// 添加到场景
scene.addChild(camera);

// 获取屏幕坐标对应的3D射线
let ray = camera.screenPointToRay(screenX, screenY);
```

---

## 五、3D对象与变换

### 5.1 创建3D对象

```typescript
import Sprite3D from 'laya/d3/core/Sprite3D';
import MeshSprite3D from 'laya/d3/core/MeshSprite3D';
import PrimitiveMesh from 'laya/d3/resource/models/PrimitiveMesh';

// 创建空对象
let emptyNode = new Sprite3D('Empty');
scene.addChild(emptyNode);

// 创建立方体
let box = MeshSprite3D.create(PrimitiveMesh.createBox(1, 1, 1));
box.transform.position = new Vector3(0, 0, 0);
scene.addChild(box);

// 创建球体
let sphere = MeshSprite3D.create(PrimitiveMesh.createSphere(1, 16, 16));
sphere.transform.position = new Vector3(2, 0, 0);
scene.addChild(sphere);

// 创建圆柱体
let cylinder = MeshSprite3D.create(PrimitiveMesh.createCylinder(0.5, 2, 16));
scene.addChild(cylinder);
```

### 5.2 变换Transform

```typescript
import Transform3D from 'laya/d3/core/Transform3D';
import Vector3 from 'laya/d3/math/Vector3';
import Quaternion from 'laya/d3/math/Quaternion';

// 设置位置
object.transform.position = new Vector3(x, y, z);

// 设置旋转（欧拉角）
object.transform.rotationEuler = new Vector3(45, 0, 0);

// 设置旋转（四元数）
object.transform.rotation = new Quaternion(0, 0, 0, 1);

// 设置缩放
object.transform.scale = new Vector3(1, 1, 1);

// 平移
object.transform.translate(new Vector3(0, 1, 0));

// 旋转
object.transform.rotate(new Vector3(0, 90, 0), true);

// 缩放
object.transform.scale(new Vector3(2, 2, 2));

// 获取世界变换
let worldMatrix = object.transform.worldMatrix;
```

---

## 六、材质与渲染

### 6.1 创建材质

```typescript
import BlinnPhongMaterial from 'laya/d3/core/material/BlinnPhongMaterial';
import Texture2D from 'laya/resource/Texture2D';

// 创建Blinn-Phong材质
let material = new BlinnPhongMaterial();

// 设置漫反射颜色
material.albedoColor = new Vector3(1, 0, 0);

// 加载纹理
let texture = Texture2D.load('res/textures/wood.png');
material.albedoTexture = texture;

// 设置高光
material.specularColor = new Vector3(1, 1, 1);
material.shininess = 32;

// 应用材质到模型
model.meshRender.material = material;
```

### 6.2 PBR材质

```typescript
import PBRMaterial from 'laya/d3/core/material/PBRMaterial';

// 创建PBR材质
let pbrMaterial = new PBRMaterial();

// 设置基础颜色
pbrMaterial.albedoColor = new Vector3(0.8, 0.2, 0.2);

// 设置金属度（0=非金属，1=金属）
pbrMaterial.metallic = 0.8;

// 设置粗糙度（0=光滑，1=粗糙）
pbrMaterial.roughness = 0.3;

// 加载环境贴图
pbrMaterial.envTexture = skyboxTexture;

// 应用材质
model.meshRender.material = pbrMaterial;
```

### 6.3 透明材质

```typescript
// 设置透明
material.transparency = 0.5;  // 0-1，1完全透明

// 设置混合模式
material.blendMode = Laya.RenderableProperty3D.BLEND_ALPHA;

// 开启深度写入（解决透明排序问题）
material.depthWrite = false;
```

---

## 七、灯光系统

### 7.1 方向光 DirectionLight

```typescript
import DirectionLight from 'laya/d3/core/light/DirectionLight';
import Vector3 from 'laya/d3/math/Vector3';

let dirLight = new DirectionLight();
dirLight.direction = new Vector3(-1, -2, -1);
dirLight.intensity = 1.0;
dirLight.color = new Vector3(1, 1, 1);
scene.addChild(dirLight);

// 开启阴影
dirLight.shadow = true;
dirLight.shadowDistance = 50;
dirLight.shadowResolution = 2048;
```

### 7.2 点光源 PointLight

```typescript
import PointLight from 'laya/d3/core/light/PointLight';

let pointLight = new PointLight();
pointLight.transform.position = new Vector3(0, 5, 0);
pointLight.intensity = 1.0;
pointLight.range = 20;  // 照射范围
scene.addChild(pointLight);
```

### 7.3 聚光灯 SpotLight

```typescript
import SpotLight from 'laya/d3/core/light/SpotLight';

let spotLight = new SpotLight();
spotLight.transform.position = new Vector3(0, 10, 0);
spotLight.direction = new Vector3(0, -1, 0);
spotLight.intensity = 2.0;
spotLight.spotAngle = 45;   // 聚光角度
spotLight.range = 30;       // 照射范围
scene.addChild(spotLight);
```

---

## 八、摄像机控制

### 8.1 简单摄像机跟随

```typescript
import Camera from 'laya/d3/core/Camera';
import Vector3 from 'laya/d3/math/Vector3';

class CameraFollow {
    private camera: Camera;
    private target: Sprite3D;
    private offset: Vector3 = new Vector3(0, 5, -10);
    
    constructor(camera: Camera, target: Sprite3D) {
        this.camera = camera;
        this.target = target;
    }
    
    update(): void {
        if (!this.target) return;
        
        let targetPos = this.target.transform.position;
        let newPos = new Vector3();
        Vector3.add(targetPos, this.offset, newPos);
        
        // 平滑移动
        Vector3.lerp(this.camera.transform.position, newPos, 0.1, newPos);
        this.camera.transform.position = newPos;
        
        // 看向目标
        this.camera.transform.lookAt(targetPos);
    }
}
```

### 8.2 自由视角控制

```typescript
import CameraController from 'laya/d3/component/CameraController';

let camera = scene.getChildByName('MainCamera') as Camera;

// 添加相机控制器
let controller = camera.addComponent(CameraController) as CameraController;

// 配置参数
controller.distance = 10;
controller.minDistance = 2;
controller.maxDistance = 50;
controller.rotationSpeed = 0.005;
controller.panSpeed = 0.5;
```

---

## 九、动画系统

### 9.1 骨骼动画

```typescript
import Animator from 'laya/d3/component/Animator';
import AnimationClip from 'laya/d3/resource/models/AnimationClip';

// 加载带动画的模型
let hero = Sprite3D.load('res/models/hero.lh');

// 获取动画组件
let animator = hero.getComponent(Animator) as Animator;

// 播放动画
animator.play('Run');

// 混合动画
animator.crossFade('Run', 0.3);

// 播放指定片段
animator.play('Attack', 0, 1.0, true);  // 从0帧到1.0（结尾），循环播放

// 停止动画
animator.stop();
```

### 9.2 动画事件

```typescript
animator.on(Laya.Event.COMPLETE, this, () => {
    console.log('动画播放完成');
});

// 监听特定帧
animator.on('attackHit', this, () => {
    // 触发攻击伤害判定
    this.checkAttackHit();
});
```

### 9.3 程序化动画

```typescript
import Tween from 'laya/d3/animator/KeyframeUtils';

// 使用缓动动画
Laya.Tween.to(object.transform.position, {
    x: 10,
    y: 5,
    z: 0
}, 1000, Laya.Ease.quadOut);

// 每帧更新
Laya.timer.frameLoop(1, this, this.update);

private update(): void {
    this.object.transform.rotate(new Vector3(0, 1, 0), true);
}
```

---

## 十、碰撞检测

### 10.1 碰撞器组件

```typescript
import PhysicsCollider from 'laya/d3/physics/PhysicsCollider';
import BoxColliderShape from 'laya/d3/physics/shape/BoxColliderShape';
import SphereColliderShape from 'laya/d3/physics/shape/SphereColliderShape';

// 添加碰撞器
let collider = object.addComponent(PhysicsCollider) as PhysicsCollider;

// 添加盒子碰撞体
let boxShape = new BoxColliderShape(1, 1, 1);
collider.addShape(boxShape);

// 添加球体碰撞体
let sphereShape = new SphereColliderShape(0.5);
collider.addShape(sphereShape);

// 设置碰撞组
collider.group = 1;  // 自己的组
collider.canCollideWith = 2;  // 可以碰撞的组
```

### 10.2 射线检测

```typescript
import Ray from 'laya/d3/math/Ray';
import Vector3 from 'laya/d3/math/Vector3';

// 创建射线
let ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, -1, 0));

// 检测碰撞
let hitResult = scene.physicsManager.rayCast(ray, 100);

// 检测所有碰撞
let hitResults = scene.physicsManager.rayCastAll(ray, 100);

if (hitResults.length > 0) {
    let firstHit = hitResults[0];
    console.log('击中物体:', firstHit.collider.owner.name);
}
```

### 10.3 触发器

```typescript
// 设置为触发器
collider.isTrigger = true;

// 监听触发事件
collider.on(Laya.Event.TRIGGER_ENTER, this, (other: PhysicsCollider) => {
    console.log('进入触发器:', other.owner.name);
});

collider.on(Laya.Event.TRIGGER_STAY, this, (other: PhysicsCollider) => {
    console.log('停留在触发器');
});

collider.on(Laya.Event.TRIGGER_EXIT, this, (other: PhysicsCollider) => {
    console.log('离开触发器:', other.owner.name);
});
```

---

## 十一、物理引擎

### 11.1 刚体组件

```typescript
import Rigidbody3D from 'laya/d3/physics/Rigidbody3D';

// 添加刚体
let rigidbody = object.addComponent(Rigidbody3D) as Rigidbody3D;

// 设置质量
rigidbody.mass = 10;

// 设置摩擦力
rigidbody.friction = 0.5;

// 设置弹性
rigidbody.restitution = 0.3;

// 设置为运动学刚体（不受物理影响，由代码控制）
rigidbody.isKinematic = true;

// 应用力
rigidbody.applyForce(new Vector3(0, 100, 0));

// 应用冲量
rigidbody.applyImpulse(new Vector3(0, 50, 0));

// 设置速度
rigidbody.linearVelocity = new Vector3(0, 0, 10);

// 设置角速度
rigidbody.angularVelocity = new Vector3(0, 10, 0);
```

### 11.2 角色控制器

```typescript
import CharacterController from 'laya/d3/physics/CharacterController';

// 添加角色控制器
let characterController = object.addComponent(CharacterController) as CharacterController;

// 设置步高
characterController.stepHeight = 0.5;

// 设置爬坡角度
characterController.slopeLimit = 45;

// 移动
characterController.move(new Vector3(0, 0, 1), 0.1);

// 跳跃
characterController.jump(new Vector3(0, 10, 0));
```

---

## 十二、资源管理

### 12.1 加载3D模型

```typescript
import Sprite3D from 'laya/d3/core/Sprite3D';

// 加载lh文件（预制体）
Sprite3D.load('res/models/player.lh', Laya.Handler.create(this, (sprite) => {
    scene.addChild(sprite);
}));

// 加载FBX/OBJ（需要转换）
// 先使用LayaAir Converter转换格式
Sprite3D.load('res/models/mesh.lm', Laya.Handler.create(this, (sprite) => {
    scene.addChild(sprite);
}));
```

### 12.2 加载纹理

```typescript
import Texture2D from 'laya/resource/Texture2D';

Texture2D.load('res/textures/wood.png', Laya.Handler.create(this, (texture) => {
    material.albedoTexture = texture;
}));
```

### 12.3 加载场景

```typescript
import Scene3D from 'laya/d3/core/Scene3D';

// 加载场景
Scene3D.load('res/scene/MainScene.ls', Laya.Handler.create(this, (scene) => {
    Laya.stage.addChild(scene);
}));
```

---

## 十三、UI与3D交互

### 13.1 3D物体上的UI

```typescript
import WorldSpaceCanvas from 'laya/d3/core/WorldSpaceCanvas';

// 创建世界空间UI
let worldUI = scene.addChild(new WorldSpaceCanvas()) as WorldSpaceCanvas;

// 设置位置（在3D空间中）
worldUI.transform.position = new Vector3(0, 2, 0);

// 设置大小
worldUI.width = 500;
worldUI.height = 300;
```

### 13.2 点击3D物体

```typescript
// 在Camera上添加脚本处理点击
import Camera from 'laya/d3/core/Camera';

let camera = scene.getChildByName('MainCamera') as Camera;
camera.enableMouse = true;

camera.on(Laya.Event.MOUSE_DOWN, this, (e: MouseEvent) => {
    let ray = camera.screenPointToRay(e.mouseX, e.mouseY);
    let hitResult = scene.physicsManager.rayCast(ray, 100);
    
    if (hitResult) {
        console.log('点击了:', hitResult.collider.owner.name);
    }
});
```

---

## 十四、性能优化

### 14.1 渲染优化

```typescript
// 开启多线程渲染
Config3D.enableMultithread = true;

// 设置最大面数
Config3D.maxLightCount = 16;

// 减少实时阴影
light.shadow = false;

// 使用遮挡剔除
scene.enableOctree = true;
scene.octreeOptions = { minSize: 64, pathTracking: 0.5 };
```

### 14.2 对象池

```typescript
import Pool from 'laya/utils/Pool';

// 创建对象池
let pool = Pool.create('bullet');

// 获取对象
let bullet = pool.getItemByClass('bullet', Sprite3D);

// 回收对象
pool.recover('bullet', bullet);
```

---

## 十五、学习路线建议

### 阶段一：环境搭建与基础（1周）
- 安装LayaAir CLI
- 创建第一个3D项目
- 了解TypeScript基础
- 掌握场景和摄像机

### 阶段二：3D对象与渲染（1-2周）
- 3D对象创建和变换
- 材质与光照系统
- 纹理与贴图

### 阶段三：动画与交互（1-2周）
- 骨骼动画
- 碰撞检测
- 物理引擎
- 摄像机控制

### 阶段四：项目实战（2-3周）
- 完整3D游戏项目
- 性能优化
- 发布与部署

---

## 十六、总结

Laya3D是一个功能强大的HTML5 3D游戏引擎：

1. **高性能** - WebGL加速，支持大规模3D场景
2. **TypeScript** - 支持强类型，开发效率高
3. **完整工具链** - LayaAir IDE + 3D模型转换器
4. **物理引擎** - 内置物理支持

建议多动手实践，从简单Demo开始，逐步掌握3D游戏开发的技巧。祝你学习愉快！🎮

---

*本文最后更新于 2025-04-10*
