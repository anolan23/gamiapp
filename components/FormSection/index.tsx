interface Props {
  title: string;
  description?: string;
  icon: string;
  children?: React.ReactNode;
}

function FormSection({ title, description, icon, children }: Props) {
  return (
    <section className="form-section">
      <span className="material-icons form-section__icon">{icon}</span>
      <div className="form-section__content">
        <div className="form-section__content__text">
          <h1 className="form-section__title">{title}</h1>
          <p className="form-section__description">{description}</p>
        </div>
        <div className="form-section__content__inputs">{children}</div>
      </div>
    </section>
  );
}

export default FormSection;
