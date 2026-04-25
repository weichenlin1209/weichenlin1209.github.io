---
title: Weekly Diary | 25/10/26
published: 2025-10-26
slug: "diary-3"
tags: [Journal]
category: Life
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
cover: "https://img.windson.cc/images/diary/diary-cover.webp"
---

_Long time no post, bored so here it is._

<!--more-->

After dropping camp, life is pretty chill — but there's actually still a lot to do. Recently I'm at the start of midterm hell, and I'm really feeling the downside of not taking general education courses: **_"Every single class has midterms!"_** For the next three weeks, there's a test every week. Not asking for much, just need to pass.

## Gold Shield Award

Last Saturday went to play the Gold Shield with [Each Chen](https://www.iach.cc). The senior's advice was really good. He said it's basically a divination contest. Looking at the entire exam, the only thing we're sure we got right was one crypto problem. Everything else was: _"This should be it"_ / _"Yeah, seems reasonable."_ The whole thing was pure divination, but we weren't the only ones feeling confident. This time it seems like half the teams got eliminated. Hope we make it to the finals, ~~if we do, there's Gold Shield shirts~~. Actually, not getting zero收获 after the competition — at least I know they're big on reverse. I'm going to start doing one reverse problem a day from now on. Want to start when I can start d(`･∀･)b. Here's a commemorative photo:

![ReversIsHard](https://img.windson.cc/images/2025/10/diary-3/ReverseIsHard.webp)

## Guitar Club

### Club Class

First time actually taking a guitar lesson seriously was when I had to teach — porque I never took any guitar lessons before. In two weeks I'll be teaching. Someone who's never taken guitar lessons teaching others — these past few weeks I've been watching and learning. It's fun watching around ~~not going to discuss the part about not being able to make sound~~. Watching them struggle with F chord brings back memories of how painful it was when I first started. They still have barre chords to overcome. Anyway, teaching is pretty fun.

### Many Performances

Performance next week, two days straight. One song's chord progression I haven't memorized yet — after this week's tests, I've got to practice hardcore. First time performing at a big venue, feels like there'll be a ton of people. At the small chapel I'm not nervous just because you can't see the audience. Green River's outdoor venue, you'll see everything clearly. And the next day there's Cocktail's performance, even more people. Also learned a lot of songs for Xmas night recently ~~actually just two~~, both are lead — gotta practice fast.

## Raspberry Pi

The Raspberry Pi needs a 5V/5A power supply, but they don't exist on the market. With unstable power, my HDD keeps getting bad sectors after just a couple spins. So this week I bought the original power supply. Also got an SSD hat and active cooling. Next, I'm going to make the SSD the boot drive and move everything from the microSD over. When going to buy the SSD, I found out it has a lot of specs, but the original is quite short. So far I've found it can only fit 2230 and 2242. After exams, I'll deal with it.

## Math Symbols

While writing this, I found out this theme can type math symbols. Since I can, let me solve a differential equation problem. This was last year's midterm last problem, but it's not that hard.

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