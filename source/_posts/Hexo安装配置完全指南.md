---
title: Hexo 博客搭建教程
date: 2025-02-11 00:00:00
tags: [Hexo, GitHub Pages, 教程]
categories: 技术教程
---

本文详细介绍Hexo博客框架的安装、配置、日常使用以及部署到GitHub Pages的完整流程。

<!-- more -->

## 一、安装环境

### 1.1 安装Node.js

Hexo基于Node.js开发，首先需要安装Node.js环境。

**下载安装：**
- 官网下载：https://nodejs.org （选择LTS长期支持版）
- 安装完成后验证：
```bash
node -v
npm -v
```

### 1.2 安装Git

Git用于版本控制和部署。

**Windows安装：**
- 下载Git：https://git-scm.com

---

## 二、安装Hexo

### 2.1 安装Hexo CLI

```bash
npm install -g hexo-cli
```

验证安装：
```bash
hexo version
```

### 2.2 初始化Hexo项目

```bash
# 创建新项目
hexo init my-blog
cd my-blog
npm install
```

或者克隆已有项目：
```bash
git clone https://github.com/你的用户名/你的仓库.git
cd 你的仓库
npm install
```

---

## 三、配置Hexo

### 3.1 基础配置

打开 `_config.yml` 文件进行配置：

```yaml
# Site
title: 我的博客
subtitle: 副标题
description: 描述
keywords: 关键词
author: 你的名字
language: zh-CN
timezone: Asia/Shanghai

# URL
url: https://你的用户名.github.io/仓库名
permalink: :title/

# Deployment
deploy:
  type: git
  repo: https://github.com/你的用户名/仓库名.git
  branch: gh-pages
```

### 3.2 安装主题（可选）

```bash
# 克隆主题到themes目录
git clone https://github.com/hexojs/hexo-theme-landscape.git themes/landscape

# 或者使用npm安装
npm install hexo-theme-landscape --save

# 在_config.yml中设置
theme: landscape
```

### 3.3 安装部署工具

```bash
npm install hexo-deployer-git --save
```

---

## 四、Hexo常用命令

### 4.1 创建内容

```bash
# 创建新文章
hexo new "文章标题"

# 创建草稿
hexo new draft "草稿标题"

# 创建页面
hexo new page "关于"
```

### 4.2 本地预览

```bash
# 启动本地服务器
hexo server

# 或简写
hexo s

# 指定端口
hexo server -p 8080
```

访问 http://localhost:4000 查看效果

### 4.3 生成静态文件

```bash
# 生成静态网站
hexo generate

# 或简写
hexo g

# 清理缓存
hexo clean
```

### 4.4 部署到GitHub

```bash
# 一键部署
hexo deploy

# 或简写
hexo d

# 常用组合命令
hexo clean && hexo generate && hexo deploy
```

---

## 五、写作指南

### 5.1 文章格式

在 `source/_posts` 目录下创建 `.md` 文件，文件头部需要Front Matter：

```yaml
---
title: 文章标题
date: 2025-03-10 00:00:00
tags: [标签1, 标签2]
---
```

### 5.2 Markdown语法

Hexo支持标准的Markdown语法：

```markdown
# 标题1
## 标题2

**粗体**

*斜体*

[链接](URL)

![图片](图片URL)

- 列表项
- 列表项

> 引用
```

### 5.3 代码高显

````markdown
```javascript
function hello() {
  console.log('Hello Hexo!');
}
```
````

---

## 六、部署到GitHub Pages

### 6.1 创建GitHub仓库

1. 登录GitHub
2. 创建新仓库，命名为 `你的用户名.github.io` 或其他名称
3. 如果是项目博客，仓库名随意

### 6.2 配置部署

在 `_config.yml` 中配置：

```yaml
deploy:
  type: git
  repo: https://github.com/用户名/仓库名.git
  branch: gh-pages
```

### 6.3 部署步骤

```bash
# 1. 清理并生成
hexo clean && hexo generate

# 2. 部署
hexo deploy
```

### 6.4 访问博客

- 用户博客：`https://用户名.github.io`
- 项目博客：`https://用户名.github.io/仓库名/`

---

## 七、常用技巧

### 7.1 添加图片

1. 在 `source` 目录下创建 `images` 文件夹
2. 在文章中使用：
```markdown
![描述](/images/图片名.png)
```

### 7.2 添加页面

```bash
hexo new page about
```
然后在 `source/about/index.md` 中编辑内容

### 7.3 置顶文章

在文章Front Matter中添加：
```yaml
sticky: 100
```

---

## 八、常见问题

### Q1: 部署后页面404？
- 确认GitHub Pages设置中Branch选择正确
- 检查 `_config.yml` 中的 `url` 配置

### Q2: 图片显示不了？
- 确认图片路径正确
- 检查是否已生成静态文件

### Q3: 本地预览正常但部署后样式错乱？
- 清理缓存后重新部署
- 检查主题配置

---

## 九、总结

Hexo是一个简单高效的静态博客框架，通过本文的教程，你应该能够：

- ✅ 安装Hexo和所需环境
- ✅ 配置Hexo博客
- ✅ 熟练使用常用命令
- ✅ 编写Markdown文章
- ✅ 部署到GitHub Pages

祝你的博客之旅愉快！

---

*本文最后更新于 2026-03-12*
