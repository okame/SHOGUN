SHOGUN
======

Express plugin for communicating Arduino.

# Usage
Download SHOGUN and fix your app.js.

## app.js
Add only this codes.
```javascript
var Shogun = require('../shogun/shogun').Shogun; 
var PORT = '/dev/cu.usbmodem26421'
var shogun = new Shogun(PORT, app);
```

It's very easy. Please see express-sample on top directory for detail.

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

> /arduino/a2/110
- This path is a version of analog. A pin 2 gets a 110 as analg signal.

