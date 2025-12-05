+++
title = '好用軟體'
date = 2025-12-05T15:30:00+08:00
draft = false
url = "/zh/post/good-app/"
categories = ["Technology"]
layout = "post"

image = "/images/2025/12/good-app/cover.avif"
+++  

> 因為重灌的關係，所以所有軟體都要重載，趁這個機會分享一下

## 小麥注音
[下載](https://github.com/openvanilla/fcitx5-mcbopomofo)

Linux 的中文輸入法其實很多，但是這個是最聰明的。他會記得你要打什麼字，如果他不記得的話，可以自己手動加字典。
```text
~/.local/share/fcitx5/mcbopomofo/data.txt
```
字典在這個檔案裡面，如果我要在字典中加入：*義大利麵就應該拌混泥土*
```text
義大利麵就應該拌混泥土 ㄧˋ-ㄉㄚˋ-ㄌㄧˋ-ㄇㄧㄢˋ-ㄐㄧㄡˋ-ㄧㄥ-ㄍㄞ-ㄅㄢˋ-ㄏㄨㄣˇ-ㄋㄧˊ-ㄊㄨˇ
```
在每個字中間加入 ```-``` 就好了。  
***

## Syncthing 
[下載](https://apt.syncthing.net/)  

同步檔案的好工具，比如說同步密碼庫、音樂、小麥的字典... ，也可以拿來備份用。只是設定比較麻煩，新手不友善。詳細設定請參見[官方文檔](https://docs.syncthing.net/)  
***
## KeepassXC
[下載](https://keepassxc.org/download/#linux)

密碼管理器，讓你的系統每個密碼都不一樣，降低被駭的風險。還可以生成密碼，當然是那種一眼記不起來的超長複雜密碼，反正你不用自己記。自從用了這個之後我就沒有再記過密碼了，也不用用好幾組密碼輪著用，安全upupup。
***
## RealVNC
[下載](https://www.realvnc.com/en/connect/download/viewer/)

這是遠端桌面，我都用他連進樹梅派。樹梅派的預設好像也是用這個的 server 版。這個還有共用剪貼簿的功能，好用。
***
## Tailscale
[下載](https://tailscale.com/download)  

我的 VPN，主要是要讓 syncthing 可以正常運作，用內網穿透把每個裝置都放在一個區網，這樣我才可以同步資料。當然，這也可以拿來玩 minecraft。  

***
## VScode
[下載](https://code.visualstudio.com/)

印象中這可以用 ```apt``` 直接下載 ，但是這次下載的時候他不給我用。所以就只能去網路上找。就是寫程式的好工具，可以渲染 markdown 跟 mermaid。想要用 LaTeX 當然也是可以的，套件裝一裝就有了。他也有 git 的工具可以用，不用用 CLI 上傳東西。

## Signal
[下載](https://signal.org/zh_HK/download/#)

我目前主要的通訊軟體，Instagram 跟 Line 都不怎麼樣，一個用廣告丟你一個用演算法綁架。所以這是我的開源替代方案，目前沒有廣告，貼圖不用錢，版面乾淨而且有限動可以發。哪天你要逃離大公司的掌控的時候，他絕對是首選。
***
## Adnauseam
[下載](https://adnauseam.io/)

超級沒品的廣告阻攔器，除了擋住廣告之外，他會在背景幫你全部都點一遍。詳情請看Wiwi的這篇[文章](https://wiwi.blog/blog/adnauseam/)，這是 firefox 的插件，~~快點裝起來浪費廣告商的錢吧。~~  



