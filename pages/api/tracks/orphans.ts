import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@src/lib/firebase';
import { beatportTrack } from '@src/normalizers/track';
import type {
  BeatportTrack,
  LegacyTrackEntryData,
  TrackEntryData,
} from '@src/types/tracks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BeatportTrack[]>,
) {
  // Get a list of "orphaned" tracks.
  // These tracks were purchased, but don't have a corresponding `spotifyUri`.
  const snapshot = await db
    .ref('tracks')
    .orderByChild('spotifyUri')
    .equalTo(null)
    .once('value');

  const tracksData = Object.values(
    snapshot.val() as Record<string, TrackEntryData | LegacyTrackEntryData>,
  ).map(beatportTrack);

  res.status(200).json(tracksData);
}
