import loudness from 'loudness';

function getLoudness() {
  return new Promise((resolve, reject) => {
    loudness.getVolume(function (err, vol) {
      if (err) {
        reject(err);
      }
      resolve(vol);
    });
  });
}

function setLoudness(volume) {
  console.log(`Setting volume to ${volume}`)
  return new Promise((resolve, reject) => {
    loudness.setVolume(volume, function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

export default class SystemController {
  constructor() {}
  volumeUp() {
    getLoudness().then(vol => setLoudness(Math.min(100, vol + 5)));
  }
  volumeDown() {
    getLoudness().then(vol => setLoudness(Math.max(0, vol - 5)));
  }
}
