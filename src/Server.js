import SocketServer from 'socket.io';

export default class Server {
  constructor(player, systemController) {
    this.player = player;
    this.system = systemController;
  }
  start() {
    console.log("starting server...");
    const io = new SocketServer().attach(8090);

    io.on('connection', (socket) => {
      console.log("received connection");
      socket.on('select', ({ stationId }) => {
        console.log(`selected ${stationId}`);
        this.player.playRadio(stationId);
      });
      socket.on('volumeUp', () => {
        console.log(`turning volume up`);
        this.system.volumeUp();
      });
      socket.on('volumeDown', () => {
        console.log(`turning volume down`);
        this.system.volumeDown();
      });
      socket.on('turnOffRadio', () => {
        console.log(`turning off radio`);
        this.player.stop();
      });
      socket.on('turnOnRadio', () => {
        console.log(`turning on radio`);
        this.player.playRadio('trojka');
      });
      socket.on('playYoutube', ({ url }) => {
        console.log(`playing youtube ${url}`);
        this.player.playYoutube(url);
      });
    });
  }
}
