import type { NextApiRequest, NextApiResponse } from 'next';

import spotifyClient, { refreshAccessToken } from '@src/lib/spotify';
import { spotifyTrack } from '@src/normalizers/track';
import { SearchSpotifyTracksResponse } from '@src/types/requests';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchSpotifyTracksResponse>,
) {
  // Refresh the access token proactively.
  // Some day I'll implement retries (jk no I won't).
  await refreshAccessToken();

  const { artists, track, extendedMix = 'true', type = 'track' } = req.query;

  let trackQuery = `track:${track}`;
  // Append "extended mix" to the query if the user wants it.
  trackQuery =
    extendedMix === 'true' ? `${trackQuery} extended mix` : trackQuery;
  const artistsQuery = `artist:${artists}`;

  // Build the query string.
  // Leave a query segment out if the user didn't provide it.
  // This allows you to search for just an artist or just a track.
  const query = [
    ...(artists ? [artistsQuery] : []),
    ...(track ? [trackQuery] : []),
  ].join(' ');

  // Do the search
  const { body } = await spotifyClient.searchTracks(query);

  const response = {
    tracks: body.tracks ? body.tracks.items.map(spotifyTrack) : [],
  };

  res.status(200).json(response);
}
