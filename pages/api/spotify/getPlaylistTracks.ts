import type { NextApiRequest, NextApiResponse } from 'next';

import { SPOTIFY_PAGINATION_LIMIT } from '@src/constants';
import spotifyClient from '@src/lib/spotify';
import { spotifyTrack } from '@src/normalizers/track';
import type { GetPlaylistTracksResponse } from '@src/types/requests';

const { SPOTIFY_PLAYLIST_ID } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPlaylistTracksResponse>,
) {
  // Refresh the access token proactively.
  // Some day I'll implement retries (jk no I won't).
  const accessTokenResponse = await spotifyClient.refreshAccessToken();
  spotifyClient.setAccessToken(accessTokenResponse.body['access_token']);

  const { offset = 0, limit = SPOTIFY_PAGINATION_LIMIT } = req.query;

  // Get the playlist.
  const { body } = await spotifyClient.getPlaylistTracks(
    SPOTIFY_PLAYLIST_ID as string,
    {
      // luv 2 recreate graphql in rest
      // 4.3kb payload with this param vs 29.7 kb without it (85.5% reduction)
      fields:
        'items(track(album(images), artists(name), external_urls, id, name, uri))',
      limit: Number(limit),
      offset: Number(offset),
    },
  );

  const response = body.items?.length
    ? {
        tracks: (
          body.items
            .map(({ track }) => track)
            // Apparently these can be null, so filter those out.
            .filter((track) => track) as SpotifyApi.TrackObjectFull[]
        ).map(spotifyTrack),
        nextOffset: Number(offset) + Number(limit),
      }
    : {
        tracks: [],
        nextOffset: null,
      };

  res.status(200).json(response);
}
