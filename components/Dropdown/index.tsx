export type OpenTo = 'left' | 'right';

interface Props {
  show: boolean;
  close: () => void;
  openTo?: OpenTo;
  stretch?: boolean;
  children: React.ReactNode;
}

function Dropdown({ show, close, openTo = 'left', stretch, children }: Props) {
  if (!show) return null;
  return (
    <div
      className={`dropdown ${openTo === 'right' ? 'dropdown--right' : ''} ${
        stretch ? 'dropdown--stretch' : ''
      }`}
    >
      {children}
    </div>
  );
}

export default Dropdown;
