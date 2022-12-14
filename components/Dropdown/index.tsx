export type OpenTo = 'left' | 'right';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  openTo?: OpenTo;
  stretch?: boolean;
  children: React.ReactNode;
}

function Dropdown({
  show,
  openTo = 'left',
  stretch,
  className,
  children,
}: Props) {
  if (!show) return null;
  return (
    <div
      className={`dropdown ${openTo === 'right' ? 'dropdown--right' : ''} ${
        stretch ? 'dropdown--stretch' : ''
      } ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

export default Dropdown;
