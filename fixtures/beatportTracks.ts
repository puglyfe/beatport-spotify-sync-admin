import type { BeatportTrack } from '@src/types/tracks';

const beatportTrackSingle: BeatportTrack = {
  id: '123',
  artists: 'Montcalm',
  name: 'Relieve Me',
  spotifyUri: 'https://open.spotify.com/track/abc123',
};

const beatportTrackCollection: BeatportTrack[] = [
  beatportTrackSingle,
  {
    id: '456',
    artists: 'Montcalm',
    name: "I Can't Find",
    spotifyUri: 'https://open.spotify.com/track/def456',
  },
];

export { beatportTrackSingle, beatportTrackCollection };
