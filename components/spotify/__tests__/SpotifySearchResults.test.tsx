import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { spotifyTrackCollection } from '@src/fixtures';

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
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
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

  test('renders an empty state when there are no results', () => {
    render(<SpotifySearchResults {...DEFAULT_PROPS} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  test('renders a list of search results', () => {
    const testProps = {
      ...DEFAULT_PROPS,
      tracks: spotifyTrackCollection,
    };
    render(<SpotifySearchResults {...testProps} />);
    expect(screen.queryByText(/no results/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(
      spotifyTrackCollection.length,
    );
  });
});
