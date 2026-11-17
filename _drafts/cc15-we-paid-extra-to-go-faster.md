---
layout: post
title: "CC15: we paid extra to go faster, and the firmware's been sitting ready for days"
publish_target: 2026-11-23
categories: [hardware, badges, cc15]
author: Kevin Bennett
---

Five assembled CC15 prototypes went on order at PCBWay on November 10. Two things happened after that order went in that are worth writing down while they're fresh, because neither one is the kind of thing you remember accurately a month later.

## The fab bumped the order to expedited, and billed for it

The original quote for this run was $38.14. A few days into production, the shop converted the order to their expedited assembly service and the new total came back at $56.03, $17.89 more than quoted. No explanation needed, no dispute filed. The faster path costs more, the boards are already committed, and $17.89 is not the hill to fight a delivery date on. Paid it, confirmed in writing, moved on.

That's the actual math on "rush fee": not a horror story, just a real number on a real invoice, and a decision made in under a day instead of turning into a week of back-and-forth over eighteen dollars.

## The silkscreen says who built it

Somewhere in the last round of board edits, the front silkscreen picked up a line that wasn't there before: "Assembled By: PCBWay." Small thing, lives right next to the logo, didn't cost anything to add, didn't touch a single trace. It's a credit line. The fab doing the work gets named on the board it's building. That felt right.

## The firmware got ahead of the hardware, for once

Usually on this project it's been the other way around: hardware waiting on a routing decision, firmware waiting on hardware. This time, by the point the last LED routing call landed, the firmware side was already done waiting. Boot, the on-screen UI, over-the-air updates, power and battery reporting, and a factory self-test mode a badge can run through on its own all already exist, already run on this chip, and already got checked against the project's own commit history rather than taken on faith.

That includes LED support for all three positions originally on the table, south, west, and the east position that ultimately didn't make this board revision. The east code stays in the tree, gated off, until it gets trimmed to match what's actually on the board. Writing code for a part that didn't ship is a cheap mistake to find now, before anything gets flashed to a real chip.

Nothing has touched real hardware yet. The boards are built at the fab, not in anyone's hands. That's the next milestone, and the next post.

Kevin
