+++
title = '安裝 Kubuntu 的坑'
date = 2025-12-05T14:30:00+08:00
draft = false
url = "/zh/post/kubuntu/"
categories = ["Technology"]
layout = "post"

image = "/images/2025/12/kubuntu/cover.webp"
+++  

## 前言
前兩天突然想玩steam上的遊戲，看一下愛爾登法環，電腦配備不足；看一下燕雲十六聲，電腦配備還是不足。不然來看一下 Monster Hunter 好了，原版肯定是不行的，但是如果是 rise 把獨顯run起來好像有希望。**那就來裝 Nvidia 的驅動吧**，裝完我的電腦就打不開了，因為N家的驅動對 Linux 的相容性很差。只能進入救援模式把資料拿出來，重灌。會選擇 kubuntu 只是因為我喜歡用 KDE，我覺得他很好看。

## 開機碟
首先，到[官網](https://www.kubuntu.com/download/)把你想要的版本下載下來。
> 傳說中，如果要精通重灌，版本數字是多少就要重灌幾次，~~所以不要選太大~~

我選的是目前最新的 Kubuntu 25.10。對 Linux 用戶來說作一個開機碟絕對是輕輕鬆鬆，加上我作開機碟的時候借到的是 Windows 所以這邊只講 Windows 怎麼做的。

簡單來說，下載一個軟體叫做 [Rufus](https://rufus.ie/zh_TW/) 他是一個給Windows 的開源開機碟製作工具。用這個把剛剛下載下來的ISO檔寫進準備好的開機碟，買16G的就夠用了（如果買的到的話）。  

## 重灌
把做好的開機碟插上電，打開你的BIOS，每家廠牌打開的方式不太一樣。所以通常是連打```del``` 跟 ```F2``` 。進去之後選到```BOOT``` ，把開機順序改成開機碟先，原本的系統在後，如果不知道誰是誰就都試一遍。接下來你會進到開機碟裡面的系統，跟著他做基本上就安裝好了。

## 顯卡問題排除  
如果這個時候重新開機可以順利的進系統，那恭喜你！如果你進去之後只看到類似下方的畫面，那代表你跟我一樣被顯卡搞了。

![stuck](/images/2025/12/kubuntu/stuck.webp)  

這個時候，要先想辦法進去 Grub，這樣才有辦法進入安全模式，才可以進系統。剛開機一看到電腦廠牌 logo 就按一下 del。如果有成功會直接進去 grub 裡面。失敗就 reboot 吧。
進到 grub 裡面後按 e ，那邊可以改開機時的啟動參數。在倒數第二行的地方會看到 ```quiet splash```，在他的後面加上 ```nomodeset```，按 ```F10``` 就可以進系統了。

### 加入黑名單
進去之後打開 shell
```shell
sudo vim /etc/modprobe.d/blacklist-nvidia.conf
```
在黑名單中加入Nvidia的套件，避免系統一直抓去但是抓不到，卡在外面進不來。
```text
blacklist nvidia
blacklist nvidia-drm
blacklist nvidia-modset
blacklist nouveau
```
### 刪除驅動
```bash
sudo apt remove nvidia*
sudo apt autoremove
sudo apt autoclean

```
最後重啟一下系統
```bash
sudo update-initramfs -u
sudo reboot
```
這一套做完就可以進系統拉，Kubuntu 真是個大坑。
