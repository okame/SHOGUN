/**
 * Dependencies.
 */
var Arduino = require('./devices/arduino').Arduino
  , cnst = require('./common/constants').constants;

/* ----------------------
 *  Alias
 * ----------------------*/
var MODE = cnst.MODE
  , TAG = cnst.PIN_TAG
  , PIN_MODE = cnst.PIN_MODE
  , D_OUT = cnst.DIGITAL_OUT;

/**
 * @constructor
 */
function Shogun(port, app) {
    this.arduino = new Arduino(port);
    this.app = app;
    this.attach();
}
Shogun.fn = Shogun.prototype;

function route(req, res){
    var _pin = req.params.pin
      , pin = _pin.slice(1)
      , tag = _pin.slice(0,1)
      , val = req.params.val
      , mode
      , result = {};
    
    if(val == PIN_MODE.IN) {
        mode = MODE.PINSET;
        val = 0;
    } else if(val == PIN_MODE.OUT) {
        mode = MODE.PINSET;
        val = 1;
    } else if(tag == TAG.D) {
        mode = MODE.DIGITAL;
        if(val == D_OUT.HIGH) {
            val = 1;
        } else if(val == D_OUT.LOW) {
            val = 0;
        } else {
            new Error('Unknown value parameter: ' + val);
        }
    } else if(tag == TAG.A) {
        mode = MODE.ANALOG;
    } else if(tag != TAG.D && tag != TAG.A) {
        new Error('Pin number should be this format. {d|a}number');
    }
    try {
        pin = parseInt(pin, 10);
    } catch(e) {
        new Error('Pin number should be type of Number.');
    }
    try {
        val = parseInt(val, 10);
    } catch(e) {
        new Error('value should be type of Number or {in|out}.');
    }

    this.arduino.write(mode, pin, val);

    result.mode = mode;
    result.pin = pin;
    result.val = val;

    res.send(JSON.stringify(result));
};

/**
 * Attach path to express for writing signals.
 */
function attach() {
    this.app.get('/arduino/:pin/:val', this.route.bind(this));
}

/**
 * @exports
 */
Shogun.fn.route = route;
Shogun.fn.attach = attach;
exports.Shogun = Shogun;
