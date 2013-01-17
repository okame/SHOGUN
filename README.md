SHOGUN
======

Express plugin for communicating Arduino.

# Routing

## Setting pin mode

### Format
> /arduino/[pin number]/{in, out}

### Example
> /arduino/d1/out
- Setting pinMode of pin 1 to OUTPUT.

> /arduino/d11/in
- Setting pinMode of pin 11 to INPUT.

## Outputing signals

### Format
> /arduino/[pin number]/[value]

### Example
> /arduino/d1/high
- You access this path, then a pin 1 on your arduino gets high as digital signal.

> /arduino/d3/low
- This path is same. A pin 3 gets a low as digital signal.

> /arduino/d2/110
- This path is a version of analog. A pin 2 gets a 110 as analg signal.

