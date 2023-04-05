import type { BeatportTrack, SpotifyTrack } from '@src/types/tracks';

// This is an attempt to clean up my bad data.
// Due to changes in the email template parsing over the years,
// old tracks have capitalized keys, whereas newer tracks have lowercased keys.
// Gross.
const beatportTrack = ([id, track]: [
  id: string,
  track: any,
]): BeatportTrack => ({
  id,
  artists: track?.track?.Artists ?? track?.track?.artists ?? 'Artist Missing',
  name: track?.track?.Name ?? track?.track?.name ?? 'Track Name Missing',
  spotifyUri: track?.spotifyUri,
});

const spotifyTrack = ({
  album,
  artists,
  external_urls: { spotify: spotifyUrl },
  id,
  name,
  uri,
}: SpotifyApi.TrackObjectFull): SpotifyTrack => ({
  id,
  artists: artists.map(({ name }: { name: string }) => name).join(', '),
  // Images are ordered by size, so we want the last (smallest) one.
  image: album.images[album.images.length - 1].url,
  name,
  spotifyUrl,
  uri,
});

export { beatportTrack, spotifyTrack };
