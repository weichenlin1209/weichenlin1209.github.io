---
title: 週記 | 25/10/26
published: 2025-10-26
slug: "diary-3"
tags: [Weekly Journal]
category: Life
licenseName: "CC BY-NC-SA 4.0"
author: Windson
draft: false
cover: "https://img.windson.cc/images/diary/diary-cover.webp"
---

*很久沒發文，無聊來發一下。*
<!--more-->
退掉宿營之後，生活就是一整個輕鬆愜意，但是其實還是很多事情要做的。最近在期中地獄的開頭，認真體會到了不修通識課的壞處：***「每節課都要期中！」*** 接下來連續三週每週都考一點，要求不多了，會過就行。

## 金盾獎
上禮拜六跟 [Each Chen](https://www.iach.cc) 去打金盾。發現學長的建議給的真的不錯。他說這是場通靈大賽。整張考卷下來我們確定有寫對的只有一題crypto，其他都是：*「應該是這個吧」「對，看起來挺合理的」* 雖然寫的過程一整個在通靈，但是這樣的肯定不只我們這組。這次好像是刷掉一半的組別，希望會進決賽，~~進了還有金盾的衣服~~。其實這次不打完比賽不是零收穫，至少知道它很愛考reverse，之後可要來一天一題reverse，我想開始的時候開始d(`･∀･)b，最後附上一張紀念照。  

![ReversIsHard](https://img.windson.cc/images/2025/10/diary-3/ReverseIsHard.webp)  

## 吉他社
### 社課  
第一次認真上吉他課居然是當教學的時候，因為之前都沒有上過吉他課。再過兩個禮拜我就要上台教了。一個沒上過吉他課的人要當教學，這幾週的都在觀摩學習。在底下晃來晃去其實也挺好玩的，~~這邊先不討論彈不出聲音的~~，看他們F和弦按不緊就會想起來剛入門的時候多痛苦，他們之後還有封閉要克服。總之，教學其實挺好玩的。  

### 好多表演  
下週就要表演了，還連續兩天。有一首譜還沒背很熟，等這禮拜考完要來瘋狂練習。第一次再大場合表演，感覺人會超級多。在小禮堂不會緊張只是因為看不到台下。綠川場地在戶外應該會看的一清二處，而且隔天還有雞尾酒的表演，人又會更多。接下來耶晚也開了很多歌，~~其實就兩首~~，兩首都是主音，該趕緊練了。  

## 樹莓派
因為樹莓派需要5V/5A的電源，但是市面上根本沒有這種的。在電供不穩的情況下，我的HDD常常轉兩下就壞軌了，所以這禮拜買了他的原廠電源。順便買了SSD hat、主動散熱。接下來打算讓SSD擔任開機碟，把在microSD的資料都搬過去。去買SSD的時候才發現他有好多規格，但原廠的長度很短，目前發現可以接上的只有 2230 跟 2242。考完試再來處理它。

## 數學符號
在寫這篇的時候發現這個主題可以打數學符號，既然可以打就來解一題常微吧。這是去年期中的最後一題，但是沒有比較難就是了。
### Q7

Let $p(t)$ be the mouse population in$t$ months and satisfy the differential equation

$$
\frac{dp}{dt} = 0.5p -450
$$

(a) Find the time t which the population becomes extinct if $p(0) = 800$.

(b) Find the initial population $p_0$ if the population is to become extinct in 1 year. 

#### sol
- (a)
  
  $\frac{dP}{dt} - \frac{1}{2} P = -450 ,\text{take } \mu(t) = e^{-\frac{1}{2}t} $

  $e^{-\frac{1}{2}t}P = -450 \int{e^{-\frac{1}{2}t}} dt = 900 e^{-\frac{1}{2}t} + C$

  $P(0) = 900 + Ce^{\frac{1}{2}t}$

  $P(0) = 900 + C = 800,\quad C = -100$

  $\text{Hence, } P(t) = 900 - 100e^{\frac{1}{2}t} = 0,e^{\frac{1}{2}t} = 9 ,t = 2ln\ 9$  

- (b)
  
  $P(t) = 900 - Ce^{\frac{1}{2}t}$

  $P(0) = 900 -C = p_{0}\ \Rightarrow P(t) = 900 - (900-p_0)e^{\frac{1}{2}t}$

  $P(12) = 900 - (900-p_0)e^6 = 0 \Rightarrow p_0 = 900(1-e^{-6})$

