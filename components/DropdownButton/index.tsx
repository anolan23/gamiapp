import React, { useCallback, useRef, useState } from 'react';
import Dropdown, { OpenTo } from '../Dropdown';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Button, { ButtonProps } from '../Button';

interface Props extends ButtonProps {
  openTo?: OpenTo;
}

function DropdownButton({
  size,
  openTo,
  text,
  extended,
  color = 'primary',
  onClick,
  className,
  children,
}: Props) {
  const [show, setShow] = useState<boolean>(false);
  const btnRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(() => {
    setShow(false);
  }, []);

  useOutsideClick(btnRef, onClickOutside);

  const renderDropdown = function () {
    return (
      <Dropdown show={show} openTo={openTo}>
        {children}
      </Dropdown>
    );
  };

  return (
    <div className="dropdown-btn" ref={btnRef}>
      <Button
        size={size}
        onClick={() => setShow(!show)}
        className={className}
        text={text}
        extended={extended}
        color={color}
        icon="arrow_drop_down"
        iconPos="right"
      />
      {renderDropdown()}
    </div>
  );
}

export default DropdownButton;
