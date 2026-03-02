# Go 教程网站 - 资源重构文档

## 📦 重构概述

本次重构从**资源程序员的角度**出发，对 Go 教程网站进行了全面的资源管理和组织优化。

## 🎯 重构目标

1. **资源集中管理** - 所有 CSS、JS、图片等资源统一存放
2. **模块化设计** - 样式和脚本按功能模块拆分
3. **可复用组件** - 创建通用 HTML 模板和组件
4. **性能优化** - 支持资源合并、压缩、缓存
5. **版本管理** - 资源版本控制和清单管理

## 📁 新目录结构

```
go-tutorial/
├── assets/                 # 资源目录（新增）
│   ├── css/               # 样式表
│   │   ├── main.css       # 主样式表（导入所有模块）
│   │   ├── base.css       # 基础样式
│   │   ├── sidebar.css    # 侧边栏导航
│   │   ├── content.css    # 内容区域
│   │   ├── code.css       # 代码块
│   │   ├── tables.css     # 表格
│   │   ├── diagrams.css   # 图表可视化
│   │   └── utilities.css  # 工具类
│   ├── js/                # JavaScript 模块
│   │   ├── app.js         # 主入口
│   │   ├── navigation.js  # 导航管理
│   │   ├── code-blocks.js # 代码块管理
│   │   ├── theme.js       # 主题管理
│   │   └── utils.js       # 工具函数
│   ├── data/              # 数据资源
│   │   └── navigation.json # 导航数据
│   ├── images/            # 图片资源
│   └── icons/             # 图标资源
├── templates/             # 模板组件（新增）
│   ├── base.html          # 基础模板
│   ├── page.html          # 页面模板
│   └── components/        # 组件模板
│       ├── info-box.html
│       ├── code-example.html
│       ├── feature-card.html
│       └── table.html
├── resources.html         # 资源索引页面（新增）
├── build.py               # Python 构建脚本（新增）
├── build.sh               # Bash 构建脚本（新增）
├── index.html             # 首页
├── [其他页面文件...]
├── styles.css             # 旧版样式（保留兼容）
└── code-collapse.js       # 旧版脚本（保留兼容）
```

## 🎨 CSS 模块化

### 模块划分

| 模块 | 文件 | 说明 |
|------|------|------|
| 基础 | `base.css` | 重置、布局、排版、链接、标签 |
| 导航 | `sidebar.css` | 侧边栏、菜单折叠、活动状态 |
| 内容 | `content.css` | 信息框、卡片网格、特性卡片 |
| 代码 | `code.css` | 代码折叠、语法高亮、行号 |
| 表格 | `tables.css` | 数据表、对比表 |
| 图表 | `diagrams.css` | 时间线、流程图、状态图、GMP 模型 |
| 工具 | `utilities.css` | 响应式、动画、辅助类 |

### 使用方式

```html
<!-- 方式 1：使用主样式表（推荐） -->
<link rel="stylesheet" href="assets/css/main.css">

<!-- 方式 2：按需加载模块 -->
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/sidebar.css">
<link rel="stylesheet" href="assets/css/content.css">
```

## ⚡ JavaScript 模块化

### 模块说明

| 模块 | 文件 | 全局对象 | 说明 |
|------|------|----------|------|
| 应用入口 | `app.js` | `GoTutorial` | 初始化所有模块 |
| 导航 | `navigation.js` | `Navigation` | 动态导航加载 |
| 代码块 | `code-blocks.js` | `CodeBlocks` | 代码折叠管理 |
| 主题 | `theme.js` | `Theme` | 亮暗主题切换 |
| 工具 | `utils.js` | `Utils` | 常用工具函数 |

### 使用方式

```html
<!-- 按顺序加载所有模块 -->
<script src="assets/js/utils.js"></script>
<script src="assets/js/theme.js"></script>
<script src="assets/js/navigation.js"></script>
<script src="assets/js/code-blocks.js"></script>
<script src="assets/js/app.js"></script>
```

### API 调用

```javascript
// 应用信息
console.log(GoTutorial.version);
console.log(GoTutorial.getAppInfo());

// 导航
Navigation.init();
Navigation.refresh();

// 代码块
CodeBlocks.expandAll();
CodeBlocks.collapseAll();
CodeBlocks.toggleAll();

// 主题
Theme.toggle();
Theme.setTheme('dark');
Theme.getCurrentTheme();

// 工具
Utils.debounce(fn, 500);
Utils.throttle(fn, 1000);
Utils.storage.get('key');
Utils.copyToClipboard('text');
```

## 📊 导航数据

导航数据已移至 `assets/data/navigation.json`，采用 JSON 格式：

```json
{
  "version": "2.0",
  "items": [
    {
      "title": "🏠 首页",
      "href": "index.html"
    },
    {
      "title": "📚 基础语法",
      "href": "#",
      "children": [
        { "title": "变量", "href": "basics-variables.html" }
      ]
    }
  ]
}
```

## 🧩 模板组件

### 基础模板 `templates/base.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>{{TITLE}}</title>
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <div class="container">
        <aside class="sidebar"></aside>
        <main class="content">{{CONTENT}}</main>
    </div>
    <script src="assets/js/app.js"></script>
</body>
</html>
```

### 组件模板

- **info-box.html** - 信息框（提示、警告、成功）
- **code-example.html** - 代码示例
- **feature-card.html** - 特性卡片
- **table.html** - 对比表格

## 🔧 构建脚本

### Python 构建

```bash
# 运行构建
python3 build.py

# 或
./build.sh
```

构建功能：
- ✅ 合并 CSS 文件为 `main.bundle.css`
- ✅ 压缩 JS 文件生成 `.min.js` 版本
- ✅ 更新 HTML 资源引用
- ✅ 生成资源清单 `manifest.json`

### 资源清单

```json
{
  "version": "2.0.0",
  "generated": "2026-03-01T12:00:00",
  "css": {
    "main.css": { "size": 45.2, "hash": "abc123" }
  },
  "js": {
    "app.js": { "size": 12.5, "hash": "def456" }
  }
}
```

## 📖 迁移指南

### 旧页面升级步骤

1. **更新 CSS 引用**
   ```html
   <!-- 旧 -->
   <link rel="stylesheet" href="styles.css">
   
   <!-- 新 -->
   <link rel="stylesheet" href="assets/css/main.css">
   ```

2. **更新 JS 引用**
   ```html
   <!-- 旧 -->
   <script src="code-collapse.js"></script>
   
   <!-- 新 -->
   <script src="assets/js/navigation.js"></script>
   <script src="assets/js/code-blocks.js"></script>
   <script src="assets/js/app.js"></script>
   ```

3. **运行构建脚本**（可选）
   ```bash
   ./build.sh
   ```

## 🎯 资源索引

访问 `resources.html` 查看完整的资源索引，包括：
- 📊 资源统计
- 🔗 快速链接
- 🎨 CSS 资源
- ⚡ JS 模块
- 📊 数据资源
- 🧩 模板组件
- 📁 文件结构
- 🔌 API 文档

## 📝 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v2.0 | 2026-03-01 | 资源重构版本 |
| v1.4 | - | 旧版本 |

## 🤝 贡献指南

1. 修改样式请编辑对应的 CSS 模块文件
2. 添加功能请创建新的 JS 模块
3. 页面内容使用模板组件保持一致性
4. 提交前运行构建脚本验证

## 📄 许可证

与原项目保持一致
