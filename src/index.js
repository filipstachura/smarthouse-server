import Server from './Server';
import Player from './Player';
import SystemController from './SystemController';

const server = new Server(new Player(), new SystemController());
server.start();
