+++
title = 'Transformation'
date = 2025-10-29T16:36:00+08:00
draft = false
url = "/en/post/reverse-2/"
tags = ["PicoCTF" ,"Reverse"]
categories = ["CTF"]
layout = "post"

image = "/images/reverse/cover.webp"
+++
> ***A Reverse a day keeps the zero-days away***
<!--more-->

## Question
[Challenge Link](https://play.picoctf.org/practice/challenge/104?category=3&page=1)  

The challenge provides a file that looks like this:
```
灩捯䍔䙻ㄶ形楴獟楮獴㌴摟潦弸彥㜰㍢㐸㙽

.join([chr((ord(flag[i]) << 8) + ord(flag[i + 1])) for i in range(0, len(flag), 2)])
```
Clearly the encoding went wrong, which is why you see that garbled text. If we reverse the transformation, everything becomes fine. The code snippet below (attached in the challenge description) shows the encoding process: it splits the flag into pairs of characters, converts each to their ASCII values, multiplies the first by 256 and adds the second, then turns the result into a character with `chr()` — which yields the strange string we see.

## Solution
Just write a script to reverse the process. The challenge used Python, so here’s a Python solution:
```
q = "灩捯䍔䙻ㄶ形楴獟楮獴㌴摟潦弸彥㜰㍢㐸㙽"
sum = []

# decoding ASCII
for i in range(len(q)):
    sum.append(ord(q[i]))

# brute-force (ASCII max is about 126)
for i in range(len(sum)):
    for j in range(126):
        if (sum[i] - (j << 8)) <= 126 and (sum[i] - (j << 8)) >= 0:
            print(chr(j) + chr(sum[i] - (j << 8)) ,end = "")
```

Running this recovers the flag: ```picoCTF{16_bits_inst34d_of_8_e703b486}```
