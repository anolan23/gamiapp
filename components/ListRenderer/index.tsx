import React from 'react';

interface Props {
  list: any;
  itemRenderer: (item: any) => JSX.Element;
}

function ListRenderer({ list, itemRenderer }: Props) {
  const renderList = function () {
    if (!list) return null;
    return list.map((item: any) => {
      return itemRenderer(item);
    });
  };
  return <React.Fragment>{renderList()}</React.Fragment>;
}
export default ListRenderer;
