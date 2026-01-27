---
title: picoCTF Flag Hunter
published: 2025-10-28
slug: "reverse-1"
tags: [PicoCTF ,Reverse]
category: CTF
licenseName: "CC BY-NC-SA 4.0"
author: Windson
draft: false
cover: "https://img.windson.cc/images/reverse/cover.webp"
description: A Reverse a day keeps the zero-days away
---

> ***A Reverse a day keeps the zero-days away***
<!--more-->

## Intro
因為金盾獎一直考reverse，加上最近修了組語。所以我要發起一天一Reverse運動。***A Reverse a day keeps the zero-days away.*** 現在的目標是把pico先做完，做完要做什麼？等做完再說吧。

## 題目 
[題目連結](https://play.picoctf.org/practice/challenge/472?category=3&page=1)

這題一開始會給一個python檔
```python
import re
import time


# Read in flag from file
flag = open('flag.txt', 'r').read()

secret_intro = \
'''Pico warriors rising, puzzles laid bare,
Solving each challenge with precision and flair.
With unity and skill, flags we deliver,
The ether’s ours to conquer, '''\
+ flag + '\n'
```

從這邊就可以知道它把flag放在 ```secret_intro``` 裡面，這次的目標就是要把它印出來，就可以拿旗子了。
```python
reader(song_flag_hunters, '[VERSE1]')
```  
但是呢，從最後上面這行可以看到，他是從 ```'[VERSE1]'``` 這個地方開始讀檔的。所以根本不會印出flag。  

看完了之後呢，就連上去看看吧。~~它會唱歌給妳聽~~，其實就是印歌詞。
```text
[REFRAIN]
We’re flag hunters in the ether, lighting up the grid,
No puzzle too dark, no challenge too hid.
With every exploit we trigger, every byte we decrypt,
We’re chasing that victory, and we’ll never quit.
CROWD (Singalong here!);
RETURN

[VERSE1]
Command line wizards, we’re starting it right,
Spawning shells in the terminal, hacking all night.
Scripts and searches, grep through the void,
Every keystroke, we're a cypher's envoy.
Brute force the lock or craft that regex,
Flag on the horizon, what challenge is next?

REFRAIN;

Echoes in memory, packets in trace,
Digging through the remnants to uncover with haste.
Hex and headers, carving out clues,
Resurrect the hidden, it's forensics we choose.
Disk dumps and packet dumps, follow the trail,
Buried deep in the noise, but we will prevail.

REFRAIN;

Binary sorcerers, let’s tear it apart,
Disassemble the code to reveal the dark heart.
From opcode to logic, tracing each line,
Emulate and break it, this key will be mine.
Debugging the maze, and I see through the deceit,
Patch it up right, and watch the lock release.

REFRAIN;

Ciphertext tumbling, breaking the spin,
Feistel or AES, we’re destined to win.
Frequency, padding, primes on the run,
Vigenère, RSA, cracking them for fun.
Shift the letters, matrices fall,
Decrypt that flag and hear the ether call.

REFRAIN;

SQL injection, XSS flow,
Map the backend out, let the database show.
Inspecting each cookie, fiddler in the fight,
Capturing requests, push the payload just right.
HTML's secrets, backdoors unlocked,
In the world wide labyrinth, we’re never lost.

REFRAIN;

Stack's overflowing, breaking the chain,
ROP gadget wizardry, ride it to fame.
Heap spray in silence, memory's plight,
Race the condition, crash it just right.
Shellcode ready, smashing the frame,
Control the instruction, flags call my name.

REFRAIN;

END;
```

## 分析
從下面的程式碼可以看到，它判斷沒有特殊的詞被加在歌詞裡面，如果有就執行相對的功能，沒有就繼續往下印。
```python
# Print lyrics
line_count = 0
lip = start
while not finished and line_count < MAX_LINES:
  line_count += 1
  for line in song_lines[lip].split(';'):
    if line == '' and song_lines[lip] != '':
      continue
    if line == 'REFRAIN':
      song_lines[refrain_return] = 'RETURN ' + str(lip + 1)
      lip = refrain
    elif re.match(r"CROWD.*", line):
      crowd = input('Crowd: ')  # 這邊可以輸入
      song_lines[lip] = 'Crowd: ' + crowd
      lip += 1
    elif re.match(r"RETURN [0-9]+", line):
      lip = int(line.split()[1])
    elif line == 'END':
      finished = True
    else:
      print(line, flush=True)
      time.sleep(0.5)
      lip += 1
```
我們可以藉由改變 ```crowd``` 的值， 來測試一下這個猜想。比如說，我在輸入時打入```;REFRAIN```。分號是為了讓前面的前面的文字結束，否則整個文字都會被當成一般字串。

![example](https://img.windson.cc/images/reverse/flag-hunter/example-1.webp)

這個測試非常成功，因為我打了 ```;REFRAIN``` ，所以導致每次到 ```crowd``` 的時候，它都會跳回去 ```REFRAIN``` 繼續印，其他的可以自己測試看看。知道這件事之後就可以來拿旗子了！  

## 解答 
我們已經知道flag躲在最上面，而且reader不是從頭開始讀的。所以我們只要有辦法跳到最上面就行了。看起來有辦法讓我們跳遠的程式就是下面這段
```python
elif re.match(r"RETURN [0-9]+", line):
        lip = int(line.split()[1])
```
他是一個正則表達式。只要寫對格式，想跳到哪就跳去哪。我們的目的地就是讓它從頭開始印，那就讓它跳到0吧！

![Here is the flag](https://img.windson.cc/images/reverse/flag-hunter/flag.webp)
