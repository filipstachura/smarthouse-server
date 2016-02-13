import child_process from 'child_process';

const STREAMS = ['streams/trojka.pls', 'streams/rmfmaxxx.pls'];

export default class Player {
  stop() {
    this.mplayer.kill();
    this.mplayer = undefined;
  }
  isPlaying() {
    return this.mplayer !== undefined;
  }
  attachEvents() {
    this.mplayer.stdout.on('data', (data) => {});
    this.mplayer.stderr.on('data', (data) => {
      console.log(`mplayer stderr: ${data}`);
    });
    this.mplayer.on('close', (code) => {
      if (code !== 0) {
        console.log(`mplayer process exited with code ${code}`);
      }
    });
  }
  play(streamId) {
    let filename = STREAMS[streamId];
    this.mplayer = child_process.spawn('mplayer', ['-playlist', filename]);
    this.attachEvents();
  }
}
