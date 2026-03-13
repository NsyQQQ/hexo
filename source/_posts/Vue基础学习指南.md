---
title: Vue基础
date: 2025-03-12 00:00:00
tags: [前端, Vue, JavaScript]
categories: 技术文档
---

Vue.js是一套用于构建用户界面的渐进式JavaScript框架。本文将介绍Vue2的基础知识和核心概念，帮助你快速入门。

<!-- more -->

## 一、Vue简介

Vue.js是一个渐进式JavaScript框架，具有以下特点：

- **易上手**：学习曲线平缓，文档友好
- **灵活**：可以作为库或框架使用
- **高效**：虚拟DOM，响应式数据绑定
- **生态丰富**：Vue Router、Vuex、Vue CLI

---

## 二、Vue实例

### 2.1 创建Vue实例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Vue入门</title>
</head>
<body>
    <div id="app">
        <h1>{{ message }}</h1>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
        })
    </script>
</body>
</html>
```

### 2.2 数据与方法

```javascript
const vm = new Vue({
    data: {
        name: '张三',
        age: 25
    }
})

// 访问数据
console.log(vm.name)  // 张三

// 修改数据
vm.name = '李四'  // 视图会自动更新
```

---

## 三、模板语法

### 3.1 插值

**文本插值：**
```html
<p>{{ message }}</p>
```

**原始HTML：**
```html
<p v-html="htmlContent"></p>
```

**属性绑定：**
```html
<img v-bind:src="imageUrl">
<!-- 简写 -->
<img :src="imageUrl">
```

### 3.2 指令

**条件渲染：**
```html
<p v-if="show">显示内容</p>
<p v-else>隐藏内容</p>
```

**列表渲染：**
```html
<ul>
    <li v-for="item in items" :key="item.id">
        {{ item.name }}
    </li>
</ul>
```

**事件处理：**
```html
<button v-on:click="handleClick">点击</button>
<!-- 简写 -->
<button @click="handleClick">点击</button>
```

**双向绑定：**
```html
<input v-model="message">
```

---

## 四、计算属性与监听器

### 4.1 计算属性

```javascript
new Vue({
    data: {
        firstName: '张',
        lastName: '三'
    },
    computed: {
        fullName() {
            return this.firstName + this.lastName
        }
    }
})
```

### 4.2 监听器

```javascript
new Vue({
    data: {
        question: '',
        answer: ''
    },
    watch: {
        question(newQuestion) {
            this.getAnswer()
        }
    },
    methods: {
        getAnswer() {
            this.answer = '正在思考...'
        }
    }
})
```

---

## 五、Class与Style绑定

### 5.1 Class绑定

```html
<!-- 对象语法 -->
<div :class="{ active: isActive, 'text-danger': hasError }">
    内容
</div>

<!-- 数组语法 -->
<div :class="[activeClass, errorClass]">
    内容
</div>
```

### 5.2 Style绑定

```html
<!-- 对象语法 -->
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
    内容
</div>

<!-- 数组语法 -->
<div :style="[baseStyles, overrideStyles]">
    内容
</div>
```

---

## 六、条件渲染与列表渲染

### 6.1 条件渲染

```html
<!-- v-if -->
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else>C</div>

<!-- v-show -->
<div v-show="isVisible">显示/隐藏</div>
```

> **注意**：`v-if` 会真正渲染/销毁元素，`v-show` 只是切换display属性

### 6.2 列表渲染

```javascript
new Vue({
    data: {
        items: [
            { id: 1, name: '苹果' },
            { id: 2, name: '香蕉' },
            { id: 3, name: '橙子' }
        ]
    }
})
```

```html
<ul>
    <li v-for="(item, index) in items" :key="item.id">
        {{ index }} - {{ item.name }}
    </li>
</ul>
```

---

## 七、事件处理

### 7.1 基本用法

```javascript
methods: {
    greet(name) {
        alert('Hello ' + name)
    },
    say(message, event) {
        console.log(message, event.target)
    }
}
```

```html
<button @click="greet('Vue')">打招呼</button>
<!-- 传递事件对象 -->
<button @click="say('Hi', $event)">带参数</button>
```

### 7.2 事件修饰符

```html
<!-- 阻止默认行为 -->
<a @click.prevent="handleLink">链接</a>

<!-- 阻止事件冒泡 -->
<button @click.stop="handleClick">按钮</button>

<!-- 只触发一次 -->
<button @click.once="handleClick">按钮</button>
```

---

## 八、表单输入绑定

### 8.1 基础用法

```javascript
data: {
    message: '',
    checked: false,
    selected: 'A',
    multiSelected: []
}
```

```html
<!-- 文本输入 -->
<input v-model="message">

<!-- 复选框 -->
<input type="checkbox" v-model="checked">

<!-- 单选按钮 -->
<input type="radio" v-model="selected" value="A">
<input type="radio" v-model="selected" value="B">

<!-- 下拉选择 -->
<select v-model="selected">
    <option value="A">选项A</option>
    <option value="B">选项B</option>
</select>

<!-- 多选 -->
<input type="checkbox" v-model="multiSelected" value="A">
<input type="checkbox" v-model="multiSelected" value="B">
```

### 8.2 修饰符

```html
<!-- lazy：失焦时更新 -->
<input v-model.lazy="message">

<!-- number：转为数字 -->
<input v-model.number="age">

<!-- trim：去除首尾空格 -->
<input v-model.trim="username">
```

---

## 九、组件基础

### 9.1 注册组件

```javascript
// 全局注册
Vue.component('my-component', {
    template: '<div>自定义组件</div>'
})

// 局部注册
new Vue({
    components: {
        'my-component': {
            template: '<div>局部组件</div>'
        }
    }
})
```

### 9.2 组件通信

**Props父传子：**
```javascript
// 子组件
Vue.component('child', {
    props: ['title'],
    template: '<p>{{ title }}</p>'
})
```

```html
<!-- 父组件 -->
<child title="传递给子组件的数据"></child>
```

**Event子传父：**
```javascript
// 子组件
this.$emit('update', '新数据')
```

```html
<!-- 父组件 -->
<child @update="handleUpdate"></child>
```

---

## 十、生命周期钩子

| 钩子 | 说明 |
|------|------|
| beforeCreate | 实例创建前 |
| created | 实例创建后 |
| beforeMount | 挂载前 |
| mounted | 挂载后 |
| beforeUpdate | 更新前 |
| updated | 更新后 |
| beforeDestroy | 销毁前 |
| destroyed | 销毁后 |

```javascript
new Vue({
    created() {
        console.log('实例已创建')
    },
    mounted() {
        console.log('DOM已挂载')
    }
})
```

---

## 十一、过渡效果

```html
<transition name="fade">
    <p v-if="show">过渡内容</p>
</transition>
```

```css
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
```

---

## 十二、学习路线建议

### 阶段一：基础入门（1周）
- Vue实例和数据绑定
- 模板语法
- 指令使用
- 事件处理

### 阶段二：组件开发（1-2周）
- 组件注册和使用
- 组件通信
- 插槽使用

### 阶段三：进阶学习
- Vue Router路由
- Vuex状态管理
- Vue CLI脚手架
- Vue3新特性

---

## 十三、总结

Vue.js是一个易学易用的前端框架，建议：

1. **多实践**：动手写小项目加深理解
2. **看官方文档**：文档非常友好
3. **学习Vue生态**：Vue Router、Vuex等
4. **参考开源项目**：学习优秀代码

祝你在Vue学习的道路上有所收获！🚀

---

*本文最后更新于 2025-03-11*
