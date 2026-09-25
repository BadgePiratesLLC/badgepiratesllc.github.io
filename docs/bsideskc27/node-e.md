---
layout: page
title: "Node E — Mix/Compare | BSidesKC 2027"
permalink: /docs/bsideskc27/node-e/
publish_target: blog
---

# NODE E — MIX/COMPARE

You're holding one of six BSidesKC 2027 badge nodes. This one needs two other people's values before it shows you anything.

## What it does

The board takes two inputs (each recovered from a different node), mixes them, and shows the mixed value on its LEDs. A separate MATCH LED lights only when that mix equals a hidden target, so the mixed value and the confirmation of correctness are two different signals on the same board.

## Board

96mm × 67mm, rounded corners, four mounting holes. Two IC sockets, the largest jumper zone of any node board.

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

Node E logic:

| Ref | Part | Function |
|---|---|---|
| U501 | 74HC86 | Mixes two 4-bit inputs bit by bit |
| U502 | 74HC85 | 4-bit magnitude comparator: mixed result vs. secret |
| D505 | LED | MATCH indicator |
| R514 | 330Ω | D505 series resistor |
| JP501–504 | Solder jumper | First input value (set at kitting) |
| JP505–508 | Solder jumper | Second input value (set at kitting) |
| JP509–512 | Solder jumper | Secret target (set at kitting, not documented here) |

## Assembly

1. **Power.** Solder SW1, BT1, and R1. The filled silk dot marks pin 1 or the positive side.
2. **Core logic.** Solder U501 and U502 in their sockets, pin-1 dots aligned, then R514. JP501–512 come pre-set from kitting .. leave them alone.
3. **Output.** Solder D1–D4, R2–R5, and the dedicated MATCH LED D505.
4. **Interaction.** Solder SW2 for frame consistency with the other five boards, even though this node's logic doesn't read it.
5. Insert the CR2032 with the + side facing out and slide the power switch on. D1–D4 should show the mixed value from the two input jumpers immediately. D505 lights separately, only when that mixed value matches the hidden secret.

## How it works

Two ICs do the work. A 74HC86 XOR IC (U501) mixes two independently-set 4-bit inputs bit by bit and drives that result straight onto D1–D4. That same mixed result feeds one side of a 74HC85 magnitude comparator (U502), whose other side is a fixed secret; the comparator's equal output drives D505 alone.

An earlier revision of this board used a third chip to hide D1–D4 entirely until the match condition was true, so the mixed value itself was the secret. That chip couldn't be cut without deleting the mechanic outright, so it was dropped: the mixed nibble is now always visible on D1–D4, and D505 is the only signal that gates on the comparison. Two chips, two separate and always-honest readouts, instead of three chips and one that hides the other.

## The lesson

Authentication and equality comparison, plus composition. This is the node that chains two primitives, XOR mixing and magnitude comparison, side by side: you can watch the mix happen on D1–D4 and watch the comparator's verdict happen separately on D505.

## CTF role

Node E combines two other nodes' shards (for example, A and B) into a convergence result. You don't need every variant in the room to solve this one, just enough to feed the two inputs.
