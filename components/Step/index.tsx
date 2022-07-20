interface Props {
  step: number;
  active?: boolean;
  complete?: boolean;
  main: string;
}

function Step({ step, complete, main, active }: Props) {
  const renderIcon = function () {
    if (complete) {
      return <span className="material-icons step__icon">done</span>;
    }
    return <span>{step}</span>;
  };
  return (
    <div className={`step ${active ? 'step--active' : ''}`}>
      <div className="step__circle">{renderIcon()}</div>
      <span className="step__text">{main}</span>
    </div>
  );
}

export default Step;
