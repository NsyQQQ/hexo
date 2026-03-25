---
title: MySQL 完全指南
date: 2025-09-05 10:00:00
tags: [MySQL, 数据库, SQL]
categories: [技术教程, 后端]
---
---

MySQL 是世界上最流行的开源关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。作为 LAMP/LEMP 栈的核心组件之一，MySQL 广泛应用于 Web 应用、企业系统和数据分析场景。

<!-- more -->

## 一、MySQL 简介

### 什么是 MySQL？

MySQL 是一个**关系型数据库管理系统**（RDBMS），采用 **SQL**（Structured Query Language）作为操作语言。

**主要特点：**
- 开源免费，社区活跃
- 跨平台支持（Linux、Windows、macOS）
- 性能优异，读写速度快
- 易于使用和管理
- 支持存储过程、触发器、视图
- 主从复制、集群支持
- 丰富的存储引擎

### 存储引擎

| 引擎 | 特点 | 适用场景 |
|------|------|---------|
| InnoDB | 默认引擎，支持事务、行级锁 | 通用场景 |
| MyISAM | 不支持事务，读性能高 | 只读场景 |
| Memory | 内存存储，速度快 | 临时表、缓存 |
| Archive | 压缩存储 | 日志、归档 |

---

## 二、安装与配置

### 1. Linux 安装（Ubuntu/Debian）

```bash
# 安装 MySQL 服务器
sudo apt update
sudo apt install mysql-server

# 启动服务
sudo systemctl start mysql
sudo systemctl enable mysql

# 安全配置
sudo mysql_secure_installation
```

### 2. Linux 安装（CentOS/RHEL）

```bash
# 安装 MySQL
sudo yum install mysql-server

# 启动服务
sudo systemctl start mysqld
sudo systemctl enable mysqld

# 安全配置
sudo mysql_secure_installation
```

### 3. Windows 安装

1. 下载 MySQL Installer：https://dev.mysql.com/downloads/installer/
2. 运行安装程序
3. 选择 "Developer Default" 或 "Server only"
4. 设置 root 密码
5. 完成安装

### 4. Docker 安装

```bash
# 拉取镜像
docker pull mysql:8.0

# 启动容器
docker run -d \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=your_password \
  -e MYSQL_DATABASE=testdb \
  -p 3306:3306 \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0

# 连接 MySQL
docker exec -it mysql mysql -uroot -p
```

---

## 三、基础操作

### 1. 连接 MySQL

```bash
# 命令行连接
mysql -u root -p

# 指定主机
mysql -h localhost -u root -p

# 指定数据库
mysql -u root -p database_name
```

### 2. 数据库操作

```sql
-- 查看数据库
SHOW DATABASES;

-- 创建数据库
CREATE DATABASE mydb;

-- 使用数据库
USE mydb;

-- 删除数据库
DROP DATABASE mydb;

-- 查看当前数据库
SELECT DATABASE();
```

### 3. 表操作

```sql
-- 创建表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT DEFAULT 18,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 查看表
SHOW TABLES;

-- 查看表结构
DESC users;
-- 或
DESCRIBE users;

-- 删除表
DROP TABLE users;
```

### 4. 数据类型

**数值类型：**
```sql
TINYINT      -- 1 字节，-128~127
SMALLINT    -- 2 字节，-32768~32767
INT         -- 4 字节，-21亿~21亿
BIGINT      -- 8 字节
FLOAT       -- 4 字节浮点
DOUBLE      -- 8 字节浮点
DECIMAL     -- 精确数值
```

**字符串类型：**
```sql
CHAR(10)    -- 固定长度
VARCHAR(255)-- 可变长度
TEXT        -- 长文本
TINYTEXT    -- 255 字符
MEDIUMTEXT  -- 16M 字符
LONGTEXT    -- 4G 字符
```

**日期时间：**
```sql
DATE        -- 日期 'YYYY-MM-DD'
TIME        -- 时间 'HH:MM:SS'
DATETIME    -- 日期时间 'YYYY-MM-DD HH:MM:SS'
TIMESTAMP   -- 时间戳
YEAR        -- 年份
```

---

## 四、CRUD 操作

### 1. 插入数据

```sql
-- 插入单条
INSERT INTO users (username, email, password) 
VALUES ('zhangsan', 'zhangsan@example.com', 'pass123');

-- 插入多条
INSERT INTO users (username, email, password) VALUES
('lisi', 'lisi@example.com', 'pass123'),
('wangwu', 'wangwu@example.com', 'pass123');

-- 插入默认值
INSERT INTO users (username, password) VALUES ('zhaoliu', 'pass123');

-- 插入查询结果
INSERT INTO users_backup (username, email)
SELECT username, email FROM users;
```

### 2. 查询数据

```sql
-- 查询所有列
SELECT * FROM users;

-- 查询指定列
SELECT username, email FROM users;

-- 条件查询
SELECT * FROM users WHERE age >= 18;

-- 多个条件
SELECT * FROM users WHERE age >= 18 AND gender = 'male';

-- 或条件
SELECT * FROM users WHERE age < 18 OR age > 60;

-- 排序
SELECT * FROM users ORDER BY created_at DESC;
SELECT * FROM users ORDER BY age ASC, created_at DESC;

-- 限制数量
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 5, 10;  -- 跳过5条，取10条

-- 去重
SELECT DISTINCT gender FROM users;

-- 别名
SELECT username AS '姓名', email AS '邮箱' FROM users;
```

### 3. 更新数据

```sql
-- 更新单条
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- 更新多条
UPDATE users SET age = age + 1 WHERE id > 0;

-- 批量更新
UPDATE users SET 
    username = 'admin',
    role = 'admin'
WHERE id = 1;
```

### 4. 删除数据

```sql
-- 删除符合条件的记录
DELETE FROM users WHERE id = 1;

-- 删除所有数据（慎用）
DELETE FROM users;

-- 清空表（更快）
TRUNCATE TABLE users;
```

---

## 五、高级查询

### 1. 聚合函数

```sql
-- 计数
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT gender) FROM users;

-- 求和
SELECT SUM(age) FROM users;
SELECT SUM(price) FROM orders;

-- 平均值
SELECT AVG(age) FROM users;

-- 最大最小值
SELECT MAX(age), MIN(age) FROM users;

-- 分组
SELECT gender, COUNT(*) FROM users GROUP BY gender;

-- 分组后筛选
SELECT gender, COUNT(*) as cnt 
FROM users 
GROUP BY gender 
HAVING cnt > 10;
```

### 2. 子查询

```sql
-- 在 WHERE 中使用子查询
SELECT * FROM users 
WHERE age > (SELECT AVG(age) FROM users);

-- 在 FROM 中使用子查询
SELECT * FROM (
    SELECT * FROM users WHERE age > 18
) AS adult_users;

-- IN / NOT IN
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders);

-- EXISTS
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
```

### 3. JOIN 连接

```sql
-- INNER JOIN（内连接）
SELECT u.username, o.order_no, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN（左外连接）
SELECT u.username, o.order_no
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- RIGHT JOIN（右外连接）
SELECT u.username, o.order_no
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- 多表连接
SELECT u.username, o.order_no, p.product_name
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;
```

### 4. 联合查询

```sql
-- UNION（去重）
SELECT username FROM users
UNION
SELECT admin_name FROM admins;

-- UNION ALL（不去重）
SELECT username FROM users
UNION ALL
SELECT admin_name FROM admins;
```

---

## 六、索引与优化

### 1. 索引类型

```sql
-- 主键索引
ALTER TABLE users ADD PRIMARY KEY (id);

-- 唯一索引
ALTER TABLE users ADD UNIQUE (email);

-- 普通索引
ALTER TABLE users ADD INDEX (username);

-- 复合索引
ALTER TABLE users ADD INDEX (username, age);

-- 全文索引（InnoDB 5.6+）
ALTER TABLE articles ADD FULLTEXT (title, content);
```

### 2. 查看索引

```sql
SHOW INDEX FROM users;
```

### 3. SQL 优化

```sql
-- 避免 SELECT *
SELECT username, email FROM users WHERE id = 1;

-- 使用 LIMIT 限制
SELECT * FROM users LIMIT 100;

-- 避免在索引列上使用函数
-- 慢
SELECT * FROM users WHERE YEAR(created_at) = 2025;
-- 快
SELECT * FROM users WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01';

-- 使用 EXPLAIN 分析
EXPLAIN SELECT * FROM users WHERE username = 'zhangsan';

-- 优化分页
-- 慢
SELECT * FROM users LIMIT 1000000, 10;
-- 快（使用主键）
SELECT * FROM users WHERE id > 1000000 LIMIT 10;
```

### 4. 慢查询日志

```sql
-- 查看慢查询配置
SHOW VARIABLES LIKE 'slow_query_log%';

-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;  -- 超过2秒记录
```

---

## 七、事务与锁

### 1. 事务操作

```sql
-- 开启事务
START TRANSACTION;

-- 执行操作
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;

-- 提交
COMMIT;

-- 回滚
ROLLBACK;
```

### 2. 事务隔离级别

```sql
-- 查看隔离级别
SELECT @@transaction_isolation;

-- 设置隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|---------|------|-----------|------|
| READ UNCOMMITTED | ✓ | ✓ | ✓ |
| READ COMMITTED | ✗ | ✓ | ✓ |
| REPEATABLE READ | ✗ | ✗ | ✓ |
| SERIALIZABLE | ✗ | ✗ | ✗ |

### 3. 行锁与表锁

```sql
-- 行锁
BEGIN;
SELECT * FROM users WHERE id = 1 FOR UPDATE;
-- 其他事务无法修改 id=1 的行
COMMIT;

-- 表锁
LOCK TABLES users READ;
-- 或
LOCK TABLES users WRITE;
UNLOCK TABLES;
```

---

## 八、存储过程与函数

### 1. 存储过程

```sql
DELIMITER //

CREATE PROCEDURE get_user_count()
BEGIN
    SELECT COUNT(*) AS total FROM users;
END //

DELIMITER ;

-- 调用
CALL get_user_count();

-- 带参数
DELIMITER //

CREATE PROCEDURE get_user_by_id(IN user_id INT)
BEGIN
    SELECT * FROM users WHERE id = user_id;
END //

DELIMITER ;

CALL get_user_by_id(1);
```

### 2. 存储函数

```DELIMITER //

CREATE FUNCTION get_user_name(uid INT)
RETURNS VARCHAR(50)
DETERMINISTIC
BEGIN
    RETURN (SELECT username FROM users WHERE id = uid);
END //

DELIMITER ;

SELECT get_user_name(1);
```

### 3. 触发器

```sql
DELIMITER //

CREATE TRIGGER before_insert_user
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    SET NEW.created_at = NOW();
END //

DELIMITER ;
```

---

## 九、用户与权限

### 1. 创建用户

```sql
-- 创建用户
CREATE USER 'test'@'localhost' IDENTIFIED BY 'password';

-- 创建可远程访问的用户
CREATE USER 'test'@'%' IDENTIFIED BY 'password';
```

### 2. 授权

```sql
-- 授予所有权限
GRANT ALL PRIVILEGES ON mydb.* TO 'test'@'localhost';

-- 授予查询权限
GRANT SELECT ON mydb.* TO 'test'@'localhost';

-- 授予多个权限
GRANT SELECT, INSERT, UPDATE ON mydb.* TO 'test'@'localhost';

-- 刷新权限
FLUSH PRIVILEGES;
```

### 3. 撤销权限

```sql
REVOKE INSERT ON mydb.* FROM 'test'@'localhost';
```

### 4. 删除用户

```sql
DROP USER 'test'@'localhost';
```

---

## 十、备份与恢复

### 1. 备份数据库

```bash
# 备份单个数据库
mysqldump -u root -p mydb > backup.sql

# 备份多个数据库
mysqldump -u root -p --databases db1 db2 > backup.sql

# 备份所有数据库
mysqldump -u root -p --all-databases > backup.sql

# 备份指定表
mysqldump -u root -p mydb users orders > backup.sql
```

### 2. 恢复数据库

```bash
# 恢复数据库
mysql -u root -p mydb < backup.sql

# 恢复所有数据库
mysql -u root -p < backup.sql
```

### 3. 定时自动备份

```bash
# 创建备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u root -p'mypassword' mydb > /backup/mydb_$DATE.sql

# 添加定时任务
crontab -e
# 每天凌晨2点执行
0 2 * * * /path/to/backup.sh
```

---

## 十一、主从复制

### 1. 主服务器配置

```ini
# my.cnf
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-do-db = mydb  # 要复制的数据库
```

### 2. 从服务器配置

```ini
# my.cnf
[mysqld]
server-id = 2
relay-log = relay-bin
```

### 3. 配置复制

```sql
-- 主服务器创建复制用户
CREATE USER 'repl'@'%' IDENTIFIED BY 'replpass';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

-- 查看主服务器状态
SHOW MASTER STATUS;

-- 从服务器配置
CHANGE MASTER TO
    MASTER_HOST='master_host',
    MASTER_USER='repl',
    MASTER_PASSWORD='replpass',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=1234;

-- 启动复制
START SLAVE;

-- 查看复制状态
SHOW SLAVE STATUS\G
```

---

## 十二、常见问题

### 1. 连接问题

```
ERROR 2002: Can't connect to local MySQL server
```
**解决：** 检查 MySQL 服务是否启动 `systemctl status mysql`

### 2. 权限问题

```
ERROR 1045: Access denied for user
```
**解决：** 检查用户名、密码、主机权限

### 3. 字符集问题

```
ERROR 1366: Incorrect string value
```
**解决：** 
```sql
ALTER DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. 最大连接数

```
ERROR 1040: Too many connections
```
**解决：**
```sql
SHOW VARIABLES LIKE 'max_connections';
SET GLOBAL max_connections = 200;
```

---

## 总结

MySQL 是现代应用开发中不可或缺的数据库技术。本文涵盖了：

- MySQL 基础概念与安装
- 数据库与表操作
- CRUD 数据操作
- 高级查询（聚合、子查询、JOIN）
- 索引与性能优化
- 事务与锁机制
- 存储过程与触发器
- 用户权限管理
- 备份与恢复
- 主从复制

掌握这些知识能帮助你高效使用 MySQL 构建稳定的应用。

Happy Database! 📊

---

*有问题欢迎评论区留言～*
