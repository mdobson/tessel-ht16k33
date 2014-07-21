var tessel = require('tessel');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var ledAddresses = [0x80, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40];
var digitCodes = [];

var HT16K33 = module.exports = function(opts) {
  EventEmitter.call(this);
  var self = this;
  this.addr = opts.addr || 0x70;
  var port = opts.port;
  this.i2c = null;
  var i2c = new port.I2C(this.addr);
  i2c.send(new Buffer([0x21]), function(err) {
    if(err) {
      console.log('Error:', err);
    }
    i2c.send(new Buffer([0xEF]), function(err) {
      if(err) {
        console.log('Error:', err);
      }
      i2c.send(new Buffer([0x81]), function(err) {
        if(err) {
          console.log('Error:', err);
        }
        self.i2c = i2c;
        self.emit('ready');
      });
    });
  });


};
util.inherits(HT16K33, EventEmitter);

//Generic write function that expects a buffer.
//Use at your own risk!
HT16K33.prototype.write = function(buf, cb) {
  if(!this.i2c) {
    console.log('i2c connection not setup yet. You should listen for the \'ready\' event.');
  } else {
    this.i2c.send(buf, cb);
  }
};

HT16K33.prototype.writeBitmap = function(pattern, cb) {
  var start = new Buffer([0x00]);
  var ledPatterns = [start];
  pattern.forEach(function(row){
    var bytePattern = 0x00;
    var bitIndex = 0;
    row.forEach(function(bit) {
      if(bit === 1) {
        bytePattern += ledAddresses[bitIndex];
      }
      bitIndex++;
    });
    ledPatterns.push(new Buffer([ bytePattern, 0x00 ]));
  });

  var buf = Buffer.concat(ledPatterns);
  this.write(buf, cb);
};

HT16K33.prototype.clear = function(cb) {
  this.write(new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]), cb);
};

HT16K33.prototype.writeDigit = function(digit, cb) {
  var code = digitCodes[digit - 1];
  this.write(new Buffer([0x00, code, 0x00]), cb);
};
