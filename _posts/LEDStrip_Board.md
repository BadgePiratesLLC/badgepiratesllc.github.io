---
layout: post
title: LEDStrip Board / S2 Dev Board
---

<pic>
<br>
LED Board/S2 Dev Board
This project was a pet project of mine (fg). The problem I had was that around my house we had several
of those really cheap LED strip lights, you know .. the ones that you find at Walmart for a few bucks (or on Ali). The problem
with these cheap strips is that they usually only had an IR sensor and a remote where you could change the color or set a pattern.
Well, this is the 21st Century and most of the things in my house are things now (IOT), having to manually change the color of
some LED's is out of the question, I am above that. Yeah, I know what you are going to say, Go buy a Hue light strip that works
with your hub and you are good, price is only 70$+. Honesly, I am a maker, I am sure I can make it much cheaper and in the process
learn some skills that MAY go into future BadgePirate projects. 

The Board here is designed around an ESP32-S2, Mostly because in late 2021 and early 2022 with the supply chain issues it was a
chip that was available in stock and fairly inexpensive. The first version was just the MCU the GPIO needed for pin out and 5v
to power the LED Strip itself. Along with a USB connector, LDO and the resister / CAPS needed for the S2. 

Following that first version which I dont even think i have a picture of were quickly followed by version 1.1, 1.2 and then 1.3
which added a USB Serial chip, some additional GPIO for testing and several differnt button version trying to find one I was happy 
with. I will not bore you with those pics as they really are just crap and I personally disliked. 

.CURRENT VERSION
v1.xxx kind of morphed into a dev board with full pinouts for playing around with and myself attempting some 
auto setting and reboot for boot mode on the MCU (again for prototyping for our BP badges). Am I happy with what I currently have?
Well .. all I can say is watch for newer version.

.BOM
- Board
- ESP32-S2
- CN330
- USB Connector
- LDO 
- Caps and resisters
- On Off Switch
- Button for reset (may remove in future depending on testing)

<PIC>

.CODE
<Need to explain how the code works>


.LINK
<Link to Github>
<Link to Youtube>
<Link to Tindie or Store>
