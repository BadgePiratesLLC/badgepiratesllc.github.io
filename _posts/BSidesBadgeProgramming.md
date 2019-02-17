---
layout: post
title: BSidesKC 2019 Badge Programming
---
The BSides KC 2019 badges includes an ESP826612F, to program it you must have all the Components populated, including Battery, a FTDI from your computer to the Badge, Running Arduino IDE on your computer (or your choice).

First Make sure you have the Board installed on your IDE of your choice, I used the Generic 8266 12F Device. All the other values were kept at their Default.

You can get some test code we used for testing each board here (Test code Link) or the actual Code used for the badges here (Live Code Link).

Connect your FTDI to your board using the GND, TX, and RX pins only

(image of pins)

Solder on or move the jumper in on the programming pins to Program

(Image of jumper)

Power on your Badge

Push the code. 

If you get an error check that:
	1. Power is on
	2. TX and RX connectors are correct (try reversing them)

Don’t forget to change the jumper back to Run mode or remove after programming is done.

Post any hacks you completed and let us see them.
