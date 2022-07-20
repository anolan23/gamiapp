import Link from 'next/link';

interface Props {
  href: string;
  step: number;
  active?: boolean;
  complete?: boolean;
  main: string;
}

function Step({ href = '/', step, complete, main, active }: Props) {
  const renderIcon = function () {
    if (complete) {
      return <span className="material-icons step__icon">done</span>;
    }
    return <span>{step}</span>;
  };
  return (
    <Link href={href}>
      <a className={`step ${active ? 'step--active' : ''}`}>
        <div className="step__circle">{renderIcon()}</div>
        <span className="step__text">{main}</span>
      </a>
    </Link>
  );
}

export default Step;
