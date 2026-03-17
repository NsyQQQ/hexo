---
title: jQuery 完全指南
date: 2025-03-10 10:00:00
tags: [jQuery, JavaScript, 前端, DOM, AJAX]
categories: [技术教程, 前端开发]
---
---

jQuery 是 JavaScript 世界中最著名的库之一，曾一度是前端开发的标配。虽然如今 Vue、React 等框架占据了主流，但 jQuery 仍然在大量项目中发挥着作用。本文带你全面了解 jQuery。

<!-- more -->

## 一、jQuery 简介

jQuery 是一个快速、简洁的 JavaScript 库，由 John Resig 于 2006 年创建。其核心理念是 "Write Less, Do More"（写得更少，做得更多）。

**特点：**
- 强大的选择器
- 简洁的 DOM 操作
- 便捷的事件处理
- 流畅的动画效果
- 统一的 AJAX 操作
- 丰富的插件生态

---

## 二、快速入门

### 1. 引入 jQuery

```html
<!-- CDN 引入 -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

或下载到本地使用。

### 2. 基础语法

```javascript
$(selector).action()
```

- `$`：jQuery 的标识符
- `selector`：CSS 选择器
- `action`：要执行的操作

---

## 三、选择器

jQuery 继承了 CSS 选择器的语法，并进行了扩展。

### 1. 基础选择器

```javascript
$('#id')          // ID 选择器
$('.class')       // 类选择器
$('div')          // 元素选择器
$('*')            // 通配符选择器
$('div, p, span') // 组合选择器
```

### 2. 层级选择器

```javascript
$('div p')        // 后代选择器（div 内的所有 p）
$('div > p')      // 子选择器（div 内的直接 p 子元素）
$('div + p')      // 相邻兄弟选择器
$('div ~ p')      // 通用兄弟选择器
```

### 3. 过滤选择器

```javascript
$('li:first')     // 第一个 li
$('li:last')      // 最后一个 li
$('li:eq(2)')     // 索引为 2 的 li（从 0 开始）
$('li:odd')       // 奇数索引的 li
$('li:even')      // 偶数索引的 li
$('li:gt(2)')     // 索引大于 2 的 li
$('li:lt(2)')     // 索引小于 2 的 li
```

### 4. 属性选择器

```javascript
$('[href]')           // 有 href 属性的元素
$('[href="#"]')       // href 等于 "#" 的元素
$('[href!="#"]')      // href 不等于 "#" 的元素
$('[href^="#"]')      // href 以 "#" 开头的元素
$('[href$="#"]')      // href 以 "#" 结尾的元素
$('[href*="text"]')  // href 包含 "text" 的元素
```

---

## 四、DOM 操作

### 1. 获取/设置内容

```javascript
// 获取/设置文本
$('#text').text()           // 获取文本
$('#text').text('新文本')   // 设置文本

// 获取/设置 HTML
$('#html').html()           // 获取 HTML
$('#html').html('<b>新内容</b>')  // 设置 HTML

// 获取/设置表单值
$('#input').val()           // 获取值
$('#input').val('新值')     // 设置值
```

### 2. 属性操作

```javascript
// 获取/设置属性
$('a').attr('href')              // 获取 href
$('a').attr('href', 'new.html')  // 设置 href

// 获取/设置 data 属性
$('#div').data('name')           // 获取 data-name
$('#div').data('name', 'value')  // 设置 data-name

// 移除属性
$('a').removeAttr('href')
```

### 3. CSS 操作

```javascript
// 获取/设置单个样式
$('#div').css('color')           // 获取 color
$('#div').css('color', 'red')    // 设置 color

// 获取/设置多个样式
$('#div').css({
  color: 'red',
  fontSize: '16px',
  backgroundColor: '#fff'
})

// 添加/移除类
$('#div').addClass('active')
$('#div').removeClass('active')
$('#div').toggleClass('active')
$('#div').hasClass('active')     // 判断是否有该类
```

### 4. 尺寸与位置

```javascript
// 尺寸
$('#div').width()      // 内容宽度
$('#div').height()     // 内容高度
$('#div').innerWidth() // 包括 padding 的宽度
$('#div').outerWidth() // 包括 border 的宽度

// 位置
$('#div').offset()     // 获取相对于文档的位置 {top, left}
$('#div').position()   // 获取相对于父元素的位置
$('#div').scrollTop()  // 获取/设置滚动条垂直位置
$('#div').scrollLeft() // 获取/设置滚动条水平位置
```

---

## 五、事件处理

### 1. 绑定事件

```javascript
// 绑定点击事件
$('#btn').click(function() {
  alert('点击了！')
})

// 绑定多个事件
$('#btn').on('click mouseover', function() {
  console.log('事件触发')
})

// 绑定多个处理函数
$('#btn').on({
  click: function() { console.log('click') },
  mouseenter: function() { console.log('enter') }
})

// 事件委托
$('#parent').on('click', '.child', function() {
  // 代理到 .child 元素
})
```

### 2. 常用事件

```javascript
// 鼠标事件
.click()      .dblclick()
.mouseenter() .mouseleave()
.hover()      // 鼠标悬停

// 键盘事件
.keydown()   .keyup()    .keypress()

// 表单事件
.focus()     .blur()
.change()    .submit()
.select()    .input()

// 文档事件
.ready()     // DOM 加载完成
```

### 3. 解除绑定

```javascript
$('#btn').off()           // 解除所有事件
$('#btn').off('click')    // 解除点击事件
$('#btn').off('click', handler)  // 解除指定处理函数
```

---

## 六、动画效果

### 1. 基本动画

```javascript
// 显示/隐藏
$('#div').show()
$('#div').hide()
$('#div').toggle()

// 淡入/淡出
$('#div').fadeIn()
$('#div').fadeOut()
$('#div').fadeToggle()
$('#div').fadeTo(1000, 0.5)  // 淡入到指定透明度

// 滑入/滑出
$('#div').slideDown()
$('#div').slideUp()
$('#div').slideToggle()
```

### 2. 自定义动画

```javascript
$('#div').animate({
  width: '200px',
  height: '200px',
  left: '+=50'
}, 1000, 'swing', function() {
  // 动画完成回调
})
```

### 3. 停止动画

```javascript
$('#div').stop()           // 停止当前动画
$('#div').stop(true)       // 停止所有动画
$('#div').stop(true, true) // 立即完成当前动画
```

---

## 七、AJAX 请求

### 1. 基础 AJAX

```javascript
$.ajax({
  url: '/api/data',
  type: 'GET',
  data: { id: 1 },
  success: function(data) {
    console.log(data)
  },
  error: function(xhr, status, error) {
    console.error(error)
  },
  complete: function(xhr, status) {
    console.log('请求完成')
  }
})
```

### 2. 快捷方法

```javascript
$.get('/api/data', { id: 1 }, function(data) {
  console.log(data)
})

$.post('/api/save', { name: 'John' }, function(data) {
  console.log(data)
})

$.getJSON('/api/data.json', function(data) {
  console.log(data)
})
```

### 3. 全局设置

```javascript
$.ajaxSetup({
  timeout: 5000,
  beforeSend: function(xhr) {
    // 请求发送前处理
  }
})
```

---

## 八、工具函数

```javascript
// 遍历数组/对象
$.each(arr, function(index, value) {
  console.log(index, value)
})

// 筛选数组
$.grep(arr, function(value, index) {
  return value > 5
})

// 映射数组
$.map(arr, function(value, index) {
  return value * 2
})

// 合并数组
$.merge(arr1, arr2)

// 字符串处理
$.trim(str)           // 去除两端空格
$.param(obj)          // 序列化为 URL 参数

// 类型判断
$.isArray(obj)
$.isFunction(obj)
$.isEmptyObject(obj)
$.isPlainObject(obj)
```

---

## 九、插件开发

### 1. 编写插件

```javascript
$.fn.myPlugin = function(options) {
  // 合并默认配置
  var settings = $.extend({
    color: 'red',
    fontSize: '14px'
  }, options)
  
  // 遍历所有元素
  return this.each(function() {
    $(this).css({
      color: settings.color,
      fontSize: settings.fontSize
    })
  })
}

// 使用
$('p').myPlugin({ color: 'blue' })
```

### 2. 插件链式调用

确保插件返回 `this` 以支持链式调用。

---

## 十、jQuery 迁移建议

虽然 jQuery 依然可用，但现代前端开发推荐：

1. **使用原生 JavaScript**：现代浏览器 API 已非常完善
2. **逐步迁移**：Vue、React 等框架
3. **必要保留**：维护旧项目或使用 jQuery 插件

**替代方案：**
- 选择器 → `querySelector` / `querySelectorAll`
- DOM 操作 → `document.createElement` / `appendChild`
- 事件 → `addEventListener`
- AJAX → `fetch API`
- 动画 → `CSS Transitions` / `Web Animations API`

---

## 总结

jQuery 曾经是前端开发的标配，虽然现在有了更现代的选择，但学习 jQuery 对于理解 DOM 操作和前端基础仍然很有帮助。如果你在维护旧项目或使用 jQuery 插件，这篇文章应该能帮到你。

Happy Coding! 🎉

---

*有问题欢迎评论区留言～*
