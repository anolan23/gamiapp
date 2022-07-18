import Input from '../Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function InputGroup({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  className,
}: Props) {
  return (
    <div className={`input-group ${className ?? ''}`}>
      <label className="input-group__label">{label}</label>
      <Input
        className="input-group__input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputGroup;
