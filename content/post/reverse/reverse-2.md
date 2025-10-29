+++
title = 'Transformation'
date = 2025-10-29T16:36:00+08:00
draft = false
url = "/post/reverse-2/"
tags = ["PicoCTF" ,"Reverse"]
categories = ["CTF"]
layout = "post"

image = "/images/reverse/cover.webp"
+++
*"A Reverse a day keeps the zero-days away."*
<!--more-->
---  

## Question
[題目連結](https://play.picoctf.org/practice/challenge/104?category=3&page=1)  

首先它給了一個檔案，裡面長這樣。
```
灩捯䍔䙻ㄶ形楴獟楮獴㌴摟潦弸彥㜰㍢㐸㙽

.join([chr((ord(flag[i]) << 8) + ord(flag[i + 1])) for i in range(0, len(flag), 2)])
```
很明顯它編碼錯了，所以才會出現這種奇怪的亂碼，只要還原會去就沒事了。底下的那個是附在題目敘述上的編碼程式。它先把整個flag切成兩兩一組，把兩個都變成ASCII，把第一個乘上256再加上第二個。最後再 ```chr()``` 變成我們現在看到的。

## Solution
寫一隻程式逆著回來就好了，題目用python我就用python吧。
```
q = "灩捯䍔䙻ㄶ形楴獟楮獴㌴摟潦弸彥㜰㍢㐸㙽"
sum = []

# 把編碼換回ASCII
for i in range(len(q)):
    sum.append(ord(q[i]))

# 暴力破解（因為ASCII最大就126）
for i in range(len(sum)):
    for j in range(126):
        if (sum[i] - (j << 8)) <= 126 and (sum[i] - (j << 8)) >= 0:
            print(chr(j) + chr(sum[i] - (j << 8)) ,end = "")
```
破解完就得到旗子了，```picoCTF{16_bits_inst34d_of_8_e703b486}```
