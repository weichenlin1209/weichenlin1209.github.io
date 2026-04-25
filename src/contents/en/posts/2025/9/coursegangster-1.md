---
title: NCHU Course Gangster - 1
published: 2025-09-04
description: Everyone's selecting courses lately. My luck was particularly bad—couldn't get a single general elective, and there were tons of courses that needed add-drop signatures...
tags: [NCHU]
category: Technology
licenseName: "CC-BY-SA 4.0"
author: Windson
slug: coursegangster
draft: false
---

Everyone's selecting courses lately. My luck was particularly bad—couldn't get a single general elective, and there were tons of courses that needed add-drop signatures...  
So I made a small project with [Each Chen](https://iach.cc). ~~Actually, it's brute-force course registration~~ 
<!--more-->
---
## Tools
- Kali Linux
- Burpsuite (comes with Kali)

---
## Grab the Cookie  
Open Burpsuite and intercept the POST requests from the school's course registration system.  

![burpsuite screenshot](https://img.windson.cc/images/2025/9/coursegangster/coursegangster-1.webp)  

After our observation, every time the system performs a major action (add/drop courses), it issues a new cookie.
So you need to bake a fresh cookie after each course operation. Also, the header doesn't change during registration. Even if there's a content-length field, it doesn't seem to matter. ~~Experiments show that you can delete it directly and still register successfully~~.
   
The intercepted POST for course registration looks like this:
```text
POST /cofsys/plsql/enro_nomo3_dml HTTP/1.1
Host: cportal.nchu.edu.tw
Cookie: DONT STEAL MY COOKIE　　#Copy this one, don't steal my cookie
Content-Length: 42      #Length of the last line
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

p_stud_no=your_student_id&v_tick=1057847751891  #Your student ID first, then the course number

```
Next, copy the curl command and we're ready to put it in the oven~

![burpsuite screenshot](https://img.windson.cc/images/2025/9/coursegangster/copycurl.webp) 

---
## Bake the Cookie  
The cookie is out, now put it in the [oven](https://curlconverter.com/python/). Paste what you copied into curl, write a Python script to send everything out, and you're done!

![burpsuite screenshot](https://img.windson.cc/images/2025/9/coursegangster/curltopython.webp)

---

## Start the Heist!
Here I'll get ChatGPT to help write it:  
```python
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
    'v_tick'='Class Number' #Find it in the course registration system with F12
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

# Set maximum 5 concurrent threads
with ThreadPoolExecutor(max_workers=5) as executor:
    # Send 10 requests
    futures = [executor.submit(send_request) for _ in range(10)]

    # Wait for all tasks to complete
    for future in futures:
        future.result()
```

Run this program and you'll get the course you want. Assuming there are no time conflicts and you were originally eligible to take it (like courses not open to other departments—forcing a POST there will just make the server think you're being unreasonable).  

---

## Reflections
While we discovered a method to directly send POST requests for course registration, currently it can only handle one course at a time, and you need to update the cookie after each submission. Trying to register two or more courses at once results in variables being wiped, ending up with only the last course. I'll solve this problem next time.

This time we achieved only semi-automation. I'll try to develop a fully automated solution during the next registration window. Currently, I'm thinking of using a shell script to grab the cookie and convert it to curl format to send directly to the server. This method is more universal, since not everyone knows how to use Kali. I'll post "NCHU Course Gangster - 2" when it's done. Good luck with your course selection!