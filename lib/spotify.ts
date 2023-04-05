import SpotifyWebApi from 'spotify-web-api-node';

const spotifyClient = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
});

export default spotifyClient;

export const refreshAccessToken = async (): Promise<void> => {
  const accessTokenResponse = await spotifyClient.refreshAccessToken();
  spotifyClient.setAccessToken(accessTokenResponse.body['access_token']);
};
