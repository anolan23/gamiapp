export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  children: React.ReactNode;
}

function Item({ icon, onClick, onMouseDown, className, children }: ItemProps) {
  return (
    <div
      className={`item ${className ?? ''}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      <span className="material-icons item__icon">{icon}</span>
      <span className="item__content">{children}</span>
    </div>
  );
}

export default Item;
