import { Field } from 'formik';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Chip({ label, id, value, name }: Props) {
  return (
    <div className="chip">
      <Field type="checkbox" name={name} id={id} value={value} />
      <label htmlFor={id} className="chip__custom">
        {label}
      </label>
    </div>
  );
}

export default Chip;
