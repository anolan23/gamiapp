interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

function Input({
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
    <div className={`input-box ${className}`}>
      {icon ? (
        <span className="material-icons icon input-box__icon">{icon}</span>
      ) : null}
      <input
        className="input-box__input"
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default Input;
