---
layout: post
title: Badge Pirates New Firmware Updater
---
### How to Access and Use [firmware.badgepirates.com](http://firmware.badgepirates.com)

If you're holding a Badge Pirates creation and wondering *“How do I get the latest firmware on this thing?”* — we’ve got you covered.

We created [**firmware.badgepirates.com**](http://firmware.badgepirates.com) as your one-stop-shop for all things firmware. Whether you're updating a badge you picked up at a con or recovering from some experimental soldering (hey, no judgment), this site is your go-to.

## What It Does

The site lets you flash firmware to your badge directly from your browser using **Web Serial** — no installs, no special drivers, just Chrome or Edge and a USB-C cable.

You can:
- Select the conference or event your badge is from
- See a preview image of the badge you're updating
- Flash the correct firmware with a single click
- Recover a bricked badge with fresh firmware

## But Wait... There’s OTA Too

If your badge has Wi-Fi (and most of ours do), it will also check for **Over-the-Air (OTA) updates** automatically.

As long as:
- Your badge is connected to Wi-Fi
- You’re running a recent firmware version with OTA support

...then your badge will periodically check in with us and pull down the latest update on its own. No cables, no browser, no fuss.

That said, OTA updates **won’t work if your firmware is too old or if the Wi-Fi setup failed** — in those cases, [firmware.badgepirates.com](http://firmware.badgepirates.com) is your fallback.

## How to Use It (Web Flasher)

### Step 1: Open the Site

Head to [**firmware.badgepirates.com**](http://firmware.badgepirates.com) in Chrome or Edge.  
*(Other browsers don’t support Web Serial yet.. sorry, Firefox fans.)*

### Step 2: Choose Your Badge

Use the dropdown menu to pick your badge. Each entry is labeled by event and year (e.g., `BSidesKC25`, `CactusCon2024`, etc.).

You’ll see:
- A badge image to help verify your selection
- A **Flash Firmware** button
- Some helpful info about what files are being flashed

### Step 3: Connect Your Badge

- Plug your badge into your computer via USB  
- Click **Connect**  
- Select your badge from the device list that pops up

### Step 4: Flash It

- Click the **Flash Firmware** button  
- The site will upload the bootloader, partition table, and firmware to your device  
- Wait for the confirmation message — and you’re done!

### Step 5 (Optional): Flex

Once your badge reboots with the latest firmware, you're good to go. Show it off, share it online, and maybe even find that easter egg we sneak in every now and then.

## Troubleshooting Tips

- **Can’t connect?**  
  Make sure you're using Chrome or Edge, and your USB cable supports data  
  (some charging-only cables will fail silently).

- **Still stuck?**  
  Try hitting the **Reset** button on your badge before clicking Flash.

- **Getting strange errors?**  
  Reach out to us via Discord or email — we’ll help you get back up and blinking.

---

**Got questions? Need help? Or want to suggest a feature?**  
Drop us a line on [Discord](https://discord.gg/yHsTmz6H)  
or hit us up at `admin@badgepirates.com`.

**Better yet.. track us down at Hacker Summer Camp this summer and say hi in person.**
