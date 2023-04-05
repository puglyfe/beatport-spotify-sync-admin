// The data is a mess.
interface ITrack {
  id: string;
  artists: string;
  name: string;
}

export interface BeatportTrack extends ITrack {
  spotifyUri?: string;
}

export type TrackEntryData = {
  id: string;
  spotifyUri?: string;
  track: BeatportTrack;
};

export type TrackEntry = Record<string, TrackEntryData>;

// NOTE: this type is tightly coupled to the `fields` param in the Spotify API call.
export interface SpotifyTrack extends ITrack {
  id: string;
  image: string;
  spotifyUrl: string;
  uri: string;
}

export type SpotifySearchQuery = {
  artists: string;
  track: string;
  extendedMix: boolean;
};
