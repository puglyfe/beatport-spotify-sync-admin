import {
  ActionIcon,
  Box,
  CSSObject,
  Group,
  List,
  MantineTheme,
  ScrollArea,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import React from 'react';

import { formatTrackDisplayName } from '@src/normalizers/trackDisplayName';
import type { SpotifyTrack } from '@src/types/tracks';

export type SpotifySearchResultsProps = {
  hasSearched: boolean;
  isLoading: boolean;
  tracks: SpotifyTrack[];
  onItemSelect?: (track: SpotifyTrack) => void;
};

const buttonStyles = (theme: MantineTheme): CSSObject => ({
  opacity: 0.1,
  transition: `opacity 0.1s ${theme.transitionTimingFunction}`,

  '&:hover': {
    opacity: 1,
  },
});

const SpotifySearchResults = ({
  onItemSelect = () => {},
  hasSearched,
  isLoading,
  tracks,
}: SpotifySearchResultsProps) => {
  if (!hasSearched || isLoading) return null;

  return (
    <Box mt="md" component={ScrollArea.Autosize} mah="40vh">
      {tracks.length ? (
        <List listStyleType="none">
          {tracks.map((track) => (
            <List.Item key={track.id}>
              <Group spacing="sm" noWrap>
                {/* Link to the track on Spotify to help identify canonical releases. */}
                <a
                  aria-label={`View ${track.name} on Spotify`}
                  href={track.spotifyUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {/* We're getting the smallest possible image from Spotify API, so no reason to go nuts w optimizations here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={track.image}
                    alt={`Cover art for ${track.name}`}
                    style={{ maxWidth: '2rem' }}
                  />
                </a>
                <span>{formatTrackDisplayName(track)}</span>
                <ActionIcon
                  onClick={() => onItemSelect(track)}
                  title="Select"
                  radius="xl"
                  variant="transparent"
                  sx={buttonStyles}
                >
                  <IconCheck />
                </ActionIcon>
              </Group>
            </List.Item>
          ))}
        </List>
      ) : (
        <p>No results.</p>
      )}
    </Box>
  );
};

export default SpotifySearchResults;
