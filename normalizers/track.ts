import type {
  BeatportTrack,
  LegacyTrackEntryData,
  SpotifyTrack,
  TrackEntryData,
} from '@src/types/tracks';

// This is an attempt to clean up my bad data.
// Due to changes in the email template parsing over the years,
// old tracks have capitalized keys, whereas newer tracks have lowercased keys.
// Gross.
const beatportTrack = (
  trackEntry: TrackEntryData | LegacyTrackEntryData,
): BeatportTrack => {
  const { track } = trackEntry;

  if ('Artists' in track) {
    return {
      id: track.Item,
      artists: track.Artists ?? 'Artist Missing',
      name: track.Name ?? 'Track Name Missing',
      spotifyUri: trackEntry.spotifyUri,
    };
  } else {
    return {
      id: track.item,
      artists: track.artists ?? 'Artist Missing',
      name: track.name ?? 'Track Name Missing',
      spotifyUri: trackEntry.spotifyUri,
    };
  }
};

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
