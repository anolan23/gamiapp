export interface ItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: string;
  children: React.ReactNode;
}

function DropdownItem({
  icon,
  onClick,
  onMouseDown,
  className,
  children,
}: ItemProps) {
  return (
    <button
      className={`dropdown-item ${className ?? ''}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      <span className="material-icons dropdown-item__icon">{icon}</span>
      <span className="dropdown-item__text">{children}</span>
    </button>
  );
}

export default DropdownItem;
