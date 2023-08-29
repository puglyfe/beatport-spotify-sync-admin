import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import SpotifySearchForm, {
  SpotifySearchFormProps,
} from '../SpotifySearchForm';

const DEFAULT_PROPS: SpotifySearchFormProps = {
  isLoading: false,
  onChange: () => {},
  onSubmit: () => {},
  values: {
    artists: '',
    track: '',
    extendedMix: false,
  },
};

describe('<SpotifySearchForm />', () => {
  test("doesn't allow empty submissions", () => {
    render(<SpotifySearchForm {...DEFAULT_PROPS} />);
    const submitBtn = screen.getByRole('button', { name: /search/i });
    expect(submitBtn).toBeDisabled();
  });

  test("doesn't allow submissions when loading", () => {
    const testProps = {
      ...DEFAULT_PROPS,
      isLoading: true,
    };
    render(<SpotifySearchForm {...testProps} />);
    const submitBtn = screen.getByRole('button', { name: /search/i });
    expect(submitBtn).toBeDisabled();
  });
});
