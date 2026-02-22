---
title: 自架VPN ── NetBird
published: 2026-02-22
slug: "netbird-vpn"
tags: ["Self-Hosting"]
category: Technology
licenseName: "CC BY-NC-SA 4.0"
author: Windson
draft: false
cover: "https://img.windson.cc/images/2026/02/netbird-vpn/cover.webp"
---

之前我用的VPN是tailscale，Tailscale 對於免費仔的限制就是：一個tailnet裡面只能有三個人。但我的 minecraft 好夥伴的人數已經大於三了啊...所以我就舉家遷移到了 NetBird。

NetBird 是一款基於 WireGuard 的零信任（Zero-Trust） 的 VPN，講人話就是能幫助我們把散落各地的設備（筆電、Raspberry Pi、雲端伺服器）連成一個安全的虛擬區域網路。雖然官方有提供伺服器，但是我就是想要自己架！

---

## 基礎架設教學

### 準備工作
1. 找一台具備公網 IP 的 Linux 主機（我用 GCP Ubuntu 22.04 ）。
2. 一個你自己的網域
3. 裝個 docker 他是好東西

### Step 1：設定 GCP 防火牆
在開始安裝前，必須先打通伺服器的網路。GCP 預設會阻擋外部連線，請前往 GCP 控制台的 **VPC 網路 -> 防火牆**，新增規則開放以下 Port 給所有來源 (`0.0.0.0/0`)：

* **TCP 80, 443**：用於網頁後台與自動申請 Let's Encrypt SSL 憑證。
* **TCP 33073**：NetBird gRPC 管理通訊埠。
* **UDP 3478**：STUN 服務（這是裝置間能成功 P2P 穿透打洞的關鍵）。
* **UDP 33073**：Signal 服務。

### Step 2：設定 Cloudflare DNS
前往 Cloudflare 後台，新增一筆 A 紀錄：
* **Name (名稱)**：`取個你喜歡的名字`
* **IPv4 address**：填入你 GCP 伺服器的公網 IP
* **Proxy status** ：**設為 DNS Only (灰色雲朵)**

### Step 3：執行官方安裝腳本
SSH 進入你的 GCP 伺服器，下載並執行官方的安裝腳本：

```bash
curl -fsSL https://github.com/netbirdio/netbird/releases/latest/download/setup.sh | bash
```

執行過程中，腳本會問你幾個問題，想要簡單的話第一個選`0`，這樣就不用手動處理SSL憑證。接下來他會問需不需要反向代理，就看個人需不需要這個服務。最後打上你的網址，就完成了。

### Step 4: 連線
用瀏覽器開啟你自訂的網站。第一次登入要建理管理員帳號，根據作業系統下載客戶端。
- **伺服器設定**  
點擊 `Setup Key` > `Create Setup Key`，這是用來連線的金鑰，只有在建立連線時會用到。幫他取個名字就好，其他設定可以不用動。Key 只會出現一次，所以要複製起來。

- **客戶端設定**  
  - **Linux**  
    ```bash
    netbird up --management-url https://your-vpn-url --setup-key YOUR_SETUP_KEY
    ```
  - **Windows**  
    下載完客戶端之後，點擊 `Settings` > `Advanced Settings` 。要把 url 換成自己的url。之後打開 powershell 輸入
    ```shell
    netbird up --setup-key YOUR_SETUP_KEY
    ```

