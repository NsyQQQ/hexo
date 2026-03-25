---
title: FairyGUI 完全指南
date: 2025-05-20 10:00:00
tags: [FairyGUI, UI, 游戏开发]
categories: [技术教程, 游戏开发]
---
---

FairyGUI 是一款强大的跨引擎 UI 框架，支持 Unity、Cocos2d-x、LayaAir、Egret 等主流游戏引擎。它以其高效的编辑器、丰富的组件库和优秀的性能著称，是游戏开发者构建游戏界面的首选工具。

<!-- more -->

## 一、FairyGUI 简介

### 什么是 FairyGUI？

FairyGUI 是由资深游戏开发者打造的 UI 解决方案，提供了：

- **可视化编辑器**：像编辑网页一样编辑游戏 UI
- **丰富的组件库**：按钮、列表、滚动、弹窗等常用组件
- **完整的解决方案**：从设计到开发的完整工作流
- **高性能**：针对游戏场景深度优化

### 支持的引擎

| 引擎 | 支持版本 |
|------|---------|
| Unity | 2017+ |
| Cocos2d-x | 3.x |
| LayaAir | 2.x / 3.x |
| Egret | 3.x / 4.x |
| Cocos Creator | 2.x / 3.x |

### 版本对比

| 版本 | 说明 |
|------|------|
| 专业版 | 完整功能，支持所有特性 |
| 基础版 | 免费版，功能有限 |

---

## 二、编辑器使用

### 1. 安装编辑器

下载 FairyGUI Editor：
```
https://www.fairygui.com/
```

安装后启动编辑器。

### 2. 创建项目

```
File -> New Project
```

设置：
- 项目名称
- 项目路径
- 目标引擎
- 分辨率设置

### 3. 编辑器界面

```
┌─────────────────────────────────────┐
│  菜单栏                              │
├─────────┬───────────────┬───────────┤
│  组件库  │    编辑区      │  属性面板  │
│         │               │           │
│         │               │           │
├─────────┴───────────────┴───────────┤
│  资源管理 / 动画编辑 / 输出设置       │
└─────────────────────────────────────┘
```

### 4. 基础操作

**创建组件：**
- 从组件库拖拽到编辑区
- 右键 -> 创建 -> 选择组件类型

**层级管理：**
- 调整显示顺序
- 父子关系设置
- 组件编组

**对齐与分布：**
- 左对齐、居中对齐、右对齐
- 顶部、垂直、底部对齐
- 水平、垂直分布

---

## 三、核心组件

### 1. 基本组件

**图片（Image）**
```csharp
// 设置图片
GImage image = contentPane.GetChild("n1").asImage;
// 设置九宫
image.fillMethod = FillMethod.Rotated;
// 设置颜色
image.color = new Color(1, 0.5, 0.5);
```

**文本（Text）**
```csharp
GTextField text = contentPane.GetChild("n1").asTextField;
// 设置文本
text.text = "Hello FairyGUI";
// 设置字体
text.font = "SimHei";
// 设置字号
text.fontSize = 24;
// 设置颜色
text.color = new Color(1, 1, 1);
```

**输入框（Input）**
```csharp
GTextInput input = contentPane.GetChild("n1").asTextInput;
// 设置提示文字
input.promptText = "请输入...";
// 限制输入类型
input.restrict = "0-9";
// 最大字符数
input.maxLength = 10;
// 密码模式
input.password = true;
```

### 2. 按钮组件

**普通按钮**
```csharp
GButton btn = contentPane.GetChild("n1").asButton;
// 设置点击事件
btn.onClick.Add(() => {
    Debug.Log("点击了按钮");
});

// 设置按钮状态
btn.selected = true; // 设置选中状态
btn.disabled = true; // 禁用按钮
```

**单选按钮 / 复选框**
```csharp
GButton radio = contentPane.GetChild("n1").asButton;
// 单选模式
radio.group = "group1";
// 选中状态
radio.selected = true;
```

### 3. 容器组件

**列表（List）**
```csharp
GList list = contentPane.GetChild("n1").asList;
// 设置列表项模板
list.itemRenderer = RenderListItem;
// 设置虚拟列表（高性能）
list.SetVirtual();

// 刷新列表
list.RefreshVirtualList();

// 添加列表项
list.AddItem(new ListItemData());
```

**滚动容器（ScrollPane）**
```csharp
GComponent scrollView = contentPane.GetChild("n1").asCom;
ScrollPane scroll = scrollView.scrollPane;
// 设置滚动模式
scroll.scrollStep = 50;
// 设置弹性
scroll.bounceEffect = true;
// 监听滚动位置
scroll.onScroll.Add(OnScroll);
```

**标签页（Tab）**
```csharp
GTab tab = contentPane.GetChild("n1").asTab;
// 切换事件
tab.onTabChanged.Add(OnTabChanged);

// 代码切换
tab.selectedIndex = 1;
```

### 4. 弹窗与对话框

**提示框（Toast）**
```csharp
// 显示提示
Toast.Show("操作成功");

// 带图标的提示
Toast.ShowSuccess("保存成功");
Toast.ShowError("保存失败");
```

**确认对话框**
```csharp
Confirm.Show("确定要退出吗？", () => {
    Debug.Log("确认");
}, () => {
    Debug.Log("取消");
});
```

**加载弹窗**
```csharp
// 显示加载中
Progress.Show("加载中...");

// 更新进度
Progress.Update(50);

// 隐藏
Progress.Hide();
```

---

## 四、布局系统

### 1. 基础布局

**水平布局**
```csharp
// GComponent 设置水平布局
container.layoutType = LayoutType.Horizontal;
// 间距
container.space = 10;
```

**垂直布局**
```csharp
container.layoutType = LayoutType.Vertical;
// 间距
container.space = 10;
// 边距
container.padding.top = 10;
container.padding.bottom = 10;
```

**网格布局**
```csharp
container.layoutType = LayoutType.Grid;
// 列数
container.columns = 3;
// 间距
container.spaceX = 10;
container.spaceY = 10;
```

### 2. 弹性布局

```csharp
// 父容器
container.layoutType = LayoutType.Horizontal;

// 子元素设置权重
child1.flex = "1";
child2.flex = "2"; // 2倍宽度
```

### 3. 相对定位

```csharp
// 设置相对父容器的位置
relation.target = parent;
relation.type = RelationType.Right_Center;

// 对齐方式
relation.add(RelationType.Right_Center);
relation.add(RelationType.Middle_Middle);
```

---

## 五、动画系统

### 1. 编辑器动画

在 FairyGUI Editor 中：
1. 选中组件
2. 打开动画编辑器
3. 添加关键帧
4. 设置缓动函数

**支持的动画类型：**
- 位移
- 缩放
- 旋转
- 透明度
- 颜色

**缓动函数：**
- Linear
- Sine
- Quad
- Cubic
- Bounce
- Back
- Elastic

### 2. 代码播放动画

```csharp
// 获取动画组件
GLoader loader = contentPane.GetChild("n1").asLoader;

// 播放 SWF 动画
loader.url = "ui://PackageName/Animation01";
loader.playing = true;

// 监听动画完成
loader.onPlayEnd.Add(() => {
    Debug.Log("动画播放完成");
});

// 控制播放
loader.frame = 0;
loader.playing = false;
```

### 3. 过渡效果（Transition）

```csharp
// 获取过渡
Transition trans = contentPane.GetTransition("t1");

// 播放
trans.Play();

// 倒放
trans.PlayReverse();

// 停止
trans.Stop();

// 设置参数
trans.timeScale = 2; // 2倍速
trans.repeat = 0;    // 无限循环
```

---

## 六、交互系统

### 1. 事件系统

```csharp
// 点击事件
button.onClick.Add(OnClick);

// 长按事件
button.onLongPress.Add(OnLongPress);

// 拖拽事件
object.draggable = true;
object.onDragStart.Add(OnDragStart);
object.onDragMove.Add(OnDragMove);
object.onDragEnd.Add(OnDragEnd);

// 鼠标事件
component.onMouseOver.Add(OnMouseOver);
component.onMouseOut.Add(OnMouseOut);

// 滚动事件
scrollPane.onScroll.Add(OnScroll);
```

### 2. 手势识别

**双击**
```csharp
component.onDoubleClick.Add(OnDoubleClick);
```

**缩放**
```csharp
// 启用缩放手势
Gestures.EnablePinch(component);
Gestures.OnPinch.Add(OnPinch);
```

**滑动**
```csharp
Gestures.EnableSwipe(component);
Gestures.OnSwipe.Add(OnSwipe);
```

---

## 七、在 Unity 中使用

### 1. 安装 FairyGUI for Unity

在 Unity Package Manager 中导入 FairyGUI 插件。

### 2. 创建 UI

```csharp
// 创建 UI 面板
UIPanel panel = gameObject.AddComponent<UIPanel>();
panel.packageName = "MyPackage";
panel.componentName = "MainView";
panel.Create();
```

### 3. 代码交互

```csharp
using FairyGUI;

public class MainPanel : MonoBehaviour {
    private GComponent contentPane;

    void Start() {
        // 获取面板
        contentPane = GetComponent<UIPanel>().ui;
        
        // 获取组件
        GButton btn = contentPane.GetChild("btn_start").asButton;
        
        // 绑定事件
        btn.onClick.Add(OnStartClick);
    }

    private void OnStartClick() {
        Debug.Log("开始游戏");
    }
}
```

### 4. 资源管理

```csharp
// 动态加载 UI
UIPackage.AddPackage("ui/MyPackage");

// 加载组件
GComponent com = UIPackage.CreateObject("MyPackage", "ComponentName").asCom;

// 卸载资源
UIPackage.RemovePackage("MyPackage");
```

---

## 八、性能优化

### 1. 渲染优化

**使用对象池**
```csharp
// 列表虚拟化
list.SetVirtual();

// 对象池
GObject obj = ObjectPool.GetObject("PrefabName");
ObjectPool.ReturnObject(obj);
```

**减少 Draw Call**
- 合并小纹理为 Atlas
- 使用统一材质的组件

### 2. 内存优化

**资源卸载**
```csharp
// 定时卸载未使用的资源
Resources.UnloadUnusedAssets();

// 强制卸载
Resources.UnloadAsset(obj);
```

**及时释放**
```csharp
// 组件销毁时释放
component.Dispose();
```

### 3. 脚本优化

**缓存组件引用**
```csharp
// 不推荐：每次都查找
contentPane.GetChild("btn").asButton.onClick.Add(...);

// 推荐：缓存引用
private GButton btn;
void Start() {
    btn = contentPane.GetChild("btn").asButton;
    btn.onClick.Add(OnClick);
}
```

---

## 九、常见问题

### 1. 文字显示模糊

**解决方案：**
- 使用合适的字号（不要太小）
- 调整 Canvas 渲染器的 DPI
- 检查 CanvasScaler 设置

### 2. 事件穿透

**解决方案：**
```csharp
// 阻止事件穿透
component.touchable = false;
// 或
component.FitMargin = new Margin(0, 0, 0, 0);
```

### 3. 适配问题

**解决方案：**
```csharp
// 设置 UI 适配
GRoot.inst.SetContentScaleFit(StageScaleMode.SHOW_ALL);

// 或
GRoot.inst.SetContentScaleFit(StageScaleMode.FIT_WIDTH);
```

---

## 十、最佳实践

### 1. 项目结构

```
Assets/
├── FairyGUI/
│   └── SDK 文件
├── UI/
│   ├── Packages/         # UI 包
│   ├── Atlas/           # 图集
│   └── Fonts/           # 字体
├── Prefabs/             # 预制体
└── Scripts/             # 脚本
```

### 2. 命名规范

```
Package: MyGame
├── Common               # 通用组件
│   ├── Button          # 按钮
│   ├── ProgressBar     # 进度条
│   └── Toast           # 提示
├── Main                # 主界面
│   ├── MainMenu        # 主菜单
│   └── GameUI          # 游戏界面
└── Dialog              # 对话框
    └── Confirm         # 确认框
```

### 3. 工作流

1. UI 设计师在 FairyGUI Editor 中设计界面
2. 导出 UI 包到项目
3. 开发者加载并绑定逻辑
4. 测试和调整

---

## 总结

FairyGUI 为游戏 UI 开发提供了完整的解决方案，其核心优势包括：

- 可视化编辑器，所见即所得
- 丰富的组件库，开箱即用
- 优秀的性能，适合移动端
- 跨引擎支持，迁移成本低

掌握 FairyGUI 能大幅提升 UI 开发效率，是游戏开发者的必备技能。

Happy UI Development! 🎨

---

*有问题欢迎评论区留言～*
