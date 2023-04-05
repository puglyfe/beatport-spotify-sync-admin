import type { SpotifyTrack } from './tracks';

export type AddPlaylistTrackRequest = {
  uri: string;
  playlistId?: string;
};

export type AddPlaylistTrackResponse = SpotifyApi.AddTracksToPlaylistResponse;

export type GetPlaylistTracksResponse = {
  tracks: SpotifyTrack[];
  nextOffset: number | null;
};

export type ReplacePlaylistTracksRequest = {
  oldTrack: string;
  newTrack: string;
  position?: number;
  playlistId?: string;
};

export type ReplacePlaylistTracksResponse =
  SpotifyApi.AddTracksToPlaylistResponse;

export type SearchSpotifyTracksResponse = { tracks: SpotifyTrack[] };
