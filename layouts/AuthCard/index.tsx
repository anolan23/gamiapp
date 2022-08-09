import Card from '../Card';

interface Props {
  heading: string;
  text?: string;
  children?: any;
}
function AuthCard({ heading = 'Heading', text, children }: Props) {
  return (
    <Card className="auth-card">
      <div className="logo logo--small">
        Gami<span className="logo--green">app</span>
      </div>
      <span className="auth-card__heading">{heading}</span>
      {text ? <p className="auth-card__text">{text}</p> : null}
      {children}
    </Card>
  );
}

export default AuthCard;
