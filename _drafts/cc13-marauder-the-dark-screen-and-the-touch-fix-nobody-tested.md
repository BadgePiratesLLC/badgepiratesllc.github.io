---
layout: post
title: "The CC13 Marauder: a dark screen, a 180-degree panel, and the touch fix nobody tested"
publish_target: 2026-10-13
categories: [hardware, badges]
author: Kevin Bennett
---

We had 150 CC13-class badges sitting on a shelf with a screen that never worked.

Not "worked on some units and not others." Never worked, on any of them, with the firmware we shipped. The badge booted, the Wi-Fi came up, the buttons did what they were supposed to do .. and the display stayed black. It sat like that long enough that it was easier to call it dead stock than to go find out why.

## The cause was boring, which is usually good news

The panel didn't move because someone made a design mistake. It moved because a hardware revision put the display on the back of the board instead of the front, and the firmware's init code still expected the front-mount orientation. Same 11 GPIOs for display and touch, pin for pin, matched against the schematic. Nothing was miswired. The screen was just mounted 180 degrees from what the code assumed.

That's a one-line fix once you know it: flip `SCREEN_ORIENTATION` for that hardware revision. Commit `dc80519` gated it behind a `BADGE_HW_CC13` build target so the CC14/BSidesKC26 boards, which don't have the problem, stay untouched.

## Where it got interesting

The same commit said it mirrored the touch calibration to match the new orientation. It didn't. It swapped in a different pair of calibration numbers, but in the same direction as before .. so the screen came up right-way-round and the touch layer underneath it was still rotated. Visually, it looked fixed. It wasn't.

Nobody caught it in review, because there was nothing to catch by reading it. The comment said the touch was mirrored. The diff had different numbers in it. Both of those things looked like progress.

The only thing that would have caught it is a finger on the glass. When we flashed it to a real board .. GAMINGCRAP, COM3, esptool confirming `Hash of data verified` on the write .. I tapped the screen and watched the touch land somewhere else entirely. Took about five seconds to find.

Commit `6ed979c` reverses both axes properly, onto the same calibration values already proven on CC14. Screen right-side up, touch lands where you press it.

## The lesson isn't really about badges

A comment saying a thing was done is not the thing being done. That's true of code review generally, but it's especially true of hardware, where the only test that actually settles the question is a human touching the object. We had two commits, a passing build, and a schematic trace that were all consistent with "fixed" — and none of them were the thing that proved it.

150 units get a second life out of this. The badge is also getting rebuilt touch-first, so navigating it stops feeling like turning a knob through a menu that was designed for a rotary encoder. If that lands before this posts, we'll have a before-and-after screenshot instead of just a description, and it's worth the wait.

— Kevin
