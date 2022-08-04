import { ReactElement } from 'react';

type Color = 'primary' | 'secondary';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'large';
  extended?: boolean;
  color?: Color;
  text: string;
  icon?: string | ReactElement;
  iconPos?: 'left' | 'right';
}

function Button({
  size,
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
      } ${className} btn--${color} btn--${size}`}
      type={type}
      onClick={onClick}
    >
      {icon && iconPos === 'left' ? (
        <span
          className={`${
            typeof icon === 'string' ? 'material-icons' : ''
          } btn__icon`}
        >
          {icon}
        </span>
      ) : null}
      <span className="btn__text">{text}</span>
      {icon && iconPos === 'right' ? (
        <span
          className={`${
            typeof icon === 'string' ? 'material-icons' : ''
          } btn__icon`}
        >
          {icon}
        </span>
      ) : null}
    </button>
  );
}

export default Button;
