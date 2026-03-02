/**
 * Go 教程 - 主入口文件
 * 版本：v2.0
 * 功能：初始化所有模块
 */

// 导入所有模块（通过 script 标签加载后可直接访问）
(function() {
    'use strict';

    // 应用配置
    const AppConfig = {
        version: '2.0.0',
        name: 'Go 语言学习教程',
        debug: false
    };

    /**
     * 初始化应用
     */
    function initApp() {
        console.log(`[App] ${AppConfig.name} v${AppConfig.version} 启动`);
        
        // 等待 DOM 加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onDOMReady);
        } else {
            onDOMReady();
        }
    }

    /**
     * DOM 加载完成回调
     */
    function onDOMReady() {
        console.log('[App] DOM 加载完成');
        
        // 初始化各模块
        initModules();
        
        // 绑定全局事件
        bindGlobalEvents();
        
        // 标记应用已初始化
        window.appInitialized = true;
        
        console.log('[App] 应用初始化完成');
    }

    /**
     * 初始化模块
     */
    function initModules() {
        // 导航模块
        if (typeof Navigation !== 'undefined') {
            Navigation.init();
        }
        
        // 代码块模块
        if (typeof CodeBlocks !== 'undefined') {
            CodeBlocks.init();
        }
        
        // 主题模块
        if (typeof Theme !== 'undefined') {
            Theme.init();
        }
        
        // 工具模块已自动加载，无需初始化
    }

    /**
     * 绑定全局事件
     */
    function bindGlobalEvents() {
        // 页面可见性变化
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                console.log('[App] 页面隐藏');
            } else {
                console.log('[App] 页面显示');
            }
        });

        // 窗口大小变化
        window.addEventListener('resize', Utils.debounce(function() {
            console.log('[App] 窗口大小变化');
            // 可以在这里处理响应式逻辑
        }, 250));

        // 滚动事件（节流）
        window.addEventListener('scroll', Utils.throttle(function() {
            // 可以在这里处理滚动相关逻辑
        }, 100));

        // 键盘快捷键
        document.addEventListener('keydown', function(e) {
            // Alt + H: 返回首页
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
        });
    }

    /**
     * 获取应用信息
     */
    function getAppInfo() {
        return {
            name: AppConfig.name,
            version: AppConfig.version,
            modules: {
                navigation: typeof Navigation !== 'undefined',
                codeBlocks: typeof CodeBlocks !== 'undefined',
                theme: typeof Theme !== 'undefined',
                utils: typeof Utils !== 'undefined'
            }
        };
    }

    // 启动应用
    initApp();

    // 导出全局 API
    window.GoTutorial = {
        version: AppConfig.version,
        getAppInfo,
        config: AppConfig
    };
})();
