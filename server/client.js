var mqtt = require('mqtt')
 
var client = mqtt.connect('mqtt://localhost:1883')
 
client.on('connect', function() {
  // setInterval(client.publish.bind(client, 'presence', 'Hello mqtt'), 2000);
  client.publish.call(client, 'presence', 'Hello mqtt')
  // client.publish('presence', 'Hello mqtt')
})

client.subscribe('presence');
 
client.on('message', function(topic, message) {
  console.log(message);
});
 
console.log('Client started...');
