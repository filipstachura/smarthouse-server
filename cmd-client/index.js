var serverURL = 'http://localhost:8090';
var socket = require('socket.io-client')(serverURL, {
  transports: ['websocket'],
  jsonp: false
});

var url = 'https://www.youtube.com/watch?v=hCR4etRnvGU';
socket.emit('playYoutube', { url });
