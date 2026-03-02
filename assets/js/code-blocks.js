/**
 * Go 教程 - 代码块管理模块
 * 版本：v2.0
 * 功能：代码折叠、语法高亮、行号显示
 */

const CodeBlocks = (function() {
    'use strict';

    // 配置
    const config = {
        autoCollapse: true,        // 自动折叠长代码
        collapseThreshold: 20,     // 折叠行数阈值
        showLineNumbers: true,     // 显示行号
        defaultCollapsed: true     // 默认折叠状态
    };

    /**
     * 初始化所有代码块
     */
    function init() {
        initCodeBlocks();
        initCollapsibleSections();
        
        if (config.autoCollapse) {
            autoCollapseLongCodeBlocks();
        }
        
        console.log('[CodeBlocks] 初始化完成');
    }

    /**
     * 初始化代码块
     */
    function initCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre');

        codeBlocks.forEach(function(pre) {
            // 跳过已经有折叠功能的代码块
            if (pre.querySelector('.code-header')) {
                return;
            }

            // 创建代码块容器
            const container = createCodeBlockContainer(pre);
            
            // 添加折叠功能
            addCollapseFunctionality(container, pre);
            
            // 添加行号
            if (config.showLineNumbers) {
                addLineNumbers(container);
            }
            
            // 默认折叠
            if (config.defaultCollapsed) {
                collapseBlock(container);
            }
        });
    }

    /**
     * 创建代码块容器
     */
    function createCodeBlockContainer(pre) {
        const container = document.createElement('div');
        container.className = 'code-block';

        const header = document.createElement('div');
        header.className = 'code-header';

        const title = document.createElement('span');
        title.className = 'code-title';
        title.textContent = getCodeLanguage(pre) || 'Go 代码';
        header.appendChild(title);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'code-toggle';
        toggleBtn.innerHTML = '<span class="icon">▼</span> 折叠';
        header.appendChild(toggleBtn);

        const content = document.createElement('div');
        content.className = 'code-content';

        pre.innerHTML = '';
        pre.appendChild(container);
        container.appendChild(header);
        container.appendChild(content);
        
        // 移动代码内容
        const originalContent = pre.getAttribute('data-code') || pre.innerHTML;
        content.innerHTML = originalContent;

        return container;
    }

    /**
     * 添加折叠功能
     */
    function addCollapseFunctionality(container, pre) {
        const toggleBtn = container.querySelector('.code-toggle');
        
        toggleBtn.addEventListener('click', function() {
            toggleCodeBlock(container);
        });
    }

    /**
     * 获取代码语言
     */
    function getCodeLanguage(pre) {
        const code = pre.querySelector('code');
        if (code && code.className) {
            const match = code.className.match(/language-(\w+)/);
            if (match) {
                return match[1];
            }
        }

        // 尝试从内容推断语言
        const content = pre.textContent;
        if (content.includes('package main') || content.includes('func ')) {
            return 'Go';
        } else if (content.includes('import ') && content.includes('from ')) {
            return 'JavaScript/TypeScript';
        } else if (content.includes('def ') || content.includes('class ')) {
            return 'Python';
        }

        return null;
    }

    /**
     * 添加行号
     */
    function addLineNumbers(container) {
        const content = container.querySelector('.code-content');
        if (!content) return;

        const code = content.querySelector('code');
        if (!code) return;

        const html = code.innerHTML;
        const lines = html.split('\n');
        
        if (lines.length <= 1) return;

        const numberedLines = lines.map((line, index) => {
            return `<span class="code-line"><span class="code-line-number">${index + 1}</span>${line}</span>`;
        });

        code.innerHTML = numberedLines.join('\n');
    }

    /**
     * 切换代码块折叠状态
     */
    function toggleCodeBlock(container) {
        const content = container.querySelector('.code-content');
        const button = container.querySelector('.code-toggle');

        if (!content || !button) return;

        const isCollapsed = content.classList.contains('collapsed');
        
        if (isCollapsed) {
            expandBlock(content, button);
        } else {
            collapseBlock(container);
        }
    }

    /**
     * 折叠代码块
     */
    function collapseBlock(container) {
        const content = container.querySelector('.code-content');
        const button = container.querySelector('.code-toggle');
        
        if (!content || !button) return;

        content.classList.add('collapsed');
        button.classList.add('collapsed');
        button.innerHTML = '<span class="icon">▼</span> 展开';
    }

    /**
     * 展开代码块
     */
    function expandBlock(content, button) {
        content.classList.remove('collapsed');
        button.classList.remove('collapsed');
        button.innerHTML = '<span class="icon">▼</span> 折叠';
    }

    /**
     * 自动折叠长代码块
     */
    function autoCollapseLongCodeBlocks() {
        const codeContents = document.querySelectorAll('.code-content');

        codeContents.forEach(function(content) {
            const lines = content.textContent.split('\n').length;
            if (lines > config.collapseThreshold) {
                const container = content.closest('.code-block');
                if (container) {
                    collapseBlock(container);
                }
            }
        });
    }

    /**
     * 初始化可折叠区域
     */
    function initCollapsibleSections() {
        const collapsibles = document.querySelectorAll('.collapsible');

        collapsibles.forEach(function(collapsible) {
            const header = collapsible.querySelector('.collapsible-header');
            if (!header) return;

            // 添加图标
            if (!header.querySelector('.icon')) {
                const icon = document.createElement('span');
                icon.className = 'icon';
                icon.textContent = '▼';
                header.appendChild(icon);
            }

            header.addEventListener('click', function() {
                collapsible.classList.toggle('collapsed');
            });
        });
    }

    /**
     * 展开所有代码块
     */
    function expandAll() {
        const buttons = document.querySelectorAll('.code-toggle.collapsed');
        buttons.forEach(function(button) {
            const container = button.closest('.code-block');
            const content = container.querySelector('.code-content');
            if (content && content.classList.contains('collapsed')) {
                expandBlock(content, button);
            }
        });
    }

    /**
     * 折叠所有代码块
     */
    function collapseAll() {
        const buttons = document.querySelectorAll('.code-toggle:not(.collapsed)');
        buttons.forEach(function(button) {
            const container = button.closest('.code-block');
            collapseBlock(container);
        });
    }

    /**
     * 切换所有代码块
     */
    function toggleAll() {
        const collapsed = document.querySelectorAll('.code-toggle.collapsed');
        if (collapsed.length > 0) {
            expandAll();
        } else {
            collapseAll();
        }
    }

    // 键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: 切换所有代码块
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleAll();
        }

        // Ctrl/Cmd + Shift + K: 展开所有代码块
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
            e.preventDefault();
            expandAll();
        }
    });

    // 公开 API
    return {
        init,
        expandAll,
        collapseAll,
        toggleAll,
        config
    };
})();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    CodeBlocks.init();
});

// 导出供外部使用
if (typeof window !== 'undefined') {
    window.CodeBlocks = CodeBlocks;
}
