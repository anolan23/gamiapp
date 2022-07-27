import { useState } from 'react';

function useThrottle() {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const wait = function (callback: () => void, ms: number) {
    if (timer) {
      clearTimeout(timer);
      setTimer(undefined);
    }
    const t = setTimeout(callback, ms);
    setTimer(t)
  };

  return { wait };
}
export default useThrottle;
