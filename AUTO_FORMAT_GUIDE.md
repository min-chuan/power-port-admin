# 保存时自动执行ESLint和Prettier配置指南

## 已完成的配置

### 1. VS Code工作区设置 (`.vscode/settings.json`)

配置了以下关键设置：

- **保存时自动格式化**：`"editor.formatOnSave": true`
- **保存时执行代码操作**：自动修复ESLint错误、整理导入等
- **默认格式化工具**：设置为Prettier
- **ESLint集成**：启用ESLint，配置验证文件类型，设置工作目录
- **Prettier集成**：启用Prettier，为不同文件类型设置格式化工具

### 2. VS Code扩展推荐 (`.vscode/extensions.json`)

推荐安装以下扩展：

- **Vue.volar** - Vue语言支持
- **dbaeumer.vscode-eslint** - ESLint集成
- **esbenp.prettier-vscode** - Prettier集成

## 如何使用

### 首次使用

1. 打开VS Code
2. 当提示安装推荐扩展时，点击"安装全部"
3. 或者手动在扩展面板搜索并安装：
   - ESLint
   - Prettier - Code formatter
   - Vue Language Features (Volar)

### 日常使用

- **保存文件时**：自动执行Prettier格式化和ESLint错误修复
- **查看问题**：在"问题"面板查看ESLint警告和错误
- **手动运行**：可以使用以下npm脚本：
  ```bash
  npm run lint          # 运行ESLint并自动修复
  npm run lint:check    # 只检查不修复
  npm run format        # 运行Prettier格式化所有文件
  npm run format:check  # 检查格式化问题
  ```

## 验证配置

配置已成功验证：

1. 创建测试文件时，保存后自动格式化代码
2. ESLint正确检测代码问题
3. Prettier按照配置文件规则格式化代码

## 注意事项

1. **扩展安装**：确保安装了所有推荐的扩展
2. **配置文件**：ESLint配置在`eslint.config.js`，Prettier配置在`.prettierrc`
3. **文件排除**：已配置排除`node_modules`、`dist`等目录
4. **工作区设置**：这些设置仅适用于当前项目，不会影响全局VS Code设置

## 故障排除

如果保存时没有自动格式化：

1. **检查扩展是否安装**：在扩展面板查看ESLint和Prettier扩展
2. **检查设置是否生效**：查看`.vscode/settings.json`文件
3. **重新加载窗口**：按`Ctrl+Shift+P`，输入"Developer: Reload Window"
4. **检查输出面板**：查看ESLint和Prettier的输出信息

## 相关文件

- `.vscode/settings.json` - VS Code工作区设置
- `.vscode/extensions.json` - 扩展推荐
- `eslint.config.js` - ESLint配置
- `.prettierrc` - Prettier配置
- `package.json` - npm脚本和依赖
