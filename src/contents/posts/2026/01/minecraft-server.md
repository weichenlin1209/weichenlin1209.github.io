---
title: 怎麼架設 Minecraft 伺服器？
published: 2026-01-06
slug: "minecraft-server"
tags: [Self-Hosting]
category: Technology
licenseName: "CC BY-NC-SA 4.0"
author: Windson
draft: false
cover: "/images/2026/01/minecraft-server/cover.webp"
---

## 前言  
之前我都把 minecraft 伺服器架設在[其他平台](https://aternos.org/:zh-TW/)上，超方便的！一鍵架設，什麼都不用會，馬上可以開始玩。但是只要太久沒有連上去（不確定是半年還是一年），伺服器就會被刪除，之前玩的進度就找不回來了。現在有主機有知識，可以自己架一個，何樂而不為？


## 怎麼架設 Minecraft 伺服器  
這邊只會介紹 Linux 怎麼安裝，如果你看著我的教學架設的話，先把主機換成 Linux 吧。~~畢竟我沒有 Windows 的設備可以讓我玩~~。

### 要架在哪？
根據官方的[文檔](https://minecraft.wiki/w/Tutorial:Setting_up_a_Java_Edition_server)，如果沒有太多人要玩的話。
- CPU ：**Intel 8th gen**  or  **Ryzen 2000 系列**
- RAM ：2～4G  

我是用我的[樹莓派](zh/post/raspiLocalhost/)就架起來了，目前兩三個人一起玩是沒有問題的。

### 安裝Java  
因為我玩的是 Java 版，所以要多人遊戲的話，當然是要架 Java 的伺服器。首先確認電腦有沒有安裝。在電腦的終端機輸入：
```bash
java --verion
```
如果有跑出這樣的東西的話，就代表已經有裝了
```
openjdk 21.0.9 2025-10-21
OpenJDK Runtime Environment (build 21.0.9+10-Ubuntu-125.10)
OpenJDK 64-Bit Server VM (build 21.0.9+10-Ubuntu-125.10, mixed mode, sharing)
```

原本沒有安裝的話，根據不同的作業系統，有不同的安裝方式。因為我用 Ubuntu ，所以這邊只介紹 Ubuntu ，其他作業系統 請參照[官方文檔](https://minecraft.wiki/w/Tutorial:Update_Java#Linux_distributions)。
```bash
sudo apt update && sudo apt upgrade
sudo apt install openjdk-21-jdk
```

### 取得 server.jar  
可以直接點我給的這個[連結](https://piston-data.mojang.com/v1/objects/64bb6d763bed0a9f1d632ec347938594144943ed/server.jar)，這是寫這篇文章的時候最新的版本1.21.11的伺服器檔案。接著就可以在檔案位置執行
```bash
java -Xmx1024M -Xms1024M -jar server.jar --nogui
```

`Xmx`指的是最大記憶體用量；`Xms`是最小的記憶體用量，最後面的`nogui`是不需要圖形化使用者介面，如果沒有加可能會跳出來吧？我也沒試過。啟動之後關閉會發現原本的位置多了很多資料夾。其中`server.properties`是設定伺服器環境變數的地方，像是伺服器名稱、人數限制、遊戲難度之類的，只要看得懂英文他都寫的蠻清楚的。`world`資料夾，顧名思義就是拿來放世界存檔的，我嘗試過把單人世界的資料夾直接搬移來伺服器讓多人遊戲，結果是可以直接搬移的。另外`/world/datapacks/`是拿來放模組、材質包的地方。如果不能使用的話可以用單人世界先生成世 界再搬移到伺服器上。

## 模組安裝：亞特蘭提斯  

![Atlantis](/images/2026/01/minecraft-server/atlantis.webp)

這是童年時代很喜歡的一個模組，出生點會在一間小玻璃屋，整個世界都在海底下。詳情可以看[舞秋風Minecraft生存 - 亞特蘭提斯-留住最後一口氣](https://youtube.com/playlist?list=PLBtVUsNOhEjtbg0V1kLzS1slOzFV0GuTX&si=GHIkMoWg9i9uu-Te)，這已經是12年前的系列了，在minecraft還在1.5.1的那個年代，現在會玩純粹是完成童年的夢想。

舞秋風當初玩的是1.5.1版，最近有大佬把他重製，變成了目前1.21+都可以玩的版本。安裝的部分可以到[GitHub](https://github.com/Mzhuangshao/atlantis?tab=readme-ov-file)下載，體驗小時候想玩的水下世界。他的安裝方法非常簡單，把下載下來的zip檔放到`/world/datapacks/`，這樣就完成了。如果你懶得架或是想跟我一起玩可以[email](mailto:info@windson.cc)給我，我盡量想辦法讓你進來。

