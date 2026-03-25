---
title: WebSocket 与 HTTP 协议
date: 2025-05-06 11:15:00
tags: [WebSocket, HTTP]
categories: [技术教程, 前端开发]
---
---

在现代 Web 开发中，网络通信是核心能力之一。HTTP 和 WebSocket 是最常用的两种协议，本文将详细介绍它们的概念、使用场景以及代码实现。

<!-- more -->

## 1. HTTP 协议详解

### 1.1 什么是 HTTP

HTTP（HyperText Transfer Protocol）是超文本传输协议，用于在客户端和服务器之间传输数据。它是一种请求-响应协议，客户端发送请求，服务器返回响应。

### 1.2 HTTP 请求方法

| 方法 | 说明 | 适用场景 |
|------|------|----------|
| GET | 获取数据 | 查询数据 |
| POST | 提交数据 | 创建资源 |
| PUT | 更新数据 | 修改资源 |
| DELETE | 删除数据 | 删除资源 |
| PATCH | 部分更新 | 局部修改 |

### 1.3 HTTP 请求示例

```javascript
// GET 请求
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// POST 请求
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: '张三',
        email: 'zhangsan@example.com'
    })
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

### 1.4 使用 Axios

```javascript
import axios from 'axios';

// GET 请求
async function getUsers() {
    try {
        const response = await axios.get('https://api.example.com/users');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// POST 请求
async function createUser(userData) {
    try {
        const response = await axios.post('https://api.example.com/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// 并发请求
async function fetchAll() {
    const [users, posts] = await Promise.all([
        axios.get('https://api.example.com/users'),
        axios.get('https://api.example.com/posts')
    ]);
    return { users: users.data, posts: posts.data };
}
```

### 1.5 HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 301 | 永久重定向 |
| 302 | 临时重定向 |
| 400 | 请求错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 未找到 |
| 500 | 服务器错误 |

## 2. WebSocket 协议详解

### 2.1 什么是 WebSocket

WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。它允许服务器主动向客户端推送数据，特别适用于实时应用，如聊天、游戏、股票行情等。

### 2.2 WebSocket vs HTTP

| 特性 | HTTP | WebSocket |
|------|------|-----------|
| 连接方式 | 短连接 | 长连接 |
| 通信方向 | 半双工 | 全双工 |
| 服务器推送 | 不支持 | 支持 |
| 资源消耗 | 较高 | 较低 |
| 适用场景 | REST API | 实时通信 |

### 2.3 WebSocket 基本用法

```javascript
// 创建 WebSocket 连接
const ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = () => {
    console.log('WebSocket 连接已建立');
    
    // 发送消息
    ws.send('Hello Server!');
};

ws.onmessage = (event) => {
    console.log('收到消息:', event.data);
};

ws.onerror = (error) => {
    console.error('WebSocket 错误:', error);
};

ws.onclose = () => {
    console.log('WebSocket 连接已关闭');
};

// 关闭连接
ws.close();
```

### 2.4 WebSocket 重连机制

```javascript
class WebSocketClient {
    constructor(url) {
        this.url = url;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 3000;
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('连接成功');
            this.reconnectAttempts = 0;
            this.onOpen?.();
        };

        this.ws.onmessage = (event) => {
            this.onMessage?.(event.data);
        };

        this.ws.onclose = () => {
            console.log('连接关闭');
            this.reconnect();
        };

        this.ws.onerror = (error) => {
            console.error('错误:', error);
        };
    }

    reconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            setTimeout(() => this.connect(), this.reconnectDelay);
        } else {
            console.log('达到最大重连次数');
        }
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }

    close() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

// 使用
const client = new WebSocketClient('wss://example.com/ws');

client.onOpen = () => {
    client.send({ type: 'hello', message: '我是客户端' });
};

client.onMessage = (data) => {
    console.log('收到:', data);
};

client.connect();
```

### 2.5 心跳检测

```javascript
class HeartbeatWebSocket {
    constructor(url, heartbeatInterval = 30000) {
        this.url = url;
        this.heartbeatInterval = heartbeatInterval;
        this.ws = null;
        this.timer = null;
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('连接成功');
            this.startHeartbeat();
        };

        this.ws.onmessage = (event) => {
            // 收到心跳响应
            if (event.data === 'pong') {
                console.log('心跳正常');
            } else {
                this.onMessage?.(event.data);
            }
        };

        this.ws.onclose = () => {
            this.stopHeartbeat();
        };
    }

    startHeartbeat() {
        this.timer = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send('ping');
            }
        }, this.heartbeatInterval);
    }

    stopHeartbeat() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }
}
```

## 3. 实际应用示例

### 3.1 实时聊天应用

```javascript
// 聊天客户端
class ChatClient {
    constructor(username) {
        this.username = username;
        this.ws = null;
        this.messageHandler = null;
    }

    connect() {
        this.ws = new WebSocket('wss://chat.example.com');

        this.ws.onopen = () => {
            console.log('进入聊天室');
            // 发送加入消息
            this.send({
                type: 'join',
                username: this.username
            });
        };

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.messageHandler?.(message);
        };
    }

    sendMessage(content) {
        this.send({
            type: 'message',
            username: this.username,
            content: content,
            timestamp: Date.now()
        });
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }

    onMessage(handler) {
        this.messageHandler = handler;
    }
}

// 使用
const chat = new ChatClient('用户A');

chat.onMessage((msg) => {
    console.log(`${msg.username}: ${msg.content}`);
});

chat.connect();

// 发送消息
chat.sendMessage('大家好！');
```

### 3.2 游戏实时同步

```javascript
// 游戏状态同步
class GameSync {
    constructor() {
        this.ws = null;
        this.gameState = null;
    }

    connect() {
        this.ws = new WebSocket('wss://game.example.com/sync');

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            switch (data.type) {
                case 'state_update':
                    this.updateGameState(data.state);
                    break;
                case 'player_join':
                    this.onPlayerJoin(data.player);
                    break;
                case 'player_leave':
                    this.onPlayerLeave(data.playerId);
                    break;
            }
        };
    }

    // 发送玩家操作
    sendAction(action) {
        this.send({
            type: 'action',
            action: action,
            timestamp: Date.now()
        });
    }

    // 发送位置更新
    sendPosition(x, y) {
        this.send({
            type: 'position',
            x: x,
            y: y
        });
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }
}
```

### 3.3 股票行情推送

```javascript
class StockClient {
    constructor() {
        this.ws = null;
        this.subscribedStocks = new Set();
    }

    connect() {
        this.ws = new WebSocket('wss://stock.example.com/realtime');

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.onPriceUpdate?.(data);
        };
    }

    subscribe(stockCode) {
        this.subscribedStocks.add(stockCode);
        this.send({
            type: 'subscribe',
            codes: Array.from(this.subscribedStocks)
        });
    }

    unsubscribe(stockCode) {
        this.subscribedStocks.delete(stockCode);
        this.send({
            type: 'unsubscribe',
            code: stockCode
        });
    }

    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }

    onPriceUpdate(handler) {
        this.onPriceUpdate = handler;
    }
}

// 使用
const stockClient = new StockClient();

stockClient.onPriceUpdate((data) => {
    console.log(`${data.code} 最新价: ${data.price}`);
});

stockClient.connect();
stockClient.subscribe('AAPL');
stockClient.subscribe('GOOGL');
```

## 4. 最佳实践

### 4.1 HTTP 最佳实践

1. **使用 HTTPS**：确保数据传输安全
2. **合理使用缓存**：减少不必要的请求
3. **错误处理**：做好异常捕获和处理
4. **请求取消**：使用 AbortController 取消请求
5. **请求拦截**：统一处理请求头、认证等

```javascript
// 请求取消示例
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/slow endpoint', { signal })
    .then(response => response.json())
    .catch(err => {
        if (err.name === 'AbortError') {
            console.log('请求已取消');
        } else {
            console.error('请求失败:', err);
        }
    });

// 5秒后取消
setTimeout(() => controller.abort(), 5000);
```

### 4.2 WebSocket 最佳实践

1. **使用 WSS**：使用加密连接
2. **心跳检测**：保持连接活跃
3. **自动重连**：处理网络不稳定
4. **消息队列**：离线时缓存消息
5. **连接复用**：避免频繁创建连接

### 4.3 协议选择指南

- **使用 HTTP**：REST API、文件上传下载、CRUD 操作
- **使用 WebSocket**：实时聊天、在线游戏、实时通知、股票行情

## 5. 总结

本文详细介绍了 HTTP 和 WebSocket 两种网络协议：

1. **HTTP**：请求-响应模式，适合 RESTful API
2. **WebSocket**：全双工通信，适合实时应用

在实际开发中，根据业务需求选择合适的协议，合理使用各种工具库，可以构建高效、稳定的网络应用。
