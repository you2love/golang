/**
 * Go 教程 - 导航管理模块
 * 版本：v2.0
 * 功能：动态加载导航、处理导航状态
 */

const Navigation = (function() {
    'use strict';

    // 导航数据
    let navData = null;
    let currentPath = '';

    /**
     * 初始化导航
     */
    async function init() {
        try {
            // 加载导航数据
            await loadNavigationData();
            
            // 渲染导航
            renderNavigation();
            
            // 设置活动状态
            setActiveState();
            
            // 绑定事件
            bindEvents();
            
            console.log('[Navigation] 初始化完成');
        } catch (error) {
            console.error('[Navigation] 初始化失败:', error);
        }
    }

    /**
     * 加载导航数据
     */
    async function loadNavigationData() {
        try {
            const response = await fetch('assets/data/navigation.json');
            if (!response.ok) {
                throw new Error('导航数据加载失败');
            }
            navData = await response.json();
        } catch (error) {
            console.error('[Navigation] 加载导航数据失败:', error);
            // 使用备用导航数据
            navData = getFallbackNavigation();
        }
    }

    /**
     * 备用导航数据（当 JSON 文件不存在时使用）
     */
    function getFallbackNavigation() {
        return {
            items: [
                { title: '🏠 首页', href: 'index.html' },
                { title: '🚀 Go 1.26 新特性', href: 'go126.html' },
                {
                    title: '📚 基础语法',
                    href: '#',
                    children: [
                        { title: '变量', href: 'basics-variables.html' },
                        { title: '数据类型', href: 'basics-datatypes.html' },
                        { title: '运算符', href: 'basics-operators.html' },
                        { title: '数组', href: 'basics-arrays.html' },
                        { title: 'Maps', href: 'basics-maps.html' }
                    ]
                },
                {
                    title: '⚙️ 并发编程',
                    href: '#',
                    children: [
                        { title: 'Goroutine', href: 'concurrency-goroutine.html' },
                        { title: 'Channel', href: 'concurrency-channel.html' },
                        { title: 'Select', href: 'concurrency-select.html' },
                        { title: 'Mutex', href: 'concurrency-mutex.html' },
                        { title: 'Context', href: 'concurrency-context.html' }
                    ]
                }
            ]
        };
    }

    /**
     * 渲染导航
     */
    function renderNavigation() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar || !navData) return;

        const navHTML = buildNavigationHTML(navData.items);
        sidebar.innerHTML = `
            <h3>📚 学习目录</h3>
            <ul>${navHTML}</ul>
        `;
    }

    /**
     * 构建导航 HTML
     */
    function buildNavigationHTML(items, level = 0) {
        return items.map(item => {
            const hasChildren = item.children && item.children.length > 0;
            const liClass = hasChildren ? 'nav-item' : '';
            
            if (hasChildren) {
                return `
                    <li class="${liClass}">
                        <a href="${item.href}">
                            <span>${item.title}</span>
                            <span class="nav-toggle">▼</span>
                        </a>
                        <ul class="nav-submenu">
                            ${buildNavigationHTML(item.children, level + 1)}
                        </ul>
                    </li>
                `;
            } else {
                return `<li><a href="${item.href}">${item.title}</a></li>`;
            }
        }).join('');
    }

    /**
     * 设置活动状态
     */
    function setActiveState() {
        currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        const links = document.querySelectorAll('.sidebar a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
                
                // 展开父级菜单
                const parentSubmenu = link.closest('.nav-submenu');
                if (parentSubmenu) {
                    parentSubmenu.classList.remove('collapsed');
                    const parentToggle = parentSubmenu.previousElementSibling?.querySelector('.nav-toggle');
                    if (parentToggle) {
                        parentToggle.classList.remove('collapsed');
                    }
                }
            }
        });
    }

    /**
     * 绑定事件
     */
    function bindEvents() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        // 子菜单折叠/展开
        sidebar.addEventListener('click', function(e) {
            const toggle = e.target.closest('.nav-toggle');
            if (!toggle) return;
            
            e.preventDefault();
            const navItem = toggle.closest('.nav-item');
            const submenu = navItem.querySelector('.nav-submenu');
            
            if (submenu) {
                submenu.classList.toggle('collapsed');
                toggle.classList.toggle('collapsed');
            }
        });
    }

    /**
     * 刷新导航（动态加载后调用）
     */
    function refresh() {
        setActiveState();
    }

    // 公开 API
    return {
        init,
        refresh,
        getNavData: () => navData
    };
})();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    Navigation.init();
});

// 导出供外部使用
if (typeof window !== 'undefined') {
    window.Navigation = Navigation;
}
