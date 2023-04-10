import type { NextApiRequest, NextApiResponse } from 'next';

import spotifyClient from '@src/lib/spotify';
import { ReplacePlaylistTracksRequest } from '@src/types/requests';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Refresh the access token proactively.
  // Some day I'll implement retries (jk no I won't).
  const accessTokenResponse = await spotifyClient.refreshAccessToken();
  spotifyClient.setAccessToken(accessTokenResponse.body['access_token']);

  const {
    playlistId = process.env.SPOTIFY_PLAYLIST_ID,
    oldTrack,
    newTrack,
    position = 0,
  } = req.body as ReplacePlaylistTracksRequest;

  /**
   * The Spotify API doesn't have a simple way to replace a single track in a playlist.
   * The method described in the docs requires you to send the entire playlist's tracks, with a limit of 100 tracks.
   * So instead, we remove the old track and add the new one in separate requests.
   *
   * @see https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks
   * @see https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
   * @see https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist
   */

  try {
    await spotifyClient.removeTracksFromPlaylist(playlistId, [
      { uri: oldTrack },
    ]);
    const response = await spotifyClient.addTracksToPlaylist(
      playlistId,
      [newTrack],
      { position },
    );
    return res.status(200).json(response.body);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: 'Unable to update playlist track',
    });
  }
}
