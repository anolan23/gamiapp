interface Props {
  className?: string;
  children: React.ReactNode;
}

function Container({ className, children }: Props) {
  return <div className={`container ${className ?? ''}`}>{children}</div>;
}
export default Container;
