import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import Button from '../../components/Button';

interface Props<T> {
  title: string;
  description?: string;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => Promise<void>;
  initialValues: T;
  children: (formikProps: FormikProps<T>) => React.ReactNode;
}

function AccountForm<T>({
  title,
  description,
  initialValues,
  onSubmit,
  children,
}: Props<T>) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => {
        return (
          <Form className="account-form">
            <div className="account-form__heading">
              <h1 className="account-form__heading__title">{title}</h1>
              {description ? (
                <span className="account-form__heading__description">
                  {description}
                </span>
              ) : null}
            </div>
            {children(props)}
            <div>
              <Button
                size="small"
                text="Save changes"
                type="submit"
                loading={props.isSubmitting}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AccountForm;
