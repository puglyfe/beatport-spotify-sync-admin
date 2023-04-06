import type { NextApiRequest, NextApiResponse } from 'next';

import spotifyClient, { refreshAccessToken } from '@src/lib/spotify';

const { SPOTIFY_DEFAULT_DEVICE_ID, SPOTIFY_PLAYLIST_ID } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Refresh the access token proactively.
  // Some day I'll implement retries (jk no I won't).
  await refreshAccessToken();

  const { context_uri = `spotify:playlist:${SPOTIFY_PLAYLIST_ID}`, uri } =
    req.body;

  const response = await spotifyClient.play({
    context_uri,
    device_id: SPOTIFY_DEFAULT_DEVICE_ID,
    offset: {
      uri,
    },
  });

  res.status(response.statusCode).end();
}
