import {
  ActionIcon,
  CSSObject,
  Group,
  List,
  MantineTheme,
} from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

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
  if (!tracks.length) return <p>No tracks.</p>;

  return (
    <List listStyleType="none">
      {tracks.map((track, index) => (
        <List.Item key={track.id}>
          <Group spacing="sm" noWrap>
            {/* We're getting the smallest possible image from Spotify API, so no reason to go nuts w optimizations here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={track.image}
              alt={`Cover art for ${track.name}`}
              style={{ maxWidth: '2rem' }}
            />
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
