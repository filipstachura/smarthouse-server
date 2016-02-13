import Server from './Server';
import Player from './Player';

const server = new Server(new Player());
server.start();
