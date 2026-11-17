---
layout: post
title: "The CC15 build log: the LED question got answered, and it's not the answer we expected"
publish_target: 2026-11-23
categories: [hardware, badges, cc15]
author: Kevin Bennett
---

Last post mentioned an open LED-routing question and moved on without answering it. Here's where it landed.

Three LED positions were in play: south, west, and east. The first pass at this, run with an actual pathfinding tool against the live board file rather than eyeballed off a render, found a tested path for south and nothing for west or east. West was supposed to chain off south and couldn't, both copper layers in that stretch were already carrying other signals. East sat in the only open-looking corner of the board, but that spot turned out to be a solid pour of power and ground copper with real parts sitting on top of it: a USB driver chip, a protection diode, a fuse.

East's verdict held. It's off this board revision for good, confirmed from two different angles two sessions apart, and there wasn't room to move the parts sitting on top of it.

West's verdict didn't hold.

## West found a path by not chaining

The fix wasn't to force a path through copper that was already spoken for. It was to stop trying to chain west off south at all. South now gets its own direct feed straight off the microcontroller, on a GPIO that isn't shared with anything else on the board, including the existing status LED. South's output then feeds west. West is the end of that two-LED run, not a dead end off a blocked trace.

Both LEDs have their own small decoupling cap, and neither has a resistor sitting in the data line, which matches how the existing status LED on this board is wired. A full design-rule check against the final routing came back with zero unconnected pins on either LED's nets. Not "fewer" than before. Zero.

That's two LED positions that make it onto the board instead of the one the first pass found, by changing which problem we were trying to solve rather than pushing harder on the same blocked path.

## This is the board that's already being built

This isn't a proposal. It's what's physically inside the five prototype boards currently in production at PCBWay: south and west wired the way described above, east absent, verified against the exact board file that was sent to the fab, not a working copy.

Firmware for all three LED positions, south, west, and the now-absent east, already exists and has been sitting ready since before this routing question closed. It was written against the board as originally planned, including a position that didn't make the cut. That'll get trimmed to match what actually shipped before it goes anywhere near a real board. Nothing has been flashed to real hardware yet. These boards aren't built, let alone in hand.

Next post: what's actually on the five boards when they show up, and whether any of this survives contact with a soldering iron.

Kevin
