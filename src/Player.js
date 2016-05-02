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
    this.mplayer.stdout.on('data', (data) => {console.log(data.toString())});
    this.mplayer.stderr.on('data', (data) => {
      console.log(`mplayer stderr: ${data}`);
    });
    this.mplayer.on('close', (code) => {
      if (code !== 0) {
        console.log(`mplayer process exited with code ${code}`);
      }
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
    this.mplayer = child_process.spawn('mplayer', ['-playlist', stream.filename]);
    this.attachEvents();
  }
  playYoutube(url) {
    this.getReady();
    console.log('play youtube: ' + url);
    this.mplayer = child_process.spawn('./bash/playYoutube.sh', [url])
      .on('error', function( err ){ throw err });
    this.attachEvents();
  }
}
