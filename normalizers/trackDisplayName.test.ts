import { describe, expect, test } from 'vitest';

import { beatportTrackSingle, spotifyTrackSingle } from '@src/fixtures';

import { formatTrackDisplayName } from './trackDisplayName';

describe('formatTrackDisplayName', () => {
  test('should format the display name of a beatport track', () => {
    expect(formatTrackDisplayName(beatportTrackSingle)).toEqual(
      'Montcalm - Relieve Me',
    );
  });

  test('should format the display name of a spotify track', () => {
    expect(formatTrackDisplayName(spotifyTrackSingle)).toEqual(
      'Montcalm - Relieve Me',
    );
  });
});
