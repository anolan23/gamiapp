interface Props {
  className?: string;
  children: React.ReactNode;
}

function Card({ className, children }: Props) {
  return <div className={`card ${className ?? ''}`}>{children}</div>;
}
export default Card;
