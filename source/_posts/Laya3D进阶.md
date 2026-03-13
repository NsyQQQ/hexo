---
title: Laya3D进阶
date: 2025-10-11 00:00:00
tags: [游戏开发, Laya3D, 进阶]
categories: 技术教程
---

本文将介绍Laya3D开发中的进阶技术，包括高级渲染、特效系统、物理引擎深入、Shader编程等内容，帮助你提升3D游戏开发能力。

<!-- more -->

## 一、高级渲染技术

### 1.1 自定义Shader

```typescript
import Shader3D from 'laya/d3/shader/Shader3D';
import SubShader from 'laya/d3/shader/SubShader';

// 注册自定义Shader
Shader3D.addInclude('LightHelper.glsl', `
    vec3 getLightDir(vec3 normal, vec3 lightDir) {
        float diff = max(dot(normal, lightDir), 0.0);
        return diff * lightDir;
    }
`);

// 创建Shader
let shader = Shader3D.compileShader3DByDefineObjects(
    'CustomShader', 
    SubShader.PassType.Forward, 
    ['#define DIFFUSEMAP']
);

// 创建材质
class CustomMaterial extends Material {
    constructor() {
        super();
        this.setShaderName('CustomShader');
    }
}
```

### 1.2 后期处理效果

```typescript
import PostProcess from 'laya/d3/core/render/PostProcess';
import Bloom from 'laya/d3/shader/fxaa/Bloom';

// 创建后期处理
let postProcess = new PostProcess(camera);

// 添加泛光效果
let bloom = new Bloom();
bloom.threshold = 0.8;
bloom.intensity = 1.5;
postProcess.addEffect(bloom);

// 添加FXAA抗锯齿
let fxaa = new FXAA();
postProcess.addEffect(fxaa);
```

### 1.3 渲染纹理（RenderTexture）

```typescript
import RenderTexture from 'laya/d3/resource/RenderTexture';

// 创建渲染纹理
let rt = RenderTexture.create(1024, 1024);

// 设置到摄像机
camera.renderTarget = rt;

// 制作镜子效果
let mirror = new Sprite3D();
let mirrorMat = new StandardMaterial();
mirrorMat.diffuseTexture = rt;
mirror.meshRender.material = mirrorMat;

// 显示渲染内容
let display = new Sprite3D();
let displayMat = new StandardMaterial();
displayMat.emissiveTexture = rt;
display.meshRender.material = displayMat;
```

---

## 二、高级特效系统

### 2.1 粒子特效

```typescript
import ParticleSystem from 'laya/d3/core/ParticleSystem';

// 创建粒子系统
let particle = new ParticleSystem();

// 加载粒子配置
particle.load('res/particles/fire.json');

// 播放粒子
particle.play();

// 设置发射位置
particle.emitterPosition = new Vector3(0, 0, 0);

// 动态修改粒子属性
particle.emissionRate = 50;
particle.startSpeed = 5;
particle.startLifetime = 2;
```

### 2.2 Trail拖尾效果

```typescript
import TrailSprite3D from 'laya/d3/core/TrailSprite3D';

// 创建拖尾
let trail = new TrailSprite3D('trail');

// 设置拖尾材质
let trailMat = new TrailMaterial();
trailMat.diffuseColor = new Vector3(1, 0, 0);
trail.material = trailMat;

// 设置拖尾参数
trail.time = 1.0;  // 拖尾持续时间
trail.minVertexDistance = 0.1;  // 最小顶点距离
trail.widthCurve = [0.1, 0.05];  // 宽度曲线

Laya.stage.addChild(trail);

// 拖尾跟随物体
trail.addPosition(weapon.transform.position);
```

### 2.3 公告板（BillBoard）

```typescript
import BillboardSprite3D from 'laya/d3/core/BillboardSprite3D';

// 创建公告板
let billboard = new BillboardSprite3D('billboard');

// 设置纹理
let mat = new StandardMaterial();
mat.diffuseTexture = Texture2D.load('res/particle/cloud.png');
billboard.meshRender.material = mat;

// 设置公告板模式
billboard.renderMode = BillboardSprite3D.RENDERMODE_ADditive;
billboard.scale = new Vector3(5, 5, 5);

// 始终面向摄像机
billboard.isBillboard = true;
```

---

## 三、物理引擎深入

### 3.1 物理碰撞回调

```typescript
import PhysicsCollider from 'laya/d3/physics/PhysicsCollider';
import CannonJSPlugin from 'laya/d3/physics/CannonJSPlugin';

// 启用物理引擎
Laya3D.enablePhysics();

// 监听碰撞
let collider = object.addComponent(PhysicsCollider) as PhysicsCollider;

// 碰撞开始
collider.on(Laya.Event.COLLISION_START, this, (collision: Laya.Collision) => {
    console.log('碰撞开始');
    for (let contact of collision.contacts) {
        console.log('接触点:', contact.point);
    }
});

// 碰撞持续
collider.on(Laya.Event.COLLISION_STAY, this, (collision: Laya.Collision) => {
    // 持续伤害等逻辑
});

// 碰撞结束
collider.on(Laya.Event.COLLISION_EXIT, this, (other: Laya.PhysicsComponent) => {
    console.log('碰撞结束');
});
```

### 3.2 物理关节

```typescript
import PhysicsJoint from 'laya/d3/physics/PhysicsJoint';

// 创建固定关节
let joint = object1.addComponent(PhysicsJoint) as PhysicsJoint;
joint.connectedBody = body2;
joint.jointType = PhysicsJoint.JOINT_FIXED;

// 创建铰链关节
joint.jointType = PhysicsJoint.JOINT_HINGE;
joint.anchor = new Vector3(0, 1, 0);
joint.axis = new Vector3(1, 0, 0);

// 创建弹簧关节
joint.jointType = PhysicsJoint.JOINT_SPRING;
joint.spring.stiffness = 100;
joint.spring.damping = 10;

// 创建滑块关节
joint.jointType = PhysicsJoint.JOINT_SLIDER;
joint.axis = new Vector3(1, 0, 0);
```

### 3.3 射线检测高级应用

```typescript
import PhysicsManager from 'laya/d3/physics/PhysicsManager';

// 射线检测
let ray = new Ray(camera.position, camera.forward);

// 检测单个
let hit = physicsManager.rayCast(ray, 100, 1 << 0);  // 检测层0

if (hit) {
    console.log('击中:', hit.collider.owner.name);
    console.log('击中点:', hit.point);
    console.log('法线:', hit.normal);
}

// 检测多个
let hits = physicsManager.rayCastAll(ray, 100);

for (let hit of hits) {
    console.log('依次击中的物体:', hit.collider.owner.name);
}

// 形状检测
let shape = new SphereColliderShape(1);
let hitsByShape = physicsManager.shapeCast(shape, from, to);
```

---

## 四、动画系统进阶

### 4.1 动画层与混合

```typescript
import Animator from 'laya/d3/component/Animator';
import AnimatorState from 'laya/d3/resource/models/AnimatorState';

// 获取动画组件
let animator = hero.getComponent(Animator) as Animator;

// 创建动画状态
let runState = new AnimatorState();
runState.name = 'run';
runState.clip = runClip;

// 添加到动画层
animator.addState(runState, 'Base Layer');
animator.play('run');

// 创建动画层（上层覆盖下层）
let upperLayer = animator.addLayer('UpperBody', 1, 0);

// 在上层播放攻击动画
let attackState = new AnimatorState();
attackState.name = 'attack';
attackState.clip = attackClip;

// 混合：攻击动画只影响上半身骨骼
animator.play('attack', 'UpperBody', 0, 0.3);
```

### 4.2 动画事件

```typescript
// 设置动画事件
animator.on(Laya.Event.STOP, this, () => {
    console.log('动画停止');
});

// 在动画中添加事件回调
// 通过动画编辑工具或代码设置
animator.getCurrentAnimatorState(0).addEvent('attackHit', 0.5, () => {
    // 攻击判定在这一帧触发
    this.checkAttackHit();
});
```

### 4.3 程序化动画

```typescript
// 使用Tween进行简单动画
Laya.Tween.to(sprite3D.transform.position, {
    x: 10,
    y: 5,
    z: 0
}, 1000, Laya.Ease.quadOut);

// 每帧更新位置
Laya.timer.frameLoop(1, this, this.update);

private update(): void {
    // 简单的旋转动画
    this.object.transform.rotate(new Vector3(0, 1, 0), true);
    
    // 跟随目标
    let targetPos = this.target.transform.position;
    let currentPos = this.object.transform.position;
    Vector3.subtract(targetPos, currentPos, this.tempVec);
    Vector3.normalize(this.tempVec, this.tempVec);
    Vector3.scale(this.tempVec, this.speed, this.tempVec);
    Vector3.add(currentPos, this.tempVec, this.tempVec);
    this.object.transform.position = this.tempVec;
}
```

---

## 五、场景优化技术

### 5.1 遮挡剔除

```typescript
// 开启八叉树遮挡剔除
scene.enableOctree = true;
scene.octreeOptions = {
    minSize: 64,
    pathTracking: 0.5,
    looseRate: 1.5
};

// 手动设置遮挡物
let occluder = new Sprite3D();
occluder.addComponent(PhysicsCollider);
scene.addChild(occluder);
```

### 5.2 视锥体剔除

```typescript
import FrustumCulling from 'laya/d3/shader/FrustumCulling';

// 摄像机自动进行视锥体剔除
camera.frustumCulling = true;

// 手动控制剔除
for (let obj of scene.objects) {
    if (!camera.isVisible(obj)) {
        obj.active = false;  // 不渲染
    }
}
```

### 5.3 LOD多细节层次

```typescript
import LODGroup from 'laya/d3/core/LODGroup';

// 创建LOD组
let lodGroup = new LODGroup('heroLOD');

// 添加不同精度的模型
let lod0 = highPolyModel;  // 近距离高精度
let lod1 = mediumPolyModel;  // 中距离中等精度
let lod2 = lowPolyModel;  // 远距离低精度

lodGroup.addLODLevel(20, lod0);   // 20米以内
lodGroup.addLODLevel(50, lod1);   // 50米以内
lodGroup.addLODLevel(100, lod2);  // 100米以内

scene.addChild(lodGroup);
```

---

## 六、高级摄像机技术

### 6.1 摄像机跟随平滑

```typescript
class SmoothFollow {
    private camera: Camera;
    private target: Sprite3D;
    private smoothSpeed: number = 0.1;
    private offset: Vector3 = new Vector3(0, 5, -10);
    
    constructor(camera: Camera, target: Sprite3D) {
        this.camera = camera;
        this.target = target;
    }
    
    update(deltaTime: number): void {
        if (!this.target) return;
        
        // 计算目标位置
        let targetPos = this.target.transform.position.clone();
        Vector3.add(targetPos, this.offset, targetPos);
        
        // 平滑插值
        let currentPos = this.camera.transform.position;
        let newPos = new Vector3();
        Vector3.lerp(currentPos, targetPos, this.smoothSpeed, newPos);
        
        this.camera.transform.position = newPos;
        
        // 看向目标
        this.camera.transform.lookAt(this.target.transform.position);
    }
}
```

### 6.2 动态FOV

```typescript
// 奔跑时增加FOV增加速度感
let baseFOV = 60;
let targetFOV = 80;

Laya.timer.frameLoop(1, this, () => {
    let currentFOV = this.camera.fieldOfView;
    let target = this.isRunning ? targetFOV : baseFOV;
    this.camera.fieldOfView = Lerp(currentFOV, target, 0.05);
});
```

---

## 七、网络同步进阶

### 7.1 预测与回滚

```typescript
class NetworkPrediction {
    private localState: GameState;
    private remoteState: GameState;
    private pendingInputs: Input[] = [];
    
    // 本地预测
    applyInput(input: Input): void {
        this.pendingInputs.push(input);
        this.localState = this.localState.apply(input);
    }
    
    // 服务器校正
    onServerUpdate(serverState: GameState): void {
        // 比较本地和服务器状态
        if (this.checkMismatch(this.localState, serverState)) {
            // 差异过大，回滚并重放
            this.rollback(serverState);
        }
        
        this.remoteState = serverState;
    }
    
    private rollback(serverState: GameState): void {
        // 回滚到服务器状态
        this.localState = serverState.clone();
        
        // 重放所有pending的输入
        for (let input of this.pendingInputs) {
            this.localState = this.localState.apply(input);
        }
        
        // 重新渲染
        this.syncView(this.localState);
    }
}
```

### 7.2 插值同步

```typescript
class InterpolatedSync {
    private remoteStates: GameState[] = [];
    private bufferSize: number = 3;
    
    // 接收远程状态
    onReceiveRemoteState(state: GameState): void {
        this.remoteStates.push(state);
        
        // 保持缓冲区大小
        if (this.remoteStates.length > this.bufferSize) {
            this.remoteStates.shift();
        }
    }
    
    // 获取插值状态
    getInterpolatedState(): GameState {
        if (this.remoteStates.length < 2) {
            return this.remoteStates[0];
        }
        
        // 对前后两帧进行插值
        let prev = this.remoteStates[this.remoteStates.length - 2];
        let next = this.remoteStates[this.remoteStates.length - 1];
        let alpha = (Date.now() - next.timestamp) / (next.timestamp - prev.timestamp);
        
        return this.interpolate(prev, next, alpha);
    }
}
```

---

## 八、Shader进阶

### 8.1 水面Shader

```glsl
// Vertex Shader
uniform float uTime;
varying vec2 vUv;
varying vec3 vWorldPos;

void main() {
    vUv = uv;
    vec3 pos = position;
    
    // 波浪效果
    pos.y += sin(pos.x * 0.5 + uTime) * 0.2;
    pos.y += cos(pos.z * 0.3 + uTime * 0.8) * 0.15;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
}

// Fragment Shader
uniform sampler2D uNormalMap;
uniform vec3 uWaterColor;

void main() {
    vec3 normal = texture2D(uNormalMap, vUv).rgb;
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    
    // 菲涅尔效果
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
    
    vec3 color = mix(uWaterColor, vec3(1.0), fresnel);
    
    gl_FragColor = vec4(color, 0.8);
}
```

### 8.2 描边效果

```glsl
// 描边Vertex Shader
void main() {
    // 沿法线方向膨胀
    vec3 pos = position + normal * uOutlineWidth;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

// 描边Fragment Shader
void main() {
    gl_FragColor = vec4(uOutlineColor, 1.0);
}
```

---

## 九、调试与性能分析

### 9.1 性能分析器

```typescript
import Performance from 'laya/d3/core/render/Performance';

// 开启性能统计
Performance.enable();

// 获取统计数据
setInterval(() => {
    let stats = Performance.getPerformance();
    console.log('DrawCall:', stats.drawCall);
    console.log('Triangles:', stats.triangles);
    console.log('FPS:', stats.FPS);
}, 1000);
```

### 9.2 GPU调试

```typescript
// 开启WebGL调试（需要浏览器支持）
let gl = Laya.Render.supportWebGL;
if (gl.getExtension('WEBGL_debug_renderer_info')) {
    let renderer = gl.getParameter(gl.RENDERER);
    console.log('GPU:', renderer);
}
```

---

## 十、总结

Laya3D进阶开发需要掌握以下核心技术：

1. **高级渲染** - 自定义Shader、后期处理、渲染纹理
2. **特效系统** - 粒子、拖尾、公告板
3. **物理引擎** - 碰撞回调、关节、射线检测
4. **动画系统** - 动画层混合、程序化动画
5. **场景优化** - 遮挡剔除、LOD多细节层次
6. **网络同步** - 预测回滚、插值同步

建议在项目中不断实践，逐步掌握这些技术。祝你开发愉快！🎮

---

*本文最后更新于 2025-04-12*
