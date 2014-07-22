var tessel = require('tessel');
var LEDBackpack = require('./backpack');

var port = tessel.port.A;
var slave = 0x70;

var bp = new LEDBackpack({addr: slave, port: port});

bp.on('ready', function() {
 
  setTimeout(function() {
    bp.clear();
  }, 2000);
});

function writeSmileyInBytes(bp) {
  bp.write(new Buffer([0x00, 0x1E, 0x00, 0x21, 0x00, 0xD2, 0x00, 0xC0, 0x00, 0xD2, 0x00, 0xCC, 0x00, 0x21, 0x00, 0x1E, 0x00]), function(err) {
    if(err) {
      console.log('Error:', err);
    }
    console.log('writing data to animate LEDs...');
  });
}

function writeSadInBitmap(bp) {
  var bmp = [
    [ 0,0,1,1,1,1,0,0 ],
    [ 0,1,0,0,0,0,1,0 ],
    [ 1,0,1,0,0,1,0,1 ],
    [ 1,0,0,0,0,0,0,1 ],
    [ 1,0,0,1,1,0,0,1 ],
    [ 1,0,1,0,0,1,0,1 ],
    [ 0,1,0,0,0,0,1,0 ],
    [ 0,0,1,1,1,1,0,0 ]
  ]

  bp.writeBitmap(bmp, function(err) {
    if(err) {
      console.log('Error:', err);
    }
    console.log('Writing data to animate LEDs...');
  });
}


