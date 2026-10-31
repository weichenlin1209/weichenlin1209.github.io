---
title: 如何拯救壞軌的記憶卡
description: 在複製照片的時候把記憶卡搞壞了，必須要救回來啊！！
pubDate: "2026-10-31"
slug: mmc_rescue
category: Technology
tags:
  - Linux
  - memoryCard
cover: /assets/image/2026/10/mmc-rescue/cover.webp
licenseName: CC-BY-SA 4.0
---

前陣子在從相機拿出照片的時候，一個不小心中斷他了。結果想要再次嘗試複製的時候，他直接壞軌給我看!
於是，我學會了如何用 Linux 電腦自己救回自己的照片。~~快點加入使用 linux 的行列吧！~~

要實作這篇教學，首先你得有張壞軌的記憶卡，一台 Linux 電腦，最好是 Ubuntu 的分支或是 Ubuntu 本人。

## 識別裝置
在確認是不是軟體問題之前，先檢查一下記憶卡的側邊，上面有防寫開關，如果是開著的，那有可能記憶卡就是好的，確認不是硬體問題之後，就可以進入軟體檢查了。
```bash
lsblk -f 
```
先看看記憶卡的檔案系統[^1]，如果之前沒有把他洗掉，通常會是 exFAT 或是 FAT32。順便記住他的編號 (ex: /dev/sdX)。之後會用到。

[^1]:如果不知道這是什麼的話，請去看[鳥哥](https://linux.vbird.org/linux_basic/centos7/0230filesystem.php#indexed_allocation)

## 製作映像檔
在一個壞掉的裝置上直接對他動手術是一件非常危險的事情，如果不小心玩壞了，資料就真的丟掉啦！所以在實際操刀之前，要先做一個分伸出來。
### 安裝套件
```bash
sudo apt update
sudo apt install gddrescue
sudo ddrescue -d -r3 /dev/sdX image.img mapfile.log
```
**ddrescue** 是一個拯救儲存裝置的工具，會直接無視檔案系統把磁區內的資料一個一個複製出來。如果遇到壞掉的磁區會自動跳過，盡可能把所有好的資料複製出來。缺點是，裝置有多大出來的 image 就有多大，幫大家試過了，128G 的記憶卡要等八小時，~~驚心膽顫的睡一覺起來就好了~~。

解釋一下用到的參數：
- `-d`: 直接讀取輸入的檔案，這邊指的就是 `/dev/sdX`。
- `-r3`：遇到無法讀取的區域會重複嘗試 3 次。
- `/dev/sdX`：你的硬碟。
- `image.img`：輸出的 image。
- `mapfile.log`：輸出過程中的 log。

靜待八小時之後，終於可以開始動手拯救資料了。

## 掛載映像檔
這邊不能用平常掛載實體硬碟的方式，畢竟他不是一顆正常的硬碟，對作業系統來說他就是個普通的檔案。
```bash
sudo losetup -fP image.img
```
掛載成功之後就可以開始檢查資料，跑修復程式了。
```bash
sudo fsck.exfat /dev/loopXXpX
```
但是事情總沒有這麼容易，我的修復程式報錯了:
> exfatprogs version : 1.2.9
Bad fs_name in boot sector, which does not describe a valid exfat filesystem

翻譯就是，啟動磁區壞了，找不到檔案系統。意思就是整個記憶卡的 metadata 壞掉了，所以程式看不出來他是誰，不知道怎麼救，於是噴一個 error 出來。

## 嘗試重建檔案系統
```bash
sudo testdisk /dev/loopXXpX
```
接著他會叫你選選項：
1. 指定分區類型為 `[None] Non partitioned media`。
2. 進入 `[Advanced]`，手改檔案系統類型 `[Type]` 修正為實際的格式（FAT32、exfat、ext4 ...）。
3. 進入 `[Boot]` 選單。

接下來分兩條路，一條是可以從備份磁區找回資料，如果他寫 OK 就代表還有救。另外一個是他幫你用逆向工程重建磁區，如果他寫 OK 代表還有救。我是屬於兩條路都不能走的那種！！所以又有新的工具了。

## Photorec
這個軟體直接略過檔案系統，讀取硬碟的原始數據，找到各種文件的特徵，把檔案從死去的硬碟裡撈出來。
```bash
sudo photorec /dev/loopXXpX
```
成功拉出資料後，記得歸還作業系統資源。
```bash
sudo losetup -d /dev/loopXX
```
