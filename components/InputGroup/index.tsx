import Input from '../Input';

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
}

function InputGroup({
  label,
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  className,
}: InputGroupProps) {
  return (
    <div className={`input-group ${className ?? ''}`}>
      <label className="input-group__label">{label}</label>
      <Input
        className="input-group__input"
        icon={icon}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputGroup;
