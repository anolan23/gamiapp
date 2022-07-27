interface Props extends React.HTMLProps<HTMLDivElement> {
  icon?: string;
  children: React.ReactNode;
}

function DropdownItem({ icon, onClick, onMouseDown, children }: Props) {
  return (
    <div className="dropdown-item" onClick={onClick} onMouseDown={onMouseDown}>
      <span className="material-icons dropdown-item__icon">{icon}</span>
      <span className="dropdown-item__text">{children}</span>
    </div>
  );
}

export default DropdownItem;
