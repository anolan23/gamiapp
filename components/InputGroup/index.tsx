import React from 'react';
import Input from '../Input';

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
}

function InputGroup({
  error,
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
    <div className="input-group__container">
      {error ? <div className="input-group__error">{error}</div> : null}
      <div
        className={`input-group ${className ?? ''} ${
          error ? 'input-group--error' : ''
        }`}
      >
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
    </div>
  );
}

export default InputGroup;
