/**
 * Go 教程 - 主题管理模块
 * 版本：v2.0
 * 功能：亮色/暗色主题切换、主题持久化
 */

const Theme = (function() {
    'use strict';

    const THEME_KEY = 'go-tutorial-theme';
    const themes = {
        light: 'light',
        dark: 'dark'
    };

    let currentTheme = themes.light;

    /**
     * 初始化主题
     */
    function init() {
        // 从本地存储加载主题
        const savedTheme = localStorage.getItem(THEME_KEY);
        
        if (savedTheme && themes[savedTheme]) {
            currentTheme = savedTheme;
        } else {
            // 检测系统主题偏好
            currentTheme = detectSystemTheme();
        }

        applyTheme(currentTheme);
        createThemeToggle();
        
        console.log('[Theme] 初始化完成，当前主题:', currentTheme);
    }

    /**
     * 检测系统主题偏好
     */
    function detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return themes.dark;
        }
        return themes.light;
    }

    /**
     * 应用主题
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === themes.dark) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }

        currentTheme = theme;
    }

    /**
     * 切换主题
     */
    function toggle() {
        const newTheme = currentTheme === themes.light ? themes.dark : themes.light;
        setTheme(newTheme);
    }

    /**
     * 设置主题
     */
    function setTheme(theme) {
        if (!themes[theme]) {
            console.error('[Theme] 无效的主题:', theme);
            return;
        }

        applyTheme(theme);
        localStorage.setItem(THEME_KEY, theme);
        
        // 触发自定义事件
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme } 
        }));
    }

    /**
     * 获取当前主题
     */
    function getCurrentTheme() {
        return currentTheme;
    }

    /**
     * 创建主题切换按钮
     */
    function createThemeToggle() {
        // 检查是否已存在切换按钮
        if (document.querySelector('.theme-toggle')) {
            return;
        }

        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = getThemeIcon();
        toggle.title = '切换主题';
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggle();
        });

        // 添加到侧边栏或页面合适位置
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const header = sidebar.querySelector('h3');
            if (header) {
                toggle.style.cssText = `
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 1.5em;
                    padding: 5px;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                `;
                toggle.onmouseover = () => toggle.style.background = '#e3f2fd';
                toggle.onmouseout = () => toggle.style.background = 'none';
                
                header.style.position = 'relative';
                header.appendChild(toggle);
            }
        }
    }

    /**
     * 获取主题图标
     */
    function getThemeIcon() {
        return currentTheme === themes.light ? '🌙' : '☀️';
    }

    /**
     * 更新主题图标
     */
    function updateThemeIcon() {
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.innerHTML = getThemeIcon();
        }
    }

    // 监听系统主题变化
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem(THEME_KEY)) {
                setTheme(e.matches ? themes.dark : themes.light);
            }
        });
    }

    // 公开 API
    return {
        init,
        toggle,
        setTheme,
        getCurrentTheme,
        updateThemeIcon
    };
})();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    Theme.init();
});

// 导出供外部使用
if (typeof window !== 'undefined') {
    window.Theme = Theme;
}
