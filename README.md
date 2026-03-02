# Go 语言学习教程

一个从**资深工程师视角**编写的 Go 语言学习教程，注重技术深度、生产实践和最佳实践。

## 🌟 特色

- **清晰的学习路径** - 5 个阶段循序渐进，从入门到精通
- **技术深度** - 不仅讲"怎么用"，更深入讲解"为什么"
- **生产级代码** - 提供可直接用于生产环境的代码示例
- **最佳实践** - 融入工程实践、性能优化、陷阱规避
- **可视化学习** - 流程图、序列图、状态图等辅助理解

## 📍 学习路径

```
🌱 阶段 1: 基础入门 (1-2 周)
   └─> Hello World → 变量 → 数据类型 → 流程控制

🏗️ 阶段 2: 复合类型 (2-3 周)
   └─> 结构体 → 接口 → Map → 数组

⚡ 阶段 3: 并发编程 (3-4 周)
   └─> Goroutine → Channel → Select → Context

🧩 阶段 4: 高级特性 (2-3 周)
   └─> 泛型 → 反射 → 模块管理

🛠️ 阶段 5: 工程实践 (持续学习)
   └─> 标准库 → Gin 框架 → GORM → 最佳实践
```

## 📚 核心内容

### 并发编程核心

#### GMP 调度模型
```
G (Goroutine) → P (Processor) → M (Machine)
     ↓              ↓              ↓
  用户态协程     逻辑处理器      系统线程
  初始栈 2KB    本地队列 256 槽   OS 线程映射
```

#### Channel CSP 模型
- **无缓冲 Channel**: 同步阻塞，严格同步
- **有缓冲 Channel**: 异步非阻塞，提高吞吐量
- **单向 Channel**: 类型安全，限制权限

#### Context 生命周期
- **WithCancel**: 手动取消
- **WithTimeout**: 超时控制
- **WithValue**: 数据传递

### 接口与多态

```go
// io.Reader - 小接口典范
type Reader interface {
    Read(p []byte) (n int, err error)
}

// 面向接口编程
func ProcessData(store DataStore, key string) error {
    data, err := store.Read(key)
    // ...
}
```

## 🚀 Go 1.26 新特性

| 特性 | 说明 | 性能提升 |
|------|------|----------|
| **Green Tea GC** | 新一代分代式垃圾回收器 | GC 开销 -30% |
| **自引用泛型** | 泛型类型可引用自身 | 类型系统增强 |
| **new() 增强** | new() 可接受表达式 | 代码简洁 |
| **cgo 优化** | cgo 调用开销减少 | 性能 +30% |
| **Secret Mode** | 安全清除敏感数据 | 安全性提升 |

## 📖 使用方式

### 在线浏览
直接在浏览器中打开 `index.html` 文件。

### 本地服务器
```bash
# Python 3
python3 -m http.server 8000

# 访问 http://localhost:8000
```

### Go 内置服务器
```bash
go run net/http/fileserver.go .
```

## 📁 目录结构

```
go-tutorial/
├── index.html              # 首页（学习路径、核心概念）
├── navigation.js           # 导航配置
├── styles.css              # 样式文件
│
├── introduction/           # 入门
│   ├── features.html       # Go 特性
│   ├── install.html        # 安装
│   └── helloworld.html     # Hello World
│
├── basics/                 # 基础语法
│   ├── variables.html      # 变量
│   ├── datatypes.html      # 数据类型
│   ├── operators.html      # 运算符
│   ├── arrays.html         # 数组
│   └── maps.html           # Map
│
├── control-flow/           # 流程控制
│   ├── for.html
│   ├── if.html
│   ├── switch.html
│   └── defer.html
│
├── structs/                # 复合类型
│   ├── structs.html
│   ├── nested.html
│   ├── tags.html
│   └── interface.html      # 接口
│
├── concurrency/            # 并发编程
│   ├── goroutine.html      # Goroutine
│   ├── channel.html        # Channel
│   ├── select.html
│   ├── mutex.html
│   └── context.html        # Context
│
├── generics/               # 泛型
│   ├── generics.html
│   ├── functions.html
│   ├── types.html
│   └── constraints.html
│
├── reflection/             # 反射
│   ├── reflection.html
│   ├── struct.html
│   └── typevalue.html
│
├── modules/                # 模块管理
│   ├── introduction.html
│   ├── init.html
│   ├── dependency.html
│   └── version.html
│
├── stdlib/                 # 标准库
│   ├── regexp.html
│   ├── sync.html
│   ├── json.html
│   ├── time.html
│   └── io.html
│
├── ecosystem/              # 生态框架
│   ├── gin.html
│   ├── gorm.html
│   ├── viper.html
│   └── ...
│
└── REFACTOR_SENIOR.md      # 重构文档
```

## 🎯 核心页面示例

### Goroutine
- GMP 调度模型详解
- 状态转换图
- Worker Pool 模式
- Goroutine 泄漏检测

### Channel
- hchan 数据结构
- 发送/接收流程
- 优雅关闭模式
- 性能优化技巧

### Context
- 树形结构
- 四种 Context 类型
- HTTP 中间件应用
- errgroup 并发控制

### Interface
- 隐式实现
- 标准库接口设计
- 类型断言与开关
- 面向接口编程

## 🛠️ 开发

### 修改导航
编辑 `navigation.js` 文件，所有页面的导航会自动更新。

### 添加新页面
1. 复制现有页面模板
2. 修改内容和标题
3. 在 `navigation.js` 中添加导航项

### 样式定制
所有自定义样式在 `styles.css` 文件末尾。

## 📊 技术深度对比

| 主题 | 旧版 | 新版 |
|------|------|------|
| **Channel** | 基础语法 | hchan 结构、流程图解、性能优化 |
| **Goroutine** | go 关键字 | GMP 模型、调度原理、泄漏检测 |
| **Context** | 基本用法 | 树形传播、底层实现、errgroup |
| **Interface** | 定义实现 | 标准库设计、iface 结构、最佳实践 |

## 📝 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v3.0 | 2026-03-02 | 资深工程师视角重构 |
| v2.0 | - | 资源管理重构 |
| v1.4 | - | 初始版本 |

## 🤝 贡献

欢迎贡献！请遵循：

1. **技术准确性** - 代码可运行，原理准确
2. **生产导向** - 提供生产级代码示例
3. **深度优先** - 讲解"为什么"
4. **最佳实践** - 融入工程实践

## 📄 许可证

MIT License
