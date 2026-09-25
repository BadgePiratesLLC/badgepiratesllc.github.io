---
layout: page
title: "Node C — Shuffle | BSidesKC 2027"
permalink: /docs/bsideskc27/node-c/
publish_target: blog
---

# NODE C — SHUFFLE

You're holding one of six BSidesKC 2027 badge nodes. This one has no logic chip at all: the puzzle is entirely in the copper.

## What it does

The board takes a 4-bit input and reorders the bits into a different output position. Nothing about the values changes, only where they land.

## Board

96mm × 66mm, rounded corners, four mounting holes. The simplest board of the six: no IC socket zone, just the shared frame plus four jumpers.

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

Node C logic:

| Ref | Part | Function |
|---|---|---|
| JP301–304 | Solder jumper | Input-to-output routing. The permutation itself, fixed at kitting |

## Assembly

1. **Power.** Solder SW1, BT1, and R1. The filled silk dot marks pin 1 or the positive side.
2. **Core logic.** There's no chip to socket on this board. JP301–304 come pre-routed from kitting: each one wires an input bit to a specific LED position. Leave them alone.
3. **Output.** Solder D1–D4 and R2–R5.
4. **Interaction.** Solder SW2 for frame consistency with the other five boards, even though this node's logic doesn't read it.
5. Insert the CR2032 with the + side facing out and slide the power switch on. D1–D4 should light in whatever pattern the input jumpers set, just not in the position a straight-across reading would predict.

## How it works

There's no logic IC on this board. The "transformation" is entirely solder-jumper routing. Each input bit is wired, via its own jumper, to a specific LED that isn't the LED in its own bit position. The permutation is fixed by which physical traces got connected at kitting time: the board spends copper instead of parts to implement the puzzle.

## The lesson

Permutation is not encryption. Reordering data hides nothing about the individual bit values, only their position. It's the cheapest possible lesson in "scrambled is not the same as secret," and the easiest board on the table to solder: no IC, no socket, four jumpers and you're done.

## CTF role

Node C produces shard C at essentially zero added parts cost. This node exists to prove the point that not every shard needs a chip. Combine it with shards from the other nodes you find.
