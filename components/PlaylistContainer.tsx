import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import type { Key } from 'swr';
import useSWRInfinite from 'swr/infinite';
import useSWRMutation from 'swr/mutation';

import SpotifyTrackSearch from '@src/components/spotify/SpotifyTrackSearch';
import {
  DEFAULT_INITIAL_SEARCH_VALUES,
  SPOTIFY_PAGINATION_LIMIT,
} from '@src/constants';
import fetcher from '@src/lib/fetch';
import { updatePlaylistTrack } from '@src/lib/requests';
import { formatTrackDisplayName } from '@src/normalizers/trackDisplayName';
import { GetPlaylistTracksResponse } from '@src/types/requests';
import {
  ReplacePlaylistTracksRequest,
  ReplacePlaylistTracksResponse,
} from '@src/types/requests';
import type { SpotifyTrack } from '@src/types/tracks';

import PlaylistTracks from './PlaylistTracks';

const getKey = (
  pageIndex: number,
  previousPageData: GetPlaylistTracksResponse,
) => {
  // this page doesn't have any data. we're done.
  if (previousPageData && previousPageData.tracks.length === 0) return null;

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) {
    return `/api/spotify/getPlaylistTracks?limit=${SPOTIFY_PAGINATION_LIMIT}`;
  }

  // add the offset to the endpoint and send it.
  return `/api/spotify/getPlaylistTracks?offset=${previousPageData.nextOffset}&limit=${SPOTIFY_PAGINATION_LIMIT}`;
};

const PlaylistContainer = () => {
  const { data, error, isLoading, mutate } =
    useSWRInfinite<GetPlaylistTracksResponse>(getKey, fetcher, {
      initialSize: SPOTIFY_PAGINATION_LIMIT,
      revalidateAll: true,
    });

  const { trigger: replaceTrack } = useSWRMutation<
    ReplacePlaylistTracksResponse,
    any,
    Key,
    ReplacePlaylistTracksRequest
  >('/api/spotify/updatePlaylistTrack', updatePlaylistTrack);

  const [opened, { open, close }] = useDisclosure(false);

  const [initialSearchValues, setInitialSearchValues] = useState(
    DEFAULT_INITIAL_SEARCH_VALUES,
  );

  const [trackToReplace, setTrackToReplace] = useState<
    (SpotifyTrack & { position: number }) | null
  >(null);

  const onTrackSelect = async ({ uri }: SpotifyTrack): Promise<void> => {
    if (trackToReplace) {
      await replaceTrack({
        oldTrack: trackToReplace.uri,
        newTrack: uri,
        position: trackToReplace.position,
      });

      // Trigger a refresh of the playlist data.
      mutate();
    }

    onClose();
  };

  const onClose = () => {
    close();
    setInitialSearchValues(DEFAULT_INITIAL_SEARCH_VALUES);
    setTrackToReplace(null);
  };

  const onEditTrack = (track: SpotifyTrack, position: number): void => {
    setInitialSearchValues((oldVal) => ({
      ...oldVal,
      artists: track.artists,
      track: track.name,
    }));
    setTrackToReplace({ ...track, position });
    open();
  };

  // Flatten the data array into a single array of tracks.
  const tracks = data?.reduce(
    (acc, res) => [...acc, ...(res.tracks ?? [])],
    [] as SpotifyTrack[],
  );

  if (error) return <p>Failed to load</p>;

  return (
    <div>
      <h2>Spotify Playlist</h2>
      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <>
          <PlaylistTracks tracks={tracks ?? []} onEditTrack={onEditTrack} />
          <Modal
            opened={opened}
            onClose={onClose}
            title={
              trackToReplace
                ? `Replace ${formatTrackDisplayName(trackToReplace)}`
                : 'Replace Track'
            }
            centered
          >
            <SpotifyTrackSearch
              initialValues={initialSearchValues}
              onTrackSelect={onTrackSelect}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default PlaylistContainer;
