---
title: A* 寻路算法
date: 2025-11-15 10:00:00
tags: [算法, 寻路]
categories: [技术教程, 游戏开发]
---

A*（A-Star）算法是游戏开发中最常用的寻路算法之一，它能够在带权重的网格地图中找到从起点到终点的最优路径。本文将深入讲解 A* 算法的原理，并提供完整的 **LayaAir + TypeScript** 实现。

<!-- more -->

## 一、A* 算法概述

### 什么是 A* 算法？

A* 算法是一种启发式搜索算法，结合了 Dijkstra 算法的最短路径保证和贪婪最佳优先搜索的效率。它通过评估函数 `f(n) = g(n) + h(n)` 来选择下一个要访问的节点：

- **g(n)**：从起点到当前节点的实际代价
- **h(n)**：从当前节点到终点的启发式估计代价（ heuristic）
- **f(n)**：节点的评估值，越小越优先

### 核心思想

A* 算法在搜索过程中维护两个集合：
- **开放列表（Open Set）**：待探索的节点
- **关闭列表（Closed Set）**：已探索的节点

每次从开放列表中选择 `f(n)` 值最小的节点进行扩展，直到找到终点或确定无路可走。

---

## 二、算法原理

### 启发函数

启发函数 `h(n)` 的选择至关重要：

1. **曼哈顿距离**（适用于 4 方向移动）：
   ```
   h(n) = |x1 - x2| + |y1 - y2|
   ```

2. **欧几里得距离**（适用于 8 方向或允许斜向移动）：
   ```
   h(n) = √((x1-x2)² + (y1-y2)²)
   ```

3. **对角线距离**（允许对角移动）：
   ```
   h(n) = max(|x1-x2|, |y1-y2|)
   ```

### 算法步骤

```
1. 将起点加入开放列表
2. 当开放列表不为空：
   a. 从开放列表中取出 f 值最小的节点作为当前节点
   b. 如果当前节点是终点，返回路径
   c. 将当前节点加入关闭列表
   d. 对当前节点的每个邻居：
      - 如果不可通过或在关闭列表中，跳过
      - 计算新的 g 值
      - 如果邻居不在开放列表中，加入开放列表
      - 如果新的 g 值更小，更新邻居的 g、f 值和父节点
3. 如果开放列表为空但未找到终点，返回无路径
```

---

## 三、TypeScript 实现

### 1. 基础类型定义

```typescript
// 点坐标
interface Position {
  x: number;
  y: number;
}

// 节点类型
interface Node {
  position: Position;
  g: number; // 从起点到当前节点的实际代价
  h: number; // 从当前节点到终点的启发式估计
  f: number; // f = g + h
  parent: Node | null; // 父节点，用于回溯路径
  walkable: boolean; // 是否可行走
}

// 路径
type Path = Position[];
```

### 2. 节点类

```typescript
class GridNode implements Node {
  position: Position;
  g: number = 0;
  h: number = 0;
  f: number = 0;
  parent: Node | null = null;
  walkable: boolean = true;

  constructor(x: number, y: number, walkable: boolean = true) {
    this.position = { x, y };
    this.walkable = walkable;
  }

  // 计算 f 值
  calculateF(): void {
    this.f = this.g + this.h;
  }
}
```

### 3. A* 算法核心类

```typescript
class AStar {
  private grid: GridNode[][];
  private openList: GridNode[] = [];
  private closedList: GridNode[] = [];
  private startNode: GridNode;
  private endNode: GridNode;
  private gridWidth: number;
  private gridHeight: number;

  constructor(
    width: number,
    height: number,
    start: Position,
    end: Position,
    obstacles: Position[] = []
  ) {
    this.gridWidth = width;
    this.gridHeight = height;
    
    // 初始化网格
    this.grid = this.createGrid(obstacles);
    
    this.startNode = this.grid[start.x][start.y];
    this.endNode = this.grid[end.x][end.y];
  }

  // 创建网格
  private createGrid(obstacles: Position[]): GridNode[][] {
    const grid: GridNode[][] = [];
    
    for (let x = 0; x < this.gridWidth; x++) {
      grid[x] = [];
      for (let y = 0; y < this.gridHeight; y++) {
        const isObstacle = obstacles.some(
          obs => obs.x === x && obs.y === y
        );
        grid[x][y] = new GridNode(x, y, !isObstacle);
      }
    }
    
    return grid;
  }

  // 获取邻居节点（4 方向）
  private getNeighbors(node: GridNode): GridNode[] {
    const neighbors: GridNode[] = [];
    const { x, y } = node.position;
    
    // 四个方向：上、下、左、右
    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 }
    ];

    for (const { dx, dy } of directions) {
      const newX = x + dx;
      const newY = y + dy;

      // 检查边界
      if (this.isValidPosition(newX, newY)) {
        neighbors.push(this.grid[newX][newY]);
      }
    }

    return neighbors;
  }

  // 获取邻居节点（8 方向，含对角线）
  private getNeighborsWithDiagonal(node: GridNode): GridNode[] {
    const neighbors: GridNode[] = [];
    const { x, y } = node.position;
    
    // 八个方向
    const directions = [
      { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
      { dx: 1, dy: 0 },  { dx: 1, dy: 1 },
      { dx: 0, dy: 1 },  { dx: -1, dy: 1 },
      { dx: -1, dy: 0 }, { dx: -1, dy: -1 }
    ];

    for (const { dx, dy } of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (this.isValidPosition(newX, newY)) {
        // 对于对角线移动，检查是否被阻挡
        if (dx !== 0 && dy !== 0) {
          const h = this.grid[x + dx][y];
          const v = this.grid[x][y + dy];
          if (!h.walkable || !v.walkable) continue;
        }
        neighbors.push(this.grid[newX][newY]);
      }
    }

    return neighbors;
  }

  // 检查位置是否有效
  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.gridWidth && 
           y >= 0 && y < this.gridHeight;
  }

  // 曼哈顿距离（4 方向）
  private manhattanDistance(a: Position, b: Position): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  // 欧几里得距离（8 方向）
  private euclideanDistance(a: Position, b: Position): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  // 对角线距离
  private diagonalDistance(a: Position, b: Position): number {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return Math.max(dx, dy);
  }

  // 查找路径
  public findPath(allowDiagonal: boolean = false): Path | null {
    // 重置
    this.openList = [];
    this.closedList = [];
    
    for (const row of this.grid) {
      for (const node of row) {
        node.g = 0;
        node.h = 0;
        node.f = 0;
        node.parent = null;
      }
    }

    // 将起点加入开放列表
    this.openList.push(this.startNode);

    while (this.openList.length > 0) {
      // 找到 f 值最小的节点
      let currentNode = this.openList[0];
      let currentIndex = 0;

      for (let i = 1; i < this.openList.length; i++) {
        if (this.openList[i].f < currentNode.f) {
          currentNode = this.openList[i];
          currentIndex = i;
        }
      }

      // 从开放列表移除，加入关闭列表
      this.openList.splice(currentIndex, 1);
      this.closedList.push(currentNode);

      // 找到终点
      if (currentNode === this.endNode) {
        return this.retracePath();
      }

      // 获取邻居
      const neighbors = allowDiagonal 
        ? this.getNeighborsWithDiagonal(currentNode)
        : this.getNeighbors(currentNode);

      for (const neighbor of neighbors) {
        // 跳过不可行走或已在关闭列表的节点
        if (!neighbor.walkable || this.closedList.includes(neighbor)) {
          continue;
        }

        // 计算新的 g 值
        const isDiagonal = 
          neighbor.position.x !== currentNode.position.x &&
          neighbor.position.y !== currentNode.position.y;
        const moveCost = isDiagonal ? 1.414 : 1; // 对角线移动代价
        const newG = currentNode.g + moveCost;

        // 检查是否需要更新邻居
        let newPath = false;
        if (!this.openList.includes(neighbor)) {
          this.openList.push(neighbor);
          newPath = true;
        } else if (newG < neighbor.g) {
          newPath = true;
        }

        if (newPath) {
          neighbor.g = newG;
          neighbor.h = this.manhattanDistance(
            neighbor.position,
            this.endNode.position
          );
          neighbor.calculateF();
          neighbor.parent = currentNode;
        }
      }
    }

    // 未找到路径
    return null;
  }

  // 回溯路径
  private retracePath(): Path {
    const path: Path = [];
    let currentNode: Node | null = this.endNode;

    while (currentNode) {
      path.unshift(currentNode.position);
      currentNode = currentNode.parent;
    }

    return path;
  }

  // 获取调试信息
  public getDebugInfo(): {
    openListCount: number;
    closedListCount: number;
    pathLength: number | null;
  } {
    return {
      openListCount: this.openList.length,
      closedListCount: this.closedList.length,
      pathLength: null
    };
  }
}
```

### 4. 使用示例

```typescript
// 创建 10x10 的地图
const width = 10;
const height = 10;

// 设置起点和终点
const start = { x: 0, y: 0 };
const end = { x: 9, y: 9 };

// 设置障碍物
const obstacles = [
  { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 },
  { x: 3, y: 3 }, { x: 3, y: 4 },
  { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 },
  { x: 5, y: 7 }, { x: 5, y: 8 }, { x: 5, y: 9 }
];

// 创建 A* 实例
const astar = new AStar(width, height, start, end, obstacles);

// 查找路径（4 方向）
const path4 = astar.findPath(false);
console.log('4 方向路径:', path4);

// 查找路径（8 方向）
const astar8 = new AStar(width, height, start, end, obstacles);
const path8 = astar8.findPath(true);
console.log('8 方向路径:', path8);

// 输出：
// 4 方向路径: [{x:0,y:0}, {x:1,y:0}, {x:2,y:0}, ...]
// 8 方向路径: [{x:0,y:0}, {x:1,y:1}, {x:2,y:2}, ...]
```

---

## 四、可视化演示

### 简单的控制台可视化

```typescript
function visualizePath(
  width: number,
  height: number,
  start: Position,
  end: Position,
  obstacles: Position[],
  path: Path | null
): void {
  const pathSet = new Set(path?.map(p => `${p.x},${p.y}`) || []);
  const obstacleSet = new Set(obstacles.map(o => `${o.x},${o.y}`));

  console.log(`起点: (${start.x}, ${start.y})`);
  console.log(`终点: (${end.x}, ${end.y})`);
  console.log('');

  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      const key = `${x},${y}`;
      if (x === start.x && y === start.y) {
        row += ' S ';
      } else if (x === end.x && y === end.y) {
        row += ' E ';
      } else if (obstacleSet.has(key)) {
        row += ' █ ';
      } else if (pathSet.has(key)) {
        row += ' · ';
      } else {
        row += '   ';
      }
    }
    console.log(row);
  }
}

// 可视化
visualizePath(width, height, start, end, obstacles, path4);
```

### 输出示例

```
起点: (0, 0)
终点: (9, 9)

 S ▪▪▪▪▪▪▪▪▪
   ███▪▪▪▪▪▪▪
         ███▪▪▪
         
▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
```

---

## 五、性能优化

### 1. 使用二叉堆

```typescript
class MinHeap<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  push(item: T): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    
    const min = this.heap[0];
    const end = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    
    return min;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
      [this.heap[index], this.heap[parentIndex]] = 
        [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < length && 
          this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
        smallest = leftChild;
      }
      if (rightChild < length && 
          this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
        smallest = rightChild;
      }
      if (smallest === index) break;
      
      [this.heap[index], this.heap[smallest]] = 
        [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }

  get length(): number {
    return this.heap.length;
  }
}
```

### 2. 跳点搜索（Jump Point Search）

对于大型地图，可以使用跳点搜索算法进一步优化。

### 3. 路径平滑

```typescript
function smoothPath(path: Path): Path {
  if (path.length <= 2) return path;
  
  const smoothed: Path = [path[0]];
  
  for (let i = 1; i < path.length - 1; i++) {
    const prev = smoothed[smoothed.length - 1];
    const curr = path[i];
    const next = path[i + 1];
    
    // 检查是否在同一直线上
    const isCollinear = 
      (prev.x === curr.x && curr.x === next.x) ||
      (prev.y === curr.y && curr.y === next.y);
    
    if (!isCollinear) {
      smoothed.push(curr);
    }
  }
  
  smoothed.push(path[path.length - 1]);
  return smoothed;
}
```

---

## 六、实际应用场景

### 1. 游戏角色寻路

```typescript
class Character {
  private position: Position;
  private path: Path = [];
  private currentPathIndex = 0;

  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  setPath(path: Path): void {
    this.path = path;
    this.currentPathIndex = 0;
  }

  update(deltaTime: number): void {
    if (this.currentPathIndex >= this.path.length) return;
    
    const target = this.path[this.currentPathIndex];
    // 移动逻辑...
    
    if (this.position.x === target.x && this.position.y === target.y) {
      this.currentPathIndex++;
    }
  }
}
```

### 2. 动态障碍物

```typescript
class DynamicAStar extends AStar {
  public updateObstacles(newObstacles: Position[]): void {
    // 更新网格中的障碍物
    for (const row of this.grid) {
      for (const node of row) {
        const isObstacle = newObstacles.some(
          o => o.x === node.position.x && o.y === node.position.y
        );
        node.walkable = !isObstacle;
      }
    }
  }
}
```

---

## 七、LayaAir 集成示例

在 LayaAir 游戏中集成 A* 寻路算法：

```typescript
import AStar from './AStar';

// 地图配置
const MAP_WIDTH = 20;
const MAP_HEIGHT = 15;
const TILE_SIZE = 64;

// 寻路管理器
class PathfindingManager {
  private astar: AStar;
  private pathLayer: Laya.Sprite;
  
  constructor() {
    // 初始化 A*（可根据地图数据生成障碍物）
    this.astar = new AStar(
      MAP_WIDTH, 
      MAP_HEIGHT,
      { x: 0, y: 0 },
      { x: MAP_WIDTH - 1, y: MAP_HEIGHT - 1 },
      this.getObstaclesFromMap()
    );
  }
  
  // 从地图数据获取障碍物
  private getObstaclesFromMap(): Position[] {
    const obstacles: Position[] = [];
    // 假设地图数据存储在 tilemap 中
    const mapData = this.getMapData();
    
    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        if (mapData[x][y] === 1) { // 1 表示障碍物
          obstacles.push({ x, y });
        }
      }
    }
    return obstacles;
  }
  
  // 查找路径
  public findPath(start: Position, end: Position): Path | null {
    this.astar = new AStar(
      MAP_WIDTH, MAP_HEIGHT, start, end, 
      this.getObstaclesFromMap()
    );
    return this.astar.findPath(true);
  }
  
  // 可视化路径（用于调试）
  public visualizePath(path: Path): void {
    const g = this.pathLayer.graphics;
    g.clear();
    
    if (!path || path.length === 0) return;
    
    g.drawLine(
      path[0].x * TILE_SIZE + TILE_SIZE / 2,
      path[0].y * TILE_SIZE + TILE_SIZE / 2,
      path[path.length - 1].x * TILE_SIZE + TILE_SIZE / 2,
      path[path.length - 1].y * TILE_SIZE + TILE_SIZE / 2,
      '#00ff00',
      3
    );
  }
}

// 角色类
class Character extends Laya.Sprite {
  private gridX: number = 0;
  private gridY: number = 0;
  private targetX: number = 0;
  private targetY: number = 0;
  private path: Path = [];
  private pathIndex: number = 0;
  private speed: number = 200; // 像素/秒
  private pathfinding: PathfindingManager;
  
  constructor(pathfinding: PathfindingManager) {
    super();
    this.pathfinding = pathfinding;
    
    // 初始化角色显示
    this.initView();
  }
  
  private initView(): void {
    // 创建角色显示（可以用图片或图形）
    const graphics = this.graphics;
    graphics.drawCircle(0, 0, TILE_SIZE / 2 - 4, '#ff6666');
    this.size(TILE_SIZE, TILE_SIZE);
  }
  
  // 设置目标位置
  public setTarget(gridX: number, gridY: number): void {
    const path = this.pathfinding.findPath(
      { x: this.gridX, y: this.gridY },
      { x: gridX, y: gridY }
    );
    
    if (path && path.length > 0) {
      this.path = path;
      this.pathIndex = 0;
      this.nextPoint();
    }
  }
  
  // 移动到下一个点
  private nextPoint(): void {
    if (this.pathIndex >= this.path.length) return;
    
    const point = this.path[this.pathIndex];
    this.targetX = point.x * TILE_SIZE;
    this.targetY = point.y * TILE_SIZE;
  }
  
  // 每帧更新
  public update(deltaTime: number): void {
    if (this.pathIndex >= this.path.length) return;
    
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 2) {
      // 到达当前点，前往下一个
      this.x = this.targetX;
      this.y = this.targetY;
      this.gridX = this.path[this.pathIndex].x;
      this.gridY = this.path[this.pathIndex].y;
      this.pathIndex++;
      this.nextPoint();
    } else {
      // 移动
      const moveDistance = this.speed * deltaTime / 1000;
      const ratio = moveDistance / distance;
      this.x += dx * ratio;
      this.y += dy * ratio;
    }
  }
}

// 游戏主场景
class GameScene extends Laya.Scene {
  private pathfindingManager: PathfindingManager;
  private character: Character;
  
  constructor() {
    super();
    this.pathfindingManager = new PathfindingManager();
    this.init();
  }
  
  private init(): void {
    // 创建地图层
    const mapLayer = new Laya.Sprite();
    this.addChild(mapLayer);
    
    // 创建路径显示层
    const pathLayer = new Laya.Sprite();
    this.addChild(pathLayer);
    
    // 创建角色
    this.character = new Character(this.pathfindingManager);
    this.character.pos(0, 0);
    this.addChild(this.character);
    
    // 点击寻路
    this.on(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
      const gridX = Math.floor(e.stageX / TILE_SIZE);
      const gridY = Math.floor(e.stageY / TILE_SIZE);
      this.character.setTarget(gridX, gridY);
    });
    
    // 定时更新
    Laya.timer.frameLoop(1, this, this.update);
  }
  
  private update(): void {
    this.character.update(Laya.timer.delta);
  }
}

// 启动游戏
Laya.init(1280, 960);
const game = new GameScene();
Laya.stage.addChild(game);
```

### 关键点说明

1. **网格坐标转换**：将像素坐标转换为网格坐标，用于 A* 计算
2. **路径平滑处理**：可根据需要添加平滑算法，使角色移动更自然
3. **动态障碍物**：当地图障碍物变化时，重新初始化 A* 实例
4. **路径缓存**：对于频繁访问的位置，可以缓存计算结果

---

## 总结

A* 算法是寻路领域的经典算法，通过合理的启发函数选择和优化，可以高效地解决各种寻路问题。本文提供的 TypeScript 实现涵盖了：

- 基础 A* 算法（4 方向和 8 方向）
- 多种启发函数（曼哈顿、欧几里得、对角线距离）
- 性能优化（使用二叉堆）
- 路径平滑
- 实际应用示例

希望这篇教程能帮助你理解并实现 A* 算法！

Happy Coding! 🚀

---

*有问题欢迎评论区留言～*
