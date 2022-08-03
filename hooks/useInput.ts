import { useState } from 'react';

function useInput() {
  const [value, setValue] = useState('');
  return { value, setValue };
}
export default useInput;
