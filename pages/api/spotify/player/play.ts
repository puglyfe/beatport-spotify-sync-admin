import type { NextApiRequest, NextApiResponse } from 'next';

import spotifyClient, { refreshAccessToken } from '@src/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Refresh the access token proactively.
  // Some day I'll implement retries (jk no I won't).
  await refreshAccessToken();

  const {
    context_uri = `spotify:playlist:${process.env.SPOTIFY_PLAYLIST_ID}`,
    uri,
  } = req.body;

  const response = await spotifyClient.play({
    context_uri,
    device_id: process.env.SPOTIFY_DEFAULT_DEVICE_ID,
    offset: {
      uri,
    },
  });

  res.status(response.statusCode).end();
}
