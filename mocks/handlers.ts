// src/mocks/handlers.js
import { rest } from 'msw';

import { firebaseTrackCollection, spotifyTrackCollection } from '@src/fixtures';

export const handlers = [
  rest.get('api/spotify/getPlaylistTracks', (req, res, ctx) => {
    if (
      Number(req.url.searchParams.get('offset')) >=
      spotifyTrackCollection.length
    ) {
      return res(
        ctx.json({
          tracks: [],
          nextOffset: null,
        }),
      );
    }

    return res(
      ctx.json({
        tracks: spotifyTrackCollection,
        nextOffset: spotifyTrackCollection.length,
      }),
    );
  }),

  rest.get('api/tracks/orphans', (_req, res, ctx) => {
    return res(ctx.json(firebaseTrackCollection));
  }),

  rest.get('https://i.scdn.co/image/*', (req) => {
    return req.passthrough();
  }),

  // rest.post('api/spotify/updatePlaylistTrack', (_req, res, ctx) => {
  //   return res(
  //     ctx.json({
  //       snapshotId: 'abc1123',
  //     }),
  //   );
  // }),

  rest.post('api/spotify/updatePlaylistTrack', (_req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        status: 500,
        message: 'Unable to update playlist track',
      }),
    );
  }),
];
