---
title: Redis 完全指南
date: 2025-09-06 10:00:00
tags: [Redis, 数据库]
categories: [技术教程, 后端]
---
---

Redis（Remote Dictionary Server）是一个开源的、基于内存的数据结构存储系统，常用作数据库、缓存和消息队列。它支持多种数据结构，如字符串、哈希表、列表、集合、有序集合等，被誉为"瑞士军刀"般的全能型数据库。

<!-- more -->

## 一、Redis 简介

### 什么是 Redis？

Redis 是由 Salvatore Sanfilippo 于 2009 年创建的分布式内存数据库，采用 **C 语言** 开发。其核心特点是**高性能**和**丰富的数据结构**。

**核心特性：**
- 内存存储，性能极高
- 丰富的数据结构
- 持久化支持
- 主从复制
- 集群支持
- 发布/订阅
- 事务支持
- Lua 脚本

### 数据结构

| 数据类型 | 命令前缀 | 应用场景 |
|---------|---------|---------|
| String | SET/GET | 缓存、计数器、分布式锁 |
| Hash | HSET/HGET | 存储对象 |
| List | LPUSH/RPOP | 消息队列、排行榜 |
| Set | SADD/SMEMBERS | 标签、好友关系 |
| ZSet | ZADD/ZRANGE | 排行榜、有序消息 |

---

## 二、安装与配置

### 1. Linux 安装（Ubuntu/Debian）

```bash
# 安装 Redis
sudo apt update
sudo apt install redis-server

# 启动服务
sudo systemctl start redis-server
sudo systemctl enable redis-server

# 测试连接
redis-cli ping
# 返回 PONG 表示成功
```

### 2. Linux 安装（CentOS/RHEL）

```bash
# 启用 EPEL 仓库
sudo yum install epel-release

# 安装 Redis
sudo yum install redis

# 启动服务
sudo systemctl start redis
sudo systemctl enable redis
```

### 3. Docker 安装

```bash
# 拉取镜像
docker pull redis:7.0

# 启动容器
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v redis_data:/data \
  redis:7.0 \
  redis-server --appendonly yes

# 连接 Redis
docker exec -it redis redis-cli
```

### 4. 配置文件

```conf
# redis.conf 核心配置

# 绑定地址
bind 127.0.0.1

# 端口
port 6379

# 密码认证
requirepass your_password

# 持久化目录
dir /var/lib/redis

# 持久化模式
appendonly yes
appendfsync everysec

# 内存限制
maxmemory 2gb
maxmemory-policy allkeys-lru

# 日志
logfile /var/log/redis/redis.log
```

---

## 三、基础操作

### 1. 连接 Redis

```bash
# 本地连接
redis-cli

# 远程连接
redis-cli -h host -p 6379 -a password

# 选择数据库（默认 0-15）
redis-cli -n 1
```

### 2. String 操作

```bash
# 设置/获取
SET name "zhangsan"
GET name

# 批量操作
MSET key1 "value1" key2 "value2"
MGET key1 key2

# 设置过期时间
SETEX token 3600 "abc"  # 3600秒后过期
SET name "value" EX 3600

# 计数器
SET count 0
INCR count        # +1
DECR count        # -1
INCRBY count 10   # +10

# 追加
APPEND name "_suffix"

# 字符串长度
STRLEN name
```

### 3. Hash 操作

```bash
# 设置/获取
HSET user:1 name "zhangsan"
HSET user:1 age 25
HGET user:1 name

# 批量设置
HMSET user:1 name "zhangsan" age 25 city "Beijing"
HMGET user:1 name age

# 获取所有
HGETALL user:1

# 字段操作
HEXISTS user:1 name     # 检查字段是否存在
HINCRBY user:1 age 1   # 数字递增
HDEL user:1 age         # 删除字段

# 获取所有字段/值
HKEYS user:1
HVALS user:1

# 字段数量
HLEN user:1
```

### 4. List 操作

```bash
# 添加元素
LPUSH tasks "task1"     # 头部添加
RPUSH tasks "task2"     # 尾部添加

# 获取元素
LRANGE tasks 0 -1      # 获取所有
LINDEX tasks 0          # 获取指定索引

# 弹出元素
LPOP tasks              # 头部弹出
RPOP tasks              # 尾部弹出

# 列表长度
LLEN tasks

# 截断列表
LTRIM tasks 0 9        # 只保留前10个
```

### 5. Set 操作

```bash
# 添加/获取
SADD tags "python" "java" "redis"
SMEMBERS tags

# 判断是否存在
SISMEMBER tags "python"

# 集合操作
SADD set1 "a" "b" "c"
SADD set2 "b" "c" "d"

SINTER set1 set2        # 交集
SUNION set1 set2       # 并集
SDIFF set1 set2        # 差集

# 随机元素
SRANDMEMBER tags 2     # 随机获取2个（不删除）
SPOP tags              # 随机弹出（删除）

# 集合大小
SCARD tags
```

### 6. ZSet 操作

```bash
# 添加元素（带分数）
ZADD leaderboard 100 "zhangsan"
ZADD leaderboard 90 "lisi"
ZADD leaderboard 80 "wangwu"

# 获取排名
ZRANK leaderboard "zhangsan"    # 升序排名（0开始）
ZREVRANK leaderboard "zhangsan" # 降序排名

# 获取分数
ZSCORE leaderboard "zhangsan"

# 范围查询
ZRANGE leaderboard 0 -1         # 升序
ZREVRANGE leaderboard 0 -1      # 降序
ZRANGE leaderboard 0 -1 WITHSCORES  # 带分数

# 分数范围
ZRANGEBYSCORE leaderboard 80 100

# 数量
ZCARD leaderboard
ZCOUNT leaderboard 80 100
```

---

## 四、键操作

```bash
# 查看键
KEYS pattern           # 模式匹配（生产环境慎用）
SCAN 0 MATCH pattern   # 渐进式扫描

# 键类型
TYPE key

# 键是否存在
EXISTS key

# 删除键
DEL key
UNLINK key            # 异步删除

# 过期时间
EXPIRE key 3600      # 设置过期（秒）
PEXPIRE key 3600000  # 毫秒
TTL key               # 查看剩余时间（秒）
PTTL key              # 毫秒
PERSIST key           # 移除过期时间

# 重命名
RENAME key newkey
RENAMENX key newkey   # 仅当不存在时重命名
```

---

## 五、发布/订阅

### 1. 基本发布/订阅

```bash
# 订阅者
SUBSCRIBE channel1
PSUBSCRIBE pattern*    # 模式订阅

# 发布者
PUBLISH channel1 "message"
```

### 2. PHP 示例

```php
// 订阅
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);

$redis->subscribe(['channel1'], function ($redis, $channel, $message) {
    echo "收到消息: $message\n";
});

// 发布
$redis->publish('channel1', 'Hello World');
```

---

## 六、事务

```bash
# 开启事务
MULTI

# 命令入队
SET key1 "value1"
SET key2 "value2"

# 执行事务
EXEC

# 取消事务
DISCARD
```

**事务特点：**
- 原子执行
- 不支持回滚（与 MySQL 不同）
- 不保证隔离性

### Watch 实现乐观锁

```bash
WATCH key

# 在其他客户端修改 key 后，EXEC 会失败
MULTI
SET key "newvalue"
EXEC
```

---

## 七、Lua 脚本

### 1. 基本使用

```bash
# 执行 Lua 脚本
EVAL "return 'hello'" 0

# 使用参数
EVAL "return KEYS[1]" 1 mykey

# 脚本缓存
SCRIPT LOAD "return 'hello'"
EVALSHA "script_hash" 0
```

### 2. 分布式锁

```lua
-- 获取锁
local lockKey = "lock:" .. KEYS[1]
local lockValue = ARGV[1]
local expireTime = tonumber(ARGV[2])

if redis.call('setnx', lockKey, lockValue) == 1 then
    redis.call('pexpire', lockKey, expireTime)
    return 1
else
    return 0
end
```

---

## 八、持久化

### 1. RDB 快照

```conf
# 配置
save 900 1      # 900秒内至少1个key变化
save 300 10     # 300秒内至少10个key变化
save 60 10000   # 60秒内至少10000个key变化

# 手动触发
BGSAVE           # 后台异步保存
SAVE             # 同步保存（阻塞）
```

### 2. AOF 日志

```conf
# 开启
appendonly yes

# 同步策略
appendfsync always    # 每次写入
appendfsync everysec  # 每秒（推荐）
appendfsync no        # 依赖系统

# 重写
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```

---

## 九、集群与高可用

### 1. 主从复制

```conf
# 从节点配置
replicaof 192.168.1.1 6379

# 或使用命令
REPLICAOF 192.168.1.1 6379
```

```bash
# 查看复制状态
INFO replication
```

### 2. 哨兵模式

```conf
# sentinel.conf
sentinel monitor mymaster 127.0.0.1 6379 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
```

```bash
# 启动哨兵
redis-sentinel /path/to/sentinel.conf
```

### 3. Redis Cluster

```bash
# 创建集群（6个节点）
redis-cli --cluster create 127.0.0.1:7001 127.0.0.1:7002 \
  127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 127.0.0.1:7006 \
  --cluster-replicas 1
```

---

## 十、PHP/Node.js/Python 使用

### 1. PHP (predis)

```php
composer require predis/predis

$client = new Predis\Client([
    'scheme' => 'tcp',
    'host'   => '127.0.0.1',
    'port'   => 6379,
]);

$client->set('name', 'zhangsan');
echo $client->get('name');

$client->hmset('user:1', [
    'name' => 'zhangsan',
    'age' => 25
]);
```

### 2. Node.js (ioredis)

```javascript
const Redis = require('ioredis');
const redis = new Redis();

await redis.set('name', 'zhangsan');
console.log(await redis.get('name'));

await redis.hmset('user:1', {
    name: 'zhangsan',
    age: 25
});
```

### 3. Python (redis-py)

```python
import redis

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

r.set('name', 'zhangsan')
print(r.get('name'))

r.hmset('user:1', {
    'name': 'zhangsan',
    'age': 25
})
```

---

## 十一、应用场景

### 1. 缓存

```python
# 缓存示例
def get_user(user_id):
    cache_key = f"user:{user_id}"
    
    # 先查缓存
    user = redis.get(cache_key)
    if user:
        return json.loads(user)
    
    # 查数据库
    user = db.query(f"SELECT * FROM users WHERE id = {user_id}")
    
    # 存入缓存
    redis.setex(cache_key, 3600, json.dumps(user))
    
    return user
```

### 2. 分布式锁

```python
# 获取锁
lock_key = "lock:order"
lock_value = str(uuid.uuid4())

if redis.set(lock_key, lock_value, nx=True, ex=10):
    try:
        # 执行业务逻辑
        create_order()
    finally:
        # 释放锁（使用 Lua 确保原子性）
        lua_script = """
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
        """
        redis.eval(lua_script, 1, lock_key, lock_value)
```

### 3. 消息队列

```python
# 生产者
redis.lpush('queue:tasks', json.dumps({'task': 'send_email', 'to': 'user@example.com'}))

# 消费者
while True:
    task = redis.brpop('queue:tasks', timeout=0)
    if task:
        process_task(json.loads(task[1]))
```

### 4. 限流

```python
# 滑动窗口限流
def is_allowed(user_id, limit=100, window=60):
    key = f"rate_limit:{user_id}"
    now = time.time()
    
    # 移除窗口外的记录
    redis.zremrangebyscore(key, 0, now - window)
    
    # 检查数量
    count = redis.zcard(key)
    if count >= limit:
        return False
    
    # 添加新请求
    redis.zadd(key, {str(now): now})
    redis.expire(key, window)
    
    return True
```

### 5. 排行榜

```python
# 添加分数
redis.zadd('leaderboard', {'user1': 100, 'user2': 90, 'user3': 80})

# 获取TOP10
redis.zrevrange('leaderboard', 0, 9, withscores=True)

# 用户排名
redis.zrevrank('leaderboard', 'user1')
```

---

## 十二、内存优化

### 1. 内存淘汰策略

```conf
# 配置
maxmemory-policy allkeys-lru

# 策略说明
# noeviction        - 不淘汰（默认）
# volatile-lru      - 已设置过期key的LRU
# allkeys-lru       - 所有key的LRU
# volatile-random   - 已设置过期key随机
# allkeys-random    - 所有key随机
# volatile-ttl      - 已设置过期key的TTL
# volatile-lfu      - 已设置过期key的LFU
# allkeys-lfu       - 所有key的LFU
```

### 2. 内存优化技巧

```bash
# 使用 Hash 存储对象
# 差: SET user:1:name "zhangsan"
#     SET user:1:age 25
# 好: HSET user:1 name "zhangsan" age 25

# 使用压缩列表
# 配置 hash-max-ziplist-entries 512
# 配置 hash-max-ziplist-value 64

# 使用 Bitmap
SETBIT online:2025-08-06 123456789 1

# 使用 HyperLogLog
PFADD page:views "page1" "page2" "page1"
PFCOUNT page:views
```

---

## 十三、性能优化

### 1. 慢查询分析

```bash
# 开启慢查询日志
slowlog-log-slower-than 10000   # 10毫秒
slowlog-max-len 128             # 保存128条

# 查看慢查询
SLOWLOG GET
SLOWLOG LEN
```

### 2. 管道（Pipeline）

```python
# 普通方式（多次网络往返）
for i in range(100):
    r.set(f"key{i}", i)

# 管道方式（一次网络往返）
pipe = r.pipeline()
for i in range(100):
    pipe.set(f"key{i}", i)
pipe.execute()
```

### 3. 集群连接池

```python
# Python 连接池
pool = redis.ConnectionPool(
    max_connections=50,
    host='localhost',
    port=6379
)
r = redis.Redis(connection_pool=pool)
```

---

## 十四、常见问题

### 1. OOM（内存不足）

**解决：**
- 增加内存
- 设置过期时间
- 使用淘汰策略
- 优化数据结构

### 2. 阻塞

**原因：**
- BGREWRITEAOF
- BGSAVE
- 大 Key 操作

**解决：**
- 使用 SCAN 替代 KEYS
- 拆分大 Key
- 使用 UNLINK 异步删除

### 3. 持久化失败

**解决：**
- 检查磁盘空间
- 检查权限
- 调整 AOF 重写配置

---

## 总结

Redis 作为高性能的内存数据库，在现代架构中扮演着重要角色。本文涵盖了：

- Redis 简介与数据结构
- 安装与配置
- 基础操作（String、Hash、List、Set、ZSet）
- 发布/订阅与事务
- Lua 脚本编程
- 持久化机制（RDB、AOF）
- 集群与高可用（主从、哨兵、Cluster）
- 多语言客户端使用
- 核心应用场景（缓存、锁、队列、限流、排行）
- 内存与性能优化

Redis 是后端开发的必备技能，掌握它能大幅提升系统性能！

Happy Redis! 🚀

---

*有问题欢迎评论区留言～*
