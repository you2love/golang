#!/usr/bin/env python3
import os
import re

# 标准的 container + sidebar 格式
standard = '''<body>
    <div class="container">
        <aside class="sidebar">
            <!-- 导航栏通过 JavaScript 动态加载 -->
        </aside>
        <div class="content">'''

html_files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'navigation.html']

for filename in html_files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 匹配各种 body + container + sidebar 格式
    patterns = [
        r'<body>\s*<div class="container">\s*<aside class="sidebar">\s*<!--\s*导航栏通过 JavaScript 动态加载\s*-->\s*</aside>\s*<div class="content">',
        r'<body>\s+<div class="container">\s*<aside class="sidebar">\s*<!--\s*导航栏通过 JavaScript 动态加载\s*-->\s*</aside>\s*<div class="content">',
        r'<body>    <div class="container">\s*<aside class="sidebar">\s*<!--\s*导航栏通过 JavaScript 动态加载\s*-->\s*</aside>\s*<div class="content">',
    ]
    
    for pattern in patterns:
        content = re.sub(pattern, standard, content)
    
    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {filename}")

print("Done!")
