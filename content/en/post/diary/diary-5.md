+++
title = 'Weekly Journal | 25/11/21'
date = 2025-11-21T23:00:00+08:00
draft = false
url = "/zh/post/diary-5/"
tags = ["Weekly Journal"]
categories = ["Life"]
layout = "post"

image = "images/diary/diary-5/cover.webp"
+++  

## TL;DR
After a long month of exams, I finally finished everything this week. But right after the exams, I need to start preparing for the Guitar Club’s freshman welcome event, and next week we even have the department BBQ. It feels like once events are over, it’ll already be time for finals — ~~which basically means it’s time to start preparing for winter break~~.

<!--more-->
## Eating Eating Eating
Recently we discovered a really good tofu pudding shop near the school. Well, *I* didn’t discover it — I just went there to eat.

### Mu Tofu Pudding    
A very tasty [tofu pudding shop](https://maps.app.goo.gl/281i54Z1H8eqgewF7), so good that we went two days in a row. Even though it’s a tofu pudding shop, we only ate shaved ice there. The weather lately doesn’t really make ice a good idea though.

![Delicious tofu pudding](images/diary/diary-5/eat.webp)


## Guitar Club
### Club Class  
A self-taught kid teaching guitar class for the first time — and unsurprisingly, it went terribly. Based on the previous classes, I realized that most people simply can’t keep up, whether it’s a senior teaching or a staff-taught lesson. So this time I picked an extremely easy song ——— [“Embrace” by Mayday](https://www.youtube.com/watch?v=lvDa3r1pNuE). This song only has four chords from start to end, and aside from $D_m7$, you don’t even need to press two strings with one finger. The intro is just T121 — a perfect beginner’s song.  

But that’s exactly why things went wrong. It was *too* simple. I finished teaching in about half an hour, including waiting for people to arrive and playing the original track. But I couldn’t just end a two-hour class in thirty minutes, so I started teaching variations — muting, percussive hits — everything. And that only took another fifteen minutes. After running through the song twice more, I had nothing else to teach. So I opened a Q&A session… but the song is so simple that there was nothing to ask. So everyone started chatting until nine. Dismissed!  

Next time I’ll teach something harder, like: [Planet](https://www.youtube.com/watch?v=Zn8M6mcGNoo), [Star](https://www.youtube.com/watch?v=l--9Ru69jTY), or [Starry Night](https://www.youtube.com/watch?v=RTUwaCImChM). Still haven’t really decided — anyway, there’s still time.  

### Song Review
The purpose of this review session was to let freshmen perform more, and to pick songs that the audience would enjoy. So aside from the groups that were below the passing line, all freshman groups were allowed on stage. Even the ones who didn’t get to perform still showed huge improvement during the first and second reviews. It reminded me of how I went through the same process before.  

Watching the selection team decide songs this time, I finally understood why it’s so hard to be on that team. Basically because ~~the mascot can talk~~ everyone’s skill level is roughly the same, and eliminating someone’s song feels awful. In the end they were all cutting their *own* songs instead. Yeah… this job is better avoided next time.  

### Random Thoughts
Even though there were a *lot* of problems with song selection this time, I feel like I got closer to the people in the Guitar Club[^1]. After this week’s chaos, we even went for late-night snacks and played games together. It’s just that there were so many issues this time that we almost wanted to resign as a group — well, just saying. Hopefully it *stays* just talk.

[^1]: And of course, I mean the sophomores.

## Input Method
### New Keyboard
[Last time](/zh/post/diary-4/#鍵盤) I mentioned that my keyboard was broken, but the one I wanted had already been discontinued. But… I realized it *really* needed to be replaced. Not only the L key — even the period key was dying. So I went to NOVA again. This time I only browsed the Mitsui section on B1.  

The clerk came running up to talk to me the moment he saw me. He said it was his first day at work, and when it comes to keyboards, he personally would only buy [this one](https://www.logitech.com/zh-tw/shop/p/alto-keys-k98m). He has brand faith — he always buys ROG. If I didn’t like anything there, I should buy ROG. ~~Except he was literally wearing a Logitech badge~~.  

In the end, I bought the one he recommended. Aside from being slightly loud, it’s actually pretty good.  

![AltoKeys](/images/diary/diary-5/AltoKeys.webp)

But [Logi’s app doesn’t support Linux](https://support.logi.com/hc/en-us/articles/360025297893-Logitech-Options). Terrible. If I want to use it, I’d have to install Windows myself — I’ll look into it when I’m free.  

### McBopomofo
For Chinese input on Linux, there are basically two options: [Chewing](https://chewing.im/) and [McBopomofo](https://mcbopomofo.openvanilla.org/). At first I thought: since I changed my keyboard, why not change my input method too? Turns out it’s actually really good.  

It has a customizable dictionary, and you can manually add frequently used characters (I added several while typing this post). After that, you don’t need to pick from a selection list when typing those words anymore. Goodbye Chewing — I’m sticking with McBopomofo.

## Tech Research

### RssHub
It’s an online open-source service. The main reason I’m using it right now is to subscribe to Instagram. This way I don’t need to log in to see my friends’ stories and posts — Instagram’s walled-off information is now mine to steal.  

I created a new Instagram account called **rss.windson** for scraping, then set up a proxy so Instagram won’t think I’m a bot. Inside the container, I tested with `curl -x`, and the password works. But no matter what I do now, it returns a NotFoundError. Possibly my environment variables are misconfigured — still looking for a fix. Once solved, the detailed process will become its own post.

### Cloning My Student ID
While eating with [Each Chen](https://www.iach.cc) a few days ago, I discovered that Samsung Wallet can clone access cards. So I took out my [Flipper](https://www.iach.cc/start-flipper/) to simulate my student ID, then cloned it into the phone. Testing it at the back door of the old male dorm — the phone card worked! That means at least the card number was successfully extracted. ~~It’s an official method, of course it works~~.  

Then I used the Flipper to clone the card stored in my phone again — **and all sectors were unlocked**. Next, I’ll try it at the department library to see if it’s truly fully cracked.  
