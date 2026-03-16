---
title: Nginx 入门与实战
date: 2026-01-12 10:00:00
categories:
  - 技术教程
tags:
  - Nginx
  - 服务器
  - 运维
  - Web服务器
  - 入门教程
---

Nginx 是一个高性能的 HTTP 和反向代理服务器，被广泛应用于 Web 服务、负载均衡、缓存等领域。本文将详细介绍 Nginx 的安装、配置和实战应用。

<!-- more -->

## 一、Nginx 简介

Nginx（发音同 "engine X"）是一款开源的轻量级 Web 服务器，由俄罗斯工程师 Igor Sysoev 于 2004 年开发。它以其高性能、稳定性和低资源消耗而闻名。

### Nginx 的特点

- **高性能**：单台服务器可处理数万个并发连接
- **低内存消耗**：相比 Apache，内存占用更低
- **支持负载均衡**：内置负载均衡功能
- **支持缓存**：可作为反向代理缓存服务器
- **支持热部署**：配置修改无需重启
- **模块化设计**：功能通过模块扩展

## 二、Nginx 安装

### Linux 安装（CentOS/RHEL）

```bash
# 安装 EPEL 源
sudo yum install epel-release

# 安装 Nginx
sudo yum install nginx

# 启动 Nginx
sudo systemctl start nginx

# 设置开机自启
sudo systemctl enable nginx

# 检查状态
sudo systemctl status nginx
```

### Linux 安装（Debian/Ubuntu）

```bash
# 更新软件源
sudo apt update

# 安装 Nginx
sudo apt install nginx

# 启动服务
sudo systemctl start nginx

# 开机自启
sudo systemctl enable nginx
```

### 编译安装

```bash
# 安装依赖
sudo yum install gcc pcre pcre-devel zlib zlib-devel openssl openssl-devel

# 下载 Nginx
wget https://nginx.org/download/nginx-1.24.0.tar.gz
tar -xzf nginx-1.24.0.tar.gz
cd nginx-1.24.0

# 编译安装
./configure --prefix=/usr/local/nginx \
    --with-http_ssl_module \
    --with-http_stub_status_module \
    --with-http_realip_module

make && make install

# 添加到系统路径
ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/nginx
```

## 三、Nginx 目录结构

```
/usr/local/nginx/
├── conf/          # 配置文件
│   ├── nginx.conf
│   └── conf.d/
├── html/          # 网页文件
│   ├── index.html
│   └── 50x.html
├── logs/          # 日志文件
│   ├── access.log
│   └── error.log
└── sbin/         # 可执行文件
    └── nginx
```

## 四、基本配置

### 配置文件结构

```nginx
# 全局块
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# events 块
events {
    worker_connections 1024;
}

# http 块
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;
    
    # 发送文件
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # gzip 压缩
    gzip on;
    gzip_disable "msie6";
    
    # 虚拟主机配置
    include /etc/nginx/conf.d/*.conf;
}
```

### 简单静态网站配置

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    
    root /var/www/html;
    index index.html index.htm;
    
    # 访问日志
    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log;
    
    #  location 块
    location / {
        try_files $uri $uri/ =404;
    }
    
    # 错误页面
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
    }
}
```

## 五、反向代理配置

### 基本反向代理

```nginx
server {
    listen 80;
    server_name api.example.com;
    
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### 负载均衡配置

```nginx
# upstream 定义后端服务器组
upstream backend {
    server 192.168.1.10:8080 weight=5;
    server 192.168.1.11:8080 weight=3;
    server 192.168.1.12:8080 backup;
}

server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 负载均衡策略

```nginx
# 轮询（默认）
upstream backend {
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
}

# 权重分配
upstream backend {
    server 192.168.1.10:8080 weight=3;
    server 192.168.1.11:8080 weight=1;
}

# IP 哈希（会话保持）
upstream backend {
    ip_hash;
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
}

# 最少连接数
upstream backend {
    least_conn;
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
}
```

## 六、SSL/HTTPS 配置

### 生成 SSL 证书

```bash
# 使用 Let's Encrypt（推荐）
sudo certbot certonly --nginx -d example.com -d www.example.com

# 自签名证书（测试用）
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/server.key \
    -out /etc/nginx/ssl/server.crt
```

### HTTPS 配置

```nginx
server {
    listen 80;
    server_name example.com;
    # HTTP 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;
    
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 七、静态资源服务

### 图片防盗链

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    valid_referers none blocked example.com www.example.com;
    if ($invalid_referer) {
        return 403;
    }
    
    expires 30d;
    add_header Cache-Control "public, no-transform";
}
```

### 浏览器缓存

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$ {
    expires 30d;
    add_header Cache-Control "public, no-transform";
}
```

### 目录浏览

```nginx
location /downloads {
    autoindex on;
    autoindex_exact_size off;
    autoindex_localtime on;
}
```

## 八、性能优化

### Gzip 压缩

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;
gzip_min_length 1000;
```

### 连接数优化

```nginx
events {
    worker_connections 65535;
    use epoll;
    multi_accept on;
}

worker_processes auto;
worker_rlimit_nofile 65535;
```

### 缓冲区优化

```nginx
client_body_buffer_size 10K;
client_header_buffer_size 1k;
client_max_body_size 8m;
large_client_header_buffers 4 32k;
output_buffers 1 32k;
postpone_output 1460;
```

## 九、常用命令

```bash
# 检查配置语法
nginx -t

# 重新加载配置
nginx -s reload

# 优雅停止
nginx -s quit

# 强制关闭
nginx -s stop

# 查看版本
nginx -v

# 查看详细版本
nginx -V

# 重新打开日志
nginx -s reopen
```

## 十、常见问题

### 1. 413 Request Entity Too Large

```nginx
# 增加允许的请求体大小
client_max_body_size 20M;
```

### 2. 502 Bad Gateway

通常是因为后端服务未启动或配置错误，检查：
- proxy_pass 地址是否正确
- 后端服务是否正常运行
- 防火墙是否阻止连接

### 3. 504 Gateway Timeout

```nginx
# 增加超时时间
proxy_connect_timeout 300;
proxy_send_timeout 300;
proxy_read_timeout 300;
```

## 总结

Nginx 是现代 Web 架构中不可或缺的组件。掌握 Nginx 的配置和使用，能够帮助你构建高性能、高可用的 Web 服务。建议在实际项目中不断实践，逐步深入学习其高级功能。

---

> 更多服务器运维相关文章正在整理中，敬请期待！
