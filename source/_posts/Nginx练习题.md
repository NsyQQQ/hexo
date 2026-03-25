---
title: Nginx 练习题
date: 2026-01-16 10:00:00
tags: [Nginx, 运维, 练习题]
categories: [技术教程, Linux]
---

本文包含 Nginx 第 1-3 周的练习题，涵盖 Nginx 基础，反向代理与负载均衡，HTTPS 与优化等内容，并附带参考答案。

<!-- more -->

## 第 1 周：Nginx 基础

### 一、选择题

1. Nginx 默认的配置文件路径是？(A)
   - A. /etc/nginx/nginx.conf
   - B. /usr/local/nginx/conf/nginx.conf
   - C. /etc/nginx/conf/default.conf
   - D. /etc/nginx/sites-enabled/default

2. 下列哪个命令可以测试 Nginx 配置语法是否正确？(A)
   - A. nginx -t
   - B. nginx -s reload
   - C. nginx -v
   - D. nginx -c

3. Nginx 配置中，用于定义虚拟主机的块是？(B)
   - A. http
   - B. server
   - C. location
   - D. upstream

4. 下面哪个指令用于设置 worker 进程的数量？(A)
   - A. worker_processes
   - B. worker_connections
   - C. worker_rlimit_nofile
   - D. use epoll

5. Nginx 处理静态文件的指令是？(D)
   - A. proxy_pass
   - B. root
   - C. alias
   - D. B 和 C 都对

---

### 二、填空题

1. Nginx 默认监听端口是______。**答案：80**

2. 用来指定错误日志路径的指令是______。**答案：error_log**

3. 配置负载均衡时，使用______块定义后端服务器。**答案：upstream**

4. Nginx 支持的负载均衡算法有：轮询、______、______、______。**答案：ip_hash、least_conn、fair**

5. 静态文件缓存可通过______指令设置缓存时间。**答案：expires**

---

### 三、简答题

1. 请简述 Nginx 的架构特点（多进程模式）。
   **答案：Nginx 采用 Master-Worker 多进程模式：Master 进程负责读取配置，管理 Worker；Worker 进程处理请求，默认等于 CPU 核心数。采用 epoll 等高效事件模型，单线程非阻塞 I/O，高并发低内存。**

2. 请解释 server 块和 location 块的关系。
   **答案：server 块定义一个虚拟主机（网站），location 块定义该网站下的 URL 路径规则。一个 http 可包含多个 server，一个 server 可包含多个 location。**

3. 如何查看 Nginx 的运行状态？
   **答案：1) ps aux | grep nginx 查看进程；2) netstat -tlnp | grep 80 查看端口；3) 配置 stub_status 后 curl 127.0.0.1/nginx_status 查看详细状态。**

---

## 第 2 周：反向代理与负载均衡

### 一、选择题

1. 反向代理的配置指令是？(A)
   - A. proxy_pass
   - B. upstream
   - C. server
   - D. root

2. 下列哪个不是 Nginx 负载均衡算法？(D)
   - A. round-robin
   - B. ip_hash
   - C. least_conn
   - D. random

3. upstream 块中，用于标记后端服务器状态的指令是？(D)
   - A. status
   - B. down
   - C. backup
   - D. B 和 C

4. Nginx 健康检查默认是？(B)
   - A. 主动健康检查
   - B. 被动健康检查
   - C. 不健康检查
   - D. 定时健康检查

5. 下列哪个指令用于传递真实 IP 给后端？(D)
   - A. proxy_set_header Host
   - B. proxy_set_header X-Real-IP
   - C. proxy_set_header X-Forwarded-For
   - D. B 和 C

---

### 二、填空题

1. 配置反向代理时，必须配置的指令是______。**答案：proxy_pass**

2. 在 upstream 块中，将服务器标记为备用服务器的指令是______。**答案：backup**

3. 用于设置连接后端服务器超时的指令是______。**答案：proxy_connect_timeout**

4. ip_hash 算法基于______进行哈希分配。**答案：客户端IP**

5. least_conn 算法会将请求分配到______的服务器。**答案：连接数最少**

---

### 三、配置题

1. 请写出将请求反向代理到 http://localhost:8080 的配置。

   ```nginx
   location / {
       proxy_pass http://localhost:8080;
   }
   ```

2. 请配置 upstream，包含 3 台后端服务器，使用 least_conn 算法。

   ```nginx
   upstream backend {
       least_conn;
       server 192.168.1.1:8080;
       server 192.168.1.2:8080;
       server 192.168.1.3:8080;
   }
   ```

3. 请配置 Nginx 传递 X-Forwarded-For 头信息。

   ```nginx
   location / {
       proxy_pass http://backend;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }
   ```

---

## 第 3 周：HTTPS 与优化

### 一、选择题

1. HTTPS 使用的协议是？(D)
   - A. SSL
   - B. TLS
   - C. HTTP + SSL
   - D. HTTP over TLS

2. Nginx 中配置 SSL 证书的指令是？(A)
   - A. ssl_certificate
   - B. ssl_cert
   - C. ssl on
   - D. ssl_enable

3. 下列哪个指令用于开启 Gzip 压缩？(A)
   - A. gzip on
   - B. gzip_enable
   - C. http_gzip
   - D. compression on

4. 浏览器缓存过期时间通过哪个指令设置？(A)
   - A. expires
   - B. cache_expire
   - C. cache_valid
   - D. browser_cache

5. Nginx 性能优化中，提高 worker_connections 的作用是？(A)
   - A. 增加并发连接数
   - B. 增加进程数
   - C. 减少内存使用
   - D. 加快响应速度

---

### 二、填空题

1. SSL 证书私钥文件的配置指令是______。**答案：ssl_certificate_key**

2. 强制使用 HTTPS 的配置是______。**答案：return 301 https://$server_name$request_uri;**

3. Gzip 压缩级别可配置，范围是______。**答案：1-9**

4. 用于设置静态资源缓存时间的指令是______。**答案：expires**

5. Nginx 常用的事件处理模型有：select、poll、______、______。**答案：epoll、kqueue**

---

### 三、简答题

1. 请简述如何申请并配置 SSL 证书。
   **答案：1) 申请证书（Let's Encrypt 免费或付费证书）；2) 获取证书文件（.crt）和私钥文件（.key）；3) 在 server 块中配置 ssl_certificate 和 ssl_certificate_key；4) 重启 Nginx。**

2. 请解释浏览器缓存的实现原理。
   **答案：通过 expires 或 Cache-Control 头告诉浏览器资源过期时间，在过期前浏览器直接从本地缓存读取，无需再次请求服务器，从而提升加载速度。**

3. 请列出至少 5 条 Nginx 性能优化建议。
   **答案：1) worker_processes 设置为 CPU 核心数；2) worker_connections 提高并发连接数；3) 开启 Gzip 压缩；4) 开启静态资源缓存；5) 使用高效事件处理模型（epoll）；6) 配置上游连接复用；7) 关闭不必要的日志。**

---

## 四，综合实战题

### 题目 1：搭建静态网站

**要求**：
- 安装 Nginx
- 配置域名为 example.com
- 静态文件放在 /var/www/html
- 配置访问日志和错误日志

**参考答案**：
```nginx
server {
    listen 80;
    server_name example.com;
    
    root /var/www/html;
    index index.html;
    
    access_log /var/log/nginx/example_access.log;
    error_log /var/log/nginx/example_error.log;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

### 题目 2：配置反向代理

**要求**：
- 将所有请求代理到后端 127.0.0.1:8080
- 传递 X-Real-IP 和 X-Forwarded-For
- 设置代理超时时间为 60 秒

**参考答案**：
```nginx
location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

---

### 题目 3：配置负载均衡

**要求**：
- upstream 包含 3 台服务器
- 使用 least_conn 算法
- 设置 max_fails=3，fail_timeout=30s

**参考答案**：
```nginx
upstream backend {
    least_conn;
    
    server 192.168.1.1:8080 max_fails=3 fail_timeout=30s;
    server 192.168.1.2:8080 max_fails=3 fail_timeout=30s;
    server 192.168.1.3:8080 max_fails=3 fail_timeout=30s;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```

---

### 题目 4：配置 HTTPS

**要求**：
- 申请免费 SSL 证书（Let's Encrypt）
- 配置 HTTP 跳转到 HTTPS
- 开启 Gzip 压缩
- 配置静态资源缓存 30 天

**参考答案**：
```nginx
# HTTP 转 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS 配置
server {
    listen 443 ssl;
    server_name example.com;
    
    ssl_certificate /etc/nginx/ssl/example.crt;
    ssl_certificate_key /etc/nginx/ssl/example.key;
    
    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    root /var/www/html;
    
    # 静态资源缓存 30 天
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```


