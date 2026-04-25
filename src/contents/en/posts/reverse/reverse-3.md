---
title: picoCTF vault-door-training
published: 2025-10-30
slug: "reverse-3"
tags: [PicoCTF ,Reverse]
category: CTF
licenseName: "CC-BY-SA 4.0"
author: Windson
draft: false
cover: "https://img.windson.cc/images/reverse/cover.webp"
description: A Reverse a day keeps the zero-days away

---

> ***A Reverse a day keeps the zero-days away***
<!--more-->

## Problem
[Problem link](https://play.picoctf.org/practice/challenge/7?category=3&page=1)

It says find flag in source code.

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

## Solution
Well, that last line is suspicious, even telling you that's the password. Let's try it.  
```text
picoCTF{w4rm1ng_Up_w1tH_jAv4_3808d338b46}
```
Got it... Though this problem is Easy... but also too easy...