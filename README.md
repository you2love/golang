# Go 学习教程

这是一个使用 HTML、CSS 和 JavaScript 构建的 Go 语言学习教程网站。

## 文件结构

- `index.html` - 首页
- `navigation.html` - 导航栏内容（独立文件）
- `navigation.js` - 动态加载导航栏的 JavaScript
- `styles.css` - 样式文件
- `*.html` - 各个章节页面

## 导航栏说明

导航栏使用 JavaScript 动态加载，从 `navigation.html` 文件中获取内容。

### 工作原理

1. 页面加载时，`navigation.js` 脚本会自动执行
2. 脚本使用 Fetch API 获取 `navigation.html` 的内容
3. 将获取到的 HTML 内容插入到页面的 `<aside class="sidebar">` 元素中
4. **自动定位功能**：
   - 自动识别当前页面并设置为 active 状态
   - 自动展开包含当前页面的父菜单
   - 自动滚动导航栏，使当前页面链接位于可视区域中心
5. 支持导航菜单的展开/收起功能

### 测试方法

1. 在浏览器中打开 `index.html` 文件
2. 打开浏览器的开发者工具（F12）
3. 查看 Console 标签页，应该能看到导航栏加载的日志信息
4. 如果导航栏没有显示，检查 Console 中是否有错误信息

### 常见问题

1. **导航栏不显示**
   - 检查浏览器控制台是否有错误
   - 确认 `navigation.html` 和 `navigation.js` 文件存在
   - 尝试清除浏览器缓存并刷新页面

2. **控制台显示 "加载导航栏失败"**
   - 检查文件路径是否正确
   - 确认服务器支持 Fetch API（需要 HTTP 服务器，不能直接打开 HTML 文件）

3. **需要 HTTP 服务器**
   - 由于浏览器的 CORS 策略，不能直接双击打开 HTML 文件
   - 需要使用 HTTP 服务器，例如：
     ```bash
     python3 -m http.server 8000
     ```
   - 然后在浏览器中访问 `http://localhost:8000`

## 开发

如需修改导航栏，只需编辑 `navigation.html` 文件，所有页面的导航都会自动更新。