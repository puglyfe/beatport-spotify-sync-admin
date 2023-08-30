import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import SpotifyTrackSearch, {
  SpotifyTrackSearchProps,
} from '../SpotifyTrackSearch';

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
});
