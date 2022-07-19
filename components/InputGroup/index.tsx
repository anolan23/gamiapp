import Input from '../Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
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
  onBlur,
  className,
}: Props) {
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
        onBlur={onBlur}
      />
    </div>
  );
}

export default InputGroup;
