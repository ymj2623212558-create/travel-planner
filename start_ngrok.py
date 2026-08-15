#!/usr/bin/env python3
import subprocess
import time
import sys
import re

print("🌐 启动 ngrok 隧道...")

# 启动 ngrok
process = subprocess.Popen(
    ['ngrok', 'http', '3000'],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
    bufsize=1
)

url_found = False
public_url = None

# 等待最多 15 秒获取 URL
start_time = time.time()
timeout = 15

for line in iter(process.stdout.readline, ''):
    elapsed = time.time() - start_time
    if elapsed > timeout:
        break
    
    print(line.strip())
    
    # 查找 URL
    if '.ngrok-free.app' in line or 'tunnel_url' in line.lower():
        match = re.search(r'https://[\w-]+\.ngrok(-free)?\.app', line)
        if match:
            url_found = True
            public_url = match.group(0)
            print(f"\n{'='*60}")
            print(f"✅ 公网地址：{public_url}")
            print(f"{'='*60}")
            
            break

if not url_found:
    print("\n❌ 未找到 ngrok URL")
    sys.exit(1)
else:
    print("\nℹ️  ngrok 保持后台运行中...")
