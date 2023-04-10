import type { BeatportTrack } from '@src/types/tracks';

const firebaseOrphanTrackSingle: BeatportTrack = {
  id: '16334515',
  artists: 'Jinadu, Simon Doty',
  name: 'Dreamscape feat. Jinadu',
};

const firebaseTrackSingle: BeatportTrack = {
  id: '16918532',
  artists: 'Tim Green',
  name: "We've Been Here Before",
  spotifyUri: 'https://open.spotify.com/track/abc123',
};

const firebaseTrackCollection: BeatportTrack[] = [
  firebaseTrackSingle,
  firebaseOrphanTrackSingle,
  {
    id: '17247538',
    artists: 'Panama, Nils Hoffmann',
    name: 'Far Behind feat. Panama',
  },
];

export {
  firebaseOrphanTrackSingle,
  firebaseTrackSingle,
  firebaseTrackCollection,
};
