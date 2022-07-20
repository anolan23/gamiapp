interface Props {
  icon?: string;
  children: React.ReactNode;
}

function DropdownItem({ icon, children }: Props) {
  return (
    <div className="dropdown-item" onClick={() => {}}>
      <span className="material-icons dropdown-item__icon">{icon}</span>
      <span className="dropdown-item__text">{children}</span>
    </div>
  );
}

export default DropdownItem;
