import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import SpotifySearchResults, {
  SpotifySearchResultsProps,
} from '../SpotifySearchResults';

const DEFAULT_PROPS: SpotifySearchResultsProps = {
  hasSearched: true,
  isLoading: false,
  tracks: [],
  onItemSelect: () => {},
};

describe('<SpotifySearchResults />', () => {
  test('renders nothing when user has not searched', () => {
    const testProps = {
      ...DEFAULT_PROPS,
      hasSearched: false,
    };
    render(<SpotifySearchResults {...testProps} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText(/no results/i)).not.toBeInTheDocument();
  });

  test('renders nothing while search results are loading', () => {
    const testProps = {
      ...DEFAULT_PROPS,
      isLoading: true,
    };
    render(<SpotifySearchResults {...testProps} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText(/no results/i)).not.toBeInTheDocument();
  });

  test('renders an empty state when there are no results', async () => {
    render(<SpotifySearchResults {...DEFAULT_PROPS} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  test.todo('renders a list of search results');
});
