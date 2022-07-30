interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: string;
  children: React.ReactNode;
}

function DropdownItem({ icon, onClick, onMouseDown, children }: Props) {
  return (
    <button
      className="dropdown-item"
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      <span className="material-icons dropdown-item__icon">{icon}</span>
      <span className="dropdown-item__text">{children}</span>
    </button>
  );
}

export default DropdownItem;
