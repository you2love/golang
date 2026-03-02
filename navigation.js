// Go 教程导航配置 - 按学习路径组织
const navigationConfig = [
  {
    section: "🏠 入门",
    items: [
      { title: "首页", href: "index.html", icon: "🏠" },
      { title: "Go 简介与特性", href: "introduction-features.html", icon: "📖" },
      { title: "安装与环境", href: "introduction-install.html", icon: "⚙️" },
      { title: "Hello World", href: "introduction-helloworld.html", icon: "👋" }
    ]
  },
  {
    section: "📚 基础语法",
    items: [
      { title: "变量与常量", href: "basics-variables.html", icon: "🔤" },
      { title: "数据类型", href: "basics-datatypes.html", icon: "🔢" },
      { title: "运算符", href: "basics-operators.html", icon: "➕" },
      { title: "数组", href: "basics-arrays.html", icon: "📊" },
      { title: "Map", href: "basics-maps.html", icon: "🗺️" }
    ]
  },
  {
    section: "🎛️ 流程控制",
    items: [
      { title: "for 循环", href: "control-flow-for.html", icon: "🔄" },
      { title: "if 条件", href: "control-flow-if.html", icon: "❓" },
      { title: "switch 分支", href: "control-flow-switch.html", icon: "🔀" },
      { title: "defer 延迟", href: "control-flow-defer.html", icon: "⏱️" }
    ]
  },
  {
    section: "🏗️ 复合类型",
    items: [
      { title: "结构体 Struct", href: "structs.html", icon: "🏗️" },
      { title: "嵌套与嵌入", href: "structs-nested.html", icon: "📦" },
      { title: "Struct Tag", href: "structs-tags.html", icon: "🏷️" },
      { title: "接口 Interface", href: "structs-interface.html", icon: "🔌" }
    ]
  },
  {
    section: "⚡ 并发编程",
    items: [
      { title: "Goroutine", href: "concurrency-goroutine.html", icon: "🧵" },
      { title: "Channel", href: "concurrency-channel.html", icon: "📬" },
      { title: "Select", href: "concurrency-select.html", icon: "🔀" },
      { title: "Mutex", href: "concurrency-mutex.html", icon: "🔒" },
      { title: "Context", href: "concurrency-context.html", icon: "📋" }
    ]
  },
  {
    section: "🧩 高级特性",
    items: [
      { title: "泛型 Generics", href: "generics.html", icon: "🎭" },
      { title: "泛型函数", href: "generics-functions.html", icon: "📐" },
      { title: "泛型类型", href: "generics-types.html", icon: "🔖" },
      { title: "泛型约束", href: "generics-constraints.html", icon: "🔗" },
      { title: "反射 Reflection", href: "reflection.html", icon: "🪞" },
      { title: "结构体反射", href: "reflection-struct.html", icon: "🔍" },
      { title: "类型值反射", href: "reflection-typevalue.html", icon: "⚖️" }
    ]
  },
  {
    section: "📦 模块管理",
    items: [
      { title: "Module 介绍", href: "modules-introduction.html", icon: "📦" },
      { title: "初始化模块", href: "modules-init.html", icon: "🚀" },
      { title: "依赖管理", href: "modules-dependency.html", icon: "🔗" },
      { title: "版本管理", href: "modules-version.html", icon: "🏷️" },
      { title: "私有模块", href: "modules-private.html", icon: "🔐" }
    ]
  },
  {
    section: "📚 标准库",
    items: [
      { title: "标准库概览", href: "stdlib.html", icon: "📚" },
      { title: "词法分析", href: "stdlib-scanner.html", icon: "🔍" },
      { title: "语法树 AST", href: "stdlib-ast.html", icon: "🌳" },
      { title: "Analysis 框架", href: "stdlib-analysis.html", icon: "🔬" },
      { title: "regexp 正则", href: "stdlib-regexp.html", icon: "🔤" },
      { title: "sync 并发原语", href: "stdlib-sync.html", icon: "🔒" },
      { title: "json 编解码", href: "stdlib-json.html", icon: "📄" },
      { title: "time 时间", href: "stdlib-time.html", icon: "⏰" },
      { title: "io 输入输出", href: "stdlib-io.html", icon: "📥" },
      { title: "bufio 缓冲 IO", href: "stdlib-bufio.html", icon: "📋" },
      { title: "embed 文件嵌入", href: "stdlib-embed.html", icon: "📎" },
      { title: "exp 实验性库", href: "stdlib-exp.html", icon: "🧪" }
    ]
  },
  {
    section: "🛠️ 工程实践",
    items: [
      { title: "标准库最佳实践", href: "stdlib-bestpractices.html", icon: "✅" },
      { title: "Panic 处理", href: "tips-panic.html", icon: "🚨" },
      { title: "OOM 分析", href: "tips-oom.html", icon: "💾" },
      { title: "轻量级 GLS", href: "gls-lightweight.html", icon: "🧵" }
    ]
  },
  {
    section: "🌐 生态框架",
    items: [
      { title: "生态概览", href: "ecosystem.html", icon: "🌐" },
      { title: "AI SDK", href: "ecosystem-ai.html", icon: "🤖" },
      { title: "Gin Web 框架", href: "ecosystem-gin.html", icon: "🍸" },
      { title: "GORM ORM", href: "ecosystem-gorm.html", icon: "🗄️" },
      { title: "Viper 配置", href: "ecosystem-viper.html", icon: "🐍" },
      { title: "Zap 日志", href: "ecosystem-zap.html", icon: "📝" },
      { title: "Validator 校验", href: "ecosystem-validator.html", icon: "✔️" },
      { title: "Cobra 命令行", href: "ecosystem-cobra.html", icon: "⌨️" },
      { title: "Lint 工具", href: "ecosystem-lint.html", icon: "🔧" },
      { title: "代码分析器", href: "ecosystem-analyzer.html", icon: "🔬" },
      { title: "gRPC", href: "ecosystem-grpc.html", icon: "📡" },
      { title: "Protobuf", href: "ecosystem-protobuf.html", icon: "📄" },
      { title: "Redis", href: "ecosystem-redis.html", icon: "🔴" },
      { title: "MySQL", href: "ecosystem-mysql.html", icon: "🐬" },
      { title: "Etcd", href: "ecosystem-etcd.html", icon: "📀" },
      { title: "Testify 测试", href: "ecosystem-testify.html", icon: "🧪" }
    ]
  }
];

// 生成导航 HTML
function generateNavigationHTML() {
  let html = `<h3>📚 学习目录</h3><ul>`;
  
  for (const section of navigationConfig) {
    html += `<li class="nav-section">`;
    html += `<div class="nav-section-title">${section.section}</div>`;
    html += `<ul class="nav-submenu">`;
    
    for (const item of section.items) {
      html += `<li><a href="${item.href}">${item.icon} ${item.title}</a></li>`;
    }
    
    html += `</ul></li>`;
  }
  
  html += `</ul>`;
  return html;
}

// 初始化导航
(function initNavigation() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) {
    console.error('Sidebar element not found');
    return;
  }

  sidebar.innerHTML = generateNavigationHTML();
  
  // 设置当前页面 active 状态
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';
  
  const navLinks = sidebar.querySelectorAll('a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile) {
      link.classList.add('active');
      
      // 展开父级菜单
      const parentSubmenu = link.closest('.nav-submenu');
      if (parentSubmenu) {
        parentSubmenu.style.display = 'block';
      }
      
      // 滚动到可视区域
      setTimeout(() => {
        link.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  });

  // 添加章节展开/收起功能
  const sections = sidebar.querySelectorAll('.nav-section');
  sections.forEach(section => {
    const title = section.querySelector('.nav-section-title');
    const submenu = section.querySelector('.nav-submenu');
    
    if (title && submenu) {
      title.style.cursor = 'pointer';
      title.addEventListener('click', () => {
        const isExpanded = submenu.style.display === 'block';
        submenu.style.display = isExpanded ? 'none' : 'block';
      });
    }
  });
})();
