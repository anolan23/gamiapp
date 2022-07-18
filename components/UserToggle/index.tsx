import { useState, useRef, useCallback } from 'react';

import Avatar from '../Avatar';
import Dropdown from '../Dropdown';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface Props {
  className?: string;
  direction?: 'up' | 'down';
}

function UserToggle({ className, direction = 'down' }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setShow(false);
  }, []);

  useOutsideClick(toggleRef, onClickOutside);

  return (
    <div
      className={`user-toggle ${className || ''}`}
      onClick={() => setShow(!show)}
      ref={toggleRef}
    >
      <Avatar className="user-toggle__image" />
      <span className="user-toggle__name">
        {'aaron.nolan24@gmail.com' || 'Sign up'}
      </span>
      <span className="material-icons user-toggle__icon">expand_more</span>
      <Dropdown
        show={show}
        close={() => setShow(false)}
        direction={direction}
      />
    </div>
  );
}

export default UserToggle;
