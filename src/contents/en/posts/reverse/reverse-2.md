---
title: picoCTF Transformation
published: 2025-10-29
slug: "reverse-2"
tags: [PicoCTF ,Reverse]
category: CTF
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
cover: "https://img.windson.cc/images/reverse/cover.webp"
description: A Reverse a day keeps the zero-days away

---

> ***A Reverse a day keeps the zero-days away***
<!--more-->


## Problem
[Problem link](https://play.picoctf.org/practice/challenge/104?category=3&page=1)

First gives a file, looks like this:
```text
灩捯䍔䙻ㄶ形楴獟楮獴㌴摟潦弸彥㜰㍢㐸㙽

.join([chr((ord(flag[i]) << 8) + ord(flag[i + 1])) for i in range(0, len(flag), 2)])
```
Obviously encoded wrong, that's why appears gibberish. Just decode back, and it's fine. Below is encoding program attached to problem description. It first splits entire flag into pairs, converts both to ASCII, multiplies first by 256 then adds second. Finally `chr()` becomes what we see.

## Solution
Just write a program to reverse — problem uses python, so use python:
```python
q = "灩捯䍔䙻ㄶ形楴獟楮獴㌴摟潦弸彥㜰㍢㐸㙽"
sum = []

# Convert encoding back to ASCII
for i in range(len(q)):
    sum.append(ord(q[i]))

# Brute force (since ASCII max is 126)
for i in range(len(sum)):
    for j in range(126):
        if (sum[i] - (j << 8)) <= 126 and (sum[i] - (j << 8)) >= 0:
            print(chr(j) + chr(sum[i] - (j << 8)) ,end = "")
```
After solving, get flag: `picoCTF{16_bits_inst34d_of_8_e703b486}`