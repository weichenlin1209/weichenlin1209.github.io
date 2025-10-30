+++
title = 'Course-snatching hooligans at NCHU-1'
date = 2025-09-04T19:16:43+08:00
draft = false
url = "/post/coursegangster/"
tags = ["NCHU"]
categories = ["Technology"]
layout = "post"

#[cover]
#   image = "http://windson.cc/images/coursegangster/cover.jpg"
#   relative = false
+++


Lately everyone’s picking courses, right? I just had particularly bad luck — not a single general-education slot, and a mountain of add-sign requests...  
So I did a small project with [Each Chen](https://iach.cc). ~~Basically a brute-force course grab~~  
<!--more-->
---
## Tools
- Kali Linux
- Burp Suite (if you have Kali, you’ll have it)
---

## Get the cookie  
Open Burp Suite and intercept the POST to the university course registration system. 

![burpsuite picture](/images/2025/9/coursegangster/coursegangster-1.webp)  

From our observations, every time it performs a major action (add/drop), it issues a new cookie. So you need to bake a new cookie after each course selection. Also, headers don’t change during registration — even if there’s a `Content-Length` it doesn’t seem to care. ~~From experiments, removing it still lets you grab the course~~.  

The intercepted POST during course selection looks like this:  
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
```
Next, copy the curl and get ready to put it in the oven~

![burpsuite picture](/images/2025/9/coursegangster/copycurl.webp) 

---
## Bake the cookie  
Now that you’ve got the cookie, put it in the [oven](https://curlconverter.com/python/) to bake. Paste the curl you copied into the converter and write a short Python script to send those requests — that’s it!  

![burpsuite picture](/images/2025/9/coursegangster/curltopython.webp)

---

## Start the heist!
We use ChatGPT to code the program to send the post
```
mport requests

from concurrent.futures import ThreadPoolExecutor

cookies = {
    Paste your cookie here
}

headers = {
    Paste your headers here
}

data = {
    'p_stud_no'='StudentID'    
    'v_tick'='Class Number' # press F12 to check the course number
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

# At most 5 thread
with ThreadPoolExecutor(max_workers=5) as executor:
    # sent 10 request
    futures = [executor.submit(send_request) for _ in range(10)]

    # Wait for all process complete
    for future in futures:
        future.result()
```

---

## Thoughts
Although we found that we can send POST requests directly to enroll, currently we can only target one class per request, and each attempt requires updating the cookie. Trying to select multiple classes in one go causes variables to be overwritten, and in the end only the last class gets selected. I’ll solve this problem next time.

This is only semi-automated so far. When the system opens up again, I’ll try to build more automation — right now I’m thinking of using a shell script to fetch cookies and convert them into curl format to send directly to the server. That approach is more general since not everyone uses Kali. When I finish, I’ll post “Course-snatching hooligans at NCHU-2”. Good luck with course registration!

