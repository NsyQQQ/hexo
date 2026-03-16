---
title: Shell 脚本编程
date: 2026-01-11 10:00:00
categories:
  - 技术教程
tags:
  - Linux
  - Shell
  - 运维
  - 脚本
  - 入门教程
---

Shell 脚本是 Linux 运维和自动化任务的核心工具。本文将介绍 Shell 脚本的基础知识和常用语法，帮助你快速掌握脚本编程。

<!-- more -->

## 一、什么是 Shell

Shell 是 Linux 系统中的命令解释器，它既是用户与系统内核之间的接口，也是一种强大的脚本语言。常见的 Shell 包括：

- **Bash**：最常用的 Shell，兼容性最好
- **Zsh**：功能强大的现代 Shell
- **Sh**： POSIX 标准 Shell，兼容性最强

## 二、第一个 Shell 脚本

```bash
#!/bin/bash
# 这是一个简单的 Shell 脚本

echo "Hello, World!"
```

保存为 `hello.sh`，然后执行：

```bash
chmod +x hello.sh
./hello.sh
```

## 三、变量

### 变量定义

```bash
# 定义变量（不能有空格）
name="张三"
age=25

# 使用变量
echo "姓名: $name"
echo "年龄: $age"
```

### 特殊变量

| 变量 | 说明 |
|------|------|
| $0 | 脚本名称 |
| $1-$9 | 第1-9个参数 |
| $# | 参数个数 |
| $@ | 所有参数 |
| $? | 上一个命令的退出状态 |
| $$ | 当前进程 ID |

### 只读变量

```bash
readonly PI=3.14159
```

## 四、字符串操作

```bash
# 字符串拼接
str1="Hello"
str2="World"
result="$str1 $str2"

# 获取字符串长度
length=${#str1}

# 字符串切片
substring=${str1:0:3}  # 取前3个字符

# 查找子字符串
echo ${str1/e/o}  # 替换第一个 e 为 o
echo ${str1//e/o} # 替换所有 e 为 o
```

## 五、数组

```bash
# 定义数组
arr=(one two three four)

# 读取数组
echo ${arr[0]}      # 第一个元素
echo ${arr[@]}      # 所有元素
echo ${#arr[@]}     # 数组长度

# 遍历数组
for item in ${arr[@]}; do
    echo $item
done
```

## 六、运算符

### 算术运算

```bash
a=10
b=20

# 使用 expr
result=`expr $a + $b`

# 使用 $(())
result=$((a + b))
result=$((a - b))
result=$((a * b))
result=$((a / b))
result=$((a % b))
```

### 关系运算

| 运算符 | 说明 |
|--------|------|
| -eq | 等于 |
| -ne | 不等于 |
| -gt | 大于 |
| -lt | 小于 |
| -ge | 大于等于 |
| -le | 小于等于 |

```bash
if [ $a -eq $b ]; then
    echo "相等"
fi
```

### 逻辑运算

| 运算符 | 说明 |
|--------|------|
| -a | 逻辑与 |
| -o | 逻辑或 |
| ! | 逻辑非 |

```bash
if [ $a -gt 0 -a $b -gt 0 ]; then
    echo "都大于0"
fi
```

## 七、条件判断

### if 语句

```bash
# 基本语法
if [ condition ]; then
    # commands
fi

# if-else
if [ condition ]; then
    # commands
else
    # commands
fi

# if-elif-else
if [ condition1 ]; then
    # commands
elif [ condition2 ]; then
    # commands
else
    # commands
fi
```

### case 语句

```bash
case $variable in
    value1)
        commands
        ;;
    value2)
        commands
        ;;
    *)
        commands
        ;;
esac
```

## 八、循环

### for 循环

```bash
# 遍历数字
for i in {1..5}; do
    echo $i
done

# 遍历数组
for item in ${arr[@]}; do
    echo $item
done

# 遍历文件
for file in *.txt; do
    echo $file
done
```

### while 循环

```bash
counter=1
while [ $counter -le 5 ]; do
    echo $counter
    counter=$((counter + 1))
done
```

### until 循环

```bash
counter=1
until [ $counter -gt 5 ]; do
    echo $counter
    counter=$((counter + 1))
done
```

## 九、函数

### 函数定义

```bash
# 基本函数
function greet() {
    echo "Hello, $1!"
}

# 调用函数
greet "张三"
```

### 函数返回值

```bash
function getSum() {
    local num1=$1
    local num2=$2
    return $((num1 + num2))
}

getSum 10 20
echo $?  # 输出 30
```

### 作用域

```bash
# 全局变量
global_var="全局"

# 局部变量
function test() {
    local local_var="局部"
    echo $global_var  # 可以访问
    echo $local_var   # 可以访问
}
```

## 十、输入输出

### 用户输入

```bash
# 读取输入
read -p "请输入你的名字: " name
echo "你好, $name"

# 读取密码
read -s -p "请输入密码: " password

# 超时读取
read -t 5 -p "5秒内输入: " input
```

### 文件重定向

```bash
# 输出重定向
command > file.txt

# 追加重定向
command >> file.txt

# 错误重定向
command 2> error.txt

# 同时重定向
command > output.txt 2>&1
```

## 十一、常用命令

### 字符串处理

```bash
# 截取字符串
str="Hello World"
echo ${str:6}      # 从第6个字符开始
echo ${str:6:5}   # 从第6个字符开始，取5个

# 字符串替换
echo ${str/World/Shell}  # 替换第一个
echo ${str//o/O}         # 替换所有
```

### 日期时间

```bash
# 获取日期
date "+%Y-%m-%d"     # 2026-01-11
date "+%H:%M:%S"     # 10:00:00
date "+%Y%m%d%H%M%S" # 20260111100000
```

### 数字运算

```bash
# 随机数
echo $RANDOM

# 数字计算
echo $((RANDOM % 100))  # 0-99随机数
```

## 十二、调试技巧

### 调试模式

```bash
# 使用 -x 调试
bash -x script.sh

# 使用 set 调试部分代码
set -x  # 开始调试
commands
set +x  # 结束调试
```

### 常见选项

| 选项 | 说明 |
|------|------|
| -x | 显示执行的命令 |
| -v | 显示输入的行 |
| -e | 遇到错误退出 |
| -u | 使用未定义变量报错 |

## 十三、实用脚本示例

### 备份脚本

```bash
#!/bin/bash
# 自动备份脚本

backup_dir="/backup"
date=$(date +%Y%m%d)
source_dir="/home/user/data"

# 创建备份
tar -czf $backup_dir/backup_$date.tar.gz $source_dir

# 删除7天前的备份
find $backup_dir -name "*.tar.gz" -mtime +7 -delete

echo "备份完成: backup_$date.tar.gz"
```

### 日志清理脚本

```bash
#!/bin/bash
# 清理日志脚本

log_dir="/var/log"
max_size=100M

# 检查日志大小
for log in $log_dir/*.log; do
    size=$(du -m "$log" | cut -f1)
    if [ $size -gt $max_size ]; then
        > "$log"  # 清空日志
        echo "已清理: $log"
    fi
done
```

## 总结

Shell 脚本是 Linux 运维的必备技能。掌握基础语法后，建议多练习实际场景的脚本编写，如自动化部署、日志分析、系统监控等。熟练运用 Shell 可以大大提高工作效率。

---

> 持续学习，多动手实践，祝你早日成为 Shell 脚本高手！
