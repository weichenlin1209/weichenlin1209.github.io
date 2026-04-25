---
title: What to Do When You Lose Your Student ID?
published: 2026-03-19
slug: "copy-nfc-card"
tags: ["Flipper", "NFC"]
category: Technology
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
cover: "https://images.unsplash.com/photo-1637070155805-e6fbee6ec2cf?q=80&w=1498&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
---

Remember when it was just a bit after the new semester started, I passed by the basketball court one day and found a student ID on the ground. So I stopped, looked down—student number 4113...053, seemed like someone from our department... 10X... Wait, this number, this face, **this is my roommate!** So I picked it up and brought it back to him. But if I hadn't found it, he would've been the weird case who lost their student ID within a month of starting school. ~~Though that's basically what happened anyway.~~ So what do you do if you lose your student ID? Feel free to find [Each](https://www.iach.cc) or me—we'll sell you one [five yuan cheaper than the school price](https://ckhung0.blogspot.com/2014/10/barrier-of-exit.html). Just today we found a way to copy the UID.

## Background Knowledge
After some testing, we deduced the school's card reader only reads the UID. As long as the Sector isn't `???` and you have proper permissions, the door opens, regardless of whether you're using the original student ID. The school's student ID uses MIFARE Classic 1K. Each sector has four blocks storing:
- UID (unique identifier)
- BCC (check digit)
- Manufacturer data  

It looks like this. The first four groups in the first row are the UID, followed by the check bit—which is actually XOR of each group of the UID.
```
Block 0: he er is id bc 08 04 00 62 63 64 65 66 67 68 69
Block 1: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 2: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 3: FF FF FF FF FF FF FF 07 80 69 FF FF FF FF FF FF
```
The remaining parts are all padded with 0, continuing to Block 63.
```
Block 4: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 5: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 6: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Block 7: FF FF FF FF FF FF FF 07 80 69 FF FF FF FF FF FF
```
Now that we know the structure, how do we copy it? Just replace the UID with your card's UID, get a blank card, and write it in!!
## Phone
We found this [project](https://github.com/ikarus23/MifareClassicTool), specifically for copying this type of card, and you can freely write the UUID. There are also tools to calculate BCC to make rewriting easier—super handy. But the prerequisite is you need a blank card. Steps to copy:  
1. Click `READ TAG`, check both `extended-std.keys` and `std.keys`—those are dictionaries for decryption.  
2. Then you'll go to `dump editor`. Remember your UID—mentioned earlier where it is.  
3. Back to main menu, find `BCC Calculator` in `TOOLS`. Enter your UID and remember the calculated value.  
4. Use `EDIT DUMP FILE` to rewrite sector contents, save it.  
5. `WRITE TAG`  

That's it—you've copied a card.

## Flipper Zero
Before talking about how to use it, you need a [Flipper Zero](https://www.iach.cc/start-flipper/). Flipper Zero has several ways to play with this feature.

### NFC Maker + NFC Magic
Create using `Text Note` in `NFC Maker`. What you write doesn't matter, but `Tag type` must be MIFARE Classic 1K UID 4. Then enter your UID and Flipper will create an NFC tag. Next, write this Tag into a blank card. Find `NFC Magic`, place the card to be written on it, keep pressing `ok` until you see your little dolphin tell you Success. 

### Modify NFC File + NFC Magic
- **Student ID**  
Earlier we mentioned the school card reader only reads UID. This means as long as you change both the UID and check bit to the correct ones, you're done. Here's the automation script:  
```python
import sys

def calculate_bcc(uid_bytes):
    """Calculate Block Check Character (BCC) using XOR"""
    bcc = 0
    for b in uid_bytes:
        bcc ^= b
    return bcc

def generate_nfc(uid_hex):
    # Clean input string and convert to bytes
    uid_hex = uid_hex.replace(" ", "").upper()
    if len(uid_hex) != 8:
        raise ValueError("UID must be exactly 4 bytes (8 hex characters).")

    uid_bytes = bytes.fromhex(uid_hex)
    bcc = calculate_bcc(uid_bytes)

    # Format UID to match output format (e.g., "xx xx xx xx")
    uid_str_spaced = " ".join([f"{b:02X}" for b in uid_bytes])

    # Combine Block 0: UID (4 bytes) + BCC (1 byte) + Manufacturer data (11 bytes)
    block_0 = f"{uid_str_spaced} {bcc:02X} 04 00 62 63 64 65 66 67 68 69"

    # Generate all 64 blocks
    blocks = []
    for i in range(64):
        if i == 0:
            blocks.append(f"Block {i}: {block_0}")
        elif (i + 1) % 4 == 0:
            # Last block of each sector is Sector Trailer
            blocks.append(f"Block {i}: FF FF FF FF FF FF FF 07 80 69 FF FF FF FF FF FF")
        else:
            # Blank data blocks
            blocks.append(f"Block {i}: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00")

    # Combine complete file content
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
        print("Usage: python3 generate_nfc.py <UID>")
        print("Example: python3 generate_nfc.py 'xx xx xx xx'")
        sys.exit(1)

    uid_input = sys.argv[1]

    try:
        nfc_data = generate_nfc(uid_input)
        filename = f"mifare_{uid_input.replace(' ', '').upper()}.nfc"

        with open(filename, "w", encoding="utf-8") as f:
            f.write(nfc_data)

        print(f"Success. File saved as: {filename}")

    except Exception as e:
        print(f"Error: {e}")

```
In terminal enter:
```bash
python3 <your_file_name>.py "YOUR_UID"
```
- **Instagram, Blog Digital Business Cards**
```python
import sys
import random

def generate_random_uid():
    """Generate 7-byte UID conforming to NTAG spec (starting with 0x04) with corresponding BCC"""
    uid = [0x04] + [random.randint(0, 255) for _ in range(6)]

    # 0x88 is Cascade Tag (CT)
    bcc0 = 0x88 ^ uid[0] ^ uid[1] ^ uid[2]
    bcc1 = uid[3] ^ uid[4] ^ uid[5] ^ uid[6]
    return uid, bcc0, bcc1

def encode_url_to_ndef(url):
    """Encode URL to NDEF URI format byte array"""
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
         raise ValueError("URL too long, cannot store in standard Short Record NDEF.")

    # NDEF Record: [D1] [01] [Payload Len] [55='U'] [Prefix Code] [URL]
    ndef_record = bytearray([0xD1, 0x01, payload_len, 0x55, prefix_code]) + url_bytes

    # TLV Header: [03=NDEF Message] [NDEF Len] [NDEF Record] [FE=Terminator]
    tlv_msg = bytearray([0x03, len(ndef_record)]) + ndef_record + bytearray([0xFE])

    # Pad to multiple of 4 for Page size
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

    # Blocks 0-2: UID, BCC, Static Lock and Internal Bytes
    pages.append(f"Page 0: {uid[0]:02X} {uid[1]:02X} {uid[2]:02X} {bcc0:02X}")
    pages.append(f"Page 1: {uid[3]:02X} {uid[4]:02X} {uid[5]:02X} {uid[6]:02X}")
    pages.append(f"Page 2: {bcc1:02X} 48 00 00")

    # Block 3: Capability Container (CC)
    # E1: NDEF Magic Number, 10: Version 1.0, 3E: 496 bytes data area
    pages.append("Page 3: E1 10 3E 00")

    # Blocks 4-129: User Data Area (User Memory)
    tlv_data = encode_url_to_ndef(url)
    user_pages = [tlv_data[i:i+4] for i in range(0, len(tlv_data), 4)]

    current_page = 4
    for p_data in user_pages:
        hex_str = " ".join([f"{b:02X}" for b in p_data])
        pages.append(f"Page {current_page}: {hex_str}")
        current_page += 1

    for i in range(current_page, 130):
        pages.append(f"Page {i}: 00 00 00 00")

    # Blocks 130-134: Dynamic Lock, CFG and Password Configuration
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
        print("Usage: python3 generate_ndef_url.py <URL>")
        print("Example: python3 generate_ndef_url.py 'https://windson.cc'")
        sys.exit(1)

    url_input = sys.argv[1]

    try:
        nfc_data = generate_nfc_file(url_input)

        # Extract main domain from URL for filename
        domain = url_input.split("://")[-1].split("/")[0].replace(".", "_")
        filename = f"url_{domain}.nfc"

        with open(filename, "w", encoding="utf-8") as f:
            f.write(nfc_data)

        print(f"Execution complete. File saved as: {filename}")

    except Exception as e:
        print(f"Error: {e}")

```
In terminal enter:
```bash
python3 <YOUR_FILE_NAME> "YOUR_URL"
```
## Accessible Doors Map
Finally, we made a [map](https://umap.openstreetmap.fr/zh/map/nchu-door-map_1378249) marking all the doors that can be opened so far. Current sample size is too small—we can only confirm the Applied Math building, Second Village, Old Boys Dormitory, Yunping Building, and Library are controlled. If there are more, we'll add them gradually.

***

If you can't understand this article and are worried about losing your student ID, or need a digital business card to let people add your IG quickly, feel free to find us. We'll copy one in five minutes right in front of you, and charge you five yuan less than the school price.