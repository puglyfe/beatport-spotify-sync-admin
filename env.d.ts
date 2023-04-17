namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_USE_MOCKS: string;

    EMAIL_ALLOWLIST: string;

    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_REFRESH_TOKEN: string;
    SPOTIFY_DEFAULT_DEVICE_ID: string;
    SPOTIFY_PLAYLIST_ID: string;
  }
}
