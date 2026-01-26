document.addEventListener('DOMContentLoaded', function() {
    // 可收缩导航功能
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    
    navItems.forEach(item => {
        const toggle = item.querySelector('.nav-toggle');
        const submenu = item.querySelector('.nav-submenu');
        
        if (toggle && submenu) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                toggle.classList.toggle('collapsed');
                submenu.classList.toggle('collapsed');
            });
        }
    });
    
    // 自动展开当前激活的项
    const activeLink = document.querySelector('.sidebar a.active');
    if (activeLink) {
        const parentSubmenu = activeLink.closest('.nav-submenu');
        if (parentSubmenu) {
            parentSubmenu.classList.remove('collapsed');
            const parentToggle = parentSubmenu.parentElement.querySelector('.nav-toggle');
            if (parentToggle) {
                parentToggle.classList.remove('collapsed');
            }
        }
        
        // 滚动到当前项
        setTimeout(() => {
            const sidebar = document.querySelector('.sidebar');
            const sidebarRect = sidebar.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();

            const scrollPosition = activeLink.offsetTop - (sidebarRect.height / 2) + (linkRect.height / 2);

            sidebar.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }, 100);
    }
});