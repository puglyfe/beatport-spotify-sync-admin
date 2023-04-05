import { describe, expect, test } from 'vitest';

import { beatportTrackSingle, spotifyTrackSingle } from '@src/fixtures';
import { LegacyTrackEntryData, TrackEntryData } from '@src/types/tracks';

import { beatportTrack, spotifyTrack } from './track';

describe('track normalizers', () => {
  describe('beatportTrack', () => {
    test('should normalize a track with lowercase keys', () => {
      const testTrackEntry: TrackEntryData = {
        spotifyUri: beatportTrackSingle.spotifyUri,
        track: {
          item: beatportTrackSingle.id,
          artists: beatportTrackSingle.artists,
          name: beatportTrackSingle.name,
        },
      };
      expect(beatportTrack(testTrackEntry)).toEqual(beatportTrackSingle);
    });

    test('should normalize a track with uppercase keys', () => {
      const testTrackEntry: LegacyTrackEntryData = {
        spotifyUri: beatportTrackSingle.spotifyUri,
        track: {
          Item: beatportTrackSingle.id,
          Artists: beatportTrackSingle.artists,
          Name: beatportTrackSingle.name,
        },
      };
      expect(beatportTrack(testTrackEntry)).toEqual(beatportTrackSingle);
    });

    test('should normalize a track with missing artists', () => {
      const testTrackEntry: TrackEntryData = {
        spotifyUri: beatportTrackSingle.spotifyUri,
        track: {
          item: beatportTrackSingle.id,
          // @ts-ignore - testing missing artists since it's technically possible
          artists: undefined,
          name: beatportTrackSingle.name,
        },
      };
      const { artists } = beatportTrack(testTrackEntry);
      expect(artists).toEqual('Artist Missing');
    });

    test('should normalize a track with a missing title', () => {
      const testTrackEntry: TrackEntryData = {
        spotifyUri: beatportTrackSingle.spotifyUri,
        track: {
          item: beatportTrackSingle.id,
          artists: beatportTrackSingle.artists,
          // @ts-ignore - testing missing track name since it's technically possible
          name: undefined,
        },
      };
      const { name } = beatportTrack(testTrackEntry);
      expect(name).toEqual('Track Name Missing');
    });
  });

  describe('spotifyTrack', () => {
    test('should normalize a track from the Spotify API', () => {
      const testTrack = {
        album: {
          images: [{ url: spotifyTrackSingle.image }],
        },
        artists: spotifyTrackSingle.artists
          .split(', ')
          .map((artist) => ({ name: artist })),
        external_urls: { spotify: spotifyTrackSingle.spotifyUrl },
        id: spotifyTrackSingle.id,
        name: spotifyTrackSingle.name,
        uri: spotifyTrackSingle.uri,
      };

      expect(spotifyTrack(testTrack as SpotifyApi.TrackObjectFull)).toEqual(
        spotifyTrackSingle,
      );
    });
  });
});
