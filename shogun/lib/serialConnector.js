/**
 * Dependency
 */
var serialPort = require('serialport')
  , SerialPort = serialPort.SerialPort
  , util = require('util');

/**
 * Const
 */
var DEBUG = false
, OFFSET = 0;

// Default options
var _options = {
    baudrate: 9600
    , dataBits: 16 
}
/**
 * @constructor
 */
function SerialConnector(port, options) {
    var options = options || {};

    util._extend(options, _options);
    this.sp = new SerialPort(port, options);
    this.init();
}
SerialConnector.fn = SerialConnector.prototype;

SerialConnector.fn.init = function() {
    this.sp.on('data', function(data) {
        DEBUG && console.log(data);
    });
}

SerialConnector.fn.write = function(data) {
    if(typeof data == 'string') {
        this.sp.write(data);
    } else {
        var datas = []
          , i;

        if(util.isArray(data)) {
            datas = data;
        } else {
            datas.push(data);
        }
        for(i in datas) {
            buf = new Buffer(1);
            buf.writeUInt8(datas[i], OFFSET);
            //console.log(datas[i]);
            this.sp.write(buf);
        }
    }
    this.sp.flush();
}

function handleData(data, cb) {
    var data = data.readInt8(OFFSET);
    if(this.hasOwnProperty('buffer')) {
        this.buffer = this.buffer + (data << 8);
        cb(this.buffer);
        this.buffer = null;
    } else {
        this.buffer = data;
    }
}

SerialConnector.fn.open = function(cb) {
    cb && this.sp.on('open', cb);
}

SerialConnector.fn.bind = function(cb) {
    var that = this;
    if(cb) {
        this.sp.on('data', function(data) {
            handleData.call(that, data, cb);
        });
    }
}

SerialConnector.fn.flush = function(cb) {
    this.sp.flush();
}


/**
 * Exports
 */
exports.SerialConnector = SerialConnector;

