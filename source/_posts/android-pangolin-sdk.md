---
title: 穿山甲广告 SDK 接入指南
date: 2025-07-15 10:00:00
tags: [Android, 穿山甲, 广告SDK]
categories: [技术教程, 游戏开发]
---
---

穿山甲（Pangolin）是字节跳动旗下的广告投放平台，提供丰富的广告变现场景和完善的 SDK 解决方案。本文将详细介绍如何在 Android 项目中接入穿山甲 SDK，实现广告变现。

<!-- more -->

## 一、穿山甲 SDK 简介

### 什么是穿山甲？

穿山甲是字节跳动推出的广告联盟平台，为开发者提供：

- **开屏广告**：App 启动时的品牌展示
- **信息流广告**：内容中的原生广告
- **插屏广告**：全屏或半屏展示
- **Banner 广告**：底部或顶部横幅
- **激励视频**：看广告获取奖励
- **Draw 视频**：短视频广告

### 版本说明

| SDK 版本 | 说明 |
|---------|------|
| Gromore | 聚合 SDK，可同时接入多个广告平台 |
| 单 SDK | 仅接入穿山甲广告 |

---

## 二、前置准备

### 1. 注册开发者账号

访问穿山甲官网注册：
```
https://www.pangolin.com/
```

完成企业/个人开发者认证。

### 2. 创建应用

1. 登录开发者后台
2. 添加应用（填写包名、应用名称）
3. 获取 **App ID**

### 3. 创建广告位

每个广告展示位置需要创建对应的广告位：

1. 应用管理 → 广告位管理
2. 添加广告位
3. 选择广告类型
4. 获取 **Slot ID**

---

## 三、项目配置

### 1. 添加 Maven 仓库

在项目根目录的 `build.gradle` 中添加：

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
        
        // 穿山甲 SDK 仓库
        maven { url 'https://artifact.bytedance.com/repository/pangle' }
    }
}
```

### 2. 添加依赖

在模块的 `build.gradle` 中添加：

```groovy
dependencies {
    // 基础 SDK（必须）
    implementation 'com.pangle.cn:adsdk:5.1.0.3'
    
    // 可选：根据需要添加
    // 激励视频
    implementation 'com.pangle.cn:reward:5.1.0.3'
    // Draw 信息流
    implementation 'com.pangle.cn:draw:5.1.0.3'
    // 穿山甲聚合（可选）
    implementation 'com.pangle.cn:gromore:5.1.0.3'
}
```

**注意**：版本号请以官方最新版本为准。

### 3. AndroidManifest 配置

```xml
<manifest>
    <!-- 权限 -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    
    <!-- 可选权限 -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    
    <application>
        <!-- 字节跳动应用 -->
        <meta-data
            android:name="com.bytedance.sdk.appid"
            android:value="your_app_id" />
            
        <!-- 应用自检（可选） -->
        <meta-data
            android:name="com.pangle.privacy"
            android:value="true" />
    </application>
</manifest>
```

### 4. 混淆配置

```proguard
# 穿山甲 SDK
-keep class com.pangle.** { *; }
-keep class com.bytedance.** { *; }
-keep class com.ss.** { *; }

# Google Play Services（可选）
-keep class com.google.android.gms.** { *; }
```

---

## 四、SDK 初始化

### 1. Application 初始化

```java
public class MyApplication extends Application {
    
    @Override
    public void onCreate() {
        super.onCreate();
        initPangolinSDK();
    }
    
    private void initPangolinSDK() {
        // 初始化配置
        TTAdConfig config = new TTAdConfig.Builder()
            .appId("5000001")  // 替换为你的 App ID
            .useTextureView(true)  // 使用 TextureView
            .allowShowNotify(true)  // 允许弹窗通知
            .allowImportGps(true)   // 允许获取 GPS 定位
            .debug(true)            // 调试模式
            .data("< CorbIId> 111111 </CorbIId>") // 可选，数据传输
            .build();
        
        // 初始化
        TTAdManagerHolder.init(this, config);
    }
}
```

### 2. 获取广告管理器

```java
// 获取 TTAdManager
TTAdManager ttAdManager = TTAdManagerHolder.getInstance();

// 设置用户标识（用于激励广告）
ttAdManager.setUserId("user_id");
```

---

## 五、广告位接入

### 1. 开屏广告（SplashAd）

```java
public class SplashActivity extends AppCompatActivity {
    
    private TTAdNative ttAdNative;
    private TextView skipView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        
        // 创建 TTAdNative
        ttAdNative = TTAdManagerHolder.getInstance().createAdNative(this);
        
        // 加载广告
        loadSplashAd();
    }
    
    private void loadSplashAd() {
        // 广告请求参数
        TTAdSlot slot = new TTAdSlot.Builder()
            .setCodeId("8000001")  // 替换为你的 Slot ID
            .setSupportDeepLink(true)
            .setImageAcceptedSize(1080, 1920)
            .build();
        
        // 加载广告
        ttAdNative.loadSplashAd(slot, new TTAdNative.SplashAdListener() {
            @Override
            public void onError(int code, String message) {
                Log.e("SplashAd", "加载失败: " + message);
                // 跳转主页面
                goToMainActivity();
            }
            
            @Override
            public void onSplashAdLoad(ITSplashAd ad) {
                Log.d("SplashAd", "广告加载成功");
                if (ad != null) {
                    // 展示广告
                    ad.showSplash(this@SplashActivity);
                    // 设置监听
                    ad.setSplashAdListener(new ITSplashAd.AdInteractionListener() {
                        @Override
                        public void onAdClicked(View view, int type) {
                            Log.d("SplashAd", "广告点击");
                        }
                        
                        @Override
                        public void onAdShow(View view, int type) {
                            Log.d("SplashAd", "广告展示");
                        }
                        
                        @Override
                        public void onAdDismiss(int type) {
                            Log.d("SplashAd", "广告关闭");
                            goToMainActivity();
                        }
                        
                        @Override
                        public void onAdTick(long millisUntilFinished) {
                            Log.d("SplashAd", "倒计时: " + millisUntilFinished + "ms");
                        }
                    });
                }
            }
        });
    }
    
    private void goToMainActivity() {
        startActivity(new Intent(this, MainActivity.class));
        finish();
    }
}
```

### 2. 激励视频广告（RewardVideoAd）

```java
public class RewardVideoActivity extends AppCompatActivity {
    
    private TTAdNative ttAdNative;
    private IRewardVideoAd rewardVideoAd;
    private boolean isLoaded = false;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        ttAdNative = TTAdManagerHolder.getInstance().createAdNative(this);
        
        // 加载激励视频
        loadRewardVideo();
    }
    
    private void loadRewardVideo() {
        TTAdSlot slot = new TTAdSlot.Builder()
            .setCodeId("7000001")  // 替换为你的 Slot ID
            .setSupportDeepLink(true)
            .setRewardName("金币")  // 奖励名称
            .setRewardAmount(10)    // 奖励数量
            .setUserID("user_id")  // 用户 ID
            .setOrientation(TTAdConstant.VERTICAL)  // 垂直视频
            .build();
        
        ttAdNative.loadRewardVideoAd(slot, new TTAdNative.RewardVideoAdListener() {
            @Override
            public void onError(int code, String message) {
                Log.e("RewardVideo", "加载失败: " + message);
            }
            
            @Override
            public void onRewardVideoLoad(IRewardVideoAd ad) {
                Log.d("RewardVideo", "广告加载成功");
                rewardVideoAd = ad;
                isLoaded = true;
            }
            
            @Override
            public void onRewardVideoCached() {
                Log.d("RewardVideo", "视频缓存完成");
            }
        });
    }
    
    // 展示广告（用户点击观看后调用）
    public void showRewardVideo() {
        if (rewardVideoAd != null && isLoaded) {
            rewardVideoAd.showRewardVideoAd(this);
            isLoaded = false;
        } else {
            Toast.makeText(this, "广告未准备好", Toast.LENGTH_SHORT).show();
        }
    }
}
```

### 3. 信息流广告（FeedAd）

```java
public class FeedListActivity extends AppCompatActivity {
    
    private static final int AD_COUNT = 3; // 每次加载数量
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        loadFeedAd();
    }
    
    private void loadFeedAd() {
        // 创建广告请求
        TTAdSlot slot = new TTAdSlot.Builder()
            .setCodeId("6000001")  // Slot ID
            .setAdCount(AD_COUNT)
            .setImageAcceptedSize(600, 300)
            .setNativeAdType(TTAdSlot.TYPE_FEED)
            .build();
        
        TTAdNative ttAdNative = TTAdManagerHolder.getInstance().createAdNative(this);
        ttAdNative.loadFeedAd(slot, new TTAdNative.FeedAdListener() {
            @Override
            public void onError(int code, String message) {
                Log.e("FeedAd", "加载失败: " + message);
            }
            
            @Override
            public void onFeedAdLoad(List<TTFeedAd> ads) {
                Log.d("FeedAd", "加载成功，数量: " + ads.size());
                // 将广告添加到列表
                displayFeedAds(ads);
            }
        });
    }
    
    private void displayFeedAds(List<TTFeedAd> ads) {
        // 将广告添加到 RecyclerView 或 ListView
        // 参考官方 Demo 处理广告渲染
    }
}
```

### 4. 插屏广告（InterstitialAd）

```java
public class InterstitialActivity extends AppCompatActivity {
    
    private TTAdNative ttAdNative;
    private TTNativeExpressInterstitialAd interstitialAd;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        ttAdNative = TTAdManagerHolder.getInstance().createAdNative(this);
        loadInterstitialAd();
    }
    
    private void loadInterstitialAd() {
        TTAdSlot slot = new TTAdSlot.Builder()
            .setCodeId("4000001")  // Slot ID
            .setExpressViewAcceptedSize(320, 480)  // 期望尺寸
            .build();
        
        ttAdNative.loadInterstitialAd(slot, new TTAdNative.InterstitialAdListener() {
            @Override
            public void onError(int code, String message) {
                Log.e("InterstitialAd", "加载失败: " + message);
            }
            
            @Override
            public void onInterstitialLoad(TTNativeExpressInterstitialAd ad) {
                interstitialAd = ad;
                interstitialAd.setExpressAdInteractionListener(
                    new TTNativeExpressInterstitialAd.ExpressAdInteractionListener() {
                        @Override
                        public void onAdClicked(View view, int type) {
                            Log.d("InterstitialAd", "点击");
                        }
                        
                        @Override
                        public void onAdShow(View view, int type) {
                            Log.d("InterstitialAd", "展示");
                        }
                        
                        @Override
                        public void onAdDismiss(int type) {
                            Log.d("InterstitialAd", "关闭");
                        }
                    }
                );
            }
        });
    }
    
    public void showInterstitial() {
        if (interstitialAd != null) {
            interstitialAd.showInterstitialAd(this);
        }
    }
}
```

### 5. Banner 广告

```java
public class BannerActivity extends AppCompatActivity {
    
    private TTBannerView bannerView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 在布局中添加 Banner
        initBanner();
    }
    
    private void initBanner() {
        bannerView = findViewById(R.id.banner_view);
        
        // 设置广告位 ID
        bannerView.setAdSlot("3000001");
        // 设置广告请求数量
        bannerView.setAdsCount(1);
        // 设置广告尺寸
        bannerView.setBannerImageSize(320, 50);
        // 设置轮播间隔（0 表示不轮播）
        bannerView.setRefreshInterval(30);
        
        // 加载广告
        bannerView.loadAd();
        
        // 广告点击监听
        bannerView.setOnAdClickedListener(new TTBannerView.AdClickedListener() {
            @Override
            public void onAdClicked() {
                Log.d("BannerAd", "点击");
            }
        });
    }
    
    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (bannerView != null) {
            bannerView.destroy();
        }
    }
}
```

---

## 六、隐私合规

### 1. GDPR 合规（海外）

```java
// 设置用户是否同意
TTAdManagerHolder.getInstance().setUserDataAgree(true);

// 或通过 Google Funding Choices 获取授权
```

### 2. 国内隐私合规

```java
// 初始化前获取权限
// 建议使用弹窗让用户主动授权以下权限：
// - 设备信息（IMEI）
// - 位置信息
// - 应用列表

// 在 Application 中
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    // 动态申请权限
}
```

---

## 七、测试与调试

### 1. 开启调试模式

```java
TTAdConfig config = new TTAdConfig.Builder()
    .debug(true)
    .build();
```

### 2. 测试 ID

| 广告类型 | 测试 Slot ID |
|---------|-------------|
| 开屏 | 8000001 |
| 信息流 | 6000001 |
| 插屏 | 4000001 |
| Banner | 3000001 |
| 激励视频 | 7000001 |

### 3. 查看日志

```
# 过滤关键字
tag: Pangolin
tag: adsdk
```

---

## 八、常见问题

### 1. 广告加载失败

**可能原因：**
- App ID 或 Slot ID 错误
- 网络问题
- 广告位未配置
- SDK 版本过旧

**解决方案：**
- 检查 ID 是否正确
- 检查网络权限
- 更新 SDK 版本

### 2. 不显示广告

**可能原因：**
- 广告位未启用
- 没有匹配的广告
- 测试模式未开启

**解决方案：**
- 在后台启用广告位
- 等待广告填充
- 使用测试 ID

### 3. 激励未发放

**检查要点：**
- 是否正确设置 `onAdReward` 回调
- `userID` 是否正确传递
- 是否调用了 `verify` 验证

---

## 九、最佳实践

### 1. 预加载

```java
// 提前加载广告，用户需要时直接展示
public class AdManager {
    
    private IRewardVideoAd cachedRewardAd;
    
    public void preloadRewardVideo() {
        // 预加载逻辑
    }
    
    public void showRewardVideoIfReady() {
        if (cachedRewardAd != null) {
            cachedRewardAd.showRewardVideoAd(activity);
        }
    }
}
```

### 2. 广告缓存

```java
// 对 Banner、插屏等广告进行缓存
// 在 onDestroy 中正确释放
@Override
public void onDestroy() {
    super.onDestroy();
    if (interstitialAd != null) {
        interstitialAd.destroy();
    }
}
```

### 3. 避免频繁请求

```java
// 合理设置请求间隔
// Banner: 30-60 秒刷新
// 信息流: 列表滚动到底部时加载
```

---

## 总结

穿山甲 SDK 为 Android 开发者提供了完整的广告变现解决方案。通过本文，你应该能够：

- 完成 SDK 的集成配置
- 接入各类型广告位
- 处理隐私合规问题
- 进行测试和调试

广告变现需要平衡用户体验和收益，建议合理控制广告展示频率，优化广告位布局。

Happy Monetization! 💰

---

*有问题欢迎评论区留言～*
