// 导航栏HTML内容
const navigationHTML = `
<h3>📚 学习目录</h3>
<ul>
    <li><a href="index.html">🏠 首页</a></li>

    <li class="nav-item">
        <a href="structs.html">🏗️ 结构体</a></li>
    <li class="nav-item">
        <a href="modules.html">📦 模块</a></li>
    <li class="nav-item">
        <a href="generics.html">🧩 泛型</a></li>
    <li class="nav-item">
        <a href="reflection.html">🔍 反射</a></li>
    <li class="nav-item">
        <a href="concurrency-goroutine.html">⚙️ Goroutine</a></li>
    <li class="nav-item">
        <a href="concurrency-channel.html">⚙️ Channel</a></li>
    <li class="nav-item">
        <a href="concurrency-select.html">⚙️ Select</a></li>
    <li class="nav-item">
        <a href="concurrency-mutex.html">⚙️ Mutex</a></li>
    <li class="nav-item">
        <a href="concurrency-context.html">⚙️ Context</a></li>
    <li class="nav-item">
        <a href="ecosystem-ai.html">🤖 AI 库</a></li>
    <li class="nav-item">
        <a href="stdlib-regexp.html">📚 regexp 正则表达式</a></li>
    <li class="nav-item">
        <a href="stdlib-sync.html">📚 sync 并发原语</a></li>
    <li class="nav-item">
        <a href="stdlib-json.html">📚 json 数据编码</a></li>
    <li class="nav-item">
        <a href="stdlib-time.html">📚 time 时间处理</a></li>
    <li class="nav-item">
        <a href="stdlib-io.html">📚 io 输入输出</a></li>
    <li class="nav-item">
        <a href="stdlib-bufio.html">📚 bufio 缓冲 I/O</a></li>
    <li class="nav-item">
        <a href="stdlib-exp.html">📚 exp 实验性库</a></li>
    <li class="nav-item">
        <a href="stdlib-embed.html">📚 embed 文件嵌入</a></li>
    <li class="nav-item">
        <a href="tips.html">💡 技巧</a></li>
    <li class="nav-item">
        <a href="tips-panic.html">🚨 Panic 归纳</a></li>
    <li class="nav-item">
        <a href="tips-oom.html">💾 OOM 分析</a></li>
    <li class="nav-item">
        <a href="ecosystem-gin.html">🌐 Gin Web 框架</a></li>
    <li class="nav-item">
        <a href="ecosystem-gorm.html">🌐 GORM ORM</a></li>
    <li class="nav-item">
        <a href="ecosystem-viper.html">🌐 Viper 配置</a></li>
    <li class="nav-item">
        <a href="ecosystem-zap.html">🌐 Zap 日志</a></li>
    <li class="nav-item">
        <a href="ecosystem-validator.html">🌐 Validator 参数校验</a></li>
    <li class="nav-item">
        <a href="ecosystem-cobra.html">🌐 Cobra 命令行工具</a></li>
    <li class="nav-item">
        <a href="ecosystem-gomicro.html">🌐 Go-Micro 微服务</a></li>
    <li class="nav-item">
        <a href="ecosystem-etcd.html">🌐 Etcd 分布式存储</a></li>
    <li class="nav-item">
        <a href="ecosystem-protobuf.html">🌐 Protobuf 数据序列化</a></li>
    <li class="nav-item">
        <a href="ecosystem-sonic.html">🌐 Sonic JSON</a></li>
    <li class="nav-item">
        <a href="ecosystem-gocsv.html">🌐 GoCarina/gocsv</a></li>
    <li class="nav-item">
        <a href="ecosystem-excelize.html">🌐 Excelize Excel</a></li>
    <li class="nav-item">
        <a href="ecosystem-imaging.html">🌐 Imaging 图片处理</a></li>
    <li class="nav-item">
        <a href="ecosystem-testify.html">🌐 Testify 测试框架</a></li>
    <li class="nav-item">
        <a href="ecosystem-gods.html">🌐 GoDS 数据结构</a></li>
    <li class="nav-item">
        <a href="ecosystem-gg.html">🌐 gg 图形库</a></li>
    <li class="nav-item">
        <a href="ecosystem-grpc.html">🌐 gRPC RPC框架</a></li>
    <li class="nav-item">
        <a href="ecosystem-gateway.html">🌐 Gateway API网关</a></li>
    <li class="nav-item">
        <a href="ecosystem-redis.html">🌐 Redis 客户端</a></li>
    <li class="nav-item">
            <a href="ecosystem-mysql.html">🌐 MySQL 客户端</a></li>
    </ul>`;
(function() {
    console.log('开始加载导航栏...');
    
    function loadNavigation() {
        console.log('执行loadNavigation函数');
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) {
            console.error('找不到sidebar元素');
            return;
        }

        console.log('直接插入导航HTML');
        sidebar.innerHTML = navigationHTML;
        console.log('导航HTML已插入到sidebar');
        
        // 设置当前页面的active状态
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        console.log('当前页面:', currentFile);
        
        // 查找所有导航链接
        const navLinks = sidebar.querySelectorAll('a');
        console.log('找到导航链接数量:', navLinks.length);
        
        let activeLink = null;
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentFile) {
                // 设置当前页面为active
                link.classList.add('active');
                activeLink = link;
                console.log('设置active状态:', linkPath);
                
                // 如果是子菜单项，展开父菜单
                const parentSubmenu = link.closest('.nav-submenu');
                if (parentSubmenu) {
                    const parentNav = parentSubmenu.closest('.nav-item');
                    if (parentNav) {
                        const parentLink = parentNav.querySelector('a');
                        const toggle = parentNav.querySelector('.nav-toggle');
                        if (parentLink) {
                            parentLink.classList.add('active');
                        }
                        // 展开父菜单
                        if (toggle && parentSubmenu) {
                            parentSubmenu.style.display = 'block';
                            toggle.textContent = '▲';
                        }
                    }
                }
            }
        });
        
        // 自动定位到当前页面
        if (activeLink) {
            // 等待一小段时间确保DOM完全渲染
            setTimeout(() => {
                // 滚动到active元素
                activeLink.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                console.log('已滚动到当前页面位置');
            }, 100);
        }
        
        // 添加导航菜单的展开/收起功能
        const navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const link = item.querySelector('a');
            const toggle = item.querySelector('.nav-toggle');
            const submenu = item.querySelector('.nav-submenu');
            
            if (link && toggle && submenu) {
                link.addEventListener('click', function(e) {
                    // 如果点击的是链接本身，不阻止默认行为
                    if (e.target !== toggle) {
                        return;
                    }
                    
                    // 切换子菜单的显示
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                    toggle.textContent = submenu.style.display === 'block' ? '▲' : '▼';
                });
            }
        });
    }

    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        console.log('DOM正在加载，等待DOMContentLoaded事件');
        document.addEventListener('DOMContentLoaded', loadNavigation);
    } else {
        console.log('DOM已加载完成，立即执行loadNavigation');
        loadNavigation();
    }
})();