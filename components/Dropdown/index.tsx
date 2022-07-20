export type OpenTo = 'left' | 'right';

interface Props {
  show: boolean;
  close: () => void;
  openTo?: OpenTo;
  children: React.ReactNode;
}

function Dropdown({ show, close, openTo = 'left', children }: Props) {
  if (!show) return null;
  return (
    <div className={`dropdown ${openTo === 'right' ? 'dropdown--right' : ''}`}>
      {children}
    </div>
  );
}

export default Dropdown;
