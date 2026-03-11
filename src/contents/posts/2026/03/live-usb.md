---
title: 用 USB「借屍還魂」
published: 2026-03-11
slug: "live-usb"
tags: ["Linux"]
category: Guitar
licenseName: "CC BY-NC-SA 4.0"
author: Windson
draft: false
---

對於一個 Linux 使用者來說，學校的電腦是不友善的。~~明明 Linux 不用錢~~，學校大多數的電腦都只灌了一種作業系統 ── Windows。如果想要用自己習慣的介面跟環境，就必須帶著筆電到處跑。好一點的電腦教室會在牆邊留一個插座給帶筆電的人，但是通常是沒有。

在上[通識課](https://frdm.cyut.edu.tw/~ckhung/c/ml262g/)的時候，[老師](https://frdm.cyut.edu.tw/~ckhung/g/)有介紹到他是怎麼處理這個問題的。他把一顆 USB 做成有儲存功能的開機碟，只要有一台電腦接上去，就可以「借屍還魂」，在別人的電腦上跑自己的系統。這樣不管用的是什麼裝置，都可以用自己習慣的 Linux 。~~前提是他沒有把BIOS鎖起來就是了~~。這節課結束的隔天我就自己做了一個。

## 作業系統的選擇  
身為KDE的愛好者，又要可以方便操作。第一個想到的當然是[Kubuntu](https://www.windson.cc/posts/kubuntu/)，但因為一般的開機碟是有揮發性的（意思就是只要斷電了裡面所有變更資料都會不見，回到一開始開機碟的樣子），如果要把開機碟變成帶著跑的OS，就要讓他有記憶功能。想到這個會牽扯到 Linux kernel 我就開始逃課了。於是開始上網~~gemini~~找有沒有適合的系統，最好是一開始就開發成可以用Live USB運作，或是有支援這項功能。

後來我~~gemini~~找到了[Kali](https://www.kali.org/)、[Tails](https://tails.net/)、[Alpine](https://www.alpinelinux.org/)、[Slax](https://www.slax.org/)...其實有挺多的。每個作業系統都有自己的特色，有興趣可以自己去查。我最後選了Kali，~~可以當成我的行動大砲~~，因為他原生就有支援Live USB，如果你要選的系統是本來就是設計給Live USB使用的話，可以選Slax。

## 製作 Live USB
因為我裝Kali所以只教Kali怎麼做。先去[官方](https://www.kali.org/get-kali/#kali-live)下載他的 Live USB image。這個時候就會發現，你下載了一個`.torrent`檔，因為官方沒有開放直接給你image，要用P2P的方式才能夠拿到。要先下載aria2這個套件
```bash
sudo apt update && sudo apt install aria2
aria2c ./kali-linux-*-live-amd64.iso.torrent
```

下載時一開始跑很慢是正常的。載完之後，你要確定下載的image真的是官方給的，不是其他人偽造。在下載的按鈕旁邊有的`sum`，那裡可以拿到官方的SHA256，我們要用他來測試檔案的真偽。
```bash
echo "21e87900f8464b8ba99ed0b4161388f896fc13cf9af976c0bfd692ffe62931c2  kali-linux-2025.4-live-amd64.iso" | sha256sum -c
```

如果終端機顯示OK就代表檔案沒問題了。接下來要把他設定成有儲存功能的模式。

## 建立儲存功能
一開始要先進去Live system(amd64)。接下來要切一個磁區拿來儲存資料。
```bash
lsblk #看你的系統碟是那顆 通常是/dev/sdX

```

找到之後要把多餘的空間都切出來，這決定了你可以存多少東西。
```bash
fdisk /dev/sdX
```
接著按 `n` 建立一個新的 `partition`，選擇 `p`，按 `3`（如果你沒有建立其他東西理論上要是3）。接著就一直 `enter`到切完磁區，最後輸入 `w`。如果你想知道這段在幹嘛可以看[鳥哥](https://linux.vbird.org/linux_basic/centos7/0230filesystem.php)。切完之後再進一次 `fdisk`按 `t`要任我們剛切的磁區的 `type`是Linux。如果分割表示GPT的話他叫 Linux filesystem。
```bash
sudo mkfs.ext4 -L persistence /dev/sdX3
```
再來要在剛剛的分割區中建立檔案系統，這樣才能存資料，也就是上面那個指令。幫他上一個標籤叫persistence。接下來要幫他寫一點設定。
```bash
usb=/dev/sdX
sudo mkdir -pv /mnt/my_usb
sudo mount -v ${usb}3 /mnt/my_usb
echo "/ union" | sudo tee /mnt/my_usb/persistence.conf
sudo umount -v ${usb}3
```
最後重新啟動
```bash
sudo reboot
```
選擇Live system with USB persistence 進入系統，這樣就完成了。

***
## 後記
我還沒有在我們學校測試過這招，目前是只有在我的電腦成功。我在裡面裝了termux, nvim。這些我常用的東西，希望在學校的電腦也可以用。

