+++
title = '中興大學搶課流氓-1'
date = 2025-09-04T19:16:43+08:00
draft = false
tags = ["NCHU"]
+++

***
最近大家都在選課吧。我就運氣特別不好，通識一節沒有，要加簽的一大堆...  
所以跟[iach526](https://iach.cc)一起做了個小專案。~~其實就是暴力搶課~~ 

---
### 工具
- kali Linux
- burpsuite （如果你有kali就會有
---
### 搶課流程
- [拿餅乾](/post/coursegangster/coursegangster-1/#拿餅乾)
- [烤餅乾](/post/coursegangster/coursegangster-1/#烤餅乾)
- [開始搶劫!](/post/coursegangster/coursegangster-1/#開始搶劫)

---
### 拿餅乾  
打開burpsuite，攔截學校選課系統的POST  
![burpsuite圖片](/images/coursegnagster/coursegangster-1.png)  

經過我們的觀察，它每次執行重大行動（加退選）時，都會發一個新的餅乾。
所以每次選完課都要重新烤一個新餅乾。另外，在選課的時候header是不會變的，就算裡面有content-length它好像也不太看。~~經實驗發現，直接刪掉它也選得到課~~。
  
選課時攔截下來的POST長這樣：
```
POST /cofsys/plsql/enro_nomo3_dml HTTP/1.1
Host: cportal.nchu.edu.tw
Cookie: DONT STEAL MY COOKIE　　#你要複製的在這，不要偷我的餅乾
Content-Length: 42      #這是最下面那行的長度
Cache-Control: max-age=0
Sec-Ch-Ua: "Chromium";v="137", "Not/A)Brand";v="24"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Origin: https://cportal.nchu.edu.tw
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: frame
Referer: https://cportal.nchu.edu.tw/cofsys/plsql/enro_nomo2_check
Accept-Encoding: gzip, deflate, br
Priority: u=0, i
Connection: keep-alive

p_stud_no=your_student_id&v_tick=1057847751891  #前面是你的學號，後面是那節課的課號。

```
接下來複製curl，就可以準備送進烤箱啦～
![burpsuite圖片](/images/coursegnagster/copycurl.png) 

---
### 烤餅乾  
餅乾已經成功拿出來了，接下來要送進[烤箱](https://curlconverter.com/python/)裡烤。把剛剛複製的貼在curl，寫一隻python把剛剛的東西都送出去就完事了！
![burpsuite圖片](/images/coursegnagster/curltopython.png)

---

### 開始搶劫!
在這請出chatGPT幫忙寫一下：  
```
import requests

from concurrent.futures import ThreadPoolExecutor

cookies = {
    Paste your cookie here
}

headers = {
    Paste your headers here
}

data = {
    'p_stud_no'='StudentID'    
    'v_tick'='Class Number' #在選課系統開F12找一下就有
}

def send_request():
    try:
        response = requests.post(
            'https://cportal.nchu.edu.tw/cofsys/plsql/enro_nomo3_dml',
            headers=headers,
            cookies=cookies,
            data=data
        )
        print(f'Status: {response.status_code}, Length: {len(response.text)}')
    except Exception as e:
        print(f'Error: {e}')

# 設定同時最多 5 個線程
with ThreadPoolExecutor(max_workers=5) as executor:
    # 執行 10 次請求
    futures = [executor.submit(send_request) for _ in range(10)]

    # 等待所有任務完成
    for future in futures:
        future.result()
```

執行這隻程式，你就會得到你要的課拉。前提是沒衝堂還有你本來就可以選這節，比如說不開放外系的課你強制給它POST，server只會覺得你不合理而已。  

---

### 心得
雖然有發現可以直接發POST的方法來選課，但是目前一次只能發一節課，而且發一次就要更新cookie。一次選兩節以上的後果，就是變數會被洗掉，最後只選到最後一節課。這個問題下次再解決。

這次只達到半自動化，接下來系統開放的時間會盡量開發能自動化的辦法，現在是想用shell script去拿cookie再轉成curl的模式直接送給server。這方法比較通用，畢竟不是大家都會用kali。做完的時候會再發一篇「中興大學搶課流氓-2」。祝大家選課順利 ！