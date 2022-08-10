interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function TextArea({ name, ...props }: Props) {
  return (
    <textarea
      className="text-area"
      id={name}
      autoComplete="off"
      spellCheck={false}
      rows={5}
      {...props}
    />
  );
}

export default TextArea;
