import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import SpotifySearchResults from '../SpotifySearchResults';

const DEFAULT_PROPS = {
  hasSearched: false,
  isLoading: false,
  tracks: [],
  onItemSelect: () => {},
};

describe('<SpotifySearchResults />', () => {
  test.todo('renders nothing while search results are loading');

  test('renders an empty state when there are no results', () => {
    render(<SpotifySearchResults {...DEFAULT_PROPS} />);

    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});
