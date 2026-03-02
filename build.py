#!/usr/bin/env python3
"""
Go 教程网站 - 资源构建脚本
版本：v2.0
功能：资源优化、CSS 合并、JS 压缩、版本管理
"""

import os
import re
import json
import hashlib
import shutil
from datetime import datetime

# 配置
CONFIG = {
    'src_dir': '.',
    'dist_dir': './dist',
    'css_dir': './assets/css',
    'js_dir': './assets/js',
    'version': '2.0.0'
}

def get_file_size(filepath):
    """获取文件大小 (KB)"""
    return os.path.getsize(filepath) / 1024

def calculate_hash(filepath):
    """计算文件 MD5 哈希值"""
    with open(filepath, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()[:8]

def merge_css_files():
    """合并 CSS 文件"""
    print("📦 合并 CSS 文件...")
    
    css_files = [
        'base.css',
        'sidebar.css',
        'content.css',
        'code.css',
        'tables.css',
        'diagrams.css',
        'utilities.css'
    ]
    
    merged_content = f"""/* Go 教程 - 合并样式表 */
/* 版本：{CONFIG['version']} */
/* 生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} */
/* 此文件由构建脚本自动生成，请勿手动修改 */

"""
    
    total_size = 0
    for css_file in css_files:
        filepath = os.path.join(CONFIG['css_dir'], css_file)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                merged_content += f"\n/* ========== {css_file} ========== */\n\n"
                merged_content += content
                total_size += get_file_size(filepath)
                print(f"  ✓ {css_file} ({get_file_size(filepath):.1f} KB)")
    
    # 写入合并后的文件
    output_path = os.path.join(CONFIG['css_dir'], 'main.bundle.css')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(merged_content)
    
    print(f"  → 输出：main.bundle.css ({get_file_size(output_path):.1f} KB)")
    return total_size

def optimize_js_files():
    """优化 JS 文件（简单压缩）"""
    print("\n📦 优化 JavaScript 文件...")
    
    js_files = ['app.js', 'navigation.js', 'code-blocks.js', 'theme.js', 'utils.js']
    
    total_size = 0
    for js_file in js_files:
        filepath = os.path.join(CONFIG['js_dir'], js_file)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
                # 简单压缩：移除注释和多余空白
                # 移除单行注释
                content = re.sub(r'//[^\n]*', '', content)
                # 移除多行注释
                content = re.sub(r'/\*[\s\S]*?\*/', '', content)
                # 移除多余空白
                content = re.sub(r'\s+', ' ', content)
                # 移除行首行尾空白
                lines = [line.strip() for line in content.split('\n') if line.strip()]
                content = '\n'.join(lines)
                
                # 写入优化后的文件
                output_path = os.path.join(CONFIG['js_dir'], js_file.replace('.js', '.min.js'))
                with open(output_path, 'w', encoding='utf-8') as out:
                    out.write(content)
                
                original_size = get_file_size(filepath)
                optimized_size = get_file_size(output_path)
                savings = ((original_size - optimized_size) / original_size * 100) if original_size > 0 else 0
                
                total_size += optimized_size
                print(f"  ✓ {js_file} ({original_size:.1f} KB → {optimized_size:.1f} KB, 节省 {savings:.1f}%)")
    
    return total_size

def update_html_references():
    """更新 HTML 文件中的资源引用"""
    print("\n🔄 更新 HTML 文件引用...")
    
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for html_file in html_files:
        if html_file in ['resources.html', 'index.html']:
            continue
            
        filepath = os.path.join('.', html_file)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 更新 CSS 引用
        if 'href="styles.css"' in content:
            content = content.replace('href="styles.css"', 'href="assets/css/main.css"')
            print(f"  ✓ {html_file}: 更新 CSS 引用")
        
        # 更新 JS 引用
        if 'src="code-collapse.js"' in content:
            content = content.replace('src="code-collapse.js"', 'src="assets/js/code-blocks.js"')
            print(f"  ✓ {html_file}: 更新 JS 引用")
        
        # 添加导航 JS
        if 'assets/js/code-blocks.js' in content and 'assets/js/navigation.js' not in content:
            content = content.replace(
                'assets/js/code-blocks.js',
                'assets/js/navigation.js"\n    <script src="assets/js/code-blocks.js"'
            )
            print(f"  ✓ {html_file}: 添加导航模块")
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

def generate_manifest():
    """生成资源清单"""
    print("\n📋 生成资源清单...")
    
    manifest = {
        'version': CONFIG['version'],
        'generated': datetime.now().isoformat(),
        'css': {},
        'js': {},
        'templates': {}
    }
    
    # CSS 文件
    for f in os.listdir(CONFIG['css_dir']):
        if f.endswith('.css'):
            filepath = os.path.join(CONFIG['css_dir'], f)
            manifest['css'][f] = {
                'size': get_file_size(filepath),
                'hash': calculate_hash(filepath)
            }
    
    # JS 文件
    for f in os.listdir(CONFIG['js_dir']):
        if f.endswith('.js'):
            filepath = os.path.join(CONFIG['js_dir'], f)
            manifest['js'][f] = {
                'size': get_file_size(filepath),
                'hash': calculate_hash(filepath)
            }
    
    # 模板文件
    templates_dir = './templates'
    if os.path.exists(templates_dir):
        for root, dirs, files in os.walk(templates_dir):
            for f in files:
                if f.endswith('.html'):
                    filepath = os.path.join(root, f)
                    relpath = os.path.relpath(filepath, templates_dir)
                    manifest['templates'][relpath] = {
                        'size': get_file_size(filepath),
                        'hash': calculate_hash(filepath)
                    }
    
    # 写入清单
    manifest_path = './assets/manifest.json'
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print(f"  → 输出：assets/manifest.json")
    return manifest

def print_summary(manifest):
    """打印构建摘要"""
    print("\n" + "=" * 50)
    print("🎉 构建完成!")
    print("=" * 50)
    print(f"版本：{manifest['version']}")
    print(f"时间：{manifest['generated']}")
    print(f"\nCSS 文件：{len(manifest['css'])} 个")
    print(f"JS 文件：{len(manifest['js'])} 个")
    print(f"模板文件：{len(manifest['templates'])} 个")
    
    total_css = sum(f['size'] for f in manifest['css'].values())
    total_js = sum(f['size'] for f in manifest['js'].values())
    print(f"\n总大小:")
    print(f"  CSS: {total_css:.1f} KB")
    print(f"  JS:  {total_js:.1f} KB")
    print(f"  总计：{total_css + total_js:.1f} KB")
    print("=" * 50)

def main():
    """主函数"""
    print("=" * 50)
    print("🚀 Go 教程网站 - 资源构建")
    print("=" * 50)
    
    # 合并 CSS
    merge_css_files()
    
    # 优化 JS
    optimize_js_files()
    
    # 更新 HTML 引用
    update_html_references()
    
    # 生成清单
    manifest = generate_manifest()
    
    # 打印摘要
    print_summary(manifest)

if __name__ == '__main__':
    main()
