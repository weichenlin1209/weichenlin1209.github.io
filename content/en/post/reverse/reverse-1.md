+++
title = 'Flag Hunter'
date = 2025-10-28T22:36:00+08:00
draft = false
url = "/post/reverse-1/"
tags = ["PicoCTF" ,"Reverse"]
categories = ["CTF"]
layout = "post"

image = "/images/reverse/cover.webp"
+++
> ***A Reverse a day keeps the zero-days away***
<!--more-->
## Intro
Since the Golden Shield contest keeps testing reverse challenges, and I’m also taking Assembly this semester, I’ve decided to start a “One Reverse per Day” movement. 

***A Reverse a day keeps the zero-days away.***

For now, my goal is to finish all the picoCTF reverse problems. What will I do after that? I’ll figure it out when I get there.

## Flag Hunter 
[Challenge Link](https://play.picoctf.org/practice/challenge/472?category=3&page=1)

The challenge gives you a Python file at the start:
```
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

From this, it’s clear that the flag is stored inside `secret_intro`.  
Our goal is to print it out and retrieve the flag.

```
reader(song_flag_hunters, '[VERSE1]')
```

But as we can see from the line above, it starts reading from `'[VERSE1]'`, so it never actually prints the flag at the top.  

After understanding that, let’s connect and run it. ~~It’ll “sing” for you~~ — basically, it just prints out the lyrics:
```
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

## Analysis
Looking at the code below, we can see that it checks for special keywords in the lyrics and executes certain actions when found. If not, it simply prints the line and moves on.
```
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
      crowd = input('Crowd: ')  # we can input here
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

We can take advantage of the `crowd` input to test this theory.   For example, if we input `;REFRAIN`, the semicolon will close the previous line so that what follows is treated as a new command rather than plain text.

![example](/images/reverse/flag-hunter/example-1.webp)

The test worked perfectly — by typing `;REFRAIN`, we forced it to loop back to the `REFRAIN` section every time it reached `crowd`.  
You can experiment with other commands as well. 
Now that we understand this, we can move on to extracting the flag!

## Solution  
We already know the flag is hidden at the very top, and the reader doesn’t start from there. 
So we just need a way to jump back to the beginning. The following snippet looks promising:
```
elif re.match(r"RETURN [0-9]+", line):
        lip = int(line.split()[1])
```

This regular expression lets us jump to any line number if the format matches.  
Our goal is to make it start printing from the top — so let’s make it jump to 0!

![Here is the flag](/images/reverse/flag-hunter/flag.webp)
