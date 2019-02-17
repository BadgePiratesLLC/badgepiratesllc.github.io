---
layout: post
title: SAO version 2
---

If you have been to DefCon last year and picked up a Badge you will have noticed a 4 pin connector maybe labeled SAO or Shitty Add-On. This is a standard used by the #BadgeLife Community of Badge Makers to provide a standard for adding additional boards onto your Official or Un-Official Badges. Last years SAO connection was a simple 4 pin that allowed for VCC, GND, SCL and SDA (or better known as I2C Bus).

![SAO_v1](https://raw.githubusercontent.com/badgepiratesllc.github.io/images/Shitty_v1.png)

Well this did provide some limitations, first noted was the week connections with just 4 pins, along with availability of those 2x2 male and female headers, and finally the limited functionality. 

Well not to be outdone a new version of the SAO is now standardized by the #BadgeLife Community and Here it is.

The new design is a 6 pin connection (2x3) that allows for 2 additional Pins. Of course it is reverse compatible with the older SAO Add-ons and the I2C bus is in the same place, but this year we added 2 additional Pins Mapped to GPIO1 and GPIO2 on the MCU that is being used. 

![SAO_v2](https://raw.githubusercontent.com/badgepiratesllc.github.io/images/Shitty_v2.png)
      

So look for these new add-on Specs, or get out there and make your own using the above. Or bring your old one and ensure it works on the new badges.

See you at the Cons

