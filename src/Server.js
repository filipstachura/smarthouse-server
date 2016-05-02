import SocketServer from 'socket.io';

export default class Server {
  constructor(player) {
    this.player = player;
  }
  start() {
    console.log("starting server...");
    const io = new SocketServer().attach(8090);

    io.on('connection', (socket) => {
      console.log("received connection");
      socket.on('select', ({ stationId }) => {
        console.log(`selected ${stationId}`);
        this.player.play(stationId);
      });
    });
  }
}
