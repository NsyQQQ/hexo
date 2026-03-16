---
title: Linux 基础
date: 2026-01-10 10:00:00
categories:
  - 技术教程
tags:
  - Linux
  - 运维
  - 服务器
  - 入门教程
---

Linux 是一种开源的操作系统，广泛应用于服务器、嵌入式设备和超级计算机等领域。本文将介绍 Linux 的基础知识和常用命令，帮助初学者快速入门。

<!-- more -->

## 一、什么是 Linux

Linux 是一种自由和开源的类 Unix 操作系统，由 Linus Torvalds 于 1991 年首次发布。它以稳定性、安全性和灵活性著称，是现代互联网基础设施的基石。

### Linux 的特点

- **开源免费**：任何人都可以免费使用和修改
- **多用户多任务**：支持多个用户同时使用系统
- **稳定性高**：长时间运行不需重启
- **安全性强**：完善的权限管理机制
- **硬件支持广泛**：从嵌入式设备到超级计算机

## 二、Linux 目录结构

Linux 采用树形目录结构，所有文件和目录都从根目录（/）开始。

```
/
├── /bin      # 系统二进制文件
├── /boot    # 启动文件
├── /dev     # 设备文件
├── /etc     # 配置文件
├── /home    # 用户主目录
├── /lib     # 系统库文件
├── /media   # 可移动媒体挂载点
├── /mnt     # 临时挂载点
├── /opt     # 可选软件
├── /proc    # 进程信息
├── /root    # 根用户主目录
├── /run     # 运行时数据
├── /sbin    # 系统二进制文件
├── /srv     # 服务数据
├── /sys     # 系统信息
├── /tmp     # 临时文件
├── /usr     # 用户程序
└── /var     # 可变数据
```

## 三、常用命令

### 文件操作命令

```bash
# 查看当前目录
pwd

# 列出文件
ls -la

# 切换目录
cd /path/to/directory

# 创建目录
mkdir dirname

# 创建文件
touch filename

# 复制文件
cp source destination

# 移动/重命名文件
mv source destination

# 删除文件
rm filename

# 删除目录
rm -rf dirname
```

### 文件内容查看

```bash
# 查看文件内容
cat filename

# 分页查看文件
more filename

# 分页查看（可上下翻页）
less filename

# 查看文件头部
head -n 10 filename

# 查看文件尾部
tail -n 10 filename
```

### 权限管理

```bash
# 查看文件权限
ls -l filename

# 修改文件权限
chmod 755 filename

# 修改文件所有者
chown user:group filename
```

### 系统管理

```bash
# 查看进程
ps aux

# 实时查看进程
top

# 杀死进程
kill PID

# 查看磁盘使用情况
df -h

# 查看内存使用情况
free -h
```

### 网络命令

```bash
# 查看 IP 地址
ip addr

# 测试网络连接
ping host

# 查看网络连接状态
netstat -tuln

# 远程登录
ssh user@host

# 传输文件
scp source user@host:destination
```

## 四、Vim 编辑器基础

Vim 是 Linux 中最常用的文本编辑器之一。

### 基本操作

```bash
# 打开文件
vim filename

# 进入编辑模式
i

# 退出编辑模式
Esc

# 保存并退出
:wq

# 不保存退出
:q!

# 搜索
/keyword

# 替换
:%s/old/new/g
```

## 五、软件包管理

### Debian/Ubuntu (APT)

```bash
# 更新软件源
sudo apt update

# 安装软件
sudo apt install package_name

# 卸载软件
sudo apt remove package_name

# 升级软件
sudo apt upgrade
```

### CentOS/RHEL (YUM/DNF)

```bash
# 安装软件
sudo yum install package_name

# 卸载软件
sudo yum remove package_name

# 升级软件
sudo yum update
```

## 六、用户和权限

### 用户管理

```bash
# 创建用户
sudo useradd username

# 删除用户
sudo userdel username

# 修改用户密码
sudo passwd username

# 切换用户
su username
```

### 权限说明

Linux 文件权限由三个部分组成：所有者、组、其他用户

```
rwx r-x r-x
|  |  |
|  |  └── 其他用户权限
|  └----- 组权限
└-------- 所有者权限
```

- r：读取权限（4）
- w：写入权限（2）
- x：执行权限（1）

## 七、常用快捷键

| 快捷键 | 说明 |
|--------|------|
| Ctrl + C | 终止当前命令 |
| Ctrl + Z | 暂停当前命令 |
| Ctrl + L | 清屏 |
| Ctrl + A | 光标移到行首 |
| Ctrl + E | 光标移到行尾 |
| Ctrl + U | 删除光标前的字符 |
| Ctrl + K | 删除光标后的字符 |
| Tab | 命令补全 |
| ↑/↓ | 历史命令 |

## 总结

本文介绍了 Linux 的基础知识和常用命令，掌握这些内容可以帮助你更好地使用 Linux 系统。Linux 学习是一个长期的过程，建议多加练习，逐步深入学习Shell脚本、系统管理、网络配置等进阶内容。

---

> 更多 Linux 相关文章正在整理中，敬请期待！
