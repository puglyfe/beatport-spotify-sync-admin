import { useCallback, useState } from 'react';

// Helper hook for managing simple boolean states.
const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback(() => setState((oldState) => !oldState), []);
  return [state, toggle];
};

export default useToggle;
