interface Props {
  className?: string;
  children: React.ReactNode;
}

function Banner({ className, children }: Props) {
  return <div className={`banner ${className ?? ''}`}>{children}</div>;
}
export default Banner;
