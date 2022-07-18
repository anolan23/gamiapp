interface Props {
  className?: string;
  children: React.ReactNode;
}

function Page({ className, children }: Props) {
  return <div className={`page ${className ?? ''}`}>{children}</div>;
}
export default Page;
