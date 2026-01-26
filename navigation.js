// 动态加载导航栏
(function() {
    console.log('开始加载导航栏...');
    
    function loadNavigation() {
        console.log('执行loadNavigation函数');
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) {
            console.error('找不到sidebar元素');
            return;
        }

        console.log('开始获取navigation.html');
        fetch('navigation.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }
                return response.text();
            })
            .then(html => {
                console.log('成功获取navigation.html，长度:', html.length);
                // 清空sidebar内容并插入导航HTML
                sidebar.innerHTML = html;
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
            })
            .catch(error => {
                console.error('加载导航栏失败:', error);
                sidebar.innerHTML = '<p style="color: red; padding: 10px;">导航栏加载失败: ' + error.message + '</p>';
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