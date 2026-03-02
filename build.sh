#!/bin/bash
# Go 教程网站 - 构建脚本
# 版本：v2.0

set -e

echo "=================================================="
echo "🚀 Go 教程网站 - 构建脚本"
echo "=================================================="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 Python 是否安装
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}错误：需要安装 Python 3${NC}"
    exit 1
fi

# 运行 Python 构建脚本
echo -e "${BLUE}运行构建脚本...${NC}"
python3 build.py

# 验证构建结果
if [ -f "assets/manifest.json" ]; then
    echo -e "${GREEN}✓ 构建成功!${NC}"
    echo ""
    echo "生成的文件:"
    ls -lh assets/css/*.bundle.css 2>/dev/null || true
    ls -lh assets/js/*.min.js 2>/dev/null || true
else
    echo -e "${RED}✗ 构建失败${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}提示：${NC}"
echo "  - 使用新资源：在 HTML 中引用 assets/css/main.css"
echo "  - 使用压缩资源：在 HTML 中引用 assets/js/*.min.js"
echo "  - 查看资源清单：assets/manifest.json"
