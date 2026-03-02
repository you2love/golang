// 代码块折叠功能 - 增强版
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有代码块的折叠功能
    initCodeBlocks();
    
    // 默认展开所有代码块（用户友好）
    setTimeout(function() {
        expandAllCodeBlocks();
    }, 100);
});

function initCodeBlocks() {
    // 查找所有 pre 代码块
    const preBlocks = document.querySelectorAll('pre');
    
    preBlocks.forEach(function(pre, index) {
        // 跳过已经有折叠功能的代码块
        if (pre.parentElement.classList.contains('code-block')) {
            return;
        }
        
        // 创建代码块容器
        const container = document.createElement('div');
        container.className = 'code-block';
        
        // 创建代码块头部
        const header = document.createElement('div');
        header.className = 'code-header';
        
        // 添加代码块标题
        const title = document.createElement('span');
        title.className = 'code-title';
        title.textContent = '代码示例 ' + (index + 1);
        header.appendChild(title);
        
        // 添加折叠按钮
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'code-toggle';
        toggleBtn.innerHTML = '<span class="icon">▲</span> 折叠';
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCodeBlock(this);
        });
        header.appendChild(toggleBtn);
        
        // 包裹 pre 元素
        pre.parentNode.insertBefore(container, pre);
        container.appendChild(header);
        container.appendChild(pre);
        
        // 添加代码内容类
        pre.classList.add('code-content');
    });
}

function toggleCodeBlock(button) {
    const container = button.closest('.code-block');
    const pre = container.querySelector('pre');
    
    if (!pre) return;
    
    button.classList.toggle('collapsed');
    pre.classList.toggle('collapsed');
    
    if (button.classList.contains('collapsed')) {
        button.innerHTML = '<span class="icon">▼</span> 展开';
        pre.style.maxHeight = '0';
        pre.style.padding = '0 20px';
        pre.style.overflow = 'hidden';
    } else {
        button.innerHTML = '<span class="icon">▲</span> 折叠';
        pre.style.maxHeight = '';
        pre.style.padding = '';
        pre.style.overflow = '';
    }
}

function expandAllCodeBlocks() {
    const buttons = document.querySelectorAll('.code-toggle.collapsed');
    buttons.forEach(function(button) {
        toggleCodeBlock(button);
    });
}

function collapseAllCodeBlocks() {
    const buttons = document.querySelectorAll('.code-toggle:not(.collapsed)');
    buttons.forEach(function(button) {
        toggleCodeBlock(button);
    });
}

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: 切换所有代码块
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const firstCollapsed = document.querySelector('.code-toggle:not(.collapsed)');
        if (firstCollapsed) {
            collapseAllCodeBlocks();
        } else {
            expandAllCodeBlocks();
        }
    }
    
    // Ctrl/Cmd + Shift + K: 展开所有代码块
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        expandAllCodeBlocks();
    }
});

// 导出函数供外部调用
if (typeof window !== 'undefined') {
    window.CodeCollapse = {
        init: initCodeBlocks,
        toggleAll: function() {
            const firstCollapsed = document.querySelector('.code-toggle:not(.collapsed)');
            if (firstCollapsed) {
                collapseAllCodeBlocks();
            } else {
                expandAllCodeBlocks();
            }
        },
        expandAll: expandAllCodeBlocks,
        collapseAll: collapseAllCodeBlocks
    };
}
