+++
title = 'Diary | 25/10/26'
date = 2025-10-26T16:06:53+08:00
draft = false
url = "/post/diary-3/"
tags = ["Diary"]
categories = ["Life"]
layout = "post"

image = "/images/diary-cover.webp"
+++  
*It’s been a while since my last post, just felt like writing something today.*
<!--more-->
After dropping the orientation camp, life has been much more relaxed — though there’s still plenty to do. Midterms have just started, and I’ve learned the downside of not taking any general education courses: ***“Every single class has a midterm!”*** For the next three weeks, I’ll have an exam every week. Not asking for much — as long as I pass, that’s good enough.

## Golden Shield Award
Last Saturday, I went to compete in the Golden Shield with [Each Chen](https://www.iach.cc). Turns out our senior’s advice was spot-on — he said it was basically a “psychic guessing contest.” Out of the whole test, we’re only sure about one crypto question; the rest were all like: *“Hmm, maybe it’s this?” “Yeah, looks about right.”*  
Even though we were totally guessing, I’m sure we weren’t the only ones. Supposedly, about half of the teams get eliminated this round — hopefully we make it to the finals. ~~Also, finalists get a Golden Shield T-shirt~~.  

Anyway, it wasn’t a total loss; at least I learned that reverse engineering is a big focus. So, I’ll start doing one reverse challenge per day. d(`･∀･)b  
Here’s a photo for memory’s sake:  

![ReversIsHard](/images/2025/10/diary-3/ReverseIsHard.webp)  

## Guitar Club
### Club Sessions  
Funny enough, the first time I seriously attended a guitar class was when I became an instructor — since I’d never actually joined one before. In two weeks, I’ll be teaching on stage. As someone who never took any lessons before, these few weeks have been about observing and learning. Walking around the class is actually kind of fun, ~~let’s not talk about those who can’t get a sound out yet~~.  
Watching them struggle with the F chord reminds me of my own painful beginnings — they’ll have to overcome barre chords soon too. Overall, teaching is actually really enjoyable.  

### So Many Performances  
Next week, I’ll be performing — two days in a row, actually. There’s still one song I haven’t fully memorized, so I’ll need to practice hard after this week’s tests. It’ll be my first time performing at such a big event; there’ll probably be a ton of people. I don’t get nervous in the small auditorium since you can’t really see the audience, but the Green River stage is outdoors — I’ll definitely see everyone clearly. And the next day there’s the cocktail performance, which will have even more people. Also, the Christmas concert songs are set — ~~well, just two~~, but I’m playing lead guitar for both. Time to start practicing seriously.  

## Raspberry Pi
My Raspberry Pi needs a 5V/5A power supply, which basically doesn’t exist on the market. Because of the unstable power, my HDD often failed after spinning up just a bit. So, I bought the official power supply this week, along with an SSD hat and active cooling. 
 
Next, I’m planning to make the SSD the boot drive and migrate all data from the microSD card. When I went to buy the SSD, I found out there are many different form factors, and the official hat only supports short ones — looks like only 2230 and 2242 sizes fit. I’ll deal with it after exams.  

## Math Symbols
While writing this post, I realized this theme supports math notation — so, let’s solve a differential equation for fun. This was the last question on last year’s midterm, though it wasn’t that difficult.

### Q7
Let $p(t)$ be the mouse population after $t$ months, satisfying the differential equation:

$$
\frac{dp}{dt} = 0.5p - 450
$$

(a) Find the time $t$ when the population becomes extinct if $p(0) = 800$.

(b) Find the initial population $p_0$ if the population is to become extinct in 1 year. 

#### Solution
- (a)
  
  $\frac{dP}{dt} - \frac{1}{2} P = -450 ,\text{ take } \mu(t) = e^{-\frac{1}{2}t}$

  $e^{-\frac{1}{2}t}P = -450 \int{e^{-\frac{1}{2}t}} dt = 900 e^{-\frac{1}{2}t} + C$

  $P(0) = 900 + Ce^{\frac{1}{2}t}$

  $P(0) = 900 + C = 800,\quad C = -100$

  $\text{Hence, } P(t) = 900 - 100e^{\frac{1}{2}t} = 0, e^{\frac{1}{2}t} = 9, t = 2\ln 9$  

- (b)
  
  $P(t) = 900 - Ce^{\frac{1}{2}t}$

  $P(0) = 900 - C = p_{0}\ \Rightarrow P(t) = 900 - (900-p_0)e^{\frac{1}{2}t}$

  $P(12) = 900 - (900-p_0)e^6 = 0 \Rightarrow p_0 = 900(1-e^{-6})$
