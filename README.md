# XYZ API

这是一个基于 Deno 和 Hono 框架开发的 API 服务，提供了一系列与 XYZ 平台相关的接口封装。

本项目基于https://github.com/ultrazg/xyz改写而成。

## 接口文档
- 见doc目录

## 安装和使用

### 环境要求
- Deno 1.x 或更高版本

### 安装
```bash
# 克隆项目
git clone https://github.com/yourusername/xyz-api.git

# 进入项目目录
cd xyz-api

# 安装依赖
deno cache src/main.ts
```

### 运行
```bash
# 开发环境运行
deno run --allow-net src/main.ts

# 生产环境运行
deno run --allow-net --allow-read --allow-env src/main.ts
```

## 开发

### 项目结构
```
src/
  ├── handlers/     // 请求处理器
  ├── utils/        // 工具函数
  └── main.ts       // 入口文件
```

### 添加新接口
1. 在 `src/handlers` 目录下创建新的处理器文件
2. 使用 `createRoute` 定义路由
3. 实现处理函数
4. 在 `main.ts` 中注册路由

## 许可证

MIT License 