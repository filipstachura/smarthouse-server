import child_process from 'child_process';

const STREAMS = [
  { filename: 'streams/trojka.pls', id: 'trojka' },
  { filename: 'streams/hit.pls', id: 'hit' },
  { filename: 'streams/kolor.pls', id: 'kolor' },
  { filename: 'streams/rmfmaxxx.pls', id: 'rmfmaxxx' }
];

export default class Player {
  stop() {
    console.log("killing mplayer")
    this.mplayer.kill();
    process.kill(-this.mplayer.pid); // force killing
    this.mplayer = undefined;
  }
  isPlaying() {
    return this.mplayer !== undefined;
  }
  attachEvents() {
    this.mplayer.stdout.on('data', (data) => {});
    this.mplayer.stderr.on('data', (data) => {
      // console.log(`mplayer stderr: ${data}`);
    });
    this.mplayer.on('close', (code) => {
      console.log(`mplayer process exited with code ${code}`);
    });
  }
  getReady() {
    if (this.isPlaying()) {
      console.log('stopping');
      this.stop();
    }
  }
  playRadio(streamId) {
    this.getReady();
    console.log('play: ' + streamId);
    let stream = STREAMS.filter(s => s.id === streamId)[0];
    console.log(`starting stream ${stream.filename}`);
    this.mplayer = child_process.spawn('mplayer', ['-playlist', stream.filename], {detached: true});
    this.attachEvents();
  }
  playYoutube(url) {
    this.getReady();
    console.log('play youtube: ' + url);
    this.mplayer = child_process.spawn('./bash/playYoutube.sh', [url], {detached: true});
    this.attachEvents();
  }
}
