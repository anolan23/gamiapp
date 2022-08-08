import React, { ComponentType } from 'react';
import InputComponent from '../Input';

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
  Input?: ComponentType<
    React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>
  >;
}

function InputGroup({
  error,
  label,
  className,
  Input = InputComponent,
  ...props
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
        <div className="input-group__input">
          <Input className="input-group__input" {...props} />
        </div>
      </div>
    </div>
  );
}

export default InputGroup;
