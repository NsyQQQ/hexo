---
title: Laya 性能优化指南
date: 2025-11-01 00:00:00
tags: [游戏开发, Laya, 性能优化]
categories: 学习笔记
featured: true
---

游戏性能优化是开发过程中非常重要的一环。本文将介绍Laya2D和Laya3D开发中的各种性能优化技巧，帮助你打造更流畅的游戏体验。

<!-- more -->

## 一、渲染优化

### 1.1 对象池技术

对象池是游戏开发中最重要的优化技术之一，可以有效减少垃圾回收（GC）带来的性能开销。

```typescript
import Pool from 'laya/utils/Pool';

// 创建子弹对象池
class BulletPool {
    private static pool: any = {};
    
    // 获取对象
    static getBullet(): Bullet {
        let bullet = Pool.getItemByClass('bullet', Bullet);
        bullet.init();
        return bullet;
    }
    
    // 回收对象
    static recoverBullet(bullet: Bullet): void {
        bullet.reset();
        Pool.recover('bullet', bullet);
    }
}

// 使用示例
let bullet = BulletPool.getBullet();
// 使用完毕
BulletPool.recoverBullet(bullet);
```

### 1.2 减少DrawCall

**批量渲染：**
```typescript
// 使用同一种材质的对象尽量放在一起渲染
// 避免频繁切换材质

// 坏的写法
for (let i = 0; i < 100; i++) {
    let sprite = new Sprite();
    sprite.graphics.drawTexture(textures[i]);  // 每帧都切换材质
}

// 好的写法
// 使用图集，将多个小图片合并成一张大图
let atlas = Loader.getRes('res/atlas/game.json');
// 渲染时使用图集中的图片
```

**使用Graphics批量绘制：**
```typescript
// 一次绘制多个图形
let g = this.graphics;
g.beginFill(0xff0000);
g.drawRect(0, 0, 100, 100);
g.drawRect(100, 100, 50, 50);
g.endFill();
```

### 1.3 可见区域裁剪

```typescript
// 使用scrollRect限制渲染区域
sprite.scrollRect = new Rectangle(0, 0, 800, 600);

// 对于屏幕外的对象，不进行渲染
if (!isInScreen(sprite)) {
    sprite.visible = false;
}
```

---

## 二、内存优化

### 2.1 资源释放

```typescript
import Loader from 'laya/net/Loader';

// 卸载不需要的资源
Loader.clearRes('res/image/bg.jpg');

// 彻底销毁资源
Loader.clearTextureRes('res/image/bg.jpg');

// 场景切换时清理
scene.destroy(true);  // true表示清理子节点
```

### 2.2 合理使用数据类型

```typescript
// 避免频繁创建对象
// 坏的写法
for (let i = 0; i < 1000; i++) {
    let point = { x: i, y: i };  // 每帧创建新对象
}

// 好的写法：复用对象
let point = { x: 0, y: 0 };
for (let i = 0; i < 1000; i++) {
    point.x = i;
    point.y = i;
    // 使用point
}
```

### 2.3 减少闭包使用

```typescript
// 避免在循环中创建闭包
// 坏的写法
for (let i = 0; i < 100; i++) {
    sprite.on('click', () => {  // 每次创建新函数
        console.log(i);
    });
}

// 好的写法：使用bind或缓存函数
function onClick(index: number): void {
    console.log(index);
}
for (let i = 0; i < 100; i++) {
    sprite.on('click', onClick, this, false, [i]);
}
```

---

## 三、Laya2D专项优化

### 3.1 图片优化

**使用图集：**
```typescript
// 将小图片合并成图集
// 可以减少DrawCall，提升渲染性能

// 加载图集
Loader.loadAtlas('res/atlas/game.json', Handler.create(this, () => {
    let texture = Loader.getRes('res/atlas/game/player.png');
    let sprite = new Sprite();
    sprite.graphics.drawTexture(texture);
}));
```

**控制图片尺寸：**
```typescript
// 图片尺寸尽量是2的幂次方
// 如：512x512, 1024x1024

// 大小不要超过2048x2048（部分设备不支持）
```

**压缩纹理格式：**
```typescript
// 使用压缩纹理（WebGL支持时）
// DXT5 / ASTC 等格式可以减少显存占用
```

### 3.2 动画优化

**控制帧率：**
```typescript
// 根据需要调整动画帧率
// 不需要高帧率的动画降低帧率
animation.interval = 100;  // 10fps
```

**使用骨骼动画：**
```typescript
// 相比于帧动画，骨骼动画更省内存
// 一个骨骼动画可以控制多个部位
```

### 3.3 文本优化

**使用位图字体：**
```typescript
// 大量重复使用的文字使用位图字体
// 减少Text对象的创建开销
let bitmapFont = new BitmapFont();
bitmapFont.loadFont('res/font/number.fnt');
Text.registerBitmapFont('numberFont', bitmapFont);

// 使用
let text = new Text();
text.bitmapFont = 'numberFont';
```

---

## 四、Laya3D专项优化

### 4.1 模型优化

**减少多边形数量：**
```typescript
// 使用LOD（Level of Detail）技术
// 距离摄像机近时显示高精度模型
// 距离远时显示低精度模型

// 导出模型时注意：
// 1. 合并共享材质
// 2. 删除不可见面
// 3. 简化不重要的细节
```

**使用实例化渲染：**
```typescript
// 对于大量相同物体，使用InstanceMesh
let mesh = meshSprite3D.meshFilter.sharedMesh;
let instanceCount = 100;
let instanceMesh = new InstanceMesh('instance', mesh, instanceCount);

// 设置实例化数据
// ...
```

### 4.2 光照优化

**减少实时灯光数量：**
```typescript
// 场景中尽量减少实时灯光
// 推荐：1-2个方向光 + 少量点光源

// 使用光照贴图代替实时光照
// 烘焙静态光照到纹理
scene.lightmaps = [lightmapTexture];
```

**合理设置阴影：**
```typescript
// 只对重要物体开启阴影
light.shadow = true;
light.shadowDistance = 50;  // 减小阴影渲染距离
light.shadowResolution = 1024;  // 降低阴影分辨率
```

### 4.3 材质优化

**使用简单材质：**
```typescript
// 优先使用BasicMaterial
// 其次BlinnPhongMaterial
// 复杂效果使用PBRMaterial

// 避免透明材质
// 透明物体会导致渲染顺序问题，性能开销大
material.transparency = 1;  // 尽量不透明
```

**减少Shader复杂度：**
```typescript
// 自定义Shader时注意：
// 1. 减少纹理采样次数
// 2. 避免复杂的数学运算
// 3. 使用低精度数据类型
```

---

## 五、网络优化

### 5.1 减少网络请求

```typescript
// 合并小资源为一个大包
// 使用配置表减少离散数据

// 坏：每个图片单独请求
for (let i = 0; i < 100; i++) {
    Loader.load(`res/image/item_${i}.png`);
}

// 好：使用图集一次加载
Loader.loadAtlas('res/atlas/items.json');
```

### 5.2 数据压缩

```typescript
// 使用二进制格式传输数据
// 减少JSON解析开销

// 协议缓冲区（Protocol Buffers）
// MessagePack等高效序列化格式
```

### 5.3 缓存策略

```typescript
// 本地缓存常用数据
localStorage.setItem('playerData', JSON.stringify(playerData));

// 使用内存缓存
let cache = new Map();
function getData(key: string): any {
    if (cache.has(key)) {
        return cache.get(key);
    }
    let data = loadFromDisk(key);
    cache.set(key, data);
    return data;
}
```

---

## 六、代码优化

### 6.1 循环优化

```typescript
// 使用for循环代替forEach（性能更好）
// 坏的写法
items.forEach((item, index) => {
    process(item);
});

// 好的写法
for (let i = 0, len = items.length; i < len; i++) {
    process(items[i]);
}

// 缓存长度
for (let i = 0; i < items.length; i++)  // 每次都计算长度
// 改为
let len = items.length;
for (let i = 0; i < len; i++)
```

### 6.2 避免过深的递归

```typescript
// 递归会占用大量栈空间
// 使用迭代代替递归

// 坏的写法
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 好的写法
function fibonacci(n: number): number {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}
```

### 6.3 使用位运算

```typescript
// 位运算比算术运算快

// 判断奇偶
if (n & 1)  // 比 n % 2 快

// 乘除2的幂次
n << 1  // n * 2
n >> 1  // n / 2
n >>> 1 // 无符号右移

// 取整
~~n     // 比 Math.floor 快
```

---

## 七、调试与监控

### 7.1 性能分析

```typescript
// 使用Stat查看性能数据
import Stat from 'laya/utils/Stat';

// 显示性能面板
Stat.show();

// 自定义统计
Stat.customStat['drawCall'] = { 
    value: 0, 
    name: 'DrawCall',
    type: Stat.FRAME 
};

// 在渲染循环中更新
Stat.update();
```

### 7.2 内存监控

```typescript
// 监控内存使用
setInterval(() => {
    let memory = Laya.browser.getPerformanceInfo();
    console.log('Memory:', memory.jsMemoryUsedSize);
}, 1000);

// 检测内存泄漏
// 观察内存是否持续增长
```

### 7.3 FPS监控

```typescript
// 简单FPS计数器
let lastTime = Date.now();
let frameCount = 0;
let fps = 0;

Laya.timer.frameLoop(1, this, () => {
    frameCount++;
    let now = Date.now();
    if (now - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = now;
        console.log('FPS:', fps);
    }
});
```

---

## 八、常用优化策略

### 8.1 分帧处理

```typescript
// 将大量计算分到多帧执行
class FrameScheduler {
    private tasks: Array<() => void> = [];
    private maxPerFrame = 10;
    
    addTask(task: () => void): void {
        this.tasks.push(task);
    }
    
    update(): void {
        let count = 0;
        while (this.tasks.length > 0 && count < this.maxPerFrame) {
            let task = this.tasks.shift();
            task();
            count++;
        }
    }
}
```

### 8.2 预加载与懒加载

```typescript
// 预加载关键资源
Loader.load(['res/image/bg.jpg', 'res/atlas/main.json'], 
    Handler.create(this, () => {
        // 开始游戏
    }), 
    Handler.create(this, (progress) => {
        // 显示加载进度
    }));

// 懒加载：按需加载
function showDetail(): void {
    Loader.load('res/image/detail.png', Handler.create(this, () => {
        // 显示详情
    }));
}
```

### 8.3 屏幕适配优化

```typescript
// 选择合适的缩放模式
Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;

// 固定设计分辨率，减少缩放计算
Config.designWidth = 750;
Config.designHeight = 1334;
```

---

## 九、发布优化

### 9.1 代码压缩

```typescript
// 使用Terser或UglifyJS压缩代码
// 配置package.json

{
    "scripts": {
        "build": "layaair build --minify"
    }
}
```

### 9.2 资源压缩

```typescript
// 图片使用tinypng等工具压缩
// 使用WebP格式（需考虑兼容性）
// 音频使用AAC/MP3格式
```

### 9.3 代码分割

```typescript
// 按需加载非首屏资源
// 游戏内不同关卡使用不同资源包
```

---

## 十、总结

性能优化是一个持续的过程，需要注意以下几点：

1. **先 profiling 再优化** - 使用工具找出性能瓶颈
2. **权衡利弊** - 优化不一定总是好的，要考虑维护成本
3. **持续监控** - 上线后也要持续关注性能指标
4. **用户体验优先** - 60FPS > 120FPS但流畅

常见优化优先级：
- **高**：对象池、DrawCall优化、资源释放
- **中**：算法优化、内存管理、缓存策略
- **低**：代码压缩、细节调整

祝你做出高质量的游戏！🎮

---

