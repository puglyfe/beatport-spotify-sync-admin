import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import SpotifySearchForm, {
  SpotifySearchFormProps,
} from '../SpotifySearchForm';

const DEFAULT_PROPS: SpotifySearchFormProps = {
  ariaLabel: '',
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

  test('handles submissions', async () => {
    const testSearch = {
      artists: 'Daft Punk',
      track: 'One More Time',
      extendedMix: false,
    };
    const onSubmit = vi.fn();
    const testProps: SpotifySearchFormProps = {
      ...DEFAULT_PROPS,
      values: testSearch,
      onSubmit,
    };
    const user = userEvent.setup();
    render(<SpotifySearchForm {...testProps} />);
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
