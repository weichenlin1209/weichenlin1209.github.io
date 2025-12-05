+++
title = "Useful Software"
date = 2025-12-05T15:30:00+08:00
draft = false
url = "/en/post/good-app/"
categories = ["Technology"]
layout = "post"

image = "/images/2025/12/good-app/cover.avif"
+++  

> Since I reinstalled my system, I have to reinstall all my software. So I figured I’d take the chance to share some recommendations.

## McBopomofo
[Download](https://github.com/openvanilla/fcitx5-mcbopomofo)

There are many Chinese input methods on Linux, but this one is the smartest. It remembers the words you want to type, and if it doesn't remember them, you can manually add entries to its dictionary.
```
    ~/.local/share/fcitx5/mcbopomofo/data.txt
```
The dictionary is stored in this file. If I want to add: *義大利麵就應該拌混泥土*
```
    義大利麵就應該拌混泥土 ㄧˋ-ㄉㄚˋ-ㄌㄧˋ-ㄇㄧㄢˋ-ㄐㄧㄡˋ-ㄧㄥ-ㄍㄞ-ㄅㄢˋ-ㄏㄨㄣˇ-ㄋㄧˊ-ㄊㄨˇ
```
Just add a hyphen ```-``` between each character.  
***

## Syncthing 
[Download](https://apt.syncthing.net/)  

A great tool for syncing files—such as password databases, music, McBopomofo dictionaries… It can also be used for backups. However, the setup is a bit complicated and not very beginner-friendly. For detailed configuration, please refer to the [official documentation](https://docs.syncthing.net/).  
***
## KeepassXC
[Download](https://keepassxc.org/download/#linux)

A password manager that lets every password in your system be different, reducing the risk of getting hacked. It can also generate extremely long and complex passwords you’ll never need to remember yourself. Ever since using this, I’ve stopped memorizing passwords and no longer rotate through a few shared ones. Security up up up.
***
## RealVNC
[Download](https://www.realvnc.com/en/connect/download/viewer/)

This is a remote desktop application, and I use it to connect to my Raspberry Pi. The default server on Raspberry Pi seems to be RealVNC as well. It also supports clipboard sharing—very useful.
***
## Tailscale
[Download](https://tailscale.com/download)  

My VPN of choice, mainly to ensure Syncthing can function reliably. It creates a virtual LAN across devices using NAT traversal so I can sync data smoothly. And of course, it can also be used to play Minecraft.  
***
## VScode
[Download](https://code.visualstudio.com/)

If I remember correctly, it used to be installable directly through ```apt```, but this time it didn’t allow me to do so, so I had to download it manually. It's an excellent programming tool capable of rendering Markdown and Mermaid diagrams. You can also use LaTeX with the right plugins installed. It also has built-in Git integration, so you don’t need to use the CLI to push things.
***
## Signal
[Download](https://signal.org/zh_HK/download/#)

This is currently my main messaging app. Instagram and LINE both aren’t great—one throws ads at you, and the other traps you with algorithms. This is my open-source alternative: no ads, free stickers, a clean interface, and it even has Stories. If one day you want to escape the control of big tech companies, this will definitely be your first choice.
***
## Adnauseam
[Download](https://adnauseam.io/)

A wonderfully shameless ad blocker. In addition to blocking ads, it clicks all of them in the background. For details, check out Wiwi’s [article](https://wiwi.blog/blog/adnauseam/). This is a Firefox extension—~~install it now and waste advertisers’ money~~.
