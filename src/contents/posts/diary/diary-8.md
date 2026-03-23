---
title: 週記 | 26/03/15
published: 2026-03-15
slug: "diary-8"
tags: [Weekly Journal]
category: Life
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
---

上次寫週記好像~~還是上次~~是去年了。雖然他叫週記，理論上一週會更新一次。但那只是理論上，實際上這是我的部落格，我想什麼時候更新就什麼時候更新！從放寒假到現在其實有很多很多東西寫，只是拖延症一路拖到現在，才想到應該要把這三個月的事情稍微整理一下了。

## 組電腦
寒假心血來潮，想要組一台電腦來玩玩。這個時間很尷尬，是一個 am4 換成 am5、ddr4 換成ddr5的時間。原本想說裝一台二手的，只有 CPU/GPU 用新的，這樣應該可以省下不少錢，最好在三萬塊左右解決。於是我就開始找零件，目標就是我可以打愛爾登法還的最低配置再高一點點。藍圖大概長這樣
- CPU：AMD Ryzen 5 5600GT  
- 主機板：Gigabyte B550M GAMING X WIFI
- RAM：Kingston DDR4-3200 32GB（16GB ×2）
- SSD：Kingston NV3 1TB PCIe 4.0
- 顯卡：Gigabyte Radeon RX 6700 XT

後來我就找了一天，到了二手電腦零件行找，因為沒有 B550M 所以買了一張B650M，順手把 RAM 也買了當然也不是上面的型號，但它是 ddr4 能用，8G 一條 750元 還是 Kingston。所以我就買了四條，一共 3000，那個時候的記憶體價格這樣算是很便宜了。

買完這個我就跑去 Nova，想要找有沒有新的 R5 5600。結果店家跟我說，am4 在上禮拜就已經全部收回去了，現在市面上只有 am5，要買就只能二手。當下心裡覺得大完蛋，已經砸了 5000 但是哪裡都不能用，所以現在家裡還躺著32G的記憶體跟一張主板，~~或許之後拿來裝NAS~~。後來就買了整套新的電腦，噴了一個大的。但是現在用起來挺好的，~~不用因為還要處理N卡問題才能跑pytorch~~，打燕雲十六聲還可以開最高畫質。這是最終配置：
- CPU：AMD Ryzen 5 7500F
- RAM: Kingston FURY Beast DDR5 5600 16GB*2
- 主板：B850M AYW GAMING WIFI
- SSD：Kingston NV3 PCIe 4.0 NVMe SSD 1TB
- GPU：Radeon RX 9060 XT

## 新工具
### AI agent
[Each](https://iach.cc) 最近跟我推薦了[Opencode](https://opencode.ai) 是一個 AI coding agent。裝起來之後只要跟他說明你的需求，它就可以做出你想要的東西，具體的作品可以去[關於](/about)最下方的遊戲牆以及旁邊的 Contact widget 都是他做的。另外我的[study site](https://study.windson.cc)也是他換的主題，之前是[Docusaurus](https://docusaurus.io)。如果開發不想要從頭自己動手，需要一個雛形~~或是直接丟給他做~~，其實是個不錯的選擇。官方有提供連到各大 LLM 的模型的功能，前提是你有付錢的API Key 可能會比較聰明？這邊打問號只是因為我沒用過，我覺得官方的就已經很夠用了。

### 文字編輯器
因為覺得用 vim 很帥，所以就裝了 Neovim + LazyVim。現在打字十隻手指從頭到尾都不用離開鍵盤，除了有些功能我還不知道他幹嘛之外，其他都挺好用的，這幾天我還幫他裝了GitHub Copilot 可以繼續在上課的時候當 Tab 工程師。目前應該還沒有到回不去 Vscode 的程度，但我自己感覺已經快要了XD。

### 瀏覽器
前幾天看了[Each: 你有選擇自己的瀏覽器和搜尋引擎的權利](https://www.iach.cc/2026/browses/)，我把我的瀏覽器設定做了大幅更動。以前我都用 firefox 偶爾用用 brave. 因為我在firefox 裝了一些套件阻擋追蹤以及廣告（ublocks、AdNauseam），所以體感上跟 brave 除了介面之外都是一模一樣的。但是最近一向注重隱私的[Mozilla 要存取用戶資料](https://duckduckgo.com/?q=Mozilla+%E4%BD%BF%E7%94%A8%E8%80%85%E6%A2%9D%E6%AC%BE%E8%AE%8A%E6%9B%B4&t=vivaldi&ia=web)，所以我在找下船的替代方案。後來在 Each 文章看到了[Vivaldi](https://vivaldi.net)這個瀏覽器，他自帶廣告、追蹤器的阻擋，另外可以連接上 Proton Mail 以及 Proton VPN。最好的是他有自己找到網站的 RSS feed 的功能，之後看到喜歡的網站要訂閱就不用這麼麻煩了。

回到正題，我現在用的瀏覽器是 Vivaldi + Brave。主要用的是 Vivaldi，但是我把電腦預設的瀏覽器改成 Brave，並且把 Brave 的 javascript 全域關閉。這樣在進入不明網站或是點開別人傳給我的網址時，可以確保網站沒辦法對我的電腦做任何奇怪的舉動。除非非用 javascript 不可時，再用帶著阻擋器的 Vivaldi 開啟，這應該是很安全的電腦設定了。

### Blokada
一個手機的廣告、追蹤器阻擋程式，從 DNS 的時候就進行攔截。所以我的手機現在算是挺安全的，如果要下載的話到[官網](https://blokada.org)去下載他的apk，在goole上的blokada6已經要錢了。但怎麼保證這個軟體沒有惡意程式呢？因為他[開源](https://github.com/blokadaorg/blokada)所以很難藏後門，可以相信廣大網友們的眼睛。這個軟體很好玩，因為他會過濾你的流量，所以你可以知道手機裡的軟體在開啟之後都在跟哪些後端請求，可以把不喜歡的都 ban 掉，像我就把 Line 除了聊天以外的功能全部封鎖了，有沒有鎖好我就不知道了，因為這只能看著domain name通靈。

## 活動
### SITCON 指南針計畫
這次的 [SITCON](https://sitcon.org/2026/) 我有參加指南針計畫，聽起來很厲害，但其實只是幫你找群興趣差不多的人可以一起逛 SITCON 怕你無聊。結果名單一出來就看到 [235](https://235blog.netlify.app/)（在聯合寒訓一起爆肝的夥伴），真的是太巧了。其他的都是不認識的人，也不知道手啊跑哪去了。理論上應該要創個群組行前認識一下，不然當天才認識社交能量可能會歸零。
### 吉他社召組
一個字就是「累」。事情很多又很雜，學校的行政流程小麻煩，有些東西又跟上屆的不一樣，還要處理一些臨時狀況，詳細情形等活動結束再來寫召組文檔，這次因為文檔不是非常齊全做什麼都卡卡的。還好寒假有寫一隻[程式](https://github.com/weichenlin1209/longred-scheduler)排歌，不然真的會累死。
### 系卡評審
這是上禮拜莫名其妙拿到的新工作。我們系上要跟別系合辦一場卡啦OK大賽，每個系都要派一個評審，那天開會的時候因為我是吉他社就被推上了這個位子。但...我是彈吉他的啊，我又不唱歌。~~看來講評只能講垃圾話了~~








