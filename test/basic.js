var test = require('tape');
var WebRTC = require('../webrtc');

test('basic test with two peers', function (t) {
    var webrtc1 = new WebRTC({});
    var webrtc2 = new WebRTC({});
    var peer1;
    var peer2;

    webrtc1.on('message', function (payload) {
        peer2.handleMessage(payload);
    });
    webrtc2.on('message', function (payload) {
        peer1.handleMessage(payload);
    });
    webrtc1.startLocalMedia(null, function (err, stream) {
        if (err) {
            t.fail('failed to get local media');
            return;
        }
        t.pass('got local media');

        webrtc2.localStream = stream;
        peer1 = webrtc1.createPeer({});
        peer2 = webrtc2.createPeer({});

        peer1.pc.on('iceConnectionStateChange', function () {
            if (peer1.pc.iceConnectionState == 'connected') {
                t.pass('P2P connection established');
                t.end();
            }
        });

        peer1.start();
    });
});
