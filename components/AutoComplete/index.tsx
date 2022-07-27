import React, { ReactElement, useEffect, useState } from 'react';
import AddressItem from '../AddressItem';

import Dropdown from '../Dropdown';
import InputGroup, { InputGroupProps } from '../InputGroup';

interface Props<T> extends InputGroupProps {
  items?: T[];
  onItemClick: (item: T) => void;
  itemRenderer: (item: T) => React.ReactElement;
}

function AutoComplete<T>({
  items,
  onItemClick,
  itemRenderer,
  onChange,
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
      <InputGroup {...props} onChange={onChange} />
      <div className="autocomplete__dropdown">
        <Dropdown
          show={show}
          close={() => setShow(false)}
          openTo="right"
          stretch={true}
        >
          {renderItems()}
        </Dropdown>
      </div>
    </div>
  );
}

export default AutoComplete;
