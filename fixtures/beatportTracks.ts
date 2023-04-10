import type { BeatportTrack } from '@src/types/tracks';

const beatportTrackSingle: BeatportTrack = {
  id: '9103964',
  artists: 'Amtrac',
  name: 'IDKILY',
  spotifyUri: 'spotify:track:01VTDFZQ4aGRdHR92rSd1T',
};

const beatportTrackCollection: BeatportTrack[] = [
  beatportTrackSingle,
  {
    id: '8548643',
    artists: 'Ben Bohmer',
    name: 'Submission',
    spotifyUri: 'spotify:track:62v8TxB9mWRjRcZhwpHweg',
  },
  {
    id: '9073266',
    artists: 'Howling',
    name: 'Phases (Club Edit)',
    spotifyUri: 'spotify:track:5hTCtu6PTu5aZYVwIEJIsk',
  },
  {
    id: '9671018',
    artists: 'Qrion',
    name: 'Hush',
    spotifyUri: 'spotify:track:1ANxh5rsOarOQFW4OMCMNw',
  },
  {
    id: '9776489',
    artists: 'Ben Bohmer',
    name: 'Flug & Fall',
    spotifyUri: 'spotify:track:6ffxu4OQhpMm610PBPwsEZ',
  },
];

export { beatportTrackSingle, beatportTrackCollection };
