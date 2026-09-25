---
layout: page
title: "Node B — XOR | BSidesKC 2027"
permalink: /docs/bsideskc27/node-b/
publish_target: blog
---

# NODE B — XOR

You're holding one of six BSidesKC 2027 badge nodes. This one transforms a value with a fixed key using a single logic gate, four times in parallel.

## What it does

The board XORs a 4-bit input against a fixed board key and shows the result on its LEDs, static and immediate, no button press needed.

## Board

96mm × 66mm, rounded corners, four mounting holes. Front carries the header, LED row, and a jumper zone. There's no IC socket zone to speak of here beyond the one chip this node needs.

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

Node B logic:

| Ref | Part | Function |
|---|---|---|
| U201 | 74HC86 | Quad XOR gate |
| JP201–204 | Solder jumper | Input value (set at kitting) |
| JP205–208 | Solder jumper | XOR key, secret (set at kitting) |

## Assembly

1. **Power.** Solder SW1, BT1, and R1. The filled silk dot marks pin 1 or the positive side.
2. **Core logic.** Solder U201 in its socket, pin-1 dot aligned. JP201–208 come pre-set from kitting .. leave them alone.
3. **Output.** Solder D1–D4 and R2–R5.
4. **Interaction.** Solder SW2 for frame consistency with the other five boards, even though this node's logic doesn't read it.
5. Insert the CR2032 with the + side facing out and slide the power switch on. D1–D4 should light immediately in a fixed pattern; no button press changes it.

## How it works

One 74HC86 quad-XOR IC (U201) does all the work. Four jumpers (JP201–204) set the input bits, four more (JP205–208) set a fixed key baked in at kitting time. The IC XORs each input bit against its corresponding key bit and drives the result straight onto the four output LEDs: one chip doing one gate-level operation, four times in parallel, no counting or comparing involved.

## The lesson

XOR is the fundamental building block of stream ciphers and one-time pads. Watching a fixed input get transformed by a fixed key, gate by gate, is the entire mechanism: XOR the same value with the same key twice and you're back where you started.

## CTF role

Node B produces shard B, the input value transformed by the board's fixed key. Combine it with shards from the other nodes you find.
