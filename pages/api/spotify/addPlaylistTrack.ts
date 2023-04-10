import type { NextApiRequest, NextApiResponse } from 'next';

import spotifyClient, { refreshAccessToken } from '@src/lib/spotify';
import {
  AddPlaylistTrackRequest,
  AddPlaylistTrackResponse,
} from '@src/types/requests';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddPlaylistTrackResponse>,
) {
  // Refresh the access token proactively.
  // Some day I'll implement retries (jk no I won't).
  await refreshAccessToken();

  const { playlistId = process.env.SPOTIFY_PLAYLIST_ID, uri } =
    req.body as AddPlaylistTrackRequest;

  const response = await spotifyClient.addTracksToPlaylist(playlistId, [uri], {
    // Always insert at the top of the playlist.
    position: 0,
  });

  res.status(200).json(response.body);
}
