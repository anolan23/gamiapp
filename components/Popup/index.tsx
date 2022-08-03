import React, { useRef } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';

export interface PopupProps {
  show: boolean;
  close: () => void;
  children: React.ReactNode;
}

function Popup({ show, close, children }: PopupProps) {
  const windowRef = useRef(null);
  useOutsideClick(windowRef, close);

  if (!show) return null;

  return (
    <div className="popup">
      <div className="popup__window" ref={windowRef}>
        <span className="material-icons popup__window__close" onClick={close}>
          close
        </span>
        {children}
      </div>
    </div>
  );
}

export default Popup;
