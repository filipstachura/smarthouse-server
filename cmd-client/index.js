
var serverIp = process.argv[2];
var action = process.argv[3];

var serverURL = 'http://' + serverIp + ':8090';

var socket = require('socket.io-client')(serverURL, {
  transports: ['websocket'],
  jsonp: false
});

console.log('sending ' + action + ' to server: ' + serverIp);

var emitOut = socket.emit(action);
setTimeout(process.exit, 100);
