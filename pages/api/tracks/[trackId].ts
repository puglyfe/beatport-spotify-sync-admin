import type { NextApiRequest, NextApiResponse } from 'next';

import db from '@src/lib/firebase';
import { beatportTrack } from '@src/normalizers/track';
import type { BeatportTrack } from '@src/types/tracks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BeatportTrack>,
) {
  const { trackId } = req.query;
  const { spotifyUri } = req.body;

  // Update the DB
  await db.ref(`/tracks/${trackId}`).update({ spotifyUri });

  // Pull the updated value out and send it back.
  const trackSnapshot = await db.ref(`/tracks/${trackId}`).once('value');
  const [trackData] = Object.entries([trackId, trackSnapshot.val()]).map(
    beatportTrack,
  );

  res.status(200).json(trackData);
}
