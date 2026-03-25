---
title: Claude Code for VS Code
date: 2026-03-20 10:00:00
tags: [VS Code, Claude, AI, minimax]
categories: [技术教程, 游戏开发]
featured: true
sticky: 100
---

本文详细介绍如何在 VS Code 中使用 Claude Code 插件，并配置 **MiniMax-M2.7** 模型进行 AI 编程。无需登录 Anthropic 账户，直接使用 MiniMax API！

<!-- more -->

## 前言

Claude Code 是 Anthropic 推出的 AI 编程助手，现在已经可以直接集成到 VS Code 中使用。更棒的是，我们可以配置 **MiniMax-M2.7** 模型，无需登录 Anthropic 账户，直接使用 MiniMax API Key 即可！

## 安装 Claude Code 插件

1. 在 VS Code 中，按 `Ctrl+Shift+X`（Windows/Linux）或 `Cmd+Shift+X`（Mac）打开扩展视图
2. 搜索 "Claude Code"
3. 点击 **Install** 按钮安装

或者点击 [Install for VS Code](vscode:extension/anthropic.claude-code) 直接安装

> 💡 **提示**：如果安装后插件没有显示，请重启 VS Code 或从命令面板运行 "Developer: Reload Window"

## 配置 MiniMax API

> ⚠️ **重要提示**：在配置前，请确保清除以下 Anthropic 相关的环境变量，以免影响 MiniMax API 的正常使用：
> - `ANTHROPIC_AUTH_TOKEN`
> - `ANTHROPIC_BASE_URL`

### 步骤 1：获取 MiniMax API Key

1. 访问 [MiniMax 开放平台](https://platform.minimaxi.com/)
2. 注册/登录账户
3. 在控制台创建 API Key

### 步骤 2：配置 VS Code

打开 VS Code 的 `settings.json` 文件（点击 **Edit in settings.json**），添加以下配置：

```json
{
  "claudeCode.preferredLocation": "panel",
  "claudeCode.selectedModel": "minimax-m2.7",
  "claudeCode.environmentVariables": [
    {
      "name": "ANTHROPIC_BASE_URL",
      "value": "https://api.minimaxi.com/anthropic"
    },
    {
      "name": "ANTHROPIC_AUTH_TOKEN",
      "value": "<MINIMAX_API_KEY>"
    },
    {
      "name": "API_TIMEOUT_MS",
      "value": "3000000"
    },
    {
      "name": "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC",
      "value": "1"
    },
    {
      "name": "ANTHROPIC_MODEL",
      "value": "MiniMax-M2.7"
    },
    {
      "name": "ANTHROPIC_SMALL_FAST_MODEL",
      "value": "MiniMax-M2.7"
    },
    {
      "name": "ANTHROPIC_DEFAULT_SONNET_MODEL",
      "value": "MiniMax-M2.7"
    },
    {
      "name": "ANTHROPIC_DEFAULT_OPUS_MODEL",
      "value": "MiniMax-M2.7"
    },
    {
      "name": "ANTHROPIC_DEFAULT_HAIKU_MODEL",
      "value": "MiniMax-M2.7"
    }
  ]
}
```

> 💡 将 `<MINIMAX_API_KEY>` 替换为你的 MiniMax API Key

### 步骤 3：配置跳过登录

找到用户目录下的 `.claude.json` 文件（Windows 为 `C:\Users\你的用户名\.claude.json`），添加 `hasCompletedOnboarding` 参数：

```json
{
  "hasCompletedOnboarding": true
}
```

这个参数可以让 Claude Code 跳过登录步骤，直接使用配置好的模型。

### 步骤 4：重启 VS Code

配置完成后，**重启 VS Code**，然后就可以开始使用了！

## 快速开始

### 打开 Claude Code 面板

有多种方式可以打开 Claude Code：

| 方式 | 操作 |
|------|------|
| **编辑器工具栏** | 点击右上角的 Spark 图标（✨） |
| **活动栏** | 点击左侧边栏的 Spark 图标 |
| **命令面板** | `Ctrl+Shift+P`，输入 "Claude Code" |
| **状态栏** | 点击右下角的 "✱ Claude Code" |

### 发送提示

打开面板后，你可以向 Claude 提问关于代码的任何问题：

- 解释某段代码的工作原理
- 调试问题
- 修改代码
- 重构代码

> 💡 **技巧**：Claude 会自动看到你选中的文本。按 `Alt+K`（Windows/Linux）或 `Option+K`（Mac）可以插入 @-mention 引用

### 审查和接受更改

当 Claude 想要编辑文件时，它会显示原文件和拟议更改的对比，然后请求你的许可。你可以：

- ✅ **接受** - 同意更改
- ❌ **拒绝** - 拒绝更改
- 💬 **修改** - 告诉 Claude 应该如何修改

## 核心功能

### 1. @-mention 引用文件

使用 `@` 符号可以引用特定文件或文件夹：

```
> Explain the logic in @auth
> What's in @src/components/
```

### 2. 权限模式

Claude Code 支持三种权限模式：

| 模式 | 说明 |
|------|------|
| **Normal** | Claude 在每个操作前都会请求许可 |
| **Plan** | Claude 描述将要执行的操作，等待批准后再开始 |
| **Auto-accept** | Claude 自动执行更改，无需询问 |

### 3. 命令菜单

按 `/` 打开命令菜单，可以：

- 附加文件
- 切换模型
- 切换扩展思考
- 查看使用情况
- 配置 MCP 服务器等

### 4. 扩展思考 (Extended Thinking)

让 Claude 有更多时间推理复杂问题。可以通过命令菜单（`/`）开启。

### 5. 会话历史

点击 Claude Code 面板顶部的下拉菜单可以：

- 搜索会话关键词
- 按时间浏览
- 恢复之前的对话

## 进阶配置：图片理解 & 网络搜索

如果需要使用图片理解 & 网络搜索能力，需要额外配置 MCP。详细教程请参考：[MiniMax MCP 配置指南](https://platform.minimaxi.com/docs/token-plan/mcp-guide)

## 常见问题

### Q: 安装后插件不显示怎么办？
A: 重启 VS Code 或运行 "Developer: Reload Window"

### Q: 配置后还是提示登录怎么办？
A: 确保 `.claude.json` 文件中已添加 `"hasCompletedOnboarding": true`，然后重启 VS Code。

### Q: API 请求失败怎么办？
A: 检查以下几点：
1. API Key 是否正确
2. 是否还有残留的 Anthropic 环境变量
3. 网络是否能访问 api.minimaxi.com

### Q: MiniMax-M2.7 效果如何？
A: MiniMax-M2.7 是国产大模型中的优秀选择，中文能力突出，代码理解能力也不错，非常适合国内开发者使用！

## 总结

通过配置 MiniMax API，我们可以在 VS Code 中免费使用 Claude Code 插件进行 AI 编程：

- ✅ **无需登录 Anthropic 账户**
- ✅ **使用 MiniMax-M2.7 国产大模型**
- ✅ **完整的 AI 编程体验**
- ✅ **支持图片理解（需额外配置 MCP）**

对于国内开发者来说，这种方案既方便又经济，值得一试！

---

**参考文档**：
- [MiniMax Claude Code 官方文档](https://platform.minimaxi.com/docs/token-plan/claude-code)
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Anthropic.claude-code)
- [MiniMax 开放平台](https://platform.minimaxi.com/)
