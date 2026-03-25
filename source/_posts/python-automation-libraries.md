---
title: Python 自动化库
date: 2025-09-12 10:00:00
tags: [Python, 自动化, 脚本]
categories: [技术教程, 编程语言]
---
---

Python 作为一门简洁强大的编程语言，在自动化领域有着丰富的生态。从文件处理到网页自动化，从办公软件到系统运维，Python 都能轻松胜任。本文将全面介绍 Python 中最常用的自动化库。

<!-- more -->

## 一、文件与系统自动化

### 1. os —— 操作系统接口

`os` 是 Python 标准库中最常用的系统操作模块。

```python
import os

# 文件操作
os.rename('old.txt', 'new.txt')      # 重命名
os.remove('file.txt')                  # 删除文件
os.mkdir('folder')                     # 创建目录
os.rmdir('folder')                     # 删除空目录

# 路径操作
path = '/home/user/project'
os.path.exists(path)                   # 检查路径是否存在
os.path.isfile(path)                   # 是否是文件
os.path.isdir(path)                    # 是否是目录
os.path.join('dir', 'file.txt')        # 拼接路径

# 目录遍历
for root, dirs, files in os.walk('/path'):
    for file in files:
        print(os.path.join(root, file))
```

### 2. shutil —— 高级文件操作

```python
import shutil

# 复制文件/目录
shutil.copy('src.txt', 'dst.txt')
shutil.copytree('src_dir', 'dst_dir')

# 移动文件/目录
shutil.move('src', 'dst')

# 压缩/解压
shutil.make_archive('output', 'zip', 'dir_to_zip')
shutil.unpack_archive('file.zip', 'extract_dir')
```

### 3. pathlib —— 面向对象的路径操作

```python
from pathlib import Path

p = Path('/home/user/project')

# 文件操作
p.exists()
p.is_file()
p.is_dir()

# 创建文件
p.mkdir(parents=True, exist_ok=True)
p.touch()

# 读取/写入
p.write_text('content')
content = p.read_text()

#glob 模式匹配
list(p.glob('*.txt'))
list(p.rglob('**/*.py'))  # 递归
```

### 4. watchdog —— 文件系统监控

```python
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class MyHandler(FileSystemEventHandler):
    def on_modified(self, event):
        print(f'文件修改: {event.src_path}')
    def on_created(self, event):
        print(f'文件创建: {event.src_path}')

observer = Observer()
observer.schedule(MyHandler(), '/path/to/watch', recursive=True)
observer.start()
observer.join()
```

---

## 二、网页自动化

### 1. Selenium —— 浏览器自动化

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 启动浏览器
driver = webdriver.Chrome()
driver.get('https://example.com')

# 查找元素
element = driver.find_element(By.ID, 'username')
element.send_keys('my_username')

# 等待元素加载
wait = WebDriverWait(driver, 10)
element = wait.until(EC.presence_of_element_located((By.ID, 'submit')))

# 点击提交
element.click()

# 获取页面内容
print(driver.page_source)

driver.quit()
```

### 2. Playwright —— 现代浏览器自动化

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    
    page.goto('https://example.com')
    
    # 填表
    page.fill('#username', 'user')
    page.fill('#password', 'pass')
    page.click('#submit')
    
    # 等待导航
    page.wait_for_url('**/dashboard')
    
    # 截图
    page.screenshot(path='screenshot.png')
    
    browser.close()
```

### 3. Requests —— HTTP 请求

```python
import requests

# GET 请求
response = requests.get('https://api.example.com/data')
print(response.json())

# POST 请求
data = {'username': 'user', 'password': 'pass'}
response = requests.post('https://api.example.com/login', json=data)

# 带参数
params = {'page': 1, 'limit': 10}
response = requests.get('https://api.example.com/items', params=params)

# 设置 Headers
headers = {'Authorization': 'Bearer token'}
response = requests.get('https://api.example.com/private', headers=headers)
```

### 4. BeautifulSoup —— HTML 解析

```python
from bs4 import BeautifulSoup
import requests

response = requests.get('https://example.com')
soup = BeautifulSoup(response.text, 'lxml')

# 查找元素
title = soup.find('title').text
links = [a['href'] for a in soup.find_all('a', href=True)]

# CSS 选择器
content = soup.select('.content')[0].text
```

---

## 三、办公自动化

### 1. openpyxl —— Excel 操作

```python
from openpyxl import Workbook, load_workbook

# 创建工作簿
wb = Workbook()
ws = wb.active

# 写入数据
ws['A1'] = '姓名'
ws['B1'] = '年龄'
ws['A2'] = '张三'
ws['B2'] = 25

# 写入多行
data = [
    ['李四', 30],
    ['王五', 28]
]
ws.append(['姓名', '年龄'])
for row in data:
    ws.append(row)

# 读取数据
for row in ws.iter_rows(min_row=1, max_row=3, values_only=True):
    print(row)

# 保存
wb.save('data.xlsx')

# 读取已有文件
wb = load_workbook('data.xlsx')
ws = wb.active
```

### 2. python-docx —— Word 操作

```python
from docx import Document

# 创建文档
doc = Document()
doc.add_heading('标题', 0)

# 添加段落
p = doc.add_paragraph('这是第一段')
p.add_run('加粗').bold = True

# 添加图片
doc.add_picture('image.png', width=Inches(2))

# 添加表格
table = doc.add_table(rows=2, cols=2)
table.cell(0, 0).text = '姓名'
table.cell(0, 1).text = '年龄'

# 保存
doc.save('document.docx')
```

### 3. pypdf / PyPDF2 —— PDF 操作

```python
from pypdf import PdfReader, PdfWriter

# 读取 PDF
reader = PdfReader('file.pdf')
page = reader.pages[0]
text = page.extract_text()

# 合并 PDF
writer = PdfWriter()
for pdf in ['file1.pdf', 'file2.pdf']:
    writer.append(PdfReader(pdf))
writer.write('merged.pdf')

# 提取页面
writer = PdfWriter()
writer.append(PdfReader('file.pdf'), pages=(0, 2))  # 前3页
writer.write('extracted.pdf')
```

### 4. python-pptx —— PowerPoint 操作

```python
from pptx import Presentation

# 创建演示文稿
prs = Presentation()
slide = prs.slides.add_slide(prs.slide_layouts[1])

# 添加标题
title = slide.shapes.title
title.text = '演示标题'

# 添加内容
content = slide.placeholders[1]
text_frame = content.text_frame
text_frame.text = '第一点'

# 保存
prs.save('presentation.pptx')
```

### 5. pythonOutlook / win32com —— 邮件操作

```python
import win32com.client as win32

# 创建 Outlook 应用
outlook = win32.Dispatch('Outlook.Application')
mail = outlook.CreateItem(0)

# 发送邮件
mail.To = 'recipient@example.com'
mail.Subject = '主题'
mail.Body = '邮件内容'
mail.Send

# 读取邮件
folder = outlook.GetNamespace("MAPI").GetDefaultFolder(6)
messages = folder.Items
for msg in messages[:5]:
    print(msg.Subject, msg.SentOn)
```

---

## 四、图像与媒体自动化

### 1. Pillow —— 图像处理

```python
from PIL import Image, ImageFilter, ImageEnhance

# 打开图片
img = Image.open('photo.jpg')

# 调整尺寸
img = img.resize((800, 600))

# 裁剪
img = img.crop((0, 0, 400, 400))

# 旋转
img = img.rotate(90)

# 滤镜
img = img.filter(ImageFilter.BLUR)
img = img.filter(ImageFilter.CONTOUR)

# 调整亮度/对比度
enhancer = ImageEnhance.Brightness(img)
img = enhancer.enhance(1.5)

# 保存
img.save('output.jpg', quality=95)
```

### 2. pytesseract —— OCR 文字识别

```python
from PIL import Image
import pytesseract

# 读取图片并识别文字
text = pytesseract.image_to_string(Image.open('text.png'))
print(text)

# 指定语言
text = pytesseract.image_to_string(Image.open('chinese.png'), lang='chi_sim')

# 获取带位置的信息
data = pytesseract.image_to_data(Image.open('text.png'), output_type=dict)
for i, txt in enumerate(data['text']):
    if txt.strip():
        print(f'{txt}: {data["left"][i]},{data["top"][i]}')
```

### 3. moviepy —— 视频编辑

```python
from moviepy.editor import *

# 剪辑视频
video = VideoFileClip('input.mp4')
clip = video.subclip(0, 30)  # 前30秒
clip.write_videofile('output.mp4')

# 合并视频
clips = [VideoFileClip(f'video{i}.mp4') for i in range(3)]
final_clip = concatenate_videoclips(clips)
final_clip.write_videofile('merged.mp4')

# 添加音频
video = VideoFileClip('video.mp4')
audio = AudioFileClip('music.mp3')
video = video.set_audio(audio)
video.write_videofile('with_audio.mp4')
```

---

## 五、数据处理自动化

### 1. pandas —— 数据分析

```python
import pandas as pd

# 读取数据
df = pd.read_csv('data.csv')
df = pd.read_excel('data.xlsx')
df = pd.read_json('data.json')

# 数据筛选
df[df['age'] > 25]

# 数据清洗
df.dropna()                    # 删除空值
df.fillna(0)                   # 填充空值
df['name'] = df['name'].str.strip()

# 分组统计
df.groupby('category')['price'].sum()

# 导出
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', index=False)
```

### 2. openpyxl / xlwings —— Excel 高级操作

```python
import xlwings as xw

# 连接 Excel
wb = xw.Book('file.xlsx')
sheet = wb.sheets[0')

# 读取数据
df = sheet.range('A1').options(pd.DataFrame).value

# 写入数据
sheet.range('A1').value = df

# 执行公式
sheet.range('B1').value = '=SUM(A1:A10)'

# 格式化
sheet.range('A1').api.Font.Bold = True
sheet.range('A1').api.Interior.Color = 0xFF0000
```

---

## 六、测试自动化

### 1. Pytest —— 测试框架

```python
import pytest

def test_example():
    assert 1 + 1 == 2

# 参数化测试
@pytest.mark.parametrize('a,b,expected', [
    (1, 1, 2),
    (2, 3, 5),
    (10, 20, 30)
])
def test_add(a, b, expected):
    assert a + b == expected

# 跳过测试
@pytest.mark.skip(reason='not ready')
def test_not_ready():
    pass

# Fixture
@pytest.fixture
def db():
    return Database()

def test_db(db):
    assert db.connect()
```

### 2. unittest —— 单元测试

```python
import unittest

class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(1 + 1, 2)
    
    def test_divide(self):
        with self.assertRaises(ZeroDivisionError):
            1 / 0

if __name__ == '__main__':
    unittest.main()
```

---

## 七、GUI 自动化

### 1. pyautogui —— 鼠标键盘控制

```python
import pyautogui

# 鼠标移动
pyautogui.moveTo(100, 100, duration=1)
pyautogui.move(50, 50)

# 鼠标点击
pyautogui.click()
pyautogui.rightClick()
pyautogui.doubleClick()

# 键盘输入
pyautogui.write('Hello World')
pyautogui.press('enter')
pyautogui.hotkey('ctrl', 'c')

# 截图
screenshot = pyautogui.screenshot()
screenshot.save('screenshot.png')

# 等待
pyautogui.PAUSE = 0.5  # 每次操作后暂停
```

### 2. pywinauto —— Windows GUI 自动化

```python
from pywinauto import Application

# 启动应用
app = Application().start('notepad.exe')

# 查找窗口
dlg = app.window(title='Notepad')

# 操作控件
dlg.Edit.type_keys('Hello World')

# 点击按钮
dlg.Button.click()
```

---

## 八、API 与服务自动化

### 1. Flask/FastAPI —— 快速构建 API

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'data': 'Hello'})

@app.route('/api/data', methods=['POST'])
def post_data():
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
```

### 2. schedule —— 定时任务

```python
import schedule
import time

def job():
    print('执行任务')

# 定时执行
schedule.every(10).seconds.do(job)
schedule.every().hour.do(job)
schedule.every().day.at('10:00').do(job)
schedule.every().monday.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
```

### 3. APScheduler —— 高级定时任务

```python
from apscheduler.schedulers.blocking import BlockingScheduler

def job():
    print('执行任务')

scheduler = BlockingScheduler()
scheduler.add_job(job, 'cron', hour=10, minute=0)
scheduler.add_job(job, 'interval', hours=1)
scheduler.start()
```

---

## 九、网络与运维自动化

### 1. paramiko —— SSH 连接

```python
import paramiko

# 创建 SSH 客户端
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

# 连接
ssh.connect('hostname', username='user', password='pass')

# 执行命令
stdin, stdout, stderr = ssh.exec_command('ls -la')
print(stdout.read().decode())

# 上传文件
sftp = ssh.open_sftp()
sftp.put('local.txt', '/remote/path/remote.txt')

ssh.close()
```

### 2. fabric —— 简化 SSH 操作

```python
from fabric import Connection

# 连接远程主机
with Connection('user@host') as c:
    # 执行命令
    result = c.run('ls -la', hide=True)
    print(result.stdout)
    
    # 上传文件
    c.put('local.txt', '/remote/path/')
    
    # 下载文件
    c.get('/remote/path/file.txt', 'local.txt')
```

### 3. netmiko —— 网络设备自动化

```python
from netmiko import ConnectHandler

# 连接网络设备
device = {
    'device_type': 'cisco_ios',
    'host': '192.168.1.1',
    'username': 'admin',
    'password': 'password'
}

with ConnectHandler(**device) as conn:
    # 发送命令
    output = conn.send_command('show ip interface brief')
    print(output)
    
    # 配置设备
    commands = [
        'interface GigabitEthernet0/1',
        'ip address 192.168.2.1 255.255.255.0'
    ]
    conn.send_config_set(commands)
```

---

## 十、最佳实践与组合

### 1. 常见自动化组合

| 场景 | 推荐组合 |
|------|----------|
| 网页数据采集 | Requests + BeautifulSoup |
| 浏览器自动化 | Selenium / Playwright |
| Excel 自动化 | openpyxl / pandas |
| 批量文件处理 | pathlib + os |
| 定时数据同步 | schedule + requests |
| GUI 自动化测试 | PyAutoGUI + pytest |

### 2. 错误处理

```python
import logging

logging.basicConfig(level=logging.INFO)

try:
    # 自动化任务
    result = risky_operation()
except Exception as e:
    logging.error(f'任务失败: {e}')
    # 发送告警
    send_alert(str(e))
finally:
    cleanup()
```

### 3. 日志记录

```python
import logging

logging.basicConfig(
    filename='automation.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

logging.info('任务开始')
logging.error('发生错误')
logging.info('任务完成')
```

---

## 总结

Python 的自动化生态非常丰富，本文介绍了：

- **文件与系统**：os, shutil, pathlib, watchdog
- **网页自动化**：Selenium, Playwright, Requests
- **办公自动化**：openpyxl, python-docx, pypdf
- **图像媒体**：Pillow, pytesseract, moviepy
- **数据处理**：pandas, xlwings
- **测试自动化**：pytest, unittest
- **GUI 自动化**：pyautogui, pywinauto
- **API 服务**：Flask, schedule
- **运维自动化**：paramiko, fabric, netmiko

掌握这些库能大幅提升工作效率，让重复性工作变得自动化！

Happy Automation! 🤖

---

*有问题欢迎评论区留言～*
