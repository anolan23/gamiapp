export interface Props {
  children: React.ReactNode;
}

function RadioGroup({ children }: Props) {
  return <div className="radio-group">{children}</div>;
}

export default RadioGroup;
