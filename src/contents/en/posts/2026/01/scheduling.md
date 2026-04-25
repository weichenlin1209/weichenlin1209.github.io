---
title: Scheduling
published: 2026-01-13
slug: "scheduling"
tags: []
category: Life
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
cover: "https://img.windson.cc/images/2026/01/scheduling/cover.webp"
---

Before winter break started, in the midst of finals hell, I thought: winter break is two months long, I must do something. So I listed a bunch of things:

1. Pwn
2. CCNA
3. Discrete Mathematics
4. Build a computer
5. Play [Elden Ring](https://store.steampowered.com/app/1245620/ELDEN_RING/)
6. Get [this girl](https://act-webstatic.hoyoverse.com/puzzle/hk4e/pz_LwGS1oxt0J/resource/puzzle/2025/12/22/c5bbb925d7e1bf1919c3f69a3f591911_6907148233834562988.png?x-oss-process=image/format,webp/quality,Q_100) in Genshin
7. Learn git, HTML, CSS
8. Binge watch shows

Just listing them out made things pile up. Now half of winter break is over and I've only learned a tiny bit of Pwn, watched lots of shows, and built the computer. Everything else is just sitting in the Ready queue, starving. If this continues, I might only watch more and more shows by the time school starts. I need a method to plan my time—at least make progress on everything.

To make discussion easier, first define these terms:  
- **Wait time**: From deciding to do something to actually starting it
- **Turnaround time**: From deciding to do something to completing it

## FCFS
**FCFS (First come, first served)**, first thought of gets handled first, or first come first served. Only one thing at a time, and you must finish before starting the next. Since each task takes different amounts of time, the order affects average completion time. Sounds wordy, so here's an example:

|Task|Estimated time to complete|
|---|---|
|$P_1$|24|
|$P_2$|3|
|$P_3$|3|

- **Processing order: $P_1 \rightarrow P_2 \rightarrow P_3$**  
    - Average wait time: $\frac{0+24+27}{3} = 17$  
    - Average turnaround time: $\frac{24+27+30}{3} = 27$  

Here you can see: if you push long tasks back, average wait time decreases. So change it to:

- **Processing order: $P_2 \rightarrow P_3 \rightarrow P_1$**  
    - Average wait time: $\frac{0+3+6}{3} = 3$  
    - Average turnaround time: $\frac{3+6+30}{3} = 13$  

After swapping, wait time shortened. Meaning ~~when a bunch of people ask you to do things, they'll wait less~~.

## SJF
**SJF (Shortest Job First)**, shortest tasks first. Based on the previous discussion, we found that doing shorter tasks first reduces average wait time and turnaround time. Doing shortest tasks first gives the shortest average wait time (average time everyone waits for you to finish is shortest). But this is impractical—we won't know exactly how long a task takes until we finish it. We can only ~~communicate with spirits~~ predict.

***

The discussion above is missing one variable. During finals, today you need to discuss a general education report, tomorrow you have an elective report, and ~~the day before yesterday the club president threw you a club activity results spreadsheet that still isn't written~~. Tasks don't appear at exactly one moment in time—they have an order. So add one definition:  
- **Arrival time**: The moment you receive this task—it's a point in time, not a duration.

## Shortest Remaining Time First
**Shortest remaining time first**, shortest remaining time gets handled first, is the preemptive version of **SJF** (can cut in line). Example:
|Task|Arrival time|Estimated time to complete|
|---|---|---|
|$P_1$|0|8|
|$P_2$|1|4|
|$P_3$|2|9|
|$P_4$|3|5|

The execution order changes like this—let the task with shortest remaining time at the current moment go first:

![](https://img.windson.cc/images/2026/01/scheduling/srtf.webp)

- Average wait time: $[(17-8-0)+(5-4-1)+(26-2-9)+(10-3-5)] / 4 = 6.5$  
- Average turnaround time: $[(17-0)+(5-1)+(26-2)+(10-3)] / 4 = 13$  

***

All these scheduling methods have problems. If short tasks keep cutting in, interrupting longer tasks, then long tasks might never get their turn—they'll starve in the Ready queue, wait time getting longer and longer, still not done by deadline. To avoid situations where things don't get finished, next up is Round Robin.

## Round Robin
This method is less related to the previous ones. First, set a time quantum—each task's time slice. If a task doesn't finish within this slice, it must go back to the queue and we process the next thing. When its turn comes again, we continue it. For example, today you need to write Calculus, Linear Algebra, and General Physics. Set the quantum to one hour. First write Calculus for one hour, regardless of completion you must switch to Linear Algebra; then write Linear Algebra for one hour, regardless of completion you must switch to General Physics. After three hours pass, return to write Calculus, rotating like this until everything is done.

The art of this method is how to set the quantum. If it's too large, every task completes within one interval, behaving like FCFS—there's no point setting a quantum. If it's too small, you're always in the middle of switching. Example with 3 minutes: you need to do Calculus. Pull out tablet and open Calculus homework, find the problem to write (30 seconds), read the problem (2 minutes), write for 30 seconds—congrats, time to switch to Linear Algebra. Actual writing time becomes very short, constantly switching.

***

If you understood all of the above, congratulations—you've learned half of the *Operating Systems -- CPU Scheduling* unit. This idea has been sitting in draft pile for half a semester. When I was learning this unit, I realized process execution and humans handling tasks are actually similar. It's just that this task's priority wasn't high, staying in the Waiting queue and starving. Today, feeling inspired ~~has it been too long since I posted~~, I took it out of drafts to complete. This Round Robin cycle is done. Time to go binge watch shows.