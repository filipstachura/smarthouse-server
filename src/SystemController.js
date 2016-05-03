import loudness from 'loudness';

export default class SystemController {
  constructor() {}
  volumeUp() {
    loudness.setVolume(100, function (err) {
    });
  }
  volumeDown() {
    loudness.setVolume(50, function (err) {
    });
    //loudness.getVolume(function (err, vol) {
    //});
  }
}
