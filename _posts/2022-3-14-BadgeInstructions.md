---
layout: post
title: BadgePirates2022 Badge Instructions
---

Want to connect to the BadgePirates2022 Badge?
The one running the ESP32-S2-ROVER?

Use the following settings if you are setting up in Arduino:
-Board: "ESP32S2 Native USB"
-Flash SIze: "4MB (32Mb)"
-Partition Scheme: Default 4MB with spiffs (1.2MB APP/1.5MB SPIFFS)"
-Core Debug Level: "None"
-PSRAM:"Disabled"
-Port: <what ever it is on your machine>

If you are setting up in something like PlatformIO or VBCode .. well you are advanced and dont need me. :)

Programming can also be done via the USB port, to enter boot mode:
-Connect USB
-Press and Hold BootMode Button (SW1)
-Press and release SWRest Button

Our base code also has OTA updating:
-Connect to the SSID 2022_Badge (Default)
-No Password
-Navigate to http://192.168.4.1/update
-Upload your BIN file
-It will auto reboot and run (if your code is good)
