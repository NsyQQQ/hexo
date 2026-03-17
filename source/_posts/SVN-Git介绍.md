---
title: SVN 和 Git 版本控制入门
date: 2025-04-05 11:24:00
tags: [Git, SVN, 版本控制, GitHub, 开发工具]
categories: [技术教程, 开发工具]
---
---

版本控制系统是软件开发中不可或缺的工具，它帮助开发者管理代码的历史版本、协作开发以及追踪变更。本文将详细介绍 SVN 和 Git 两种主流版本控制系统的使用方法。

<!-- more -->

## 1. 版本控制简介

### 1.1 什么是版本控制

版本控制系统（Version Control System）是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统。它的主要作用包括：

- **历史追溯**：查看任意版本的代码
- **变更对比**：比较不同版本的差异
- **协作开发**：多人同时开发同一项目
- **分支管理**：并行开发新功能
- **代码回退**：轻松回退到之前的版本

### 1.2 版本控制类型

| 类型 | 代表工具 | 特点 |
|------|----------|------|
| 本地版本控制 | RCS | 单机使用，简单 |
| 集中式版本控制 | SVN、CVS | 需中央服务器 |
| 分布式版本控制 | Git、Mercurial | 每人都有完整仓库 |

## 2. SVN 详解

### 2.1 什么是 SVN

SVN（Subversion）是一个集中式的版本控制系统，由 Apache 基金会维护。它通过一个中央服务器存储所有版本的代码，客户端从服务器获取最新版本或提交更改。

### 2.2 SVN 基本命令

```bash
# 检出仓库
svn checkout https://svn.example.com/repo/trunk my-project

# 更新代码
svn update

# 添加文件
svn add file.txt
svn add *.cpp

# 提交更改
svn commit -m "添加新功能"

# 查看状态
svn status

# 查看日志
svn log

# 查看差异
svn diff
svn diff -r 10:20 file.txt

# 回退文件
svn revert file.txt

# 查看文件列表
svn list
```

### 2.3 SVN 分支操作

```bash
# 创建分支
svn copy https://svn.example.com/repo/trunk \
         https://svn.example.com/repo/branches/feature-branch \
         -m "创建功能分支"

# 切换分支
svn switch https://svn.example.com/repo/branches/feature-branch

# 合并分支
svn merge https://svn.example.com/repo/branches/feature-branch

# 删除分支
svn delete https://svn.example.com/repo/branches/old-branch -m "删除旧分支"
```

### 2.4 SVN 冲突解决

```bash
# 查看冲突
svn status

# 解决冲突后标记为已解决
svn resolved file.txt

# 使用他人版本
svn revert file.txt

# 手动合并
# 编辑文件，手动保留需要的修改
svn resolved file.txt
svn commit -m "解决冲突"
```

### 2.5 SVN 标签管理

```bash
# 创建标签
svn copy https://svn.example.com/repo/trunk \
         https://svn.example.com/repo/tags/v1.0.0 \
         -m "发布版本 1.0.0"

# 查看标签
svn list https://svn.example.com/repo/tags
```

## 3. Git 详解

### 3.1 什么是 Git

Git 是一个分布式的版本控制系统，由 Linus Torvalds 创建。与 SVN 不同，Git 每个开发者都有完整的仓库副本，支持离线工作，使得协作更加灵活高效。

### 3.2 Git 基本配置

```bash
# 设置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 设置默认编辑器
git config --global core.editor vim

# 查看配置
git config --list

# 设置别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --oneline --graph --all"
```

### 3.3 Git 基本命令

```bash
# 初始化仓库
git init

# 克隆仓库
git clone https://github.com/user/repo.git

# 查看状态
git status

# 添加文件到暂存区
git add file.txt
git add .              # 添加所有文件
git add -p            # 交互式添加

# 提交更改
git commit -m "提交说明"
git commit -am "添加并提交（仅限已跟踪文件）"

# 查看日志
git log
git log --oneline
git log -n 5
git log --graph --all

# 查看差异
git diff
git diff --staged
git diff HEAD~1

# 撤销操作
git checkout -- file.txt          # 撤销文件修改
git reset HEAD file.txt           # 取消暂存
git commit --amend                # 修改最后一次提交
```

### 3.4 Git 分支操作

```bash
# 查看分支
git branch
git branch -r                    # 远程分支
git branch -a                    # 所有分支

# 创建分支
git branch feature-branch

# 切换分支
git checkout feature-branch
git switch feature-branch        # 新语法

# 创建并切换
git checkout -b feature-branch
git switch -c feature-branch    # 新语法

# 合并分支
git merge feature-branch
git merge --no-ff feature-branch # 保留分支历史

# 删除分支
git branch -d feature-branch    # 已合并
git branch -D feature-branch    # 强制删除

# 重命名分支
git branch -m old-name new-name
```

### 3.5 Git 远程操作

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 拉取代码
git pull
git pull origin main

# 推送代码
git push
git push origin main
git push -u origin main         # 设置上游分支

# 删除远程分支
git push origin --delete branch-name

# 获取远程更新
git fetch
```

### 3.6 Git 标签操作

```bash
# 创建标签
git tag v1.0.0
git tag v1.0.0 -m "发布版本 1.0.0"

# 查看标签
git tag
git tag -l "v1.*"

# 推送标签
git push origin v1.0.0
git push origin --tags          # 推送所有标签

# 删除标签
git tag -d v1.0.0               # 本地
git push origin --delete v1.0.0 # 远程
```

### 3.7 Git 储藏操作

```bash
# 储藏当前修改
git stash
git stash save "工作描述"

# 查看储藏列表
git stash list

# 恢复储藏
git stash apply
git stash pop                   # 恢复并删除

# 删除储藏
git stash drop
git stash clear                 # 清空所有储藏
```

## 4. Git 进阶技巧

### 4.1 变基（Rebase）

```bash
# 变基到主分支
git checkout feature-branch
git rebase main

# 交互式变基
git rebase -i HEAD~3

# 变基合并提交
# 在交互式变基中，将 pick 改为 squash
```

### 4.2  Cherry-Pick

```bash
# 拣选单个提交
git cherry-pick commit-hash

# 拣选多个提交
git cherry-pick commit1 commit2

# 拣选范围
git cherry-pick commit1..commit3
```

### 4.3 子模块

```bash
# 添加子模块
git submodule add https://github.com/user/repo.git path/to/submodule

# 克隆包含子模块的仓库
git clone --recursive https://github.com/user/repo.git

# 更新子模块
git submodule update --init --recursive
```

### 4.4 工作流

#### Git Flow

```bash
# 创建功能分支
git checkout -b feature/new-feature develop

# 开发完成后合并到 develop
git checkout develop
git merge --no-ff feature/new-feature
git push

# 创建发布分支
git checkout -b release/1.0.0 develop

# 修复问题后合并到 master 和 develop
git checkout master
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
git push

git checkout develop
git merge --no-ff release/1.0.0
git push
```

#### GitHub Flow

```bash
# 从 main 创建分支
git checkout -b feature/new-feature

# 开发并提交
git commit -am "添加新功能"

# 推送并创建 Pull Request
git push -u origin feature/new-feature

# 代码审查后合并到 main
```

### 4.5 忽略文件

创建 `.gitignore` 文件：

```gitignore
# 忽略所有 .log 文件
*.log

# 忽略 node_modules 目录
node_modules/

# 忽略特定目录
dist/
build/

# 忽略特定文件
secret.txt
config.local.json

# 保留某目录但不忽略其中的文件
!uploads/*.jpg

# 忽略所有 .env 文件
.env
.env.*
```

## 5. 常见问题与解决

### 5.1 撤销操作

```bash
# 撤销工作区修改
git checkout -- file
git restore file               # 新语法

# 撤销暂存
git reset HEAD file
git restore --staged file      # 新语法

# 撤销提交（保留修改）
git reset --soft HEAD~1

# 撤销提交（不保留修改）
git reset --hard HEAD~1
```

### 5.2 解决冲突

```bash
# 查看冲突文件
git status

# 查看冲突详情
git diff

# 解决冲突后
git add file.txt
git commit -m "解决冲突"

# 使用他人版本
git checkout --theirs file.txt
git checkout --ours file.txt
```

### 5.3 恢复误删

```bash
# 恢复删除的分支
git reflog
git checkout -b recovered-branch HEAD@{n}

# 恢复误删的文件
git checkout HEAD~1 -- file.txt

# 恢复删除的提交
git reflog
git reset --hard commit-hash
```

### 5.4 清理仓库

```bash
# 清理未跟踪文件
git clean -n                   # 预览
git clean -f                   # 删除文件
git clean -fd                  # 删除文件和目录

# 清理本地已合并的分支
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

## 6. SVN 与 Git 对比

### 6.1 架构对比

| 特性 | SVN | Git |
|------|-----|-----|
| 架构 | 集中式 | 分布式 |
| 离线工作 | 不支持 | 支持 |
| 分支 | 耗时，谨慎使用 | 轻量，快速 |
| 速度 | 较慢 | 快 |
| 学习曲线 | 较平缓 | 较陡 |

### 6.2 命令对比

| 操作 | SVN | Git |
|------|-----|-----|
| 检出 | `svn checkout` | `git clone` |
| 更新 | `svn update` | `git pull` |
| 提交 | `svn commit` | `git add + commit` |
| 查看状态 | `svn status` | `git status` |
| 查看日志 | `svn log` | `git log` |
| 创建分支 | `svn copy` | `git branch` |
| 切换分支 | `svn switch` | `git checkout` |
| 合并 | `svn merge` | `git merge` |

### 6.3 使用场景

**推荐使用 SVN**：
- 团队对集中式管理有需求
- 项目规模较小
- 团队成员不熟悉 Git

**推荐使用 Git**：
- 需要离线工作
- 频繁使用分支
- 开源项目
- 分布式团队

## 7. 最佳实践

### 7.1 Git 最佳实践

1. **频繁提交**：每次完成一个小功能就提交
2. **有意义的提交信息**：清楚描述本次修改内容
3. **使用分支**：每个功能或修复使用独立分支
4. **代码审查**：通过 Pull Request 进行代码审查
5. **保持主分支整洁**：只保留稳定的代码
6. **定期拉取更新**：保持本地代码最新

### 7.2 提交信息规范

```
feat: 添加用户登录功能
fix: 修复登录页面验证码错误
docs: 更新 README 文档
style: 格式化代码
refactor: 重构用户认证模块
test: 添加单元测试
chore: 更新依赖版本
```

### 7.3 分支命名规范

```
feature/user-login      # 新功能
bugfix/login-error      # Bug 修复
hotfix/security-patch   # 紧急修复
release/1.0.0          # 发布版本
```

## 8. 总结

本文详细介绍了 SVN 和 Git 两种版本控制系统：

1. **版本控制基础**：概念和类型
2. **SVN 详解**：基本命令、分支操作、冲突解决
3. **Git 详解**：配置、基本命令、远程操作
4. **Git 进阶**：变基、子模块、工作流
5. **常见问题**：撤销操作、冲突解决
6. **对比分析**：架构、命令、适用场景

选择合适的版本控制系统，并遵循最佳实践，可以显著提升团队的开发效率和代码管理水平。
