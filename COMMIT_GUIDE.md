# Git Commit 提交规范指南

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范来标准化提交消息，便于自动生成 CHANGELOG 和版本管理。

## 提交消息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 1. Type（类型，必需）

| 类型       | 说明                                    |
| ---------- | --------------------------------------- |
| `feat`     | 新功能                                  |
| `fix`      | 修复 bug                                |
| `docs`     | 文档更新                                |
| `style`    | 代码格式调整（不影响功能）              |
| `refactor` | 代码重构（既不是新功能也不是 bug 修复） |
| `test`     | 测试相关                                |
| `chore`    | 构建过程或辅助工具变动                  |
| `perf`     | 性能优化                                |
| `ci`       | CI/CD 相关配置和脚本                    |
| `revert`   | 回滚提交                                |
| `build`    | 构建相关                                |

### 2. Scope（范围，可选）

说明提交影响的范围，例如：

- `feat(login)`: 登录功能
- `fix(router)`: 路由修复
- `docs(readme)`: README 文档更新

### 3. Subject（主题，必需）

简短的描述，不超过 50 个字符：

- 使用祈使句，现在时态："change" 而不是 "changed" 或 "changes"
- 首字母小写
- 结尾不要加句号

### 4. Body（正文，可选）

更详细的说明，可以包括：

- 修改的动机
- 与之前行为的对比
- 每行不超过 72 个字符

### 5. Footer（页脚，可选）

可以包含：

- **不兼容的变更**: 以 `BREAKING CHANGE:` 开头
- **关联的 Issue**: `Closes #123`, `Fixes #456`

## 示例

### 简单示例

```
feat: 添加用户登录功能
```

```
fix: 修复首页加载错误
```

```
docs: 更新 API 使用文档
```

### 带范围的示例

```
feat(auth): 添加 JWT 认证
```

```
fix(router): 修复路由跳转问题
```

### 带正文和页脚的示例

```
feat: 添加用户注册功能

- 添加邮箱验证
- 添加手机号验证
- 添加密码强度检查

Closes #123
Fixes #456
```

### 不兼容变更示例

```
feat: 重构用户 API 接口

BREAKING CHANGE: 用户 API 接口路径从 `/api/v1/users` 改为 `/api/v2/users`
```

## 使用工具

### 1. 交互式提交（推荐）

```bash
npm run commit
```

这会启动交互式界面，引导你填写规范的提交消息。

### 2. 手动提交

```bash
git add .
git commit -m "feat: 添加新功能"
```

### 3. 验证提交消息

```bash
npm run commitlint
```

## Git 钩子

项目配置了以下 Git 钩子：

1. **pre-commit**: 自动运行 ESLint 和 Prettier 格式化代码
2. **commit-msg**: 自动验证提交消息格式

## 常见问题

### 1. 提交被拒绝怎么办？

如果提交消息不符合规范，commit-msg 钩子会拒绝提交。请根据错误信息修改提交消息。

### 2. 如何跳过验证？

**不推荐**，但在紧急情况下可以使用：

```bash
git commit -m "message" --no-verify
```

### 3. 如何修改上次提交？

```bash
git commit --amend
```

## 参考链接

- [Conventional Commits 官网](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
