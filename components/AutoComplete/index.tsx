import React, { ComponentType, useEffect, useState } from 'react';

import Dropdown from '../Dropdown';
import { InputGroupProps } from '../InputGroup';

interface Props<T> extends InputGroupProps {
  items?: T[];
  onItemClick: (item: T) => void;
  Input: ComponentType;
  stickyOptionsRenderer?: () => React.ReactElement;
  itemRenderer: (item: T) => React.ReactElement;
}

function AutoComplete<T>({
  items,
  onItemClick,
  Input,
  stickyOptionsRenderer,
  itemRenderer,
  ...props
}: Props<T>) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (!items?.length) {
      setShow(false);
      return;
    }
    setShow(true);
  }, [items]);

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {};

  const handleItemClick = function (item: T) {
    onItemClick(item);
    setShow(false);
  };

  const handleFocus = function () {
    if (!items) return;
    setShow(true);
  };

  const handleBlur = function () {
    setShow(false);
  };

  const renderItems = function () {
    if (!items) return;
    return items.map((item, index) => {
      return React.cloneElement<React.HTMLAttributes<any>>(itemRenderer(item), {
        key: index,
        onMouseDown: (e) => e.preventDefault(),
        onClick: () => handleItemClick(item),
      });
    });
  };

  return (
    <div className="autocomplete" onFocus={handleFocus} onBlur={handleBlur}>
      <Input {...props} />
      <div className="autocomplete__dropdown">
        <Dropdown show={show} openTo="right" stretch={true}>
          {stickyOptionsRenderer ? stickyOptionsRenderer() : null}
          {renderItems()}
        </Dropdown>
      </div>
    </div>
  );
}

export default AutoComplete;
