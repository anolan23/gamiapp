export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  filled?: boolean;
  icon: string;
}

function MaterialIcon({
  icon,
  size = 24,
  filled = false,
  className,
  ...props
}: Props) {
  return (
    <span
      style={{ fontSize: `${size}px` }}
      className={`material-icons${!filled ? '-outlined' : ''} ${
        className ?? ''
      }`}
      {...props}
    >
      {icon}
    </span>
  );
}

export default MaterialIcon;
