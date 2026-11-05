---
layout: post
title: "CC15: the DRC check said clean for three months. It wasn't checking."
publish_target: 2026-11-12
categories: [hardware, badges, cc15]
author: Kevin Bennett
---

Last post was about the LED routing problem on CC15. This one's about something that sat underneath that entire board the whole time: the design-rule check that's supposed to catch exactly this kind of thing was quietly turned off.

## "DRC clean" meant nothing since August

CC15's board file carries a settings table, one line per rule, that says how seriously to treat each kind of violation .. error, warning, or ignore. Eight of those lines got silently downgraded to "ignore" back during an August 14 Drive migration. Solder-mask bridges and starved thermal reliefs, which KiCad treats as hard errors by default, got set to ignore. Six more silkscreen and footprint-metadata rules, normally warnings, got the same treatment.

Nobody did that on purpose. It was a side effect of the migration, and since then every "DRC clean" result on this board was clean because the check had stopped looking, not because the board was actually clean. We only found it by diffing CC15's settings against the sibling LoRa-Satellite-v2 board file, which still had the real KiCad defaults. Fixed in commit 81b7c56, settings-only, zero copper touched.

## What was actually hiding under there: 70 errors, 148 warnings

Once the severities were restored, DRC found 70 errors and 148 warnings that had been there the whole time. That's a big number to see appear out of nowhere, so instead of either panicking or shrugging it off, we traced every one of the 70 errors back to the specific part causing it, rather than treating the count as one scary blob.

The 70 errors break down as 69 solder-mask-bridge violations plus 1 starved-thermal error. Every one of the 69 solder-mask-bridge hits is pad-to-pad inside a single component's own footprint .. none of them are two parts routed too close together. By component:
- U2 (the ESP32-S3) .. 37
- J4 (the USB-C connector) .. 22
- U3 (battery-monitor chip) .. 5
- RN1 (a resistor array) and U4 (charger chip) .. 2 each
- J5 (microSD socket) .. 1

That's five known footprint definitions, with U2's own footprint accounting for over half the count on its own. The 1 starved-thermal error is on a header that doesn't even get populated on this board. Zero of the 70 are something I routed or placed.

That's the difference between "this board has 70 real defects" and "five footprint files in our shared library need fixing, and none of it is new copper risk." Still true that it needs fixing, just not true that CC15 specifically broke something this week.

## The BOM wasn't just dusty, it wouldn't order

Separately, going through the bill of materials against live LCSC stock turned up parts that would have blocked an actual order outright:

- The WS2812B LEDs .. the same part the last post said was at zero stock everywhere .. got re-sourced to C114586, a different Worldsemi WS2812B SKU with 282,000 units in stock, same package, confirmed against LCSC's own listing. That specific blocker from last post is now cleared.
- A 1µF cap (C7) was pointed at a zero-stock SKU, re-sourced to an in-stock sibling part in the same series.
- R8, a 330Ω current-limiter resistor for the charge LED, had its schematic symbol showing "330" while actually being a 330kΩ part .. a real value mismatch, not just a sourcing gap. The intended 330Ω value is independently documented in two other project docs, so this wasn't a guess; it got fixed to match what the circuit was always supposed to be.
- Three more parts (the 0.1µF decoupling caps, the buzzer, and the battery charger chip) had Vendor1_PN fields either pointing at the wrong package size or missing entirely, despite being parts we'd already bought before. Re-sourced and written down so the next order doesn't run on memory.

Every one of those was checked against live LCSC stock counts at the time of the fix, not assumed. ERC was re-run before and after each change to confirm nothing else moved.

## Where that leaves the board

The DRC severity table now matches what every other board in the fleet uses, so "clean" means the same thing here that it means everywhere else. The remaining 70 errors are tracked as a shared-library footprint fix, not a CC15-specific routing problem. The BOM no longer has a part in it that would stop an order cold. None of this touches the open LED-routing question from last post, and none of it is firmware .. that's still an empty folder.

— Kevin
