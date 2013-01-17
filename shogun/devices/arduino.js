var SerialConnector = require('../lib/SerialConnector').SerialConnector
  , cnst = require('../common/constants').constants;

/**
 * @constructor
 */
function Arduino(port) {
    this.sc = new SerialConnector(port);
}

/* ----------------------
 * Public
 * ---------------------- */

/**
 * Write data to Arduino
 * @param {common/constants.MODE} mode is ANALOG, DIGITAL or SET.
 * @param {Number} pin is pin number.
 * @param {Number} val is output value.
 */
function write(mode, pin, val) {
    // validation
    if(mode > cnst.MODE.length) new Error('Invalid mode');
    if(!parseInt(mode))  new Error('"mode" should be number.');
    if(!parseInt(pin))  new Error('"pin" should be number.');
    if(!parseInt(val))  new Error('"val" should be number.');

    this.sc.write([mode, pin ,val]);
};

/* ----------------------
 * Exports
 * ---------------------- */
Arduino.fn = Arduino.prototype;
Arduino.fn.write = write;
exports.Arduino = Arduino;

/* ----------------------
 * Test
 * ---------------------- */
if(require.main == module) {
    var PORT = '/dev/cu.usbmodem26421'
      , arduino = new Arduino(PORT);

    arduino.sc.sp.on('data', function(d) {
        console.log(d.readUInt8(0));
    });
    arduino.sc.open(function() {
        setTimeout(function() {
            arduino.write(2,9,1);
        }, 1000);
        setTimeout(function() {
            //arduino.write(1,9,1);
        }, 2000);
        setTimeout(function() {
            arduino.write(1,9,0);
        }, 3000);
    });
}
