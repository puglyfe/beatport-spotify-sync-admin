import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { spotifyTrackSingle } from '@src/fixtures';

import SpotifyTrackSearch from '../SpotifyTrackSearch';

describe('<SpotifySearchForm />', () => {
  test('prepopulates the form with data', () => {
    const initialValues = {
      artists: 'Daft Punk',
      track: 'One More Time',
      extendedMix: false,
    };
    render(<SpotifyTrackSearch initialValues={initialValues} />);
    expect(screen.getByRole('form')).toHaveFormValues(initialValues);
  });

  test('searches with pre-populated data', async () => {
    const { artists, name: track } = spotifyTrackSingle;
    const user = userEvent.setup();

    render(
      <SpotifyTrackSearch
        initialValues={{ artists, track, extendedMix: false }}
      />,
    );
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(
      await screen.findByRole('link', { name: `View ${track} on Spotify` }),
    ).toBeInTheDocument();
  });

  test('searches with manually input data', async () => {
    const { artists, name: track } = spotifyTrackSingle;
    const user = userEvent.setup();

    render(<SpotifyTrackSearch />);

    await user.click(screen.getByRole('textbox', { name: /artists/i }));
    await user.keyboard(artists);

    await user.click(screen.getByRole('textbox', { name: /track/i }));
    await user.keyboard(track);

    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(
      await screen.findByRole('link', { name: `View ${track} on Spotify` }),
    ).toBeInTheDocument();
  });
});
