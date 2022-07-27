import { parseAddress } from '../../lib/helpers';

interface Props extends React.HTMLProps<HTMLDivElement> {
  placeName: string;
}

function AddressItem({ placeName, onClick, onMouseDown }: Props) {
  const { street, city } = parseAddress(placeName);
  return (
    <div className="address-item" onClick={onClick} onMouseDown={onMouseDown}>
      <span className="address-item__main">{street}</span>
      <span className="address-item__sub">{city}</span>
    </div>
  );
}

export default AddressItem;
