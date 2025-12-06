+++
title = 'picoCTF SansAlpha'
date = 2025-12-06T16:30:00+08:00
draft = false
url = "/en/post/picoCTF-SansAlpha/"
categories = ["CTF"]
layout = "post"

image = "/images/2025/12/sansalpha/cover.webp"
+++  

Work was really boring today, with almost no students showing up—probably because many schools were having their school anniversary events, plus midterms just ended. Since no one came to ask questions, I played a bit of CTF, and this one was the most interesting today.

## Challenge
[![](/images/2025/12/sansalpha/question.webp)](https://play.picoctf.org/practice/challenge/436?category=5&difficulty=2&page=1)  

> Simply put, find the flag, but you can only use numbers and most symbols.

## Solution

![](/images/2025/12/sansalpha/picture1.webp) 

Once connected to the test environment, text commands indeed couldn’t be used.  
But we *could* use `?` and `*` to see where we currently are.

![](/images/2025/12/sansalpha/picture2.webp)  

After some random testing, I located the file containing the flag.  
However, I couldn’t view its content directly, so I used base64 to print it out.

Why not use echo? 
    $ /???/???? # /bin/bash or /bin/echo are both possible

If you do this, the system won’t know which command you’re trying to use, and will treat them all as invalid.  
So instead, I used `base64`, which contains a number.

![](/images/2025/12/sansalpha/picture3.webp) 

But `/????64` could match either `base64` or `x86_64`.  
The system wouldn’t understand that either.  
So we need to ensure the fourth character is *not* an underscore.  
We change it to `/???[!_]64`.  
This leaves only `base64` as the valid match, so the system can interpret it correctly.

![](/images/2025/12/sansalpha/picture4.webp)

Finally, just decode the output from `base64`.

![](/images/2025/12/sansalpha/picture5.webp)
