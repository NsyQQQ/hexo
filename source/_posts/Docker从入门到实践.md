---
title: Docker 入门与实践
date: 2026-01-12 14:00:00
categories:
  - 技术教程
tags:
  - Docker
  - 容器
  - 运维
  - DevOps
  - 入门教程
---

Docker 是一个开源的容器化平台，可以帮助开发者打包、部署和运行应用程序。本文将详细介绍 Docker 的基础知识和实战用法。

<!-- more -->

## 一、Docker 简介

Docker 是一个基于 Go 语言开发的开源容器引擎，于 2013 年发布。它让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上。

### Docker 的优势

- **轻量级**：容器共享宿主内核，启动快速，资源占用少
- **可移植性**：一次构建，到处运行
- **隔离性**：每个容器相互隔离，互不影响
- **版本控制**：支持容器版本管理
- **快速部署**：秒级启动应用
- **自动化构建**：支持 Dockerfile 自动构建镜像

### Docker 与虚拟机的区别

| 特性 | Docker | 虚拟机 |
|------|--------|---------|
| 启动时间 | 秒级 | 分钟级 |
| 资源占用 | 少 | 多 |
| 操作系统 | 共享内核 | 独立内核 |
| 隔离性 | 进程级 | 系统级 |
| 大小 | MB 级别 | GB 级别 |

## 二、Docker 安装

### CentOS/RHEL

```bash
# 安装依赖
sudo yum install -y yum-utils

# 添加 Docker 仓库
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装 Docker
sudo yum install docker-ce docker-ce-cli containerd.io

# 启动 Docker
sudo systemctl start docker

# 开机自启
sudo systemctl enable docker

# 运行 hello-world 验证
sudo docker run hello-world
```

### Ubuntu/Debian

```bash
# 更新软件包
sudo apt update

# 安装依赖
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# 添加 Docker GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker 仓库
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# 启动服务
sudo systemctl start docker

# 开机自启
sudo systemctl enable docker
```

### macOS

```bash
# 使用 Homebrew 安装
brew install --cask docker

# 或下载 Docker Desktop
# https://www.docker.com/products/docker-desktop
```

## 三、Docker 基本概念

### 镜像（Image）

镜像是一个只读模板，用于创建 Docker 容器。可以把镜像理解为面向对象中的"类"。

### 容器（Container）

容器是镜像的运行实例。可以把容器理解为面向对象中的"对象"。

### 仓库（Repository）

仓库是集中存放镜像的地方。Docker Hub 是官方最大的公开仓库。

## 四、Docker 常用命令

### 镜像操作

```bash
# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx:latest

# 查看本地镜像
docker images

# 删除镜像
docker rmi nginx:latest

# 构建镜像
docker build -t myapp:latest .

# 标记镜像
docker tag myapp:latest myregistry.com/myapp:latest

# 推送镜像到仓库
docker push myregistry.com/myapp:latest
```

### 容器操作

```bash
# 运行容器
docker run -d -p 8080:80 nginx

# 参数说明：
# -d: 后台运行
# -p 8080:80: 端口映射（主机端口:容器端口）
# --name: 容器名称
# -v: 挂载卷
# -e: 环境变量

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop container_id

# 启动容器
docker start container_id

# 删除容器
docker rm container_id

# 查看容器日志
docker logs -f container_id

# 进入容器
docker exec -it container_id /bin/bash

# 查看容器详情
docker inspect container_id

# 查看容器资源使用
docker stats container_id
```

### 其他常用命令

```bash
# 清理未使用的镜像
docker image prune

# 清理停止的容器
docker container prune

# 清理构建缓存
docker builder prune

# 查看 Docker 信息
docker info
```

## 五、Dockerfile 详解

Dockerfile 是用于构建镜像的脚本文件。

### 基本结构

```dockerfile
# 基础镜像
FROM ubuntu:20.04

# 维护者信息
MAINTAINER yourname <your@email.com>

# 设置环境变量
ENV APP_HOME /app
ENV NODE_ENV=production

# 设置工作目录
WORKDIR /app

# 复制文件
COPY package*.json ./
COPY . .

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "app.js"]
```

### 常用指令

| 指令 | 说明 |
|------|------|
| FROM | 指定基础镜像 |
| MAINTAINER | 维护者信息 |
| RUN | 执行命令 |
| COPY | 复制文件 |
| ADD | 复制文件（支持 URL 和解压） |
| WORKDIR | 设置工作目录 |
| ENV | 设置环境变量 |
| EXPOSE | 声明端口 |
| CMD | 启动命令 |
| ENTRYPOINT | 入口点 |
| VOLUME | 卷 |
| USER | 设置用户 |

### 多阶段构建

```dockerfile
# 构建阶段
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 运行阶段
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## 六、Docker Compose

Docker Compose 是用于定义和运行多容器应用的工具。

### 安装

```bash
# Linux
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# macOS (已包含在 Docker Desktop 中)
# Windows (已包含在 Docker Desktop 中)
```

### docker-compose.yml 示例

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./data:/app/data
    depends_on:
      - redis
    networks:
      - mynetwork

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - mynetwork

volumes:
  redis_data:

networks:
  mynetwork:
    driver: bridge
```

### 常用命令

```bash
# 启动所有服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f

# 构建镜像
docker-compose build

# 进入容器
docker-compose exec web bash

# 扩展服务
docker-compose up -d --scale web=3
```

## 七、数据管理

### 数据卷（Volume）

```bash
# 创建数据卷
docker volume create mydata

# 挂载数据卷
docker run -v mydata:/app/data nginx

# 挂载主机目录
docker run -v /host/path:/container/path nginx

# 匿名卷（容器删除后自动删除）
docker run -v /app/data nginx
```

### 绑定挂载

```bash
# 读写挂载
docker run -v $(pwd):/app nginx

# 只读挂载
docker run -v $(pwd):/app:ro nginx
```

## 八、网络配置

### 默认网络

```bash
# 查看网络
docker network ls

# 创建网络
docker network create mynetwork

# 运行容器并加入网络
docker run --network mynetwork nginx

# 容器间通信
# 容器可以通过容器名进行通信
docker run --name web --network mynetwork nginx
docker run --network mynetwork alpine ping web
```

### 端口映射

```bash
# 随机映射
docker run -P nginx

# 指定映射
docker run -p 8080:80 nginx

# 指定 IP 和端口
docker run -p 127.0.0.1:8080:80 nginx
```

## 九、实战应用

### 部署 Node.js 应用

```dockerfile
# Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_PORT=5432
    depends_on:
      - db
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### 部署 Python 应用

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## 十、Docker 最佳实践

### 1. 镜像优化

```dockerfile
# 使用多阶段构建减小镜像大小
# 选择更小的基础镜像（如 alpine）
# 减少层数，合并 RUN 指令
# .dockerignore 排除不需要的文件

# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
```

### 2. 安全建议

```dockerfile
# 不使用 root 用户运行
RUN addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser
USER appuser

# 使用官方镜像
FROM node:16-alpine

# 扫描漏洞
docker scan myimage
```

### 3. 日志管理

```bash
# 限制日志大小
docker run --log-opt max-size=10m --log-opt max-file=3 nginx

# 使用日志驱动
docker run --log-driver=json-file --log-opt max-size=10m nginx
```

## 总结

Docker 是现代 DevOps 实践的重要工具。通过本文的学习，你应该能够：

- 理解 Docker 的基本概念
- 熟练使用 Docker 常用命令
- 编写 Dockerfile 构建镜像
- 使用 Docker Compose 管理多容器应用
- 进行基本的容器部署和运维

建议在实际项目中不断实践，深入学习 Docker Swarm、Kubernetes 等容器编排工具。

---

> 更多 DevOps 相关文章正在整理中，敬请期待！
