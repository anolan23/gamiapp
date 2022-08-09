import { Form, Formik, useFormik } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Page from '../../layouts/Page';
import AuthCard from '../../layouts/AuthCard';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Twitter from '../../public/Twitter.svg';
import Github from '../../public/Github.svg';
import Google from '../../public/Google.svg';
import Facebook from '../../public/Facebook.svg';
import useAuth, { Credentials } from '../../hooks/useAuth';
import React from 'react';
import { toast } from 'react-toastify';

function Signup() {
  const router = useRouter();
  const { signup } = useAuth();
  const initialValues: Credentials = {
    email: '',
    password: '',
  };

  return (
    <Page>
      <AuthCard
        heading="Join thousands of board game enthusiasts"
        text="Laugh and make new friends who share a love for board games"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (credentials, { setSubmitting }) => {
            try {
              await signup(credentials);
              await router.push(`/explore`);
            } catch (error) {
              console.error(error);
              let message = 'Error';
              if (error instanceof Error) message = error.message;
              toast(message, {
                type: 'error',
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ handleBlur, handleChange, values, isSubmitting }) => {
            return (
              <React.Fragment>
                <Form className="auth-card__form">
                  <Input
                    className="auth-card__form__input"
                    icon="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Input
                    className="auth-card__form__input"
                    icon="lock"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <Button
                    type="submit"
                    extended
                    text="Start gaming now"
                    size="small"
                    loading={isSubmitting}
                  />
                </Form>
                <span className="auth-card__message">
                  or continue with these social profiles
                </span>
                <div className="auth-card__socials">
                  <Google
                    onClick={() => {
                      window.location.assign(
                        `${process.env.REACT_APP_API_URL}/auth/google`
                      );
                    }}
                  />
                  <Facebook />
                  <Twitter />
                  <Github />
                </div>
                <span className="auth-card__prompt">
                  Already a member?{' '}
                  <Link href="/login" passHref>
                    <a className="link">Login</a>
                  </Link>
                </span>
              </React.Fragment>
            );
          }}
        </Formik>
      </AuthCard>
    </Page>
  );
}

export default Signup;
