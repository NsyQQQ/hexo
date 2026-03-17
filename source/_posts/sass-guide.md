---
title: Sass 完全指南
date: 2025-03-04 10:00:00
tags: [Sass, CSS, 前端, 预处理, Less]
categories: [技术教程, 前端开发]
---
---

Sass（Syntactically Awesome Style Sheets）是最成熟、最稳定、功能最强大的 CSS 预处理器。它扩展了 CSS 的能力，提供了变量、嵌套、混入、继承等特性，让 CSS 编写更加高效和可维护。

<!-- more -->

## 一、Sass 简介

### 什么是 Sass？

Sass 是 CSS 的预处理器，用更像编程语言的方式编写 CSS，然后编译成标准的 CSS 文件。

**两种语法：**
- **SCSS**（Sassy CSS）：`.scss` 格式，CSS 语法的超集，推荐使用
- **Sass**（缩进语法）：`.sass` 格式，使用缩进表示嵌套

### 安装 Sass

```bash
# 通过 npm 安装
npm install -g sass

# 或使用 Homebrew（macOS）
brew install sass/sass/sass
```

### 编译

```bash
# 监听文件变化自动编译
sass --watch style.scss:style.css

# 编译整个目录
sass --watch scss/:css/
```

---

## 二、变量

### 定义变量

```scss
$primary-color: #3498db;
$font-stack: 'Helvetica', sans-serif;
$border-radius: 4px;
```

### 使用变量

```scss
body {
  font-family: $font-stack;
  color: $primary-color;
}

.button {
  background: $primary-color;
  border-radius: $border-radius;
}
```

### 变量作用域

```scss
$color: red;

.my-module {
  $color: blue; // 模块级变量
  color: $color; // blue
}

.other-module {
  color: $color; // red
}
```

### 默认值

```scss
$primary-color: #3498db !default;
```

---

## 三、嵌套

### 基本嵌套

```scss
.container {
  width: 100%;

  .header {
    height: 60px;

    .logo {
      font-size: 24px;
    }
  }

  .content {
    padding: 20px;
  }
}
```

编译为：

```css
.container { width: 100%; }
.container .header { height: 60px; }
.container .header .logo { font-size: 24px; }
.container .content { padding: 20px; }
```

### 父选择器

```scss
.btn {
  &-primary {
    background: blue;
  }

  &:hover {
    background: darkblue;
  }

  &:focus {
    outline: none;
  }
}
```

编译为：

```css
.btn-primary { background: blue; }
.btn:hover { background: darkblue; }
.btn:focus { outline: none; }
```

### 属性嵌套

```scss
.card {
  font: {
    family: Arial;
    size: 16px;
    weight: bold;
  }

  border: {
    width: 1px;
    style: solid;
    color: #ccc;
  }
}
```

---

## 四、导入

### partial 文件

以下划线开头的文件称为 partial，不会单独编译：

```scss
// _variables.scss
$primary: #3498db;
$secondary: #2ecc71;

// _mixins.scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 导入

```scss
// 导入 partial（可省略下划线和扩展名）
@import 'variables';
@import 'mixins';

body {
  color: $primary;
}
```

---

## 五、混入（Mixins）

### 基本用法

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flex-center;
  height: 100vh;
}
```

### 带参数

```scss
@mixin theme($primary-color, $secondary-color) {
  background: $primary-color;
  color: $secondary-color;
}

.card {
  @include theme(#3498db, white);
}
```

### 默认参数

```scss
@mixin button($color: blue, $radius: 4px) {
  background: $color;
  border-radius: $radius;
}

.btn {
  @include button; // 使用默认值
  @include button(red, 8px); // 自定义参数
}
```

### 多参数

```scss
@mixin box-shadow($shadows...) {
  box-shadow: $shadows;
}

.card {
  @include box-shadow(0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1));
}
```

### 传递内容块

```scss
@mixin media($breakpoint) {
  @media screen and (max-width: $breakpoint) {
    @content;
  }
}

.sidebar {
  width: 300px;

  @include media(768px) {
    width: 100%;
  }
}
```

---

## 六、继承

### 使用 @extend

```scss
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  @extend .btn;
  background: #3498db;
  color: white;
}

.btn-secondary {
  @extend .btn;
  background: #95a5a6;
  color: white;
}
```

### 占位符选择器

```scss
%btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  @extend %btn;
  background: #3498db;
}

.btn-secondary {
  @extend %btn;
  background: #95a5a6;
}
```

---

## 七、运算

### 算术运算

```scss
.container {
  width: 100% / 3; // 除法
  height: 50px + 20px; // 加法
  margin: 20px - 10px; // 减法
  font-size: 10px * 2; // 乘法
}
```

### 颜色运算

```scss
$color: #3498db + #222222; // RGB 颜色相加
```

### 字符串运算

```scss
$name: 'Hello' + ' ' + 'World'; // Hello World
```

---

## 八、函数

### 内置函数

```scss
// 颜色函数
$color: lighten(#3498db, 10%); // 调亮
$color: darken(#3498db, 10%);  // 调暗
$color: saturate(#3498db, 10%); // 增强饱和度
$color: desaturate(#3498db, 10%); // 降低饱和度
$color: mix(#3498db, #e74c3c, 50%); // 混合颜色

// 字符串函数
$str: to-upper-case('hello'); // HELLO
$str: to-lower-case('HELLO'); // hello
$str: str-length('hello'); // 5

// 数值函数
$num: round(3.7); // 4
$num: ceil(3.2);  // 4
$num: floor(3.8); // 3
$num: abs(-10);  // 10
$num: min(1, 2, 3); // 1
$num: max(1, 2, 3); // 3
$num: percentage(0.5); // 50%

// 列表函数
$list: append(('a', 'b'), 'c'); // ('a', 'b', 'c')
$list: nth(('a', 'b', 'c'), 2); // 'b'
$list: length(('a', 'b', 'c')); // 3

// 映射函数
$map: map-get(('primary': blue, 'secondary': red), 'primary'); // blue
$map: map-keys(('primary': blue, 'secondary': red)); // ('primary', 'secondary')
```

### 自定义函数

```scss
@function calculate-rem($px) {
  @return $px / 16px * 1rem;
}

.container {
  font-size: calculate-rem(16);
}
```

---

## 九、控制指令

### @if / @else

```scss
$theme: light;

body {
  @if $theme == dark {
    background: #333;
    color: white;
  } @else if $theme == light {
    background: white;
    color: #333;
  } @else {
    background: gray;
  }
}
```

### @for

```scss
// 循环生成类
@for $i from 1 through 3 {
  .col-#{$i} {
    width: $i * 33.333%;
  }
}
```

### @each

```scss
// 遍历列表
$colors: (primary: blue, success: green, danger: red);

@each $name, $color in $colors {
  .btn-#{$name} {
    background: $color;
  }
}
```

### @while

```scss
$i: 1;
@while $i <= 3 {
  .item-#{$i} {
    width: $i * 100px;
  }
  $i: $i + 1;
}
```

---

## 十、高级特性

### 模块系统（@use）

```scss
// _math.scss
@use 'sass:math';

@function double($n) {
  @return math.div($n, 2);
}

// main.scss
@use 'math' as m;

.container {
  width: m.double(100px);
}
```

### 属性模块

```scss
@use 'sass:color';

$primary: #3498db;
$light-primary: color.scale($primary, $lightness: 20%);
```

### 调试

```scss
@debug 1 + 2; // Debug: 3
@warn '警告信息';
@error '错误信息';
```

---

## 十一、最佳实践

### 1. 目录结构

```
scss/
├── abstracts/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _functions.scss
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _button.scss
│   └── _card.scss
├── layout/
│   ├── _header.scss
│   └── _footer.scss
└── main.scss
```

### 2. 命名规范

```scss
// 使用 $kebab-case（短横线命名）
$primary-color;
$border-radius;

// 类名使用 BEM 或类似规范
.block {}
.block__element {}
.block--modifier {}
```

### 3. 使用 partial

将代码拆分到多个文件，便于维护和协作。

### 4. 避免过度嵌套

```scss
// 不推荐：嵌套过深
.nav {
  .list {
    .item {
      .link {
        // ...
      }
    }
  }
}

// 推荐：保持扁平
.nav-list {}
.nav-list__item {}
.nav-list__link {}
```

---

## 总结

Sass 是现代 CSS 开发不可或缺的工具。掌握以上核心特性，能够帮助你：

- 编写更 DRY（Don't Repeat Yourself）的 CSS
- 创建可维护的样式代码库
- 提高开发效率
- 更好地组织样式结构

建议从基础的变量和嵌套开始，逐步掌握混入、继承等高级特性，最终能够构建完整的 Sass 项目结构。

Happy Coding! 🎨

---

*有问题欢迎评论区留言～*
