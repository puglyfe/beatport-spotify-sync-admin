import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { firebaseOrphanTrackSingle } from '@src/fixtures';
import { formatTrackDisplayName } from '@src/normalizers/trackDisplayName';

import OrphanTracks, { OrphanTracksProps } from '../OrphanTracks';

const DEFAULT_PROPS: OrphanTracksProps = {
  onEditTrack: () => {},
  tracks: [firebaseOrphanTrackSingle],
};

describe('<OrphanTracks />', () => {
  test('renders a list of tracks', () => {
    render(<OrphanTracks {...DEFAULT_PROPS} />);
    expect(
      screen.getByText(formatTrackDisplayName(firebaseOrphanTrackSingle)),
    ).toBeInTheDocument();
  });

  test('handles adding an orphan track', async () => {
    const onEditTrack = vi.fn();
    const user = userEvent.setup();

    render(<OrphanTracks {...DEFAULT_PROPS} onEditTrack={onEditTrack} />);

    await user.click(screen.getByRole('button', { name: /add track/i }));
    expect(onEditTrack).toHaveBeenCalledWith(firebaseOrphanTrackSingle);
  });
});
