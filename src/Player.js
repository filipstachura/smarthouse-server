import child_process from 'child_process';

const STREAMS = [
  { filename: 'streams/trojka.pls', id: 'trojka' },
  { filename: 'streams/hit.pls', id: 'hit' },
  { filename: 'streams/kolor.pls', id: 'kolor' },
  { filename: 'streams/rmfmaxxx.pls', id: 'rmfmaxxx' }
];

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
    console.log('play: ' + streamId);
    if (this.isPlaying()) {
      console.log('stopping');
      this.stop();
    }
    let stream = STREAMS.filter(s => s.id === streamId)[0];
    console.log(`starting stream ${stream.filename}`);
    this.mplayer = child_process.spawn('mplayer', ['-playlist', stream.filename]);
    this.attachEvents();
  }
}
