// 代码块折叠功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有代码块的折叠功能
    initCodeBlocks();
    
    // 初始化所有可折叠区域
    initCollapsibleSections();
});

function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(function(pre) {
        // 跳过已经有折叠功能的代码块
        if (pre.querySelector('.code-header')) {
            return;
        }
        
        // 创建代码块容器
        const container = document.createElement('div');
        container.className = 'code-block';
        
        // 创建代码块头部
        const header = document.createElement('div');
        header.className = 'code-header';
        
        // 添加代码块标题（可选，可以根据语言或上下文生成）
        const title = document.createElement('span');
        title.className = 'code-title';
        title.textContent = getCodeLanguage(pre) || '代码';
        header.appendChild(title);
        
        // 添加折叠按钮
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'code-toggle';
        toggleBtn.innerHTML = '<span class="icon">▼</span> 折叠';
        toggleBtn.addEventListener('click', function() {
            toggleCodeBlock(this);
        });
        header.appendChild(toggleBtn);
        
        // 创建代码内容容器
        const content = document.createElement('div');
        content.className = 'code-content';
        
        // 移动原有内容到新容器
        const originalContent = pre.innerHTML;
        pre.innerHTML = '';
        pre.appendChild(container);
        container.appendChild(header);
        container.appendChild(content);
        content.innerHTML = originalContent;
        
        // 默认折叠所有代码块
        content.classList.add('collapsed');
        toggleBtn.classList.add('collapsed');
        toggleBtn.innerHTML = '<span class="icon">▼</span> 展开';
    });
}

function getCodeLanguage(pre) {
    // 尝试从类名或上下文中获取语言类型
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

function addLineNumbers(content) {
    const lines = content.querySelectorAll('code > span');
    if (lines.length === 0) {
        return;
    }
    
    lines.forEach(function(line, index) {
        const lineNumber = document.createElement('span');
        lineNumber.className = 'code-line-number';
        lineNumber.textContent = index + 1;
        line.insertBefore(lineNumber, line.firstChild);
    });
}

function toggleCodeBlock(button) {
    const container = button.closest('.code-block');
    const content = container.querySelector('.code-content');
    
    button.classList.toggle('collapsed');
    content.classList.toggle('collapsed');
    
    if (button.classList.contains('collapsed')) {
        button.innerHTML = '<span class="icon">▼</span> 展开';
    } else {
        button.innerHTML = '<span class="icon">▼</span> 折叠';
    }
}

function initCollapsibleSections() {
    const collapsibles = document.querySelectorAll('.collapsible');
    
    collapsibles.forEach(function(collapsible) {
        const header = collapsible.querySelector('.collapsible-header');
        if (!header) {
            return;
        }
        
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

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: 切换所有代码块
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleAllCodeBlocks();
    }
    
    // Ctrl/Cmd + Shift + K: 展开所有代码块
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        expandAllCodeBlocks();
    }
});

function toggleAllCodeBlocks() {
    const buttons = document.querySelectorAll('.code-toggle');
    buttons.forEach(function(button) {
        toggleCodeBlock(button);
    });
}

function expandAllCodeBlocks() {
    const buttons = document.querySelectorAll('.code-toggle.collapsed');
    buttons.forEach(function(button) {
        toggleCodeBlock(button);
    });
}

// 自动折叠过长的代码块
function autoCollapseLongCodeBlocks() {
    const codeContents = document.querySelectorAll('.code-content');
    
    codeContents.forEach(function(content) {
        const lines = content.textContent.split('\n').length;
        if (lines > 20) {
            const container = content.closest('.code-block');
            const button = container.querySelector('.code-toggle');
            if (button && !button.classList.contains('collapsed')) {
                toggleCodeBlock(button);
            }
        }
    });
}

// 页面加载完成后默认折叠所有代码块
window.addEventListener('load', function() {
    setTimeout(function() {
        const buttons = document.querySelectorAll('.code-toggle:not(.collapsed)');
        buttons.forEach(function(button) {
            const content = button.closest('.code-block').querySelector('.code-content');
            if (content && !content.classList.contains('collapsed')) {
                toggleCodeBlock(button);
            }
        });
    }, 100);
});

// 导出函数供外部调用
if (typeof window !== 'undefined') {
    window.CodeCollapse = {
        init: initCodeBlocks,
        toggleAll: toggleAllCodeBlocks,
        expandAll: expandAllCodeBlocks,
        collapseAll: function() {
            const buttons = document.querySelectorAll('.code-toggle:not(.collapsed)');
            buttons.forEach(function(button) {
                toggleCodeBlock(button);
            });
        }
    };
}