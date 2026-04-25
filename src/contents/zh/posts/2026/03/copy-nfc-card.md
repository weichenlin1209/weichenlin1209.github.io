---
title: 學生證丟了怎麼辦？
published: 2026-03-19
slug: "copy-nfc-card"
tags: ["Flipper", "NFC"]
category: Technology
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
cover: "https://images.unsplash.com/photo-1637070155805-e6fbee6ec2cf?q=80&w=1498&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
---

還記得那個時候大一剛開學沒多久，某天路過籃球場的時候，發現地板上有張學生證。於是我停下了腳步，低頭一看，這個學號是...4113...053，好像是我們系的欸... 10X...。這個號碼、這張臉，**這不是我室友嗎？** 所以我就幫他撿回去了。但如果我沒有發現這張學生證，那他就會變成在開學一個月內就把學生證丟掉的奇葩。~~雖然事實就是這樣沒錯。~~  那現在如果學生證丟掉了怎麼辦呢？歡迎來找 [Each](https://www.iach.cc) 或是我，我們會以學校售價[少五塊賣給你](https://ckhung0.blogspot.com/2014/10/barrier-of-exit.html)。就在今天我們找到了複製 UID 的方法。

## 背景知識
經過一番測試，我們推論學校的讀卡機只會讀 UID。只要裡面的 Sector 不要是 `???`，在符合權限的情況下門都會開，不管你拿的是不是學生證正本。而學校的學生證是用 MIFARE Classic 1K 這種型號。它的一個 Sector 有四個 block，裡面存著
- UID 唯一識別碼
- BCC 
- 製造商資料  

具體長這樣子。第一行前面四組是 UID，後面接著的是檢查位元，實作上就是把 UID 每組都做 XOR。
```
Block 0: he er is id bc 08 04 00 62 63 64 65 66 67 68 69
Block 1: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 2: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 3: FF FF FF FF FF FF FF 07 80 69 FF FF FF FF FF FF
```
後面的部分全部都是補0，一直持續到 Block 63。
```
Block 4: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 5: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 6: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 7: FF FF FF FF FF FF FF 07 80 69 FF FF FF FF FF FF
```
已經知道結構了那要怎麼複製呢？只要把 UID 的地方換成自己卡片的 UID，找張白卡寫進去就好了！！
## 手機
我們找到了這個[專案](https://github.com/ikarus23/MifareClassicTool)，專門複製這種卡片，還可以自由的寫入UUID。還有工具可以算出 BBC 是多少方便改寫，超方便的，但一切的前提是你得有張白卡。以下是複製的步驟：  
1. 點擊 `READ TAG` ，把 `extended-std.keys` 、`std.keys` 這兩個打勾，那是用來解密的字典。  
2. 接下來會進到 `dump editor` ，記住你的 UID，前面有說他在哪個位置。  
3. 回到主選單，找到 `TOOLS` 裡面的 `BCC Calculator`。輸入你的 UID，記住算出來的值。  
4. 用 `EDIT DUMP FILE` 改寫 sector 的內容，存檔出去。  
5. `WRITE TAG`  

這樣就可以複製出一張卡片了。

## Flipper Zero
在講怎麼用之前，你得先有一個[Flipper Zero](https://www.iach.cc/start-flipper/)。Flipper Zero有好幾個方法可以玩這個功能。

### NFC Maker + NFC Magic
在 `NFC Maker` 裡用 `Text Note` 製作。內容要寫什麼無所謂，但是 `Tag type` 要做成 MIFARE Classic 1K UID 4 。接著輸入你的 UID，Flipper 會幫你做出一個 NFC tag。接下來要把這個 Tag 寫進白卡中。找到 `NFC Magic`，把要被寫入的卡片放上去，一直按 `ok`，到最後就會看到你的小海豚跟你說 Success。 

### 模改 NFC 檔案內容 + NFC Magic
- **學生證**  
前面有提到，學校的讀卡機只看 UID。意思就是只要把 UID 跟 檢查位元都改成對的就結束了。以下是自動化程式：  
```python
import sys

def calculate_bcc(uid_bytes):
    """計算 Block Check Character (BCC) 使用 XOR"""
    bcc = 0
    for b in uid_bytes:
        bcc ^= b
    return bcc

def generate_nfc(uid_hex):
    # 清理輸入字串並轉換為位元組
    uid_hex = uid_hex.replace(" ", "").upper()
    if len(uid_hex) != 8:
        raise ValueError("UID 必須是精確的 4 個位元組 (8 個十六進位字元)。")

    uid_bytes = bytes.fromhex(uid_hex)
    bcc = calculate_bcc(uid_bytes)

    # 格式化 UID 以符合輸出格式 (例如 "xx xx xx xx")
    uid_str_spaced = " ".join([f"{b:02X}" for b in uid_bytes])

    # 組合 Block 0: UID (4 bytes) + BCC (1 byte) + 製造商資料 (11 bytes)
    block_0 = f"{uid_str_spaced} {bcc:02X} 04 00 62 63 64 65 66 67 68 69"

    # 生成所有 64 個區塊
    blocks = []
    for i in range(64):
        if i == 0:
            blocks.append(f"Block {i}: {block_0}")
        elif (i + 1) % 4 == 0:
            # 每個 Sector 的最後一個區塊為 Sector Trailer
            blocks.append(f"Block {i}: FF FF FF FF FF FF FF 07 80 69 FF FF FF FF FF FF")
        else:
            # 空白的資料區塊
            blocks.append(f"Block {i}: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00")

    # 組合完整檔案內容
    header = [
        "Filetype: Flipper NFC device",
        "Version: 4",
        "Device type: Mifare Classic",
        f"UID: {uid_str_spaced}",
        "ATQA: 00 04",
        "SAK: 08",
        "Mifare Classic type: 1K",
        "Data format version: 2",
    ]

    return "\n".join(header + blocks)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("用法: python3 generate_nfc.py <UID>")
        print("範例: python3 generate_nfc.py 'xx xx xx xx'")
        sys.exit(1)

    uid_input = sys.argv[1]

    try:
        nfc_data = generate_nfc(uid_input)
        filename = f"mifare_{uid_input.replace(' ', '').upper()}.nfc"

        with open(filename, "w", encoding="utf-8") as f:
            f.write(nfc_data)

        print(f"執行成功。檔案已儲存為: {filename}")

    except Exception as e:
        print(f"錯誤: {e}")

```
在終端機輸入
```bash
python3 <your_file_name>.py "YOUR_UID"
```
- **Instagram、Blog 電子名片**
```python
import sys
import random

def generate_random_uid():
    """產生符合 NTAG 規範的 7-byte UID (0x04 開頭) 與對應的 BCC"""
    uid = [0x04] + [random.randint(0, 255) for _ in range(6)]
    
    # 0x88 是 Cascade Tag (CT)
    bcc0 = 0x88 ^ uid[0] ^ uid[1] ^ uid[2]
    bcc1 = uid[3] ^ uid[4] ^ uid[5] ^ uid[6]
    return uid, bcc0, bcc1

def encode_url_to_ndef(url):
    """將 URL 編碼為 NDEF URI 格式的位元組陣列"""
    prefixes = {
        "http://www.": 0x01,
        "https://www.": 0x02,
        "http://": 0x03,
        "https://": 0x04,
        "tel:": 0x05,
        "mailto:": 0x06,
    }
    
    prefix_code = 0x00
    url_body = url
    for prefix, code in prefixes.items():
        if url.startswith(prefix):
            prefix_code = code
            url_body = url[len(prefix):]
            break
            
    url_bytes = url_body.encode('utf-8')
    payload_len = len(url_bytes) + 1 # 1 byte for prefix code
    
    if payload_len > 254:
         raise ValueError("URL 過長，無法存入標準 Short Record NDEF。")
    
    # NDEF Record: [D1] [01] [Payload Len] [55='U'] [Prefix Code] [URL]
    ndef_record = bytearray([0xD1, 0x01, payload_len, 0x55, prefix_code]) + url_bytes
    
    # TLV Header: [03=NDEF Message] [NDEF Len] [NDEF Record] [FE=Terminator]
    tlv_msg = bytearray([0x03, len(ndef_record)]) + ndef_record + bytearray([0xFE])
    
    # 填充至 4 的倍數以符合 Page 大小
    while len(tlv_msg) % 4 != 0:
        tlv_msg.append(0x00)
        
    return tlv_msg

def generate_nfc_file(url):
    uid, bcc0, bcc1 = generate_random_uid()
    uid_hex_str = " ".join([f"{b:02X}" for b in uid])
    
    header = [
        "Filetype: Flipper NFC device",
        "Version: 4",
        "Device type: NTAG/Ultralight",
        f"UID: {uid_hex_str}",
        "ATQA: 00 44",
        "SAK: 00",
        "Data format version: 2",
        "NTAG/Ultralight type: NTAG215",
        "Signature: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00",
        "Mifare version: 00 04 04 02 01 00 11 03",
        "Counter 0: 0",
        "Tearing 0: 00",
        "Counter 1: 0",
        "Tearing 1: 00",
        "Counter 2: 0",
        "Tearing 2: 00",
        "Pages total: 135",
        "Pages read: 135"
    ]

    pages = []
    
    # 區塊 0-2: UID, BCC, 靜態鎖定與內部位元組
    pages.append(f"Page 0: {uid[0]:02X} {uid[1]:02X} {uid[2]:02X} {bcc0:02X}")
    pages.append(f"Page 1: {uid[3]:02X} {uid[4]:02X} {uid[5]:02X} {uid[6]:02X}")
    pages.append(f"Page 2: {bcc1:02X} 48 00 00")
    
    # 區塊 3: Capability Container (CC)
    # E1: NDEF Magic Number, 10: Version 1.0, 3E: 496 bytes data area
    pages.append("Page 3: E1 10 3E 00")
    
    # 區塊 4-129: 使用者資料區 (User Memory)
    tlv_data = encode_url_to_ndef(url)
    user_pages = [tlv_data[i:i+4] for i in range(0, len(tlv_data), 4)]
    
    current_page = 4
    for p_data in user_pages:
        hex_str = " ".join([f"{b:02X}" for b in p_data])
        pages.append(f"Page {current_page}: {hex_str}")
        current_page += 1
        
    for i in range(current_page, 130):
        pages.append(f"Page {i}: 00 00 00 00")
        
    # 區塊 130-134: 動態鎖定、CFG 與密碼配置
    pages.append("Page 130: 00 00 00 BD")
    pages.append("Page 131: 04 00 00 FF")
    pages.append("Page 132: 00 05 00 00")
    pages.append("Page 133: FF FF FF FF")
    pages.append("Page 134: 00 00 00 00")
    
    footer = [
        "Failed authentication attempts: 0"
    ]
    
    return "\n".join(header + pages + footer)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("用法: python3 generate_ndef_url.py <URL>")
        print("範例: python3 generate_ndef_url.py 'https://windson.cc'")
        sys.exit(1)

    url_input = sys.argv[1]
    
    try:
        nfc_data = generate_nfc_file(url_input)
        
        # 從 URL 萃取主網域做為檔名
        domain = url_input.split("://")[-1].split("/")[0].replace(".", "_")
        filename = f"url_{domain}.nfc"
        
        with open(filename, "w", encoding="utf-8") as f:
            f.write(nfc_data)
            
        print(f"邏輯執行完畢。檔案已儲存為: {filename}")
        
    except Exception as e:
        print(f"錯誤: {e}")

```
在終端機輸入
```bash
python3 <YOUR_FILE_NAME> "YOUR_URL"
```
## 可用門地圖
最後，我們做了一張[地圖](https://umap.openstreetmap.fr/zh/map/nchu-door-map_1378249)，把到目前為止可以打開的門都標了上去。目前樣本數不夠，只能知道應數系館、二村、舊男宿、雲平樓以及圖書館的管制。如果有多會慢慢新增。

***

這篇文章如果你看不懂、又怕學生證不見，或是你需要一張電子名片，用非常快的方式讓大家加到你IG。歡迎來找我們，我們會在你面前花五分鐘複製一張，然後收你比學校還要便宜五塊錢的價格。


