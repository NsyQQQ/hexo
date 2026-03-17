---
title: LayaAir 项目打包与发布
date: 2025-10-05 10:00:00
tags: [LayaAir, 游戏开发, 打包, 发布, H5]
categories: [技术教程, 游戏开发]
---

LayaAir 引擎提供了强大的项目打包和发布功能，支持多平台发布包括 Web、iOS、Android、Windows、Mac 等平台。本文将详细介绍 LayaAir 项目的打包配置、版本发布和更新流程。

<!-- more -->

## 一、打包前的准备工作

### 1.1 检查项目配置

在打包之前，需要确保项目配置正确：

```typescript
// 检查 LayaAir 版本
console.log(Laya.Laya.version);

// 检查引擎初始化
Laya.init(750, 1334);
```

### 1.2 资源检查

- 确保所有资源已正确导入
- 检查资源路径是否正确
- 优化图片资源，减少包体大小
- 音频资源建议使用压缩格式

### 1.3 代码优化

- 移除调试代码
- 开启代码压缩
- 使用混淆工具保护代码

## 二、Web 平台打包

### 2.1 发布配置

在 LayaAir IDE 中进行如下配置：

1. 打开菜单：**文件 → 发布设置**
2. 选择发布平台：Web
3. 设置发布目录
4. 启用压缩选项

### 2.2 发布命令

```bash
# 使用命令行发布
layaair -publish -platform web -out ./dist
```

### 2.3 发布参数

```json
{
  "platform": "web",
  "outDir": "./dist",
  "sourceMaps": false,
  "compress": true,
  "uglify": true,
  "css": "css/compress.css"
}
```

### 2.4 目录结构

```
dist/
├── index.html
├── js/
│   ├── bundle.js
│   └── libs/
├── res/
│   ├── images/
│   └── audio/
└── assets/
```

## 三、本地预览与测试

### 3.1 启动本地服务器

```bash
# 使用 Python 启动
python -m http.server 8080

# 使用 Node.js
npx http-server -p 8080
```

### 3.2 浏览器测试

- Chrome DevTools 性能分析
- 移动端真机调试
- 性能监控面板

```javascript
// 开启性能监控
Laya.PerformancePanel.show();
```

## 四、多平台打包

### 4.1 Android 打包

#### 使用 LayaAir IDE

1. **文件 → 发布设置 → Android**
2. 配置应用名称、包名、版本
3. 设置图标和启动页
4. 点击发布

#### 使用命令行

```bash
# 生成 Android 项目
layaair -publish -platform android -project ./MyGame

# 编译 APK
cd ./MyGame/platforms/android
./gradlew assembleRelease
```

#### APK 配置

```json
{
  "android": {
    "package": "com.example.mygame",
    "versionName": "1.0.0",
    "versionCode": 1,
    "minSdkVersion": 21,
    "targetSdkVersion": 31,
    "keystore": "./release.keystore",
    "storePassword": "password",
    "keyAlias": "mykey",
    "keyPassword": "password"
  }
}
```

### 4.2 iOS 打包

#### Xcode 项目配置

1. 在 LayaAir IDE 中生成 Xcode 项目
2. 用 Xcode 打开项目
3. 配置证书和描述文件
4. 打包 IPA

#### 命令行打包

```bash
# 生成 iOS 项目
layaair -publish -platform ios -project ./MyGame

# 导出 IPA
xcodebuild -exportArchive -archivePath ./MyGame.xcarchive \
    -exportOptionsPlist ExportOptions.plist \
    -exportPath ./MyGame.ipa
```

### 4.3 Windows 桌面打包

```bash
# 生成 Windows 可执行文件
layaair -publish -platform windows -out ./dist-windows
```

## 五、版本管理与更新

### 5.1 版本号规范

采用语义化版本号：`主版本.次版本.修订号`

- **主版本**：不兼容的 API 变更
- **次版本**：向后兼容的功能新增
- **修订号**：向后兼容的问题修复

```typescript
// 版本信息
const VERSION = {
    major: 1,
    minor: 0,
    patch: 0,
    build: Date.now()
};

console.log(`v${VERSION.major}.${VERSION.minor}.${VERSION.patch}`);
```

### 5.2 热更新机制

#### 资源热更新

```typescript
class UpdateManager {
    private versionUrl: string = "https://example.com/version.json";
    private resUrl: string = "https://example.com/res/";
    
    async checkUpdate(): Promise<boolean> {
        // 获取远程版本
        const remoteVersion = await this.getRemoteVersion();
        const localVersion = this.getLocalVersion();
        
        return remoteVersion.versionCode > localVersion.versionCode;
    }
    
    async update(): Promise<void> {
        // 下载更新资源
        await this.downloadAssets();
        
        // 更新版本文件
        this.updateVersion();
    }
}
```

#### 版本对比

```typescript
function compareVersion(local: string, remote: string): boolean {
    const localParts = local.split('.').map(Number);
    const remoteParts = remote.split('.').map(Number);
    
    for (let i = 0; i < 3; i++) {
        if (remoteParts[i] > localParts[i]) return true;
        if (remoteParts[i] < localParts[i]) return false;
    }
    return false;
}
```

### 5.3 增量更新

```typescript
class IncrementalUpdate {
    private patchUrl: string;
    
    async downloadPatch(fromVersion: string, toVersion: string): Promise<void> {
        const patchUrl = `${this.patchUrl}/${fromVersion}_${toVersion}.patch`;
        
        // 下载增量包
        const response = await fetch(patchUrl);
        const patchData = await response.arrayBuffer();
        
        // 应用补丁
        await this.applyPatch(patchData);
    }
    
    private async applyPatch(data: ArrayBuffer): Promise<void> {
        // 使用 bspatch 或类似工具应用增量更新
    }
}
```

## 六、发布流程最佳实践

### 6.1 开发环境

```
开发流程：
代码开发 → 单元测试 → 打包测试 → 预发布 → 正式发布
```

### 6.2 构建脚本

```bash
#!/bin/bash
# build.sh

# 清理
rm -rf dist/

# 构建
layaair -publish -platform web -out ./dist

# 压缩
cd dist
find . -name "*.js" -exec uglifyjs {} -o {} \;

# 上传
rsync -avz ./dist/ user@server:/var/www/game/

echo "发布完成！"
```

### 6.3 CI/CD 集成

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm install
    - layaair -publish -platform web -out ./dist
  artifacts:
    paths:
      - ./dist

deploy:
  stage: deploy
  script:
    - rsync -avz ./dist/ $DEPLOY_SERVER
  only:
    - tags
```

## 七、常见问题与解决方案

### 7.1 打包失败

- **问题**：资源路径错误
- **解决**：检查资源路径配置，确保使用相对路径

### 7.2 APK 签名失败

- **问题**： keystore 配置错误
- **解决**：检查 keystore 路径、别名、密码是否正确

### 7.3 热更新失败

- **问题**：版本号比对逻辑错误
- **解决**：确保版本号格式统一，使用数值比较

### 7.4 加载资源失败

- **问题**：跨域问题
- **解决**：配置服务器 CORS，或使用 HTTPS

## 八、安全考虑

### 8.1 代码混淆

```bash
# 使用 uglify-js 混淆
npm install -g uglify-js
uglifyjs game.js -o game.min.js
```

### 8.2 HTTPS 强制

```typescript
// 检查是否为 HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.href = 'https:' + location.href.substring(location.protocol.length);
}
```

### 8.3 接口签名

```typescript
// 请求签名
function signRequest(params: object, secret: string): string {
    const sorted = Object.keys(params).sort();
    const signStr = sorted.map(k => `${k}=${params[k]}`).join('&');
    return CryptoJS.HmacSHA256(signStr, secret).toString();
}
```

## 总结

本文详细介绍了 LayaAir 项目的打包与发布流程，包括：

- Web 平台的基本打包配置
- Android 和 iOS 的打包方法
- Windows 桌面应用打包
- 版本管理与热更新机制
- CI/CD 集成与自动化部署
- 安全加固措施

掌握这些技能可以帮助你快速将游戏发布到各个平台，并保持游戏的持续更新。

---

> 持续关注，获取更多 Laya 游戏开发技巧！
