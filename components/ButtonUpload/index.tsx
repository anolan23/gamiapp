import { useRef } from 'react';
import Button, { ButtonProps } from '../Button';

interface Props extends ButtonProps {
  onUpload: (file: File) => void;
}

function ButtonUpload({ onUpload, ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    onUpload(file);
  };
  return (
    <div>
      <input ref={ref} hidden type="file" onChange={handleChange} />
      <Button
        {...props}
        type="button"
        onClick={() => {
          if (!ref.current) return;
          ref.current.click();
        }}
      />
    </div>
  );
}

export default ButtonUpload;
