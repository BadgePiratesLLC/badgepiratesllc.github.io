---
layout: page
title: "Node D — Parity | BSidesKC 2027"
permalink: /docs/bsideskc27/node-d/
publish_target: blog
---

# NODE D — PARITY

You're holding one of six BSidesKC 2027 badge nodes. This one doesn't hide anything: it checks whether an input is valid.

## What it does

The board reduces a 4-bit input to a single parity bit and reports it on the LEDs. It's a check, not a transform.

## Board

96mm × 66mm, rounded corners, four mounting holes. One IC socket, a small jumper zone.

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

Node D logic:

| Ref | Part | Function |
|---|---|---|
| U401 | 74HC86 | XOR chain wired as a parity tree |
| JP401–404 | Solder jumper | Input value (set at kitting) |
| JP405 | Solder jumper | Marks the output bit |

## Assembly

1. **Power.** Solder SW1, BT1, and R1. The filled silk dot marks pin 1 or the positive side.
2. **Core logic.** Solder U401 in its socket, pin-1 dot aligned. JP401–405 come pre-set from kitting .. leave them alone.
3. **Output.** Solder D1–D4 and R2–R5.
4. **Interaction.** Solder SW2 for frame consistency with the other five boards, even though this node's logic doesn't read it.
5. Insert the CR2032 with the + side facing out and slide the power switch on. The LEDs should show a VALID/INVALID-style result the moment the board is powered, driven directly by the jumper-set input.

## How it works

A 74HC86 XOR IC (U401) is wired as an XOR chain, the classic way to build a parity tree out of two-input XOR gates. It takes the four input bits (JP401–404) and reduces them to a single parity bit (JP405 marks the output). Unlike Node B's XOR, which combines two 4-bit values into one, this is one 4-bit value reduced to a single bit describing whether it has even or odd parity.

## The lesson

Integrity checking is a different problem from confidentiality. This node detects whether data was changed; it doesn't hide anything. That's the deliberate contrast with Nodes B and C, which transform or rearrange rather than validate.

## CTF role

Node D produces shard D, or a validity and ordering clue used to sequence the other shards. Combine it with shards from the other nodes you find.
