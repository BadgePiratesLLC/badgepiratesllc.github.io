---
layout: post
title: "The CC15 build log: one LED has a tested path, two don't, and the part's out of stock anyway"
publish_target: 2026-11-10
categories: [hardware, badges, cc15]
author: Kevin Bennett
---

CC15 is the badge we're trying to get onto Tindie. It's an ESP32-S3 board, prototype revision, and right now it does not run a single line of our own firmware .. the code folder in that repo is still an empty placeholder. All of the work this month has been hardware: get the board itself right before anything gets written to run on it.

The current piece of that work is four status LEDs, south, west, east, and a small expansion header, meant to chain off one new GPIO. Four LEDs, four spots on the board. Should be a day's work. It wasn't.

## Nothing is routed yet. That's the actual status.

None of these four are real copper on the board right now. What exists is three sessions of routing analysis: an actual pathfinding tool run against the live board file, checking whether a trace from the microcontroller to each LED position can physically exist through the copper that's already there. Not eyeballed off a render .. eyeballing it is exactly how you miss that a seam that looks open on one layer is owned by someone else's trace on the other. The actual routing is still waiting on a call from me.

## South has a tested path. West and east don't.

South checked out: a real path exists, about 13.6mm with one via hop, confirmed on a second, corrected run of the pathfinder after the first run had a bug in it that made the result look worse than it was. South is buildable on its own GPIO, no existing copper disturbed.

West was supposed to chain off south. It can't. Both copper layers in the stretch of board between them are already threaded with other signals' tracks, and there's no way through without crossing one of them. Tested west on its own direct feed from the microcontroller too, in case it didn't need the chain. Same answer: no path. West is a drop-this-rev candidate right now, same category as east.

East never had a chance, for a different reason. It sits in the only open-looking corner of the board, near the battery tabs, but that spot is a solid pour of power and ground copper with a cluster of real parts, a USB driver chip, a protection diode, a fuse, sitting right on top of it. Zone pour can be refilled safely around new copper, we checked that this session too, but it can't move an existing part. East is out, same conclusion from two different spots on the board, two sessions apart.

## The mismatch that almost shipped twice

Separately, two decoupling caps on the board were built as one footprint size while the schematic called for a different one. First pass at explaining which direction that mismatch went was wrong. Got caught, corrected, and the actual fix went in clean .. swap the footprint, refill the copper around it, re-run the same design-rule check before and after to prove nothing else moved.

## Where that leaves the badge

One LED has a confirmed path and is waiting on me to actually route it. Two don't, and look like they're not making this board revision. Separately from all of that: the LED part itself, the same part used for all four positions, is showing zero units in stock anywhere we checked, so even a fully routed board can't be built today regardless of what the copper says. No firmware yet either .. that's next, once the board itself stops moving. The Tindie listing is still coming. This is what "coming" actually looks like in between.

— Kevin
