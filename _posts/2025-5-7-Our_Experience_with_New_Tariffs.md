---
layout: post
title: BSidesKC Tariff Woahs
---
# Behind the Scenes: What It Took to Get 250 Fully-Assembled ESP32 Badges

We recently received a batch of 250 fully electronic badges from PCBWay... each built around an ESP32, complete with a 3.2" touch screen, Wi-Fi, and SD card slot. Overall, PCBWay handled the full assembly, which was a huge help.

Manufacturing took a bit longer than expected, mainly because some components had to be drop-shipped directly to the factory. Once everything was ready, shipping itself was fast... less than a week from China. However, customs ended up being the bottleneck, taking over a week to process. As of writing this, we have received most of our shipment but are still waiting on a box that is stuck at the customs office location. If you’re planning a similar order, I’d recommend budgeting **at least two weeks** from shipment to arrival.

Since these badges had touchscreen displays and onboard storage, I classified them under **HS Code 8517.62** (wireless communication devices like tablets). PCBWay usually lists plain PCBs under a generic code, which **aren’t tariff-exempt**... but this classification seemed like a fair argument. I was ready to push that point if needed.

That said, I believe using the 8517.62 classification may have also contributed to the delay in customs. It likely brought on more scrutiny from officials... every box in the shipment was opened, and many of the internal anti-static bags were cut open in multiple areas. It’s something to keep in mind if you're weighing speed versus potential duty savings.

Unfortunately, despite my best efforts, we still got hit with about **$1,000 in tariffs** on a $5,000 order... so roughly **20%**, not the duty-free status I was hoping for.

> ⚠️ *Disclaimer: I’m not a lawyer or a licensed import/export expert. This is just my experience, and your mileage may vary.*