---
layout: page
title: "Node F — Unlock / Final | BSidesKC 2027"
permalink: /docs/bsideskc27/node-f/
publish_target: blog
---

# NODE F — UNLOCK / FINAL

You're holding one of six BSidesKC 2027 badge nodes. This one remembers.

## What it does

The board checks an input, set from another node's recovered value, against a fixed unlock key. Once it finds a match, it latches: the ACCESS GRANTED indication stays lit even if you change the input jumpers afterward.

## Board

96mm × 66mm, rounded corners, four mounting holes. Two IC sockets.

## Parts you'll solder

Shared frame (same on every node board):

| Ref | Part | Notes |
|---|---|---|
| BT1 | CR2032 holder | Back of board |
| SW1 | Slide switch | Power |
| SW2 | Tactile button | Shared ACTION button (not used by this node's logic, still populated) |
| D1–D4 | LED | Output row |
| R1 | 10kΩ | ACTION pull-up |
| R2–R5 | 330Ω | D1–D4 series resistors |

Node F logic:

| Ref | Part | Function |
|---|---|---|
| U601 | 74HC85 | 4-bit magnitude comparator: input vs. unlock key |
| U602 | CD4013 | Dual latch, holds the unlocked state |
| JP601–604 | Solder jumper | Input value (set at kitting) |
| JP605–608 | Solder jumper | Unlock key, secret (set at kitting) |

## Assembly

1. **Power.** Solder SW1, BT1, and R1. The filled silk dot marks pin 1 or the positive side.
2. **Core logic.** Solder U601 and U602 in their sockets, pin-1 dots aligned. JP601–608 come pre-set from kitting .. leave them alone.
3. **Output.** Solder D1–D4 and R2–R5.
4. **Interaction.** Solder SW2 for frame consistency with the other five boards, even though this node's logic doesn't read it.
5. Insert the CR2032 with the + side facing out and slide the power switch on. Once the input jumpers match the unlock key, the ACCESS GRANTED LEDs latch on and stay on, even if the input changes afterward.

## How it works

A 74HC85 magnitude comparator (U601) checks a 4-bit input, set by jumpers, against a fixed unlock key. Unlike Node A or Node E, the match result here isn't wired straight to an LED. It's captured by a CD4013 dual-latch IC (U602) instead: once the comparator finds a match, the latch holds that unlocked state, so the indication stays lit even if the input jumpers or button state change afterward. A continuous match isn't required to stay lit; the board remembers.

## The lesson

Final validation with state. This is the only node on the table that demonstrates memory: a latch holding onto the fact that it was once satisfied, rather than needing to be continuously correct. It's paired with a multi-party dependency: the input you feed it has to come from another node's recovered value.

## CTF role

Node F completes the collaborative flag. It consumes shards from the other nodes, directly or via Node E, and its output is the final fragment used to assemble the submission string.
