---
title: Bootstrap 5 完全指南
date: 2025-03-11 10:00:00
tags: [Bootstrap, CSS, 前端, 响应式, UI框架]
categories: [技术教程, 前端开发]
---
---

Bootstrap 是最流行的前端 UI 框架之一，由 Twitter 开发并开源。2021 年发布的 Bootstrap 5 带来了全新特性，本文带你全面了解这个强大的框架。

<!-- more -->

## 一、Bootstrap 简介

Bootstrap 提供了丰富的预构建组件和强大的栅格系统，帮助开发者快速构建响应式、移动优先的网站。

**Bootstrap 5 新特性：**
- 放弃 jQuery 依赖，使用纯 JavaScript
- 新增 Offcanvas 侧边栏组件
- 改进表单控件
- 新增工具类
- 改进暗色模式支持
- RTL（从右向左）支持

---

## 二、快速入门

### 1. 引入 Bootstrap

```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### 2. 基本模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap 页面</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <h1>你好，Bootstrap!</h1>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## 三、栅格系统

栅格系统是 Bootstrap 的核心，用于创建响应式布局。

### 1. 基础用法

```html
<div class="container">
  <div class="row">
    <div class="col">1列</div>
    <div class="col">2列</div>
    <div class="col">3列</div>
  </div>
</div>
```

### 2. 响应式断点

| 断点 | 最小宽度 | 适用设备 |
|------|----------|----------|
| xs | <576px | 手机 |
| sm | ≥576px | 大手机 |
| md | ≥768px | 平板 |
| lg | ≥992px | 笔记本电脑 |
| xl | ≥1200px | 桌面显示器 |
| xxl | ≥1400px | 大桌面显示器 |

### 3. 指定列宽

```html
<div class="row">
  <div class="col-4">占4列</div>
  <div class="col-8">占8列</div>
</div>
```

### 4. 响应式列

```html
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">响应式列</div>
  <div class="col-12 col-md-6 col-lg-4">响应式列</div>
  <div class="col-12 col-md-6 col-lg-4">响应式列</div>
</div>
```

### 5. 列偏移与对齐

```html
<!-- 偏移 -->
<div class="col-4 offset-4">居中列</div>

<!-- 垂直对齐 -->
<div class="row align-items-start">...</div>
<div class="row align-items-center">...</div>
<div class="row align-items-end">...</div>

<!-- 水平对齐 -->
<div class="row justify-content-start">...</div>
<div class="row justify-content-center">...</div>
<div class="row justify-content-end">...</div>
<div class="row justify-content-around">...</div>
<div class="row justify-content-between">...</div>
<div class="row justify-content-evenly">...</div>
```

---

## 四、常用组件

### 1. 按钮

```html
<!-- 基本按钮 -->
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>
<button class="btn btn-success">成功</button>
<button class="btn btn-danger">危险</button>
<button class="btn btn-warning">警告</button>
<button class="btn btn-info">信息</button>
<button class="btn btn-light">浅色</button>
<button class="btn btn-dark">深色</button>
<button class="btn btn-link">链接</button>

<!-- 按钮样式 -->
<button class="btn btn-outline-primary">轮廓按钮</button>
<button class="btn btn-lg">大按钮</button>
<button class="btn btn-sm">小按钮</button>
<button class="btn btn-primary disabled">禁用按钮</button>

<!-- 按钮组 -->
<div class="btn-group" role="group">
  <button class="btn btn-primary">左</button>
  <button class="btn btn-primary">中</button>
  <button class="btn btn-primary">右</button>
</div>
```

### 2. 卡片

```html
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">卡片标题</h5>
    <p class="card-text">卡片内容...</p>
    <a href="#" class="btn btn-primary">跳转链接</a>
  </div>
</div>

<!-- 卡片组 -->
<div class="card-group">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

### 3. 表单

```html
<form>
  <!-- 文本输入 -->
  <div class="mb-3">
    <label for="exampleInputEmail" class="form-label">邮箱</label>
    <input type="email" class="form-control" id="exampleInputEmail">
  </div>

  <!-- 密码输入 -->
  <div class="mb-3">
    <label for="exampleInputPassword" class="form-label">密码</label>
    <input type="password" class="form-control" id="exampleInputPassword">
  </div>

  <!-- 复选框 -->
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck">
    <label class="form-check-label" for="exampleCheck">记住我</label>
  </div>

  <button type="submit" class="btn btn-primary">提交</button>
</form>

<!-- 输入框大小 -->
<input class="form-control form-control-lg">
<input class="form-control">
<input class="form-control form-control-sm">

<!-- 禁用和只读 -->
<input class="form-control" disabled>
<input class="form-control" readonly>
```

### 4. 导航

```html
<!-- 基本导航 -->
<ul class="nav">
  <li class="nav-item">
    <a class="nav-link active" href="#">首页</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">关于</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">禁用</a>
  </li>
</ul>

<!-- 标签页导航 -->
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" data-bs-toggle="tab" href="#home">首页</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" data-bs-toggle="tab" href="#profile">简介</a>
  </li>
</ul>
```

### 5. 导航栏

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">品牌</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="#">首页</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">功能</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">价格</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

### 6. 模态框

```html
<!-- 触发按钮 -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  打开模态框
</button>

<!-- 模态框 -->
<div class="modal fade" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">模态框标题</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        内容...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-primary">保存</button>
      </div>
    </div>
  </div>
</div>
```

### 7. 提示框

```html
<button type="button" class="btn btn-primary" data-bs-toggle="tooltip" title="提示文字">
  悬停查看
</button>
```

### 8. 轮播

```html
<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>
```

---

## 五、实用工具类

### 1. 间距

```html
<!-- 边距 -->
<div class="m-1">margin: 0.25rem</div>
<div class="m-2">margin: 0.5rem</div>
<div class="m-3">margin: 1rem</div>
<div class="m-4">margin: 1.5rem</div>
<div class="m-5">margin: 3rem</div>

<!-- 方向 -->
.mt-0, .mt-1 ... .mt-5  /* margin-top */
.mb-0, .mb-1 ... .mb-5  /* margin-bottom */
.ms-0, .ms-1 ... .ms-5  /* margin-start (left) */
.me-0, .me-1 ... .me-5  /* margin-end (right) */

<!-- auto -->
.mx-auto  /* 水平居中 */
.my-auto  /* 垂直居中 */

/* padding 同理 */
.pt-0, .pt-1 ... .pt-5  /* padding-top */
```

### 2. 颜色

```html
<!-- 文本颜色 -->
<p class="text-primary">主要</p>
<p class="text-success">成功</p>
<p class="text-danger">危险</p>
<p class="text-warning">警告</p>
<p class="text-info">信息</p>
<p class="text-muted">浅灰</p>
<p class="text-white">白色</p>
<p class="text-dark">深色</p>

<!-- 背景颜色 -->
<p class="bg-primary text-white">主要</p>
<p class="bg-success text-white">成功</p>
<p class="bg-danger text-white">危险</p>
```

### 3. 显示

```html
.d-none           /* 隐藏 */
.d-block          /* 显示为块元素 */
.d-inline         /* 显示为行内元素 */
.d-inline-block   /* 显示为行内块元素 */
.d-flex           /* flex 容器 */
.d-grid           /* grid 容器 */

/* 响应式显示 */
.d-none.d-md-block  /* md 以上显示 */
```

### 4. 文本

```html
<!-- 对齐 -->
.text-start       /* 左对齐 */
.text-center      /* 居中 */
.text-end         /* 右对齐 */

/* 换行 -->
.text-wrap        /* 换行 */
.text-nowrap      /* 不换行 */
.text-truncate    /* 截断文本 */

/* 大小写 -->
.text-lowercase   /* 小写 */
.text-uppercase   /* 大写 */
.text-capitalize  /* 首字母大写 */

/* 字号 -->
.fs-1 ... .fs-6   /* font-size */
```

### 5. 边框与圆角

```html
<!-- 边框 -->
.border           /* 添加边框 */
.border-0         /* 移除边框 */
.border-top       /* 只加顶部边框 */
.border-bottom    /* 只加底部边框 */

/* 边框颜色 */
.border-primary
.border-success
.border-danger

<!-- 圆角 -->
.rounded          /* 圆角 */
.rounded-0        /* 无圆角 */
.rounded-1        /* 小圆角 */
.rounded-2        /* 中圆角 */
.rounded-3        /* 大圆角 */
.rounded-circle   /* 圆形 */
.rounded-pill     /* 药丸形状 */
```

---

## 六、自定义 Bootstrap

### 1. 使用 Sass

```scss
// 自定义变量
$primary: #ff6b00;
$secondary: #00d2ff;
$body-bg: #f8f9fa;

// 引入 Bootstrap
@import "bootstrap/scss/bootstrap";
```

### 2. 常用变量

```scss
$primary:       // 主要颜色
$secondary:     // 次要颜色
$success:       // 成功颜色
$info:          // 信息颜色
$warning:       // 警告颜色
$danger:        // 危险颜色
$light:         // 浅色
$dark:          // 深色

$font-family-sans-serif:  // 字体
$font-size-base:          // 基础字号
$border-radius:           // 圆角半径
$box-shadow:              // 阴影
```

---

## 七、Bootstrap 图标

Bootstrap 5 不再内置图标，推荐使用 Bootstrap Icons：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

<i class="bi bi-alarm"></i>
<i class="bi bi-github"></i>
<i class="bi bi-search"></i>
```

---

## 总结

Bootstrap 5 是一个功能强大、易于使用的前端框架，特别适合：
- 快速原型开发
- 响应式网站构建
- 后台管理系统
- 移动端优先的项目

掌握 Bootstrap 能大大提升开发效率，是前端工程师的必备技能之一。

Happy Coding! 🎨

---

*有问题欢迎评论区留言～*
