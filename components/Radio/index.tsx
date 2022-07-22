export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  sub?: string;
}

function Radio({ label, sub, id, value, name, checked, onChange }: Props) {
  return (
    <div className="radio">
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id} className="radio__custom"></label>
      <label htmlFor={id} className="radio__textbox">
        <span className="radio__textbox__label">{label}</span>
        <span className="radio__textbox__sub">{sub}</span>
      </label>
    </div>
  );
}

export default Radio;
