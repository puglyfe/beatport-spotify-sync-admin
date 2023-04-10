import type { NextApiRequest, NextApiResponse } from 'next';

import spotifyClient, { refreshAccessToken } from '@src/lib/spotify';
import { AddPlaylistTrackRequest } from '@src/types/requests';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Refresh the access token proactively.
  // Some day I'll implement retries (jk no I won't).
  await refreshAccessToken();

  const { playlistId = process.env.SPOTIFY_PLAYLIST_ID, uri } =
    req.body as AddPlaylistTrackRequest;

  try {
    const response = await spotifyClient.addTracksToPlaylist(
      playlistId,
      [uri],
      {
        // Always insert at the top of the playlist.
        position: 0,
      },
    );

    return res.status(200).json(response.body);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: 'Unable to add track to playlist',
    });
  }
}
