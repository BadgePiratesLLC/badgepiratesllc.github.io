---
layout: post
title: CactusCon 11 Badge (2023)
---

![Title](/images/CC11/cactuscon-badge-staged.jpg)<br>
<br>
<br>

I. Introduction <br>

This years CactusCon 11 badge combined the Internet of Things (IoT) with the Internet of Thorns (IoT) but you're not here for the bad puns, you want the gritty details behind the badge.  If so, you have come to the right right place.

This impressively crafted design was a joint effort on the part of the Badge Pirates (that would be us) and the CactusCon team.  Just like building a house takes many different specialties, we divided up the work between the artwork, hardware and software.

II. The Layout and Construction of the Badge<br>

The badge started with an idea of demonstrating home automation in a way that would be both interactive at the conference, but also a functional platform to take away and use in your own projects.  The design of the badge fit right in with the convention's "Nightmare house" theme.  

The badge PCBs were made by PCBWay, however the assembly, testing and inital programing were all completed in the Badge Pirates lab.


III. Technical Details<br>
The electronics design of the badge is centered around an Espressif ESP32-S2 WROOM microcontroller (MCU) which controls all of the integrated components. One nice feature of this particular MCU is the built-in Wi-Fi connectivity (2.4Ghz) which enables the IoT control.

Another benefit of the ESP32 is the shear number of General Purpose Input/Output (GPIO) pins built in.  The badge uses several of the GPIO pins to control

* 2 4pin reverse-mount RGB LEDs (top windows) 
* 3 indvidually addressable RGB Neopixels
* 1 reverse-mount red LED ("not a camera" drone)
* 5 input buttons
* OLED (optional)

Along with the built-in components, we have provided pin outs for the remaining GPIO pins. These pins could be used to add other components or functionality as you see fit. We have also provided a development board, which was available at the Hardware hacking village. So, go on and hack to your heart's content! 

Access to the MCU can be done via the USB Connection through an onboard USB to Serial (CH340N) chip. Alternatively it is possible to bypass the built in USB port and directly connect with UART to the D+ and D- pins (or with JTAG if you are fiesty enough). With a little more hacking, new firmware can be pulled wirelessly as it was done during the con. We will leave this up to your hacking skills by looking at the code to replicate the convention wireless infrastructure for that initial connection.

The CactusCon crew will be doing a write up on the software side of the project which was an impressive feat and will be linked below when available.

IV. Conclusions and Remarks<br>

It seems inevitable these days, but we still experiences some supply chain issues throughout the production of this badge.  However Pirates never say die (or is that Goonies), and we were able to overcome them. We hope that you have as much pleasure in using it as we did bringing it to reality. Special Thanks goes out to the entire CactusCon Crew and we hope to see you next year with another exciting badge.



<br><br>
 
.LINKS
- GitHub [Github page](https://github.com/BadgePiratesLLC/CactusCon_11)
- Youtube [YouTube Channel](https://www.youtube.com/channel/UCRVegJ2Y7m-8vIXnG0BIhyw/featured/) 
- Tindie Store [Tindie Store](https://www.tindie.com/stores/badgepirates/)
<br>
