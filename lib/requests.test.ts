import { describe, expect, test } from 'vitest';

import { spotifyTrackSingle } from '@src/fixtures';

import { getPlaylistTracksKey } from './requests';

describe('getPlaylistTracksKey', () => {
  test('should return `null` when there is no more data to fetch', () => {
    expect(getPlaylistTracksKey(1, { tracks: [], nextOffset: null })).toEqual(
      null,
    );
  });

  test('should return a key with no pagination data when fetching the first page', () => {
    expect(getPlaylistTracksKey(0, null)).toMatchInlineSnapshot(
      '"/api/spotify/getPlaylistTracks?limit=100"',
    );
  });

  test('should return a key with pagination data for subsequent pages', () => {
    expect(
      getPlaylistTracksKey(0, { tracks: [spotifyTrackSingle], nextOffset: 1 }),
    ).toMatchInlineSnapshot(
      '"/api/spotify/getPlaylistTracks?offset=1&limit=100"',
    );
  });
});
