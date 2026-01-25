document.addEventListener('DOMContentLoaded', function() {
    const activeLink = document.querySelector('.sidebar a.active');
    if (activeLink) {
        // 等待一小段时间确保布局完成
        setTimeout(() => {
            const sidebar = document.querySelector('.sidebar');
            const sidebarRect = sidebar.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();

            // 计算需要滚动的位置，使当前项居中
            const scrollPosition = activeLink.offsetTop - (sidebarRect.height / 2) + (linkRect.height / 2);

            sidebar.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }, 100);
    }
});