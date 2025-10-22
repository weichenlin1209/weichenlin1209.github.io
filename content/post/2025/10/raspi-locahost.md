+++
title = 'Raspberry pi 5 自架服務器'
date = 2025-10-15T17:51:42+08:00
draft = false
url = "/post/raspiLocalhost/"
tags = ["Raspberry Pi" ,"Self-hosting"]
categories = ["Technology"]
layout = "post"

image = "/images/2025/10/raspi-localhost/raspi.webp"
+++

前幾天Each家的伺服器出了點狀況，讓我突然覺得，自己的東西還是得放自己這。結果一發不可收拾，架了不少東西，~~又挖了個大坑~~
<!--more-->
***
# 設備  
家裡沒有多出來的電腦，因為平常上課會用到，我也不能大改造我的筆電。所以最好的選擇就是的樹莓派。原本以為它會跑不動或是過熱，但是目前使用下來看起來是還行。
## Warn : Under-Voltage  
樹莓派是5V/5A。在學校宿舍裡面有提供1A、2.1A的充電孔，但每次我要啟動minecraft server的時候就是考驗運氣的時候了。因為功率不夠，每次啟動大概有一半的機率樹莓派會自己shutdown，不會reboot，這讓我很困擾。如果我今天要遠端啟用服務，結果它關機了，我還得回宿舍一趟拯救它。後來我回家拿了個手機用的變壓器，也不是5V/5A，雖然會議直跳出under voltage的警告，但是不至於直接關機。  

## 小Pi的家  
當初買到它的時候，我就在想要不要買個殼，結論就是：*「為什麼不自己裝一個呢？」*   
所以我就把家裡所有的樂高拆出來，發現最有機會的就是我的第一組樂高----pizza店  
![](/images/raspi-localhost/Lego-pizza.webp)  
所有材料基本上來自於它，觀察一下就會發現他們的屋頂一模一樣。對pizza店進行大改造之後，就是現在你們看到的樣子了。但是這個殼的缺點就是散熱很差，就算有散熱片執行時的溫度也會到70度。

## 怎麼開始Rasbperry pi  
剛買到Rasbperrypi的時候，會需要一個storage去存他的OS，我自己是用microSD卡。接著要到[他的官網](https://www.raspberrypi.com/software/)，根據你本機的OS下載一下image。灌的時候可以去吃個飯，追追劇、打打遊戲，反正大概要一個小時，~~也有可能是我的卡讀寫速度不夠。~~ 接下來會面臨到一個大問題，**Pi5只支援microHDMI，沒有那條線就會難搞。** 我是單純的靠ssh進去，但是才剛剛開機，也不知道他的ip。就算用了ip nei 這個指令，還是得把家裡所有的裝置都試一遍，連上之後用CLI打開他的VNC server。如果我有那條線可以省兩個小時。

***
# 我架了什麼？
## AFFiNE
這是我第一個架的伺服器，他是一個功能很多的筆記軟體，開源而且免費。我會用到的就是markdown、LaTeX、甚至有無邊記，跟iOS的長的差不多。而且在各種平台上都可以用，有APP也有Web的版本，它還可以把資料同步到所有裝置上，拿來讀書非常方便。
![Affine](/images/2025/10/raspi-localhost/affine.webp)

## Syncthing  
Syncthing的功能如同其名，就是拿來同步檔案。因為設定跟安裝有點麻煩,自己用是比較好的。主要是有了這個就可以同步檔案到伺服器，不用把東西丟在大平台，還有限制檔案大小。但是如果沒有做好防護措施要暴露到外網是很危險的。他有登入界面，但是我不會用，所以我用內網穿透。
![Syncthing](/images/2025/10/raspi-localhost/sync.webp)  

## Immich  
他是一個開源的雲端相簿服務，裡面長得很像Google相簿。自己架設的好處就是我不用把相簿放在Google 或 iCloud，被限制除存空間還要付錢給它，自架的話要多少空間就有多少，取決於硬碟買多大。但是架設的時候，因為電力供應不足，可我用HDD裡面的馬達跑不動，所以硬碟的super block壞掉了，所以不要在under voltage的情況下用硬碟，資料會壞掉，只能救回部份。電力供給至少要20瓦（我目前是用20瓦，還沒出事）
![immich](/images/2025/10/raspi-localhost/immich.webp)

*** 
# Docker  
這是一個很厲害的容器，但是目前我只是會用，還沒學什麼厲害的，所以沒辦法寫什麼。上面的服務都靠它架起來的。　　

*** 
# Cloudflare tunnel
這是我把服務丟到外網的方法，建一個隧道到clouldflare，在本機寫設定檔進行route, 再去clouldflare dashboard設定DNS。但是要這麼做的前提是你有一個自己的網域，如果沒有的話就內網穿透吧。

