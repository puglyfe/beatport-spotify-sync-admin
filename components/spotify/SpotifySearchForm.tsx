import { Button, Checkbox, TextInput } from '@mantine/core';

import { SpotifySearchQuery } from '@src/types/tracks';

export type SpotifySearchFormProps = {
  ariaLabel: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  values: SpotifySearchQuery;
};

const SpotifySearchForm = ({
  ariaLabel,
  isLoading,
  onChange,
  onSubmit,
  values,
}: SpotifySearchFormProps) => {
  const isDisabled = !values.artists && !values.track;

  return (
    <form aria-label={ariaLabel} onSubmit={onSubmit}>
      <TextInput
        label="Artists"
        name="artists"
        value={values.artists}
        onChange={onChange}
      />

      <TextInput
        label="Track"
        name="track"
        value={values.track}
        onChange={onChange}
      />

      <Checkbox
        name="extendedMix"
        checked={values.extendedMix}
        onChange={onChange}
        label='Append "Extended Mix" to search?'
        mt="md"
      />

      <Button
        type="submit"
        disabled={isDisabled}
        aria-disabled={isDisabled}
        loading={isLoading}
        mt="md"
      >
        Search
      </Button>
    </form>
  );
};

export default SpotifySearchForm;
