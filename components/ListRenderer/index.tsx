import React from 'react';

interface Props {
  list: any;
  itemRenderer: (item: any, index: number) => JSX.Element;
}

function ListRenderer({ list, itemRenderer }: Props) {
  const renderList = function () {
    if (!list) return null;
    return list.map((item: any, index: number) => {
      return itemRenderer(item, index);
    });
  };
  return <React.Fragment>{renderList()}</React.Fragment>;
}
export default ListRenderer;
