---
title: 用 USB「借屍還魂」2
published: 2026-04-17
slug: "live-usb-2"
tags: ["Linux"]
category: Technology
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
---
> [上次](https://www.windson.cc/posts/live-usb/)做 Persistence Live USB （具有持久化儲存功能的開機隨身碟）的時候，精心挑選了作業系統。 找了半天只找了設定簡單的 kali 來玩一下，~~結果被我玩壞了~~。所以今天重新做了一顆，這次用的是 [Linux Mint](https://www.linuxmint.com)。原本是想說用 Ubuntu，但是他的 iso 比 Mint 大太多了，可能在等寫入的時間我就會睡著。

這次的目標跟上次一樣，要做出一個具有持久化儲存功能的隨身碟。做開機碟首先想到的一定是 `dd` 這個指令對吧？只要先用 `dd` 寫入映像檔，在把沒用到的磁區切割一塊出來當作是儲存空間，好像就可以解決這個問題了吧？

但是使用 `dd` 寫入之後，隨身碟會被徹底複寫成唯讀的檔案系統。想要直接在改 `grub` 的參數是不可能的。

這會導致以下的錯誤：
1. `dd` 執行的 **Bit-stream copy** (位元流複製) 會將混合式分區表寫入，導致隨身碟後方的未分配空間因備份的 **GUID Partition Table (GPT)** 標頭位置錯誤而產生結構異常。
2. 由於檔案系統唯讀，我們無法直接修改 `grub.cfg` 來注入持久化所需的參數，也無法優雅地建立分割區（除非每次開機你都想要手動輸入啟動參數）。

閃過這些問題最快的方法就是依賴封閉式的圖形化工具（如 Rufus），身為終端機愛好者的我是不會屈服的。所以這次的限制又多了一個，我要用 CLI 完成他。以下是純手工打造 Linux Mint 持久化隨身碟的完整教學。請將以下指令中的 `/dev/sdX` 替換為你實際的隨身碟代號（可以用 `lsblk` 確認）。

### 1. 抹除並重建分區表 (Partitioning)

我們需要建立兩個分區：一個存放 Live ISO 檔案的 **EFI System Partition (ESP)**，以及一個用於寫入變更的持久化空間。使用 `parted` 進行操作：

```bash
# 建立 GPT 分區表
sudo parted /dev/sdX --script mklabel gpt

# 建立 P1: 格式為 FAT32，分配 4GB 給系統檔案
sudo parted /dev/sdX --script mkpart ESP fat32 1MiB 4GiB
sudo parted /dev/sdX --script set 1 boot on

# 建立 P2: 格式為 EXT4，將剩餘空間全數分配給持久化分區
sudo parted /dev/sdX --script mkpart PERSISTENCE ext4 4GiB 100%
```

### 2. 格式化與標籤化 (Formatting and Labeling)
Ubuntu 與其衍生版（如 Linux Mint）的 initramfs 腳本是透過磁碟區標籤來尋找持久化空間的。現代版本要求標籤必須精確命名為 `writable`。

```bash
# 格式化 P1 (開機與系統區)
sudo mkfs.vfat -F 32 -n BOOT /dev/sdX1

# 格式化 P2，並嚴格標記為 writable
sudo mkfs.ext4 -L writable /dev/sdX2
```

### 3. 提取與同步系統檔案 (Data Extraction)
放棄 `dd`，改用 `rsync` 將 ISO 內容鏡像複製到隨身碟的 P1 分區。

```bash
# 建立掛載點
sudo mkdir -p /mnt/usb /mnt/iso

# 將 P1 與下載的 Mint ISO 掛載為 Loop Device (迴圈裝置)
sudo mount /dev/sdX1 /mnt/usb
sudo mount -o loop linuxmint-22.3-cinnamon-64bit.iso /mnt/iso

# 同步檔案，並排除無用的 Windows 執行檔
sudo rsync -av --info=progress2 --exclude='wubi.exe' /mnt/iso/ /mnt/usb/
```

### 4. 部署引導載入程式 (Bootloader Deployment)
手動將 GRUB 安裝至隨身碟。執行此步驟前，由於前一步驟的 Page Cache (頁面快取) 可能仍在背景將資料寫入隨身碟（特別是慢速的 NAND 快閃記憶體），慢慢等不要急。

```bash
sudo grub-install \
    --target=x86_64-efi \
    --efi-directory=/mnt/usb \
    --boot-directory=/mnt/usb/boot \
    --removable \
    /dev/sdX
```
### 5. 注入持久化核心參數 (Kernel Parameter Injection)

用你偏好的編輯器打開 `/mnt/usb/boot/grub/grub.cfg`，修改開機時的參數，在 `linux` 這行的尾端、`--` 符號之前加上 `persistent`。此外，為了繞過 Live USB 關機時常見的 PID 1 終止錯誤（Kernel Panic 卡死問題），強烈建議一併加入 `noprompt` 與 `panic=-1`。如果你不修改設定檔，在需要儲存功能時，就必須在開機選單畫面按下 `e` 進入 **GRUB** 編輯模式手動補上這些參數。

```bash
menuentry "Start Linux Mint 22.3 Cinnamon 64-bit (Persistent Mode)" --class linuxmint {
	set gfxpayload=keep
	linux	/casper/vmlinuz  boot=casper uuid=here-should-be-your-id username=mint hostname=mint iso-scan/filename=${iso_path} quiet splash persistent noprompt panic=-1 --
	initrd	/casper/initrd.lz
}
```

### 6. 強制同步與安全卸載
在拔除隨身碟前，務必確保所有記憶體中的髒頁面皆已物理落盤。

```bash
# 強制資料同步
sudo sync
sudo sync

# 卸載掛載點
sudo umount /mnt/usb
sudo umount /mnt/iso
```

完成之後你就獲得了一顆可以到處附身別人電腦的隨身碟了。
