type Color = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  extended?: boolean;
  color?: Color;
}

function Button({
  form,
  type,
  extended,
  color = 'primary',
  onClick,
  className = '',
  children,
}: ButtonProps) {
  return (
    <button
      form={form}
      className={`btn ${
        extended ? 'btn--extended' : ''
      } ${className} btn--${color}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
