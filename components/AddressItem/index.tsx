interface Props extends React.HTMLProps<HTMLDivElement> {
  placeName: string;
}

function AddressItem({ placeName, onClick, onMouseDown }: Props) {
  const arr = placeName.split(',');
  const street = arr[0];
  const city = arr.slice(1, -1).join(',');
  return (
    <div className="address-item" onClick={onClick} onMouseDown={onMouseDown}>
      <span className="address-item__main">{street}</span>
      <span className="address-item__sub">{city}</span>
    </div>
  );
}

export default AddressItem;
