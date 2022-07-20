type Color = 'primary' | 'secondary';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  extended?: boolean;
  color?: Color;
  text: string;
  icon?: string;
  iconPos?: 'left' | 'right';
}

function Button({
  icon,
  iconPos = 'left',
  text,
  form,
  type,
  extended,
  color = 'primary',
  onClick,
  className = '',
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
      {icon && iconPos === 'left' ? (
        <span className="material-icons dropdown-btn__icon">{icon}</span>
      ) : null}
      <span className="btn__text">{text}</span>
      {icon && iconPos === 'right' ? (
        <span className="material-icons btn__icon">{icon}</span>
      ) : null}
    </button>
  );
}

export default Button;
