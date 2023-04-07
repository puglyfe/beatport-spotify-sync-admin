import { Loader, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import useSWR, { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

import SpotifyTrackSearch from '@src/components/spotify/SpotifyTrackSearch';
import { DEFAULT_INITIAL_SEARCH_VALUES } from '@src/constants';
import {
  UpdateTrackEntryArg,
  addTrackToPlaylist,
  updateTrackEntry,
} from '@src/lib/requests';
import type {
  AddPlaylistTrackRequest,
  AddPlaylistTrackResponse,
} from '@src/types/requests';
import { BeatportTrack, SpotifyTrack } from '@src/types/tracks';

import OrphanTracks from './OrphanTracks';

const OrphanTracksContainer = () => {
  const { data, error, isLoading, mutate } = useSWR<BeatportTrack[]>(
    '/api/tracks/orphans',
  );

  const { trigger: addTrack } = useSWRMutation<
    AddPlaylistTrackResponse,
    any,
    Key,
    AddPlaylistTrackRequest
  >('/api/spotify/addPlaylistTrack', addTrackToPlaylist);

  const { trigger: updateRecord } = useSWRMutation<
    BeatportTrack,
    any,
    Key,
    UpdateTrackEntryArg
  >('/api/tracks', updateTrackEntry);

  const [opened, { open, close }] = useDisclosure(false);
  const [initialSearchValues, setInitialSearchValues] = useState(
    DEFAULT_INITIAL_SEARCH_VALUES,
  );

  const [trackToAdd, setTrackToAdd] = useState<BeatportTrack | null>(null);

  const onEditTrack = (track: BeatportTrack): void => {
    setInitialSearchValues((oldVal) => ({
      ...oldVal,
      artists: track.artists,
      track: track.name,
    }));
    setTrackToAdd(track);
    open();
  };

  const onTrackSelect = async ({ uri }: SpotifyTrack): Promise<void> => {
    if (trackToAdd) {
      await Promise.all([
        // Add the track to the playlist.
        await addTrack({ uri }),
        // update the `spotifyUri` property to remove it from the orphan list.
        await updateRecord({ ...trackToAdd, spotifyUri: uri }),
      ]);

      // TODO: Trigger a refresh of the playlist data via global `mutate`

      // Update the orphan list
      mutate();
    }
    onClose();
  };

  const onClose = () => {
    close();
    setInitialSearchValues(DEFAULT_INITIAL_SEARCH_VALUES);
    setTrackToAdd(null);
  };

  if (error) return <p>Failed to load</p>;

  return (
    <div>
      <h2>Orphan Tracks</h2>
      <OrphanTracks tracks={data ?? []} onEditTrack={onEditTrack} />
      {isLoading ? <Loader variant="bars" /> : null}
      {!isLoading && data?.length === 0 ? <p>No tracks...</p> : null}
      <Modal opened={opened} onClose={onClose} title="Add Track" centered>
        <SpotifyTrackSearch
          initialValues={initialSearchValues}
          onTrackSelect={onTrackSelect}
        />
      </Modal>
    </div>
  );
};

export default OrphanTracksContainer;
