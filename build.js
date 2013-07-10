var bundle = require('browserify')();
var fs = require('fs');

bundle.add('./webrtc');
bundle.bundle({standalone: 'WebRTC'}, function (err, source) {
    if (err) console.error(err);
    fs.writeFileSync('webrtc.bundle.js', source);
});
