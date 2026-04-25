---
title: picoCTF Flag Hunter
published: 2025-10-28
slug: "reverse-1"
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

## Intro

Since Gold Shield Award keeps asking reverse, plus recently took assembly. So starting a one-reverse-per-day movement. ***A Reverse a day keeps the zero-days away.*** Current target is finish pico first, then see what's next after finishing.

## Problem
[Problem link](https://play.picoctf.org/practice/challenge/472?category=3&page=1)

This problem gives a python file at the start:
```python
import re
import time


# Read in flag from file
flag = open('flag.txt', 'r').read()

secret_intro = \
'''Pico warriors rising, puzzles laid bare,
Solving each challenge with precision and flair.
With unity and skill, flags we deliver,
The ether's ours to conquer, '''\
+ flag + '\n'
```

From here can know it puts flag in `secret_intro`. This time's target is to print it, to get the flag.
```python
reader(song_flag_hunters, '[VERSE1]')
```  
But, from this last line can see, it's reading from `'[VERSE1]'`. So it won't print flag at all.

After reading, let's connect ~~it will sing to you~~ — actually just prints lyrics.
```text
[REFRAIN]
We're flag hunters in the ether, lighting up the grid,
No puzzle too dark, no challenge too hid.
With every exploit we trigger, every byte we decrypt,
We're chasing that victory, and we'll never quit.
CROWD (Singalong here!);
RETURN

[VERSE1]
Command line wizards, we're starting it right,
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

Binary sorcerers, let's tear it apart,
Disassemble the code to reveal the dark heart.
From opcode to logic, tracing each line,
Emulate and break it, this key will be mine.
Debugging the maze, and I see through the deceit,
Patch it up right, and watch the lock release.

REFRAIN;

Ciphertext tumbling, breaking the spin,
Feistel or AES, we're destined to win.
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
In the world wide labyrinth, we're never lost.

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

## Analysis
From code below can see, it checks if special words are added to lyrics — if yes execute corresponding function, if no continue printing.
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
      crowd = input('Crowd: ')  # Here can input
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

Can use changing the `crowd` value to test this guess. For example, I type `;REFRAIN` when inputting. Semicolon to end previous text, otherwise whole text treated as normal string.

![example](https://img.windson.cc/images/reverse/flag-hunter/example-1.webp)

This test very successful — because typed `;REFRAIN`, so every time reaching `crowd`, it jumps back to `REFRAIN` to print rest. Can test other ones yourself. Knowing this, can get flag!

## Solution
We already know flag hidden at top, and reader doesn't read from start. So just need to find a way to jump to top. This code seems to let us jump far:
```python
elif re.match(r"RETURN [0-9]+", line):
        lip = int(line.split()[1])
```
It's a regex expression. When format matched, can jump wherever we want. Our goal is to make it start printing from top — so jump to 0!

![Here is the flag](https://img.windson.cc/images/reverse/flag-hunter/flag.webp)