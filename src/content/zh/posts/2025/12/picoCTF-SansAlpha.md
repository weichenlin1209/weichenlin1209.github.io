---
title: picoCTF SansAlpha
description: picoCTF SansAlpha
pubDate: "2025-12-06"
slug: picoCTF-SansAlpha
category: CTF
tags:
  - PicoCTF
cover: /assets/image/2025/12/picoCTF-SansAlpha/cover.webp
licenseName: CC-BY-SA 4.0
---
今天上班非常無聊，都沒有學生，好像是因為今天很多學校校慶，外加上段考剛考完吧。既然都沒人來問，打了一點CTF，這是今天比較有趣的。

## 題目
[![](/assets/image/2025/12/picoCTF-SansAlpha/question.webp)](https://play.picoctf.org/practice/challenge/436?category=5&difficulty=2&page=1)
> 簡單來說，找到 flag，但是只能用數字跟大部分的符號。

## 解

![](/assets/image/2025/12/picoCTF-SansAlpha/picture1.webp)
剛連上測試，文字果然都不能用。但是可以用 `?` 跟 `*` 看到自己在什麼地方。  

![](/assets/image/2025/12/picoCTF-SansAlpha/picture2.webp)
經過一番隨便測試，發現 flag 的檔案了。但是看不到裡面的內容，所以用 base64 把他印出來。

為什麼不用echo? 
```bash
$ /???/???? #/bin/bash /bin/echo 都有可能
```
這樣系統不會知道你要用什麼，結果會變成都不能用，所以用有數字的 base64。

![](/assets/image/2025/12/picoCTF-SansAlpha/picture3.webp)
但是`/????64` 有可能是 `base64` 或 `x86_64`。系統又看不懂了。所以我們要設定第四個位數不會是 `_` 。改成 `/???[!_]64`。這樣就只剩下 `base64` 這個可能，系統就看得懂了。

![](/assets/image/2025/12/picoCTF-SansAlpha/picture4.webp)
最後把 `base64` 解碼就好了。

![](/assets/image/2025/12/picoCTF-SansAlpha/picture5.webp)