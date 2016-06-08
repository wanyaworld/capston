var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://onem2m.sktiot.com:1833');

client.on('connect', function () {
    client.subscribe('presence');
    client.publish('presence', 'Hello mqtt');
});

client.on('message', function (topic, message) {
    // message is Buffer 
    console.log(message.toString());
    client.end();
});
