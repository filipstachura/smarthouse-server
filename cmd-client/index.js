
var serverIp = process.argv[2];
var url = process.argv[3];

var serverURL = 'http://' + serverIp + ':8090';

var socket = require('socket.io-client')(serverURL, {
  transports: ['websocket'],
  jsonp: false
});

console.log('Playing ' + url + 'on server: ' + serverIp);
socket.emit('playYoutube', { url });
