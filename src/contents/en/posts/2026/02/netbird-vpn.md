---
title: Self-Hosting VPN ── NetBird
published: 2026-02-22
slug: "netbird-vpn"
tags: ["Self-Hosting"]
category: Technology
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
cover: "https://img.windson.cc/images/2026/02/netbird-vpn/cover.webp"
---

The VPN I used before was Tailscale. Tailscale's limitation for free users: only three people in one tailnet. But my Minecraft buddies number more than three... So I migrated the whole family to NetBird.

NetBird is a zero-trust VPN based on WireGuard. In plain terms: it helps us connect devices scattered around (laptops, Raspberry Pi, cloud servers) into a secure virtual local area network. Though they offer official servers, I just want to self-host!

---

## Basic Setup Tutorial

### Prerequisites
1. A Linux host with a public IP (I use GCP Ubuntu 22.04).
2. Your own domain
3. Docker installed—it's a good thing

### Step 1: Configure GCP Firewall
Before installing, you must open up network access on the server. GCP blocks external connections by default. Go to GCP console **VPC Network -> Firewall**, add a rule to open these ports to all sources (`0.0.0.0/0`):

* **TCP 80, 443**: For web dashboard and automatic Let's Encrypt SSL certificate requests.
* **TCP 33073**: NetBird gRPC management port.
* **UDP 3478**: STUN service (this is key for devices to successfully P2P hole-punch).
* **UDP 33073**: Signal service.

### Step 2: Configure Cloudflare DNS
Go to Cloudflare dashboard, add an A record:
* **Name**: `whatever you like`
* **IPv4 address**: Your GCP server's public IP
* **Proxy status**: **Set to DNS Only (gray cloud)**

### Step 3: Run Official Installation Script
SSH into your GCP server, download and run the official installation script:

```bash
curl -fsSL https://github.com/netbirdio/netbird/releases/latest/download/setup.sh | bash
```

During execution, the script will ask a few questions. If you want simple, choose `0` for the first one—no need to manually handle SSL certificates. Next it'll ask if you need a reverse proxy—personal preference. Finally enter your URL and you're done.

### Step 4: Connect
Open your custom website in a browser. First login requires creating an admin account. Download the client based on your operating system.
- **Server Settings**  
Click `Setup Key` > `Create Setup Key`—this is the key for connecting, only used during initial setup. Give it a name, other settings can stay as is. The key only appears once, so copy it.

- **Client Settings**  
  - **Linux**  
    ```bash
    netbird up --management-url https://your-vpn-url --setup-key YOUR_SETUP_KEY
    ```
  - **Windows**  
    After downloading the client, click `Settings` > `Advanced Settings`. Change the URL to your own. Then open PowerShell and enter:
    ```shell
    netbird up --setup-key YOUR_SETUP_KEY
    ```