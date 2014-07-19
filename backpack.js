var tessel = require('tessel');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var HT16K33 = module.exports = function(opts) {
  EventEmitter.call(this);
  var self = this;
  this.addr = opts.addr || 0x70;
  var port = opts.port;
  this.i2c = null;
  var i2c = new port.I2C(slave);
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

HT16K33.prototype.write = function(buf, cb) {
  if(!this.i2c) {
    console.log('i2c connection not setup yet. You should listen for the \'ready\' event.');
  } else {
    this.i2c.send(buf, cb);
  }
};


