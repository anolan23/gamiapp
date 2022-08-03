import { useState } from 'react';

function usePopup() {
  const [show, setShow] = useState(false);
  const close = () => setShow(false);
  return { show, close, setShow };
}
export default usePopup;
