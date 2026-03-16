---
title: Ajax 与 JSON 介绍
date: 2025-03-05 11:20:00
categories:
  - 技术文档
tags:
  - Ajax
  - JSON
  - 前端
  - 网络编程
---

Ajax 和 JSON 是现代 Web 开发中最常用的数据交互技术。Ajax 用于在不刷新页面的情况下与服务器通信，JSON 是轻量级的数据交换格式。本文将详细介绍它们的使用方法。

<!-- more -->

## 1. Ajax 详解

### 1.1 什么是 Ajax

Ajax（Asynchronous JavaScript and XML）是一种创建快速动态网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新，无需重新加载整个页面。

### 1.2 原生 XMLHttpRequest

```javascript
// GET 请求
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/users', true);

xhr.onload = () => {
    if (xhr.status === 200) {
        const users = JSON.parse(xhr.responseText);
        console.log(users);
    } else {
        console.error('请求失败:', xhr.status);
    }
};

xhr.onerror = () => {
    console.error('网络错误');
};

xhr.send();

// POST 请求
const xhrPost = new XMLHttpRequest();
xhrPost.open('POST', 'https://api.example.com/users', true);
xhrPost.setRequestHeader('Content-Type', 'application/json');

xhrPost.onload = () => {
    if (xhrPost.status === 201) {
        const newUser = JSON.parse(xhrPost.responseText);
        console.log('创建成功:', newUser);
    }
};

xhrPost.send(JSON.stringify({
    name: '张三',
    email: 'zhangsan@example.com'
}));
```

### 1.3 Fetch API

```javascript
// GET 请求
async function getUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('请求失败:', error);
    }
}

// POST 请求
async function createUser(userData) {
    try {
        const response = await fetch('https://api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token123'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('创建失败:', error);
    }
}

// PUT 请求（更新）
async function updateUser(id, userData) {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return await response.json();
}

// DELETE 请求
async function deleteUser(id) {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'DELETE'
    });
    return response.ok;
}
```

### 1.4 请求超时处理

```javascript
function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeout);
    
    return fetch(url, {
        ...options,
        signal
    })
    .finally(() => {
        clearTimeout(timeoutId);
    });
}

// 使用
fetchWithTimeout('https://api.example.com/users', { method: 'GET' }, 3000)
    .then(response => response.json())
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('请求超时');
        } else {
            console.error('请求失败:', error);
        }
    });
```

### 1.5 进度监控

```javascript
function uploadWithProgress(url, file, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                onProgress(percent);
            }
        };
        
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error('上传失败'));
            }
        };
        
        xhr.onerror = () => reject(new Error('网络错误'));
        
        xhr.open('POST', url);
        
        const formData = new FormData();
        formData.append('file', file);
        
        xhr.send(formData);
    });
}

// 使用
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    uploadWithProgress('/api/upload', file, (percent) => {
        console.log(`上传进度: ${percent}%`);
    })
    .then(result => console.log('上传成功:', result))
    .catch(error => console.error('上传失败:', error));
});
```

## 2. JSON 详解

### 2.1 什么是 JSON

JSON（JavaScript Object Notation）是一种轻量级的数据交换格式。它基于 JavaScript 语法，但独立于编程语言。JSON 易于人阅读和编写，也易于机器解析和生成。

### 2.2 JSON 语法规则

```json
{
    "name": "张三",
    "age": 25,
    "isStudent": false,
    "scores": [85, 90, 78],
    "address": {
        "city": "北京",
        "district": "朝阳区"
    },
    "friends": [
        {
            "name": "李四",
            "age": 26
        }
    ],
    "email": null
}
```

### 2.3 JSON 操作

```javascript
// 解析 JSON 字符串
const jsonString = '{"name": "张三", "age": 25}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // 张三

// 对象转 JSON 字符串
const user = { name: '李四', age: 30 };
const jsonStr = JSON.stringify(user);
console.log(jsonStr); // {"name":"李四","age":30}

// 格式化输出
const prettyJson = JSON.stringify(user, null, 4);
console.log(prettyJson);
/*
{
    "name": "李四",
    "age": 30
}
*/

// 过滤字段
const userFiltered = JSON.stringify(user, ['name'], 2);
console.log(userFiltered);
/*
{
  "name": "李四"
}
*/
```

### 2.4 深拷贝

```javascript
// 使用 JSON 进行深拷贝
const original = { 
    name: '张三',
    address: { city: '北京' }
};

const copy = JSON.parse(JSON.stringify(original));
copy.address.city = '上海';

console.log(original.address.city); // 北京（原始对象不变）
console.log(copy.address.city);     // 上海
```

### 2.5 JSON Schema 验证

```javascript
// 简单的 JSON 验证
function validateJSON(data, schema) {
    const errors = [];
    
    for (const [key, rules] of Object.entries(schema)) {
        const value = data[key];
        
        // 必填检查
        if (rules.required && (value === undefined || value === null)) {
            errors.push(`${key} 是必填字段`);
            continue;
        }
        
        // 类型检查
        if (rules.type && typeof value !== rules.type) {
            errors.push(`${key} 应该是 ${rules.type} 类型`);
        }
        
        // 范围检查
        if (rules.min !== undefined && value < rules.min) {
            errors.push(`${key} 不能小于 ${rules.min}`);
        }
        
        if (rules.max !== undefined && value > rules.max) {
            errors.push(`${key} 不能大于 ${rules.max}`);
        }
        
        // 枚举检查
        if (rules.enum && !rules.enum.includes(value)) {
            errors.push(`${key} 必须是 ${rules.enum.join('、')} 之一`);
        }
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

// 使用
const schema = {
    name: { required: true, type: 'string' },
    age: { type: 'number', min: 0, max: 150 },
    gender: { enum: ['男', '女', '其他'] }
};

const data = { name: '张三', age: -1 };
const result = validateJSON(data, schema);
console.log(result);
// { valid: false, errors: ['age 不能小于 0'] }
```

## 3. 实战技巧

### 3.1 封装请求工具

```javascript
class HttpClient {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }

    async request(endpoint, options = {}) {
        const url = this.baseURL + endpoint;
        
        const config = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options.headers
            }
        };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`请求失败: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            console.error('请求错误:', error);
            throw error;
        }
    }

    get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url, { method: 'GET' });
    }

    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// 使用
const api = new HttpClient('https://api.example.com');

// 获取用户列表
const users = await api.get('/users');

// 创建用户
const newUser = await api.post('/users', {
    name: '王五',
    email: 'wangwu@example.com'
});

// 更新用户
const updatedUser = await api.put('/users/1', {
    name: '王五（已修改）'
});

// 删除用户
await api.delete('/users/1');
```

### 3.2 请求缓存

```javascript
class RequestCache {
    constructor(maxAge = 60000) { // 默认 1 分钟
        this.cache = new Map();
        this.maxAge = maxAge;
    }

    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.maxAge) {
            this.cache.delete(key);
            return null;
        }
        
        return item.data;
    }

    set(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    clear() {
        this.cache.clear();
    }
}

const cache = new RequestCache(30000); // 30 秒缓存

async function fetchWithCache(url) {
    const cached = cache.get(url);
    if (cached) {
        console.log('使用缓存');
        return cached;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    
    cache.set(url, data);
    return data;
}
```

### 3.3 分页加载

```javascript
class PaginatedLoader {
    constructor(fetchFn, pageSize = 10) {
        this.fetchFn = fetchFn;
        this.pageSize = pageSize;
        this.page = 1;
        this.hasMore = true;
        this.loading = false;
        this.data = [];
    }

    async loadMore() {
        if (this.loading || !this.hasMore) return;
        
        this.loading = true;
        
        try {
            const result = await this.fetchFn(this.page, this.pageSize);
            
            this.data = [...this.data, ...result.items];
            this.hasMore = result.hasMore;
            this.page++;
            
            return result.items;
        } finally {
            this.loading = false;
        }
    }

    reset() {
        this.page = 1;
        this.hasMore = true;
        this.loading = false;
        this.data = [];
    }
}

// 使用
const loader = new PaginatedLoader(async (page, size) => {
    const response = await fetch(`/api/users?page=${page}&size=${size}`);
    return await response.json();
});

// 加载更多
const newItems = await loader.loadMore();
```

### 3.4 数据转换

```javascript
// JSON 转 FormData
function jsonToFormData(json) {
    const formData = new FormData();
    
    function appendFormData(data, prefix = '') {
        for (const [key, value] of Object.entries(data)) {
            const formKey = prefix ? `${prefix}[${key}]` : key;
            
            if (value instanceof Object && !(value instanceof File)) {
                appendFormData(value, formKey);
            } else {
                formData.append(formKey, value);
            }
        }
    }
    
    appendFormData(json);
    return formData;
}

// FormData 转 JSON
function formDataToJson(formData) {
    const json = {};
    
    for (const [key, value] of formData.entries()) {
        const keys = key.replace(/\]/g, '').split('[');
        let current = json;
        
        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            
            if (i === keys.length - 1) {
                current[k] = value;
            } else {
                current[k] = current[k] || {};
                current = current[k];
            }
        }
    }
    
    return json;
}

// CSV 转 JSON
function csvToJson(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        
        headers.forEach((header, index) => {
            obj[header] = values[index]?.trim();
        });
        
        return obj;
    });
}

// JSON 转 CSV
function jsonToCsv(data) {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvLines = [headers.join(',')];
    
    data.forEach(item => {
        const values = headers.map(header => {
            const value = item[header] ?? '';
            return value.includes(',') ? `"${value}"` : value;
        });
        csvLines.push(values.join(','));
    });
    
    return csvLines.join('\n');
}
```

### 3.5 大数据量处理

```javascript
// 分块处理大 JSON
async function processLargeJSON(file, chunkSize = 1024 * 1024) {
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
        let offset = 0;
        const chunks = [];
        
        reader.onload = (e) => {
            chunks.push(e.target.result);
            offset += chunkSize;
            
            if (offset < file.size) {
                readNextChunk();
            } else {
                // 合并所有块
                const fullText = chunks.join('');
                resolve(JSON.parse(fullText));
            }
        };
        
        reader.onerror = reject;
        
        function readNextChunk() {
            const blob = file.slice(offset, offset + chunkSize);
            reader.readAsText(blob);
        }
        
        readNextChunk();
    });
}

// 流式解析大 JSON（简化版）
function* parseJSONLines(text) {
    const lines = text.split('\n');
    
    for (const line of lines) {
        if (line.trim()) {
            yield JSON.parse(line);
        }
    }
}
```

## 4. 错误处理

### 4.1 统一错误处理

```javascript
class APIError extends Error {
    constructor(message, status, code) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.code = code;
    }
}

async function handleRequest(promise) {
    try {
        const response = await promise;
        return { success: true, data: response };
    } catch (error) {
        console.error('请求错误:', error);
        
        if (error instanceof APIError) {
            return { 
                success: false, 
                error: {
                    message: error.message,
                    code: error.code
                }
            };
        }
        
        return { 
            success: false, 
            error: {
                message: '网络错误，请稍后重试',
                code: 'NETWORK_ERROR'
            }
        };
    }
}

// 使用
const result = await handleRequest(fetch('/api/users'));

if (result.success) {
    console.log('数据:', result.data);
} else {
    console.error('错误:', result.error.message);
}
```

### 4.2 重试机制

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            
            if (!response.ok && response.status >= 500) {
                throw new Error('服务器错误');
            }
            
            return response;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            
            // 指数退避
            const delay = Math.pow(2, i) * 1000;
            console.log(`等待 ${delay}ms 后重试...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```

## 5. 最佳实践

1. **使用 Fetch API**：现代浏览器的原生支持，比 XMLHttpRequest 更强大
2. **合理设置超时**：避免请求无限等待
3. **做好错误处理**：区分网络错误和业务错误
4. **使用缓存**：减少重复请求，提升性能
5. **请求取消**：页面切换时取消不必要的请求
6. **数据验证**：接收数据前进行格式验证
7. **安全考虑**：敏感数据使用 HTTPS 传输

## 6. 总结

本文详细介绍了 Ajax 和 JSON 的使用方法：

1. **Ajax**：XMLHttpRequest、Fetch API、请求超时、进度监控
2. **JSON**：语法规则、解析序列化、深拷贝、数据验证
3. **实战技巧**：请求封装、缓存、分页、数据转换
4. **错误处理**：统一错误处理、重试机制

掌握这些技术后，你就可以更加高效地进行 Web 数据交互开发了。
