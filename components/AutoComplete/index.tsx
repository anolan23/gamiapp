import React, { ComponentType, useEffect, useState } from 'react';

import Dropdown from '../Dropdown';
import { InputGroupProps } from '../InputGroup';

interface Props<T> extends InputGroupProps {
  items?: T[];
  onItemClick: (item: T) => void;
  Input: ComponentType;
  stickyItemsRenderer?: () => React.ReactElement;
  itemRenderer: (item: T) => React.ReactElement;
}

function AutoComplete<T>({
  items,
  onItemClick,
  Input,
  stickyItemsRenderer,
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

  const handleItemClick = function (event: React.ChangeEvent<any>, item: T) {
    onItemClick(item);
    setShow(false);
    event.stopPropagation();
  };

  const handleFocus = function () {
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
        onMouseDown: (e) => handleItemClick(e, item),
      });
    });
  };

  return (
    <div className="autocomplete" onFocus={handleFocus} onBlur={handleBlur}>
      <Input {...props} />
      <div className="autocomplete__dropdown-container">
        <Dropdown
          className="autocomplete__dropdown-container__dropdown"
          show={show}
          openTo="right"
          stretch={true}
        >
          {stickyItemsRenderer ? stickyItemsRenderer() : null}
          {renderItems()}
        </Dropdown>
      </div>
    </div>
  );
}

export default AutoComplete;
