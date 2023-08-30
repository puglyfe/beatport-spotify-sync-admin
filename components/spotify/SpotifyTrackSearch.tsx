import { useRef, useState } from 'react';
import type { Key } from 'swr';
import useSWRMutation from 'swr/mutation';

import { searchTrack } from '@src/lib/requests';
import { SearchSpotifyTracksResponse } from '@src/types/requests';
import type { SpotifySearchQuery, SpotifyTrack } from '@src/types/tracks';

import SpotifySearchForm from './SpotifySearchForm';
import SpotifySearchResults from './SpotifySearchResults';

export type SpotifyTrackSearchProps = {
  initialValues?: SpotifySearchQuery;
  onTrackSelect?: (track: SpotifyTrack) => void;
};

const SpotifyTrackSearch = ({
  initialValues = { artists: '', track: '', extendedMix: true },
  onTrackSelect,
}: SpotifyTrackSearchProps) => {
  const hasSearched = useRef(false);
  const [query, setQuery] = useState<SpotifySearchQuery>(initialValues);

  const { data, isMutating, trigger } = useSWRMutation<
    SearchSpotifyTracksResponse,
    any,
    Key,
    SpotifySearchQuery
  >('/api/spotify/searchTracks', searchTrack, {
    onSuccess: () => {
      hasSearched.current = true;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trigger(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setQuery((oldQuery) => ({
      ...oldQuery,
      [name]: value,
    }));
  };

  return (
    <>
      <SpotifySearchForm
        ariaLabel="Search for a track"
        isLoading={isMutating}
        onChange={handleChange}
        onSubmit={handleSubmit}
        values={query}
      />
      <SpotifySearchResults
        hasSearched={hasSearched.current}
        isLoading={isMutating}
        onItemSelect={onTrackSelect}
        tracks={data?.tracks || []}
      />
    </>
  );
};

export default SpotifyTrackSearch;
