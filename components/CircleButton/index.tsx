type Color = 'primary' | 'secondary';

export interface CircleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  color?: Color;
  size?: 'small' | 'default';
}

function CircleButton({
  icon,
  size = 'default',
  color = 'primary',
  onClick,
}: CircleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn-circle btn-circle--${color} btn-circle--${size}`}
    >
      <span className="material-icons btn-circle__icon">{icon}</span>{' '}
    </button>
  );
}

export default CircleButton;
