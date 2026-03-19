# 动力港能源管理平台

![Vue](https://img.shields.io/badge/Vue-3.5.25-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.3.1-purple)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.13.4-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 项目简介

动力港能源管理平台是一个基于 Vue3 全家桶开发的现代化能源管理后台系统。该系统专注于充电桩能源的监控、管理和数据分析，为能源运营商提供全面的管理解决方案。

### 🌐 在线演示

- **演示地址**: [http://223.6.253.39:81/](http://223.6.253.39:81/)
- **测试账号**: 详见下方 [测试账号](#-测试账号) 部分

## ✨ 功能特性

### 🎯 核心功能

- **实时监控**：充电桩状态实时监控与数据展示
- **告警管理**：设备故障告警与处理跟踪
- **数据分析**：能源消耗、收益统计与可视化分析
- **地图展示**：充电站地理位置分布可视化
- **运营管理**：订单管理、会员卡管理、招商管理
- **系统管理**：用户权限、角色管理、系统配置

### 👥 多角色权限

- **管理员 (admin)**：拥有所有权限，包括系统设置和用户管理
- **经理 (manager)**：拥有运营管理和数据查看权限
- **普通用户 (user)**：拥有基本的数据查看和个人中心管理权限

## 🛠️ 技术栈

### 前端技术

- **框架**：Vue 3 + Composition API + `<script setup>`
- **语言**：TypeScript
- **构建工具**：Vite
- **UI组件库**：Element Plus
- **状态管理**：Pinia
- **路由管理**：Vue Router 4
- **HTTP客户端**：Axios
- **数据可视化**：ECharts
- **地图集成**：高德地图 API
- **富文本编辑器**：TinyMCE

### 开发工具

- **代码规范**：ESLint + Prettier
- **Git钩子**：Husky + lint-staged
- **提交规范**：Commitizen + Commitlint
- **Mock数据**：Mock.js
- **样式预处理器**：Less

## 🚀 快速开始

### 环境要求

- Node.js 18.0.0 或更高版本
- npm 9.0.0 或更高版本（推荐使用 pnpm）

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm（推荐）
pnpm install
```

### 开发运行

```bash
npm run dev
# 或
pnpm dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

### 预览构建结果

```bash
npm run preview
# 或
pnpm preview
```

## 🔐 测试账号

系统提供三个测试账号，对应不同的角色权限：

| 角色     | 账号      | 密码            | 权限说明                       |
| -------- | --------- | --------------- | ------------------------------ |
| 管理员   | `admin`   | `admin123456`   | 拥有所有权限，包括系统设置     |
| 经理     | `manager` | `manager123456` | 拥有运营管理和数据查看权限     |
| 普通用户 | `user`    | `user123456`    | 拥有基本数据查看和个人中心权限 |

## 📁 项目结构

```
power-port-admin/
├── src/
│   ├── api/              # API接口定义
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── directives/       # 自定义指令
│   ├── hooks/           # 自定义Hooks
│   ├── layouts/         # 布局组件
│   ├── mock/            # Mock数据
│   ├── router/          # 路由配置
│   ├── store/           # 状态管理(Pinia)
│   ├── types/           # TypeScript类型定义
│   ├── utils/           # 工具函数
│   └── views/           # 页面组件
│       ├── alarm/       # 告警管理
│       ├── chargingStation/ # 充电站管理
│       ├── dashboard/   # 仪表盘
│       ├── document/    # 文档管理
│       ├── equipment/   # 设备管理
│       ├── map/         # 电子地图
│       ├── operations/  # 运营管理
│       ├── personal/    # 个人中心
│       └── system/      # 系统设置
├── public/              # 公共资源
└── 配置文件
    ├── package.json     # 项目依赖
    ├── vite.config.ts   # Vite配置
    ├── tsconfig.json    # TypeScript配置
    └── eslint.config.js # ESLint配置
```

## 📋 功能模块详情

### 1. 仪表盘 (Dashboard)

- 实时数据统计
- 能源消耗图表
- 设备状态概览
- 收益趋势分析

### 2. 告警管理 (Alarm)

- 实时告警监控
- 告警历史记录
- 告警处理跟踪
- 告警统计分析

### 3. 充电站管理

- **故障管理**：充电站故障记录与处理
- **实时监控**：充电桩运行状态监控
- **收益统计**：充电站收益数据分析

### 4. 运营管理

- **订单管理**：充电订单查看与管理
- **详情查看**：订单详情与用户信息
- **数据统计**：运营数据汇总分析

### 5. 电子地图

- 充电站地理位置展示
- 站点状态可视化
- 地图导航与搜索

### 6. 系统设置

- 用户权限管理
- 角色配置
- 系统参数设置

## 🛠️ 开发指南

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查：

```bash
# 检查代码规范
npm run lint:check

# 自动修复代码规范问题
npm run lint

# 检查代码格式
npm run format:check

# 自动格式化代码
npm run format
```

### Git提交规范

项目使用 Commitizen 进行规范的 Git 提交：

```bash
# 使用交互式提交
npm run commit
```

提交消息格式遵循 Conventional Commits 规范：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具变动

### 分支管理

- `main`：主分支，用于生产环境
- `dev`：开发分支，用于日常开发
- `feature/*`：功能分支，开发新功能
- `bugfix/*`：修复分支，修复bug

## 📦 构建与部署

### 构建配置

项目使用 Vite 进行构建，配置文件位于 `vite.config.ts`。

### 环境变量

项目支持以下环境变量：

- `VITE_API_BASE_URL`：API基础地址
- `VITE_MAP_KEY`：高德地图密钥

### 部署建议

1. 构建生产版本：`npm run build`
2. 将 `dist` 目录部署到静态文件服务器
3. 配置 Nginx/Apache 等Web服务器
4. 配置 HTTPS 证书（生产环境推荐）

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

### 开发流程

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码要求

- 遵循现有的代码风格
- 添加适当的注释
- 更新相关文档
- 添加必要的测试

## 📄 许可证

本项目基于 MIT 许可证开源。详见 [LICENSE](LICENSE) 文件。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/min-chuan/power-port-admin/issues)
- 查看项目 [GitHub仓库](https://github.com/min-chuan/power-port-admin)

---

**感谢使用动力港能源管理平台！** 🚀
