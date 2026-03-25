---
title: Python 常用标准库
date: 2025-09-10 10:00:00
tags: [Python, 标准库, 编程基础, 后端]
categories: [技术教程, 编程语言]
---
---

Python 标准库是 Python 安装包自带的庞大工具集，包含了处理文本、数据、文件、网络、并发等各种常用功能。本文将详细介绍 Python 最常用的标准库，帮助你提升开发效率。

<!-- more -->

## 一、文件与目录操作

### os 模块 - 操作系统接口

`os` 模块提供了许多与操作系统交互的函数。

```python
import os

# 获取当前工作目录
print(os.getcwd())

# 列出目录内容
print(os.listdir('.'))

# 创建目录
os.makedirs('test_dir', exist_ok=True)

# 删除文件
os.remove('file.txt')

# 获取文件信息
stat_info = os.stat('file.txt')
print(f"文件大小: {stat_info.st_size} bytes")

# 路径操作
path = '/home/user/documents/file.txt'
print(os.path.basename(path))   # file.txt
print(os.path.dirname(path))    # /home/user/documents
print(os.path.join(path, '..')) # /home/user/documents/..
```

### pathlib 模块 - 面向对象的路径操作

```python
from pathlib import Path

# 创建路径对象
p = Path('/home/user/documents')

# 路径拼接
new_file = p / 'file.txt'

# 检查路径
print(new_file.exists())
print(new_file.is_file())
print(new_file.is_dir())

# 读取文件
content = new_file.read_text()

# 写入文件
new_file.write_text('Hello, World!')

# 遍历目录
for item in Path('.').iterdir():
    print(item.name)
```

### shutil 模块 - 文件操作高级函数

```python
import shutil

# 复制文件
shutil.copy('source.txt', 'dest.txt')

# 复制目录
shutil.copytree('src_dir', 'dst_dir')

# 移动文件/目录
shutil.move('old_path', 'new_path')

# 删除目录
shutil.rmtree('dir_name')

# 压缩目录
shutil.make_archive('archive_name', 'zip', 'dir_to_compress')
```

## 二、数据结构与算法

### collections 模块 - 容器数据类型

```python
from collections import Counter, defaultdict, OrderedDict, deque, namedtuple

# Counter - 计数器
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counter = Counter(words)
print(counter.most_common(2))  # [('apple', 3), ('banana', 2)]

# defaultdict - 默认字典
dd = defaultdict(list)
dd['fruits'].append('apple')
print(dd['fruits'])  # ['apple']

# OrderedDict - 有序字典（Python 3.7+ 普通字典已保证顺序）
od = OrderedDict()
od['a'] = 1
od['b'] = 2

# deque - 双端队列
dq = deque([1, 2, 3])
dq.append(4)      # [1, 2, 3, 4]
dq.appendleft(0)  # [0, 1, 2, 3, 4]

# namedtuple - 命名元组
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)
```

### heapq 模块 - 堆队列

```python
import heapq

# 最小堆
heap = [1, 3, 5, 7, 9, 2]
heapq.heapify(heap)
print(heapq.heappop(heap))  # 1

# 最大堆（取反）
heap = [-1, -3, -5]
heapq.heapify(heap)
print(-heapq.heappop(heap))  # 5

# 合并有序序列
list1 = [1, 3, 5]
list2 = [2, 4, 6]
merged = list(heapq.merge(list1, list2))
print(merged)  # [1, 2, 3, 4, 5, 6]
```

### itertools 模块 - 迭代器工具

```python
import itertools

# 无限迭代器
counter = itertools.count(start=1, step=2)
print(next(counter))  # 1
print(next(counter))  # 3

# 循环迭代
cycler = itertools.cycle(['A', 'B', 'C'])

# 组合迭代器
for combo in itertools.combinations([1, 2, 3], 2):
    print(combo)  # (1, 2), (1, 3), (2, 3)

# 排列迭代器
for perm in itertools.permutations([1, 2, 3], 2):
    print(perm)  # (1, 2), (1, 3), (2, 1), ...

# 笛卡尔积
for item in itertools.product([1, 2], ['a', 'b']):
    print(item)  # (1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')
```

## 三、日期与时间

### datetime 模块

```python
from datetime import datetime, timedelta, date

# 获取当前时间
now = datetime.now()
print(now)  # 2025-08-10 10:30:45.123456

# 创建指定时间
dt = datetime(2025, 8, 10, 10, 30)
print(dt.strftime('%Y-%m-%d %H:%M:%S'))

# 时间加减
tomorrow = now + timedelta(days=1)
yesterday = now - timedelta(days=1)

# 日期比较
d1 = date(2025, 8, 10)
d2 = date(2025, 8, 11)
print(d2 - d1)  # 1 day, 0:00:00

# 时区
from datetime import timezone
utc_now = datetime.now(timezone.utc)
print(utc_now)
```

### time 模块

```python
import time

# 获取当前时间戳
timestamp = time.time()
print(timestamp)

# 时间格式化
formatted = time.strftime('%Y-%m-%d %H:%M:%S')
print(formatted)

# 睡眠暂停
time.sleep(1)  # 暂停1秒

# 性能计时
start = time.perf_counter()
# 执行代码...
end = time.perf_counter()
print(f"耗时: {end - start:.4f} 秒")
```

### calendar 模块

```python
import calendar

# 打印日历
print(calendar.month(2025, 8))

# 判断闰年
print(calendar.isleap(2024))  # True

# 获取某月天数
print(calendar.monthrange(2025, 8))  # (5, 31) - 第一天是周五，共31天
```

## 四、JSON 处理

### json 模块

```python
import json

# 序列化（Python 对象 -> JSON 字符串）
data = {
    'name': '张三',
    'age': 25,
    'skills': ['Python', 'JavaScript']
}

json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)

# 反序列化（JSON 字符串 -> Python 对象）
parsed = json.loads(json_str)

# 读写文件
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
```

## 五、正则表达式

### re 模块

```python
import re

# 匹配
pattern = r'\d+'
text = '我的电话号码是 13812345678'
match = re.search(pattern, text)
if match:
    print(match.group())  # 13812345678

# 查找所有
text = '我有 3 个苹果，5 个香蕉'
numbers = re.findall(r'\d+', text)
print(numbers)  # ['3', '5']

# 替换
text = 'hello world'
result = re.sub(r'world', 'python', text)
print(result)  # hello python

# 分割
text = 'apple,banana,cherry'
fruits = re.split(r',', text)
print(fruits)  # ['apple', 'banana', 'cherry']

# 预编译正则（提高效率）
pattern = re.compile(r'\d{3,4}-\d{7,8}')
matches = pattern.findall('电话: 010-12345678, 手机: 138-12345678')
print(matches)  # ['010-12345678', '138-12345678']

# 常用模式
# \d - 数字
# \w - 字母、数字、下划线
# \s - 空白字符
# . - 任意字符
# ^ - 字符串开头
# $ - 字符串结尾
```

## 六、网络请求

### urllib 模块

```python
from urllib.request import urlopen, Request
from urllib.parse import urlencode, urlparse

# GET 请求
with urlopen('https://httpbin.org/get') as response:
    data = response.read()
    print(data.decode('utf-8'))

# POST 请求
data = urlencode({'name': '张三', 'age': 25}).encode('utf-8')
req = Request('https://httpbin.org/post', data=data, method='POST')

# URL 解析
url = 'https://user:pass@example.com:8080/path;params?query=1#fragment'
parsed = urlparse(url)
print(parsed.scheme)   # https
print(parsed.netloc)   # user:pass@example.com:8080
print(parsed.path)     # /path
print(parsed.query)    # query=1

# 构建 URL
from urllib.parse import urlencode
params = {'name': '张三', 'age': 25}
query_string = urlencode(params)
url = f'https://example.com?{query_string}'
```

### http 模块

```python
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json

# 简单 HTTP 服务器
class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b'<html><body>Hello!</body></html>')

server = HTTPServer(('localhost', 8000), Handler)
print('服务器运行在 http://localhost:8000')
server.serve_forever()
```

## 七、并发编程

### threading 模块

```python
import threading
import time

def worker(name, delay):
    print(f'{name} 开始工作')
    time.sleep(delay)
    print(f'{name} 完成工作')

# 创建线程
t1 = threading.Thread(target=worker, args=('线程1', 2))
t2 = threading.Thread(target=worker, args=('线程2', 1))

# 启动线程
t1.start()
t2.start()

# 等待线程结束
t1.join()
t2.join()

print('所有线程完成')

# 获取当前线程
current = threading.current_thread()
print(f'当前线程: {current.name}')

# 线程数量
print(f'活动线程数: {threading.active_count()}')
```

### multiprocessing 模块

```python
from multiprocessing import Process, Pool, Queue
import os

def worker(name):
    print(f'进程 {name}, PID: {os.getpid()}')
    return f'{name} 完成'

# 多进程
if __name__ == '__main__':
    processes = []
    for i in range(4):
        p = Process(target=worker, args=(i,))
        processes.append(p)
        p.start()
    
    for p in processes:
        p.join()

# 进程池
with Pool(4) as pool:
    results = pool.map(worker, ['A', 'B', 'C', 'D'])
    print(results)
```

### concurrent.futures 模块

```python
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import time

def task(n):
    time.sleep(1)
    return n * 2

# 线程池
with ThreadPoolExecutor(max_workers=3) as executor:
    future = executor.submit(task, 10)
    print(future.result())  # 20
    
    results = executor.map(task, [1, 2, 3, 4])
    print(list(results))  # [2, 4, 6, 8]

# 进程池
with ProcessPoolExecutor(max_workers=3) as executor:
    results = executor.map(task, [1, 2, 3, 4])
    print(list(results))
```

## 八、调试与日志

### logging 模块

```python
import logging

# 配置日志
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

logger.debug('调试信息')
logger.info('一般信息')
logger.warning('警告信息')
logger.error('错误信息')
logger.critical('严重错误')
```

### pdb 模块 - 调试器

```python
import pdb

def divide(a, b):
    pdb.set_trace()  # 设置断点
    return a / b

result = divide(10, 2)

# 常用命令：
# n - next（执行下一行）
# s - step（进入函数）
# c - continue（继续执行）
# p variable - print（打印变量）
# l - list（查看代码）
# q - quit（退出）
```

## 九、functools 模块

```python
from functools import lru_cache, partial, wraps, reduce

# 缓存装饰器
@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # 快速计算

# 偏函数
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
print(square(5))  # 25

# reduce
from functools import reduce
result = reduce(lambda x, y: x + y, [1, 2, 3, 4, 5])
print(result)  # 15

# 装饰器包装
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print('调用前')
        result = func(*args, **kwargs)
        print('调用后')
        return result
    return wrapper
```

## 十、random 模块

```python
import random

# 随机整数
print(random.randint(1, 10))      # 1-10 随机整数
print(random.randrange(0, 10, 2)) # 0,2,4,6,8 随机

# 随机浮点数
print(random.random())       # 0-1 随机浮点数
print(random.uniform(1, 10)) # 1-10 随机浮点数

# 随机选择
choices = ['red', 'green', 'blue']
print(random.choice(choices))           # 随机选择一个
print(random.choices(choices, k=2))    # 随机选择多个（可重复）
print(random.sample(choices, 2))       # 随机选择多个（不重复）

# 随机打乱
cards = list(range(1, 14))
random.shuffle(cards)
print(cards)

# 随机种子
random.seed(42)  # 设置种子，结果可复现
```

## 十一、hashlib 模块 - 哈希算法

```python
import hashlib

# MD5
md5 = hashlib.md5()
md5.update(b'hello')
print(md5.hexdigest())  # 5d41402abc4b2a76b9719d911017c592

# SHA-256
sha256 = hashlib.sha256()
sha256.update(b'hello')
print(sha256.hexdigest())

# 带盐值
password = 'mypassword'
salt = b'random_salt'
hashed = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
print(hashed.hex())
```

## 十二、base64 模块

```python
import base64

# 编码
message = 'Hello, World!'
encoded = base64.b64encode(message.encode('utf-8'))
print(encoded.decode('utf-8'))  # SGVsbG8sIFdvcmxkIQ==

# 解码
decoded = base64.b64decode(encoded)
print(decoded.decode('utf-8'))  # Hello, World!
```

## 总结

Python 标准库非常庞大，本文只是介绍了最常用的部分。还有很多强大的标准库值得学习：

- `re` - 正则表达式
- `sqlite3` - SQLite 数据库
- `xml` / `html` - XML/HTML 处理
- `zipfile` - ZIP 文件操作
- `subprocess` - 子进程管理
- `socket` - 网络编程
- `asyncio` - 异步编程
- `typing` - 类型提示

熟练掌握这些标准库，可以大大提高开发效率，减少对第三方包的依赖。

---

> 持续学习，深入探索 Python 的无限可能！
