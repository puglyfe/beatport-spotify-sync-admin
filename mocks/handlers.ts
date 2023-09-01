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

  rest.get('api/spotify/searchTracks', (_req, res, ctx) => {
    // TODO: support returning no results.
    return res(
      ctx.json({
        tracks: spotifyTrackCollection,
      }),
    );
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

  rest.get('/api/auth/session', (_req, res, ctx) => {
    console.log('bing bong');
    return res(
      ctx.json({
        user: {
          name: 'Guy Fieri',
          email: 'guy@flavortown.biz',
          image:
            'https://lh3.googleusercontent.com/a/AAcHTtfMYT7znBO8LHZjkO2QXToUKcRoL2c8ir-FPLQIBfpAeEY=s96-c',
        },
        expires: '2023-09-28T03:21:12.109Z',
      }),
    );
  }),
];
