import { SWRInfiniteKeyLoader } from 'swr/infinite';

import { SPOTIFY_PAGINATION_LIMIT } from '@src/constants';
import type {
  AddPlaylistTrackRequest,
  GetPlaylistTracksResponse,
  ReplacePlaylistTracksRequest,
} from '@src/types/requests';
import { BeatportTrack, SpotifySearchQuery } from '@src/types/tracks';

//////////////////////////////
// Firebase requests
//////////////////////////////

type UpdateTrackEntryArg = BeatportTrack & { spotifyUri: string };

const updateTrackEntry = async (
  url: string,
  { arg }: { arg: UpdateTrackEntryArg },
) => {
  const { id: trackId } = arg;
  const res = await fetch(`${url}/${trackId}`, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

//////////////////////////////
// Spotify requests
//////////////////////////////

const searchTrack = async (
  url: string,
  { arg: { artists, track, extendedMix } }: { arg: SpotifySearchQuery },
) => {
  const queryParams = new URLSearchParams({
    ...(artists && { artists }),
    ...(track && { track }),
    ...((artists || track) && { extendedMix: extendedMix.toString() }),
  });
  const res = await fetch(`${url}?${queryParams}`);
  return await res.json();
};

const addTrackToPlaylist = async (
  url: string,
  { arg }: { arg: AddPlaylistTrackRequest },
) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

const updatePlaylistTrack = async (
  url: string,
  { arg }: { arg: ReplacePlaylistTracksRequest },
) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

//////////////////////////////
// Request utilities
//////////////////////////////

const getPlaylistTracksKey: SWRInfiniteKeyLoader<GetPlaylistTracksResponse> = (
  pageIndex,
  previousPageData,
) => {
  if (previousPageData) {
    // this page doesn't have any data. we're done.
    if (previousPageData.tracks.length === 0) return null;

    // add the offset to the endpoint and send it.
    return `/api/spotify/getPlaylistTracks?offset=${previousPageData.nextOffset}&limit=${SPOTIFY_PAGINATION_LIMIT}`;
  }

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) {
    return `/api/spotify/getPlaylistTracks?limit=${SPOTIFY_PAGINATION_LIMIT}`;
  }

  return null;
};

export type { UpdateTrackEntryArg };

export {
  addTrackToPlaylist,
  getPlaylistTracksKey,
  searchTrack,
  updatePlaylistTrack,
  updateTrackEntry,
};
