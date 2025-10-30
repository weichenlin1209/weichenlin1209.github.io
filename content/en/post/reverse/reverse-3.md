+++
title = 'vault-door-training'
date = 2025-10-30T10:00:00+08:00
draft = false
url = "/post/reverse-3/"
tags = ["PicoCTF" ,"Reverse"]
categories = ["CTF"]
layout = "post"

image = "/images/reverse/cover.webp"
+++
*"A Reverse a day keeps the zero-days away."*
<!--more-->
---  

## Question
[Challenge Link](https://play.picoctf.org/practice/challenge/7?category=3&page=1)  

They say the flag is in the source code.

```
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
Yeah — that suspicious line at the bottom even says it's the password. Let's try it. 
```
picoCTF{w4rm1ng_Up_w1tH_jAv4_3808d338b46}
```

Got it... it's an easy level — maybe *too* easy for an "Easy" challenge.



