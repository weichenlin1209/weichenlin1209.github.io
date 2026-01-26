---
title: picoCTF vault-door-training
published: 2025-10-30
slug: "reverse-3"
tags: [PicoCTF ,Reverse]
category: CTF
licenseName: "CC BY-NC-SA 4.0"
author: Windson
draft: false
cover: "/images/reverse/cover.webp"
description: A Reverse a day keeps the zero-days away

---

> ***A Reverse a day keeps the zero-days away***
<!--more-->

## 題目
[題目連結](https://play.picoctf.org/practice/challenge/7?category=3&page=1)  

他說要在原始碼裡找到flag。

```java
import java.util.*;

class VaultDoorTraining {
    public static void main(String args[]) {
        VaultDoorTraining vaultDoor = new VaultDoorTraining();
        Scanner scanner = new Scanner(System.in); 
        System.out.print("Enter vault password: ");
        String userInput = scanner.next();
	String input = userInput.substring("picoCTF{".length(),userInput.length()-1);
	if (vaultDoor.checkPassword(input)) {
	    System.out.println("Access granted.");
	} else {
	    System.out.println("Access denied!");
	}
   }

    // The password is below. Is it safe to put the password in the source code?
    // What if somebody stole our source code? Then they would know what our
    // password is. Hmm... I will think of some ways to improve the security
    // on the other doors.
    //
    // -Minion #9567
    public boolean checkPassword(String password) {
        return password.equals("w4rm1ng_Up_w1tH_jAv4_3808d338b46");
    }
}
```

## 解答
嗯，看起來最下面那行很可疑，甚至跟你說那是密碼。那就試一下吧。  
```text
picoCTF{w4rm1ng_Up_w1tH_jAv4_3808d338b46}
```
猜對了... 雖然這題是Easy... 但是也太easy了吧...。
