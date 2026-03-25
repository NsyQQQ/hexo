---
title: Shell 脚本编程练习
date: 2026-01-11 10:00:00
tags: [Shell, 脚本]
categories: [技术教程, Linux]
---

本文记录了 Shell 脚本编程练习题 1-10 题的题目和参考答案。

<!-- more -->

## 第 1 题：Hello World

**任务**：编写你的第一个 Shell 脚本
- 输出 "Hello, [你的名字]!"
- 输出当前日期和时间
- 输出当前所在目录

**要求**：
- 使用 `#!/bin/bash` 开头
- 给脚本添加执行权限
- 直接运行脚本

**参考答案**：

```bash
#!/bin/bash

echo "Hello, [宁尚义]!"
date
pwd
```

---

## 第 2 题：变量练习

**任务**：编写一个脚本练习变量操作
- 定义两个变量 `name` 和 `age`
- 输出 "我叫 XXX，今年 XX 岁"
- 定义一个计算：`num1=10`, `num2=20`，输出它们的和

**要求**：
- 使用 `$变量名` 和 `${变量名}` 两种方式引用变量
- 使用 `$(( ))` 进行算术运算

**参考答案**：

```bash
name=宁尚义
age=28
echo "我叫 $name,今年 ${age} 岁"

num1=10
num2=20
echo "num1+num2=$(($num1+$num2))"
```

---

## 第 3 题：条件判断

**任务**：编写一个判断脚本
- 检查用户是否传入参数
- 如果传入的是文件，输出 "这是一个文件"
- 如果传入的是目录，输出 "这是一个目录"
- 如果不存在，输出 "路径不存在"

**要求**：
- 使用 `if-elif-else` 结构
- 使用 `[ ]` 或 `[[ ]]` 进行判断
- 使用 `-f`、`-d`、`-e` 测试符

**参考答案**：

```bash
path="/home/test/.openclaw/workspace/test.sh"

if [ -e "$path" ]; then
    if [ -f "$path" ]; then
        echo "这是一个文件"
    elif [ -d "$path" ]; then
        echo "这是一个目录"
    fi
else
    echo "路径不存在"
fi
```

---

## 第 4 题：成绩等级判断

**任务**：编写一个成绩等级判断脚本
- 接受一个数字参数（0-100）
- 90-100 输出 "优秀"
- 80-89 输出 "良好"
- 70-79 输出 "中等"
- 60-69 输出 "及格"
- 60 以下输出 "不及格"

**要求**：
- 验证输入是否为数字
- 验证输入范围是否在 0-100

**参考答案**：

```bash
score=60

if [ "$score" -ge 0 -a "$score" -le 100 ]; then
    if [ "$score" -ge 0 -a "$score" -lt 60 ]; then
        echo "不及格"
    elif [ "$score" -ge 60 -a "$score" -lt 70 ]; then
        echo "及格"
    elif [ "$score" -ge 70 -a "$score" -lt 80 ]; then
        echo "中等"
    elif [ "$score" -ge 80 -a "$score" -lt 90 ]; then
        echo "良好"
    elif [ "$score" -ge 90 -a "$score" -le 100 ]; then
        echo "优秀"
    fi
fi
```

---

## 第 5 题：菜单选择

**任务**：使用 case 语句编写菜单
```
请选择操作：
1) 查看当前目录
2) 查看系统信息
3) 查看当前用户
4) 退出
```

**要求**：
- 使用 `case` 语句
- 循环显示菜单直到选择退出

**参考答案**：

```bash
while true; do
    echo "请选择操作："
    echo "1) 查看当前目录"
    echo "2) 查看系统信息"
    echo "3) 查看当前用户"
    echo "4) 退出"
    
    read -p "请输入选项 [1-4]：" choice

    case $choice in
        1) echo "当前目录是$(pwd)" ;;
        2)
            echo "系统信息"
            echo "主机名：$(hostname)"
            echo "操作系统：$(uname)"
            ;;
        3) echo "当前用户是：$(whoami)" ;;
        4) echo "再见！" ; break ;;
        *) echo "无效选择,请重新选择" ;;
    esac
    echo
done
```

---

## 第 6 题：批量创建用户

**任务**：编写脚本批量创建用户
- 接受用户名列表作为参数
- 为每个用户名创建目录 `/home/users/用户名`
- 输出创建结果

**要求**：
- 使用 `for` 循环
- 检查目录是否已存在

**参考答案**：

```bash
create_users() {
    if [ $# -eq 0 ]; then
        echo "用法：$0 用户1 用户2 用户3 ..."
        return 1
    fi
    
    for user in "$@"; do
        user_dir="/home/users/$user"
        if [ -d "$user_dir" ]; then
            echo "用户 $user 的目录已存在，跳过"
        else
            mkdir -p "$user_dir"
            echo "已创建用户 $user 的目录：$user_dir"
        fi
    done
}

# 测试：传入用户名列表
create_users alice bob charlie david
```

---

## 第 7 题：数字累加

**任务**：计算 1 到 100 的和
- 使用 for 循环实现
- 使用 while 循环实现

**要求**：
- 两种方法都要写
- 输出最终结果

**参考答案**：

```bash
# for 循环实现
num1=0
for i in {1..100}; do
    num1=$(($num1+$i))
done
echo "1 到 100 的和是：$num1"

# while 循环实现
num2=0
i=1
while [ $i -le 100 ]; do
    num2=$(($num2+$i))
    i=$(($i+1))
done
echo "1 到 100 的和是：$num2"
```

---

## 第 8 题：读取文件内容

**任务**：编写脚本读取文件每一行
- 接受文件路径作为参数
- 逐行读取并输出行号和内容
- 统计总行数

**要求**：
- 使用 `while read` 循环
- 使用 `nl` 或自己计数

**参考答案**：

```bash
filename="/home/test/.openclaw/workspace/AGENTS.md"
nl=0

while read line; do
    nl=$(($nl + 1))
    echo "$nl $line"
done < "$filename"

echo "总行数：$nl"
```

---

## 第 9 题：函数练习 - 计算器

**任务**：编写一个函数实现简单计算器
```bash
calculate() {
    # 接受三个参数：数字 1, 运算符，数字 2
    # 支持 +, -, *, /
}
```

**要求**：
- 定义 `calculate` 函数
- 支持四则运算
- 处理除零错误
- 调用函数并输出结果

**参考答案**：

```bash
function calculate() {
    local num1=$1
    local str=$2
    local num2=$3

    # 验证输入是数字
    if ! [[ "$num1" =~ ^-?[0-9]+$ ]] || ! [[ "$num2" =~ ^-?[0-9]+$ ]]; then
        echo "错误：请输入有效数字"
        return 1
    fi

    case $str in
        "+") 
            echo $(($num1+$num2)) 
            return 0
            ;;
        "-") 
            echo $(($num1-$num2)) 
            return 0
            ;;
        "*") 
            echo $(($num1*$num2)) 
            return 0
            ;;
        "/") 
            if [ $num2 -eq 0 ]; then
                echo "错误：除数不能为0"
                return 1
            else
                echo $(($num1/$num2)) 
                return 0
            fi
            ;;
        *)
            echo "错误：请输入正确的运算符(+ - * /)"
            return 1
            ;;
    esac
}

echo "计算器："
read -p "请输入数字1：" i
read -p "请输入运算符(+ - * /)：" s
read -p "请输入数字2：" j

result=$(calculate $i "$s" $j)
if [ $? -eq 0 ]; then
    echo "结果是：$result"
else 
    echo "$result"
fi
```

---

## 第 10 题：函数练习 - 系统信息

**任务**：编写函数收集系统信息
```bash
get_cpu_info() { }
get_mem_info() { }
get_disk_info() { }
```

**要求**：
- 每个函数返回特定信息
- 主脚本调用所有函数
- 格式化输出

**参考答案**：

```bash
get_cpu_info() { 
    echo "=== CPU信息 ==="
    echo "型号：$(grep "model name" /proc/cpuinfo | head -1 | cut -d':' -f2)"
    echo "核心数：$(grep -c "processor" /proc/cpuinfo)"
    echo "频率：$(grep "cpu MHz" /proc/cpuinfo | head -1 | cut -d':' -f2)"
    echo "缓存大小：$(grep "cache size" /proc/cpuinfo | head -1 | cut -d':' -f2)"
    echo "供应商：$(grep "vendor_id" /proc/cpuinfo | head -1 | cut -d':' -f2)"
    echo "架构：$(uname -m)"
}
get_mem_info() { 
    echo "=== 内存信息 ==="
    echo "总内存：$(free -h | grep "Mem:" | awk '{print $2}')"
    echo "已使用：$(free -h | grep "Mem:" | awk '{print $3}')"
    echo "空闲：$(free -h | grep "Mem:" | awk '{print $4}')"
    echo "共享：$(free -h | grep "Mem:" | awk '{print $5}')"
    echo "缓存：$(free -h | grep "Mem:" | awk '{print $6}')"
    echo "可用：$(free -h | grep "Mem:" | awk '{print $7}')"
}
get_disk_info() { 
    echo "=== 磁盘信息 ==="
    df -h | grep "^/dev/" | while read line; do
        echo "文件系统：$(echo $line | awk '{print $1}')"
        echo "大小：$(echo $line | awk '{print $2}')"
        echo "已用：$(echo $line | awk '{print $3}')"
        echo "可用：$(echo $line | awk '{print $4}')"
        echo "使用率：$(echo $line | awk '{print $5}')"
        echo "挂载点：$(echo $line | awk '{print $6}')"
    done
}

get_cpu_info
get_mem_info
get_disk_info
```

---

## 总结

通过这 10 道练习题，我们掌握了 Shell 脚本编程的基础知识：

- ✅ 变量定义和使用
- ✅ 条件判断（if-elif-else、case）
- ✅ 循环结构（for、while）
- ✅ 函数定义和调用
- ✅ 算术运算
- ✅ 文件操作
- ✅ 系统信息获取

后续还需要继续练习第 11-25 题，逐步提升 Shell 脚本编程能力！
