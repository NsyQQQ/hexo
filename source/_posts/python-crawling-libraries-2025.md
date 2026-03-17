---
title: Python 爬虫库
date: 2025-08-11 10:00:00
tags: [Python, 爬虫, Requests, Scrapy, BeautifulSoup, 数据采集]
categories: [技术教程, 编程语言]
---

在数据采集领域，Python 凭借其丰富的生态库成为当之无愧的首选语言。本文将全面介绍 Python 中最常用的爬虫库，帮助你根据不同场景选择合适的工具。

<!-- more -->

## 一、HTTP 请求库

### 1. Requests —— 最经典的 HTTP 库

`requests` 是 Python 最受欢迎的 HTTP 库，以其简洁优雅的 API 深受开发者喜爱。

**安装：**
```bash
pip install requests
```

**基本用法：**
```python
import requests

response = requests.get('https://example.com')
print(response.status_code)
print(response.text)
```

**特点：**
- API 设计简洁直观
- 支持完整的 HTTP 协议
- 自动处理 Cookie 和 Session
- 社区生态成熟，文档完善

**适用场景：** 简单的 HTTP 请求、数据接口调用

---

### 2. httpx —— 现代异步 HTTP 客户端

`httpx` 是新一代 HTTP 客户端，支持同步和异步两种模式。

**安装：**
```bash
pip install httpx
```

**基本用法：**
```python
import httpx

# 同步
response = httpx.get('https://example.com')

# 异步
import asyncio
async def fetch():
    async with httpx.AsyncClient() as client:
        response = await client.get('https://example.com')
```

**特点：**
- 同步/异步双模式
- 支持 HTTP/2
- 兼容 requests API
- 支持代理、Socks

**适用场景：** 需要异步并发、高性能场景

---

## 二、HTML 解析库

### 1. BeautifulSoup —— 最流行的 HTML 解析器

`BeautifulSoup` 配合解析器使用，能轻松提取网页内容。

**安装：**
```bash
pip install beautifulsoup4 lxml
```

**基本用法：**
```python
from bs4 import BeautifulSoup
import requests

response = requests.get('https://example.com')
soup = BeautifulSoup(response.text, 'lxml')

# 提取标题
title = soup.find('title').text

# 提取所有链接
links = [a['href'] for a in soup.find_all('a', href=True)]
```

**特点：**
- API 友好，易上手
- 支持多种解析器（lxml、html.parser）
- 自动修正不规范的 HTML

**适用场景：** 页面结构分析、数据提取

---

### 2. lxml —— 高性能 XML/HTML 处理

`lxml` 基于 C 语言实现，解析速度极快。

**安装：**
```bash
pip install lxml
```

**基本用法：**
```python
from lxml import etree

html = etree.HTML(response.text)
titles = html.xpath('//title/text()')
links = html.xpath('//a/@href')
```

**特点：**
- 解析速度极快
- 支持 XPath 和 CSS 选择器
- 内存占用低

**适用场景：** 大规模数据爬取、性能敏感场景

---

### 3. parsel —— Scrapy 背后的解析引擎

`parsel` 是 Scrapy 框架使用的解析库，提取能力强大。

**安装：**
```bash
pip install parsel
```

**特点：**
- 支持 XPath 和 CSS 选择器
- 与 Scrapy 无缝集成
- 性能优异

---

## 三、爬虫框架

### 1. Scrapy —— 企业级爬虫框架

`Scrapy` 是 Python 最强大的爬虫框架，适合大规模数据采集。

**安装：**
```bash
pip install scrapy
```

**基本用法：**
```python
import scrapy

class QuoteSpider(scrapy.Spider):
    name = 'quotes'
    start_urls = ['https://quotes.toscrape.com/']
    
    def parse(self, response):
        for quote in response.css('div.quote'):
            yield {
                'text': quote.css('span.text::text').get(),
                'author': quote.css('small.author::text').get(),
            }
```

**运行：**
```bash
scrapy runspider quotes_spider.py
```

**特点：**
- 完整的爬虫工程化框架
- 内置请求调度、去重、并发控制
- 支持数据管道存储（JSON、CSV、数据库）
- 中间件扩展机制
- 内置代理池支持

**适用场景：** 大规模数据采集、生产环境爬虫

---

### 2. Playwright / Puppeteer —— 动态页面渲染

对于 JavaScript 渲染的网页，传统爬虫无法胜任。`Playwright` 和 `Puppeteer` 能完美处理。

**Playwright 安装：**
```bash
pip install playwright
playwright install chromium
```

**基本用法：**
```python
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto('https://example.com')
        content = await page.content()
        await browser.close()

asyncio.run(main())
```

**特点：**
- 支持 Chromium、Firefox、WebKit
- 完美处理 JavaScript 渲染页面
- 截图、PDF 生成功能
- 自动化测试首选

**适用场景：** SPA 应用、需登录/验证码页面、截图

---

### 3. Selenium —— 经典浏览器自动化

`Selenium` 是老牌浏览器自动化工具，生态丰富。

**安装：**
```bash
pip install selenium
# 需下载对应浏览器的 driver
```

**特点：**
- 支持多浏览器
- 生态成熟，资料丰富
- 适合复杂交互场景

**注意：** 官方已转向 Selenium Manager，建议优先考虑 Playwright。

---

## 四、异步爬虫

### 1. aiohttp —— 异步 HTTP 客户端

`aiohttp` 是 Python 异步生态中的 HTTP 客户端库。

**安装：**
```bash
pip install aiohttp
```

**基本用法：**
```python
import aiohttp
import asyncio

async def fetch():
    async with aiohttp.ClientSession() as session:
        async with session.get('https://example.com') as response:
            return await response.text()

asyncio.run(fetch())
```

**特点：**
- 纯异步实现
- 高并发性能
- 支持 WebSocket

---

### 2. crawlab —— 分布式爬虫管理平台

如果需要管理多个爬虫、调度任务，`crawlab` 是很好的选择。

**特点：**
- 分布式架构
- 任务调度
- 可视化界面
- 支持多种爬虫

---

## 五、工具库

### 1. fake-useragent —— 随机 User-Agent

```bash
pip install fake-useragent
```

```python
from fake_useragent import UserAgent
ua = UserAgent().random
```

---

### 2. cloudscraper —— 反 Cloudflare 防护

```bash
pip install cloudscraper
```

```python
import cloudscraper
scraper = cloudscraper.create_scraper()
response = scraper.get('https://example.com')
```

---

### 3. selectorlib / scrapegraphai —— 智能提取

- **selectorlib**：通过可视化界面配置选择器
- **scrapegraphai**：AI 驱动的智能爬虫

---

## 六、实战推荐组合

| 场景 | 推荐组合 |
|------|----------|
| 简单数据采集 | `requests` + `BeautifulSoup` |
| 高性能并发 | `httpx`/`aiohttp` + `lxml` |
| 大规模工程化 | `Scrapy` |
| 动态渲染页面 | `Playwright` |
| 反爬虫站点 | `cloudscraper` + `Playwright` |

---

## 总结

Python 爬虫生态非常丰富，从简单的 `requests` 到企业级的 `Scrapy`，从同步到异步，总有一款工具适合你的需求。

建议新手从 `requests` + `BeautifulSoup` 入门，掌握基础后再学习 `Scrapy` 框架。遇到 JavaScript 渲染页面时，再引入 `Playwright`。

Happy Scraping! 🕷️

---

*如需更深入的某个库教程，欢迎评论区留言～*
