---
title: Useful Software
published: 2025-12-05
description: Due to reinstalling the system, all software had to be re-downloaded. Might as well share some recommendations
category: Technology
licenseName: "CC-BY-SA 4.0"
slug: "good-app"
cover: "https://img.windson.cc/images/2025/12/good-app/cover.avif"

author: Windson
draft: false
---

## McBopomofo
[Download](https://github.com/openvanilla/fcitx5-mcbopomofo)

There are actually many Chinese input methods on Linux, but this one is the smartest. It remembers what you're trying to type. If it doesn't remember, you can manually add to the dictionary.
```text
~/.local/share/fcitx5/mcbopomofo/data.txt
```
The dictionary is in this file. If I want to add to the dictionary: *Pasta should be mixed with concrete*
```text
Pasta should be mixed with concrete yi-da-li-mian-jiu-ying-gai-ban-hun-ning-tu
```
Just add ```-``` between each character.  
***

## Syncthing 
[Download](https://apt.syncthing.net/)  

A great tool for syncing files—password vaults, music, McBopomofo dictionary... can also be used for backups. The setup is a bit tricky though, not beginner-friendly. For detailed setup, check the [official docs](https://docs.syncthing.net/)  
***
## KeePassXC
[Download](https://keepassxc.org/download/#linux)

Password manager—lets you have a different password for every system, reducing hacking risk. Can also generate passwords, of course those super long complex ones you'd never remember. Since using this, I haven't memorized a single password. No more cycling through several passwords—security up up up.
***
## RealVNC
[Download](https://www.realvnc.com/en/connect/download/viewer/)

Remote desktop—I use this to connect to my Raspberry Pi. The Pi's default also seems to use this for the server version. It has shared clipboard functionality, very handy.
***
## Tailscale
[Download](https://tailscale.com/download)  

My VPN—mainly to make Syncthing work properly. Uses internal network penetration to put every device on the same local network, so I can sync data. Of course, you can also use it to play Minecraft.  

***
## VS Code
[Download](https://code.visualstudio.com/)

I think this can be downloaded directly with ```apt```, but this time it wouldn't let me. So I had to find it online. Great tool for coding, can render markdown and mermaid. Want to use LaTeX? Of course you can—install the extension and you're good. Also has git tools built in, no need to use CLI for uploads.

## Signal
[Download](https://signal.org/en/download/)

My main communication app nowadays. Instagram and LINE are both not great—one shoves ads at you, the other holds you hostage with algorithms. So this is my open-source alternative. No ads currently, stickers are free, clean interface, and you can post stories. When the day comes to escape big tech control, it's definitely the top choice.
***
## AdNauseam
[Download](https://adnauseam.io/)

Super shameless ad blocker—in addition to blocking ads, it clicks on all of them in the background. For details, check Wiwi's [article](https://wiwi.blog/blog/adnauseam/). It's a Firefox extension, ~~quickly install it and waste the advertisers' money.~~