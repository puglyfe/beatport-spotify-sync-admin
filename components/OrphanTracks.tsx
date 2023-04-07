import {
  ActionIcon,
  CSSObject,
  Group,
  List,
  MantineTheme,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { formatTrackDisplayName } from '@src/normalizers/trackDisplayName';
import { BeatportTrack } from '@src/types/tracks';

type OrphanTracksProps = {
  onEditTrack: (track: BeatportTrack) => void;
  tracks: BeatportTrack[];
};

const buttonStyles = (theme: MantineTheme): CSSObject => ({
  opacity: 0.1,
  transition: `opacity 0.1s ${theme.transitionTimingFunction}`,

  '&:hover': {
    opacity: 1,
  },
});

const OrphanTracks = ({ onEditTrack, tracks = [] }: OrphanTracksProps) => {
  return (
    <List listStyleType="none">
      {tracks.map((track) => (
        <List.Item key={track.id}>
          <Group spacing="sm" noWrap>
            <span>{formatTrackDisplayName(track)}</span>
            <ActionIcon
              onClick={() => onEditTrack(track)}
              title="Add track"
              radius="xl"
              variant="transparent"
              sx={buttonStyles}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
        </List.Item>
      ))}
    </List>
  );
};

export default OrphanTracks;
