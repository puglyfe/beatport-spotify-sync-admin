import type { BeatportTrack, SpotifyTrack } from '@src/types/tracks';

const formatTrackDisplayName = ({
  artists,
  name,
}: BeatportTrack | SpotifyTrack): string => `${artists} - ${name}`;

export { formatTrackDisplayName };
