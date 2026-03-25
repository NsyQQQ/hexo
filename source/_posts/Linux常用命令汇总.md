---
title: Linux 常用命令汇总
date: 2026-01-06 10:00:00
tags: [Linux, 运维]
categories: [技术教程, Linux]
---

Linux 命令是运维工程师的必备技能。本文汇总了最常用的 Linux 命令，分类清晰，方便查阅。

<!-- more -->

## 一、文件操作命令

### 查看文件

| 命令 | 说明 | 示例 |
|------|------|------|
| ls | 列出目录内容 | `ls -la` |
| cat | 查看文件内容 | `cat file.txt` |
| less | 分页查看（可上下滚动）| `less file.txt` |
| head | 查看文件头部 | `head -20 file.txt` |
| tail | 查看文件尾部 | `tail -20 file.txt` |
| wc | 统计行数/字符数 | `wc -l file.txt` |

### 文件/目录操作

| 命令 | 说明 | 示例 |
|------|------|------|
| cd | 切换目录 | `cd /home/test` |
| pwd | 显示当前路径 | `pwd` |
| mkdir | 创建目录 | `mkdir -p a/b/c` |
| touch | 创建文件 | `touch file.txt` |
| cp | 复制 | `cp file1 file2` |
| mv | 移动/重命名 | `mv old new` |
| rm | 删除文件 | `rm file.txt` |
| rmdir | 删除空目录 | `rmdir dir` |
| rm -rf | 强制删除目录 | `rm -rf dir` |

> 💡 **小技巧**：`ls -la` 可以显示隐藏文件详细信息，`mkdir -p` 可以递归创建目录。

---

## 二、权限管理命令

### 权限修改

| 命令 | 说明 | 示例 |
|------|------|------|
| chmod | 修改权限 | `chmod 755 file` |
| chown | 修改所有者 | `chown user:group file` |
| chgrp | 修改所属组 | `chgrp group file` |

### 权限数字对照

| 数字 | 权限 | 说明 |
|------|------|------|
| 4 | r | 读 |
| 2 | w | 写 |
| 1 | x | 执行 |
| 7 | rwx | 读写执行 |
| 6 | rw- | 读写 |
| 5 | r-x | 读执行 |
| 4 | r-- | 只读 |
| 0 | --- | 无权限 |

> 💡 例如 `chmod 755 file` 意味着所有者有读写执行权限，组用户和其他用户有读执行权限。

### 用户管理

| 命令 | 说明 | 示例 |
|------|------|------|
| useradd | 创建用户 | `sudo useradd -m user` |
| usermod | 修改用户 | `sudo usermod -aG group user` |
| userdel | 删除用户 | `sudo userdel user` |
| passwd | 修改密码 | `passwd user` |
| id | 查看用户信息 | `id user` |
| whoami | 查看当前用户 | `whoami` |

### 组管理

| 命令 | 说明 | 示例 |
|------|------|------|
| groupadd | 创建组 | `sudo groupadd group` |
| groupdel | 删除组 | `sudo groupdel group` |
| groups | 查看用户组 | `groups user` |

---

## 三、进程与服务管理

### 进程查看

| 命令 | 说明 | 示例 |
|------|------|------|
| ps | 查看进程 | `ps aux` |
| top | 实时监控 | `top` |
| htop | 交互式top（需安装）| `htop` |
| pstree | 进程树 | `pstree` |

### 进程控制

| 命令 | 说明 | 示例 |
|------|------|------|
| kill | 终止进程 | `kill -9 PID` |
| pkill | 按名称终止 | `pkill nginx` |
| killall | 终止所有进程 | `killall python` |

> 💡 `kill -9` 是强制终止，`kill` 是优雅终止。

### 服务管理

| 命令 | 说明 | 示例 |
|------|------|------|
| systemctl start | 启动服务 | `sudo systemctl start nginx` |
| systemctl stop | 停止服务 | `sudo systemctl stop nginx` |
| systemctl restart | 重启服务 | `sudo systemctl restart nginx` |
| systemctl status | 查看状态 | `sudo systemctl status nginx` |
| systemctl enable | 开机自启 | `sudo systemctl enable nginx` |
| systemctl disable | 关闭自启 | `sudo systemctl disable nginx` |

---

## 四、磁盘与内存

### 磁盘管理

| 命令 | 说明 | 示例 |
|------|------|------|
| df | 磁盘使用 | `df -h` |
| du | 目录大小 | `du -sh *` |
| mount | 挂载分区 | `sudo mount /dev/sdb1 /mnt` |
| umount | 卸载 | `sudo umount /mnt` |
| fdisk | 分区工具 | `sudo fdisk /dev/sdb` |
| mkfs | 格式化 | `sudo mkfs.ext4 /dev/sdb1` |

> 💡 `df -h` 以人类可读的方式显示磁盘使用情况，`du -sh *` 查看当前目录下各文件/文件夹大小。

### 内存与系统

| 命令 | 说明 | 示例 |
|------|------|------|
| free | 内存使用 | `free -h` |
| vmstat | 系统状态 | `vmstat 1` |
| dmesg | 内核日志 | `dmesg | tail` |

---

## 五、网络命令

### 网络查看

| 命令 | 说明 | 示例 |
|------|------|------|
| ip | 查看IP | `ip addr` 或 `ip a` |
| ifconfig | 查看IP（旧）| `ifconfig` |
| ping | 测试连通 | `ping -c 3 baidu.com` |
| netstat | 查看端口 | `netstat -tuln` |
| ss | 查看端口 | `ss -tuln` |
| lsof | 查看端口占用 | `lsof -i :80` |
| traceroute | 路由追踪 | `traceroute baidu.com` |
| curl | 请求URL | `curl http://example.com` |
| wget | 下载文件 | `wget url` |

### 防火墙

| 命令 | 说明 | 示例 |
|------|------|------|
| ufw enable | 开启防火墙 | `sudo ufw enable` |
| ufw disable | 关闭防火墙 | `sudo ufw disable` |
| ufw allow | 允许端口 | `sudo ufw allow 80` |
| ufw status | 查看状态 | `sudo ufw status` |

---

## 六、文本编辑器

### vim 基本操作

| 命令 | 说明 |
|------|------|
| i / a / o | 进入编辑模式 |
| ESC | 退出编辑模式 |
| :w | 保存 |
| :q | 退出 |
| :wq | 保存并退出 |
| :q! | 不保存强制退出 |
| yy | 复制一行 |
| p | 粘贴 |
| dd | 删除一行 |
| u | 撤销 |
| /关键词 | 搜索 |
| :set nu | 显示行号 |
| gg | 跳到第一行 |
| G | 跳到最后一行 |
| :n | 跳到第n行 |

> 💡 vim 是 Linux 下最强大的文本编辑器，建议熟练掌握以上基本操作。

---

## 七、软件安装

### Ubuntu/Debian

| 命令 | 说明 |
|------|------|
| apt update | 更新软件源 |
| apt upgrade | 升级软件 |
| apt install | 安装软件 |
| apt remove | 卸载软件 |
| apt search | 搜索软件 |

### CentOS/RHEL

| 命令 | 说明 |
|------|------|
| yum update | 升级软件 |
| yum install | 安装软件 |
| yum remove | 卸载软件 |
| yum search | 搜索软件 |

### 压缩包

| 命令 | 说明 |
|------|------|
| tar -cvf | 打包 |
| tar -xvf | 解包 |
| tar -zcvf | 打包.gz |
| tar -zxvf | 解包.gz |
| unzip | 解压zip |
| zip | 压缩zip |

---

## 八、查找与搜索

| 命令 | 说明 | 示例 |
|------|------|------|
| find | 查找文件 | `find / -name "*.txt"` |
| find -type f | 查找文件 | `find /etc -type f -size +1M` |
| grep | 搜索内容 | `grep "关键词" file.txt` |
| which | 查找命令 | `which python` |
| whereis | 查找位置 | `whereis grep` |

> 💡 `find / -name "*.txt"` 可以查找系统中所有 txt 文件。

---

## 九、管道与重定向

| 符号 | 说明 | 示例 |
|------|------|------|
| \| | 管道（把前一个输出给后一个）| `ls \| grep test` |
| > | 重定向输出（覆盖）| `echo hi > file.txt` |
| >> | 重定向输出（追加）| `echo hi >> file.txt` |
| < | 重定向输入 | `cat < file.txt` |
| 2> | 错误重定向 | `cmd 2> error.log` |

> 💡 管道是 Linux 最强大的功能之一，可以组合多个命令完成复杂任务。

---

## 十、系统信息

| 命令 | 说明 |
|------|------|
| uname -a | 系统信息 |
| hostname | 主机名 |
| uptime | 运行时间 |
| date | 当前时间 |
| cal | 日历 |
| who | 当前登录用户 |
| last | 最近登录 |

---

## 十一、常用快捷键

| 快捷键 | 说明 |
|--------|------|
| Tab | 命令补全 |
| Ctrl+C | 终止当前命令 |
| Ctrl+Z | 暂停当前命令 |
| Ctrl+L | 清屏 |
| Ctrl+U | 删除光标前内容 |
| Ctrl+K | 删除光标后内容 |
| Ctrl+A | 跳到行首 |
| Ctrl+E | 跳到行尾 |
| !! | 重复上一个命令 |
| !n | 重复第n个命令 |

---

## 总结

本文汇总了 Linux 常用的十一大类命令，涵盖：

- ✅ 文件操作
- ✅ 权限管理
- ✅ 进程与服务管理
- ✅ 磁盘与内存
- ✅ 网络命令
- ✅ 文本编辑器
- ✅ 软件安装
- ✅ 查找与搜索
- ✅ 管道与重定向
- ✅ 系统信息
- ✅ 快捷键

熟练掌握这些命令，将大大提升你的 Linux 操作效率！建议收藏本文，随时查阅。

---

**参考文档**：
- [Linux 官方文档](https://www.kernel.org/doc/html/latest/)
- [鸟哥的 Linux 私房菜](http://linux.vbird.org/)
