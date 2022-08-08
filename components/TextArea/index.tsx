interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function TextArea({ name, ...props }: Props) {
  return (
    <textarea
      className="text-area"
      id={name}
      autoComplete="off"
      spellCheck={false}
      rows={10}
      {...props}
    />
  );
}

export default TextArea;
