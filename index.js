var tessel = require('tessel');
var port = tessel.port.A;
var slave = 0x70;

var i2c = new port.I2C(slave);
console.log('Begin transfer');
i2c.send(new Buffer([0x21]), function(err) {
  console.log('Initializing connection to backpack...');
  console.log('turning on the oscillator...');
  if(err) {
    console.log('Error:', err);
  }
  i2c.send(new Buffer([0xEF]), function(err) {
    if(err) {
      console.log('Error:', err);
    }
    console.log('Setting brightness to max...');
    i2c.send(new Buffer([0x81]), function(err) {
      if(err) {
        console.log('Error:', err);
      }
      console.log('Turn blink off and display on...');
      setTimeout(function() {
        i2c.send(new Buffer([0x00, 0x1E, 0x00, 0x21, 0x00, 0xD2, 0x00, 0xC0, 0x00, 0xD2, 0x00, 0xCC, 0x00, 0x21, 0x00, 0x1E, 0x00]), function(err) {
          if(err) {
            console.log('Error:', err);
          }
          console.log('writing data to animate LEDs...');
        });
      }, 2000);
    });
  });
});

