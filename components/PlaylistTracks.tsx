import {
  ActionIcon,
  CSSObject,
  Group,
  List,
  MantineTheme,
  UnstyledButton,
} from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import useSWRMutation from 'swr/mutation';

import { playTrack } from '@src/lib/requests';
import { formatTrackDisplayName } from '@src/normalizers/trackDisplayName';
import { SpotifyTrack } from '@src/types/tracks';

type PlaylistTracksProps = {
  onEditTrack: (track: SpotifyTrack, position: number) => void;
  tracks: SpotifyTrack[];
};

const buttonStyles = (theme: MantineTheme): CSSObject => ({
  opacity: 0.1,
  transition: `opacity 0.1s ${theme.transitionTimingFunction}`,

  '&:hover': {
    opacity: 1,
  },
});

const PlaylistTracks = ({ onEditTrack, tracks }: PlaylistTracksProps) => {
  const { trigger: triggerPlayTrack } = useSWRMutation(
    '/api/spotify/player/play',
    playTrack,
  );

  return (
    <List type="ordered">
      {tracks.map((track, index) => (
        <List.Item key={track.id}>
          <Group spacing="sm" noWrap>
            <UnstyledButton
              onClick={() => triggerPlayTrack({ uri: track.uri })}
              title={`Play ${track.name}`}
            >
              {/* We're getting the smallest possible image from Spotify API, so no reason to go nuts w optimizations here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={track.image}
                alt={`Cover art for ${track.name}`}
                style={{ maxWidth: '2rem' }}
              />
            </UnstyledButton>
            <span>{formatTrackDisplayName(track)}</span>
            <ActionIcon
              onClick={() => onEditTrack(track, index)}
              title="Replace track"
              radius="xl"
              variant="transparent"
              sx={buttonStyles}
            >
              <IconPencil />
            </ActionIcon>
          </Group>
        </List.Item>
      ))}
    </List>
  );
};

export default PlaylistTracks;
