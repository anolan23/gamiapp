interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Card({ className, children, ...props }: Props) {
  return (
    <div className={`card ${className ?? ''}`} {...props}>
      {children}
    </div>
  );
}
export default Card;
