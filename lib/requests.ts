import type {
  AddPlaylistTrackRequest,
  ReplacePlaylistTracksRequest,
} from '@src/types/requests';
import { BeatportTrack, SpotifySearchQuery } from '@src/types/tracks';

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

export type { UpdateTrackEntryArg };

export {
  addTrackToPlaylist,
  searchTrack,
  updatePlaylistTrack,
  updateTrackEntry,
};
