---
layout: page
title: "Node A — Brute Force | BSidesKC 2027"
permalink: /docs/bsideskc27/node-a/
publish_target: blog
---

# NODE A — BRUTE FORCE

You're holding one of six BSidesKC 2027 badge nodes. This one searches a small keyspace by hand, one button press at a time, until it hits a hidden value.

## What it does

The board counts up in binary as you press the shared ACTION button. When the count matches a secret 4-bit value set at kitting, a dedicated MATCH LED lights. There's no auto-search and no clock: you're the clock. Up to 16 presses covers the whole space.

## Board

96mm × 67mm, rounded corners, four mounting holes. Front carries the header, LED row, jumper zone, and IC sockets. Back carries the CR2032 holder and the build/test block.

## Parts you'll solder

Shared frame (same on every node board):

| Ref | Part | Notes |
|---|---|---|
| BT1 | CR2032 holder | Back of board |
| SW1 | Slide switch | Power |
| SW2 | Tactile button | Shared ACTION button |
| D1–D4 | LED | Output row |
| R1 | 10kΩ | ACTION pull-up |
| R2–R5 | 330Ω | D1–D4 series resistors |

Node A logic:

| Ref | Part | Function |
|---|---|---|
| U101 | 74HC393 | 4-bit keyspace counter, clocked by ACTION |
| U102 | 74HC85 | 4-bit magnitude comparator: counter vs. secret |
| D105 | LED | MATCH indicator |
| R114 | 330Ω | D105 series resistor |
| JP101–104 | Solder jumper | Secret target value (set at kitting, not documented here) |

## Assembly

1. **Power.** Solder SW1 (slide switch) and BT1 (CR2032 holder, back of board). Solder R1 (10kΩ). The filled silk dot marks pin 1 or the positive side on every polarized part.
2. **Core logic.** Solder U101 and U102 in their sockets (watch the pin-1 dot on each), then R114. JP101–104 come pre-set from kitting .. leave them alone.
3. **Output.** Solder D1–D4 and their resistors R2–R5, plus the dedicated MATCH LED D105.
4. **Interaction.** Solder SW2, the shared ACTION button.
5. Insert the CR2032 with the + side facing out, slide the power switch on, and press ACTION. D1–D4 should count up in binary with every press. Keep pressing until D105 lights.

## How it works

ACTION clocks a 74HC393 4-bit counter (U101). Its four output bits drive the LED row directly, so you watch the count advance in binary on every press. Those same four bits feed one side of a 74HC85 magnitude comparator (U102); the other side is wired to the hidden secret via JP101–104. When the counter equals the secret, the comparator's equal output lights D105.

An earlier 5-IC version of this board had a free-running oscillator that searched automatically and stopped on match. There wasn't spare capacity in the counter or comparator to fold that in without a third chip, so the board was simplified to fully manual stepping: you press, you watch, you stop when MATCH lights.

## The lesson

Binary counting, the relationship between clock and keyspace, and brute force as a concept. A 4-bit space is 16 combinations, small enough to search by hand in under a minute. The board prints the comparison next to it: 8-bit is 256, 32-bit is about 4.3 billion. The toy you're holding is the same idea as a real keyspace, just small enough to finish over coffee.

## CTF role

Node A produces shard A: the 4-bit value the counter was on when MATCH lit. Combine it with shards from the other nodes you find.
