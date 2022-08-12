import { Form, Formik, useFormik } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';

import AuthCard from '../../layouts/AuthCard';
import Page from '../../layouts/Page';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Twitter from '../../public/Twitter.svg';
import Github from '../../public/Github.svg';
import Google from '../../public/Google.svg';
import Facebook from '../../public/Facebook.svg';
import useAuth, { Credentials } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import React from 'react';

function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const initialValues: Credentials = {
    email: '',
    password: '',
  };

  return (
    <Page className="auth">
      <AuthCard heading="Login">
        <Formik
          initialValues={initialValues}
          onSubmit={async (credentials: Credentials, { setSubmitting }) => {
            try {
              await login(credentials);
              toast('Login successful', {
                type: 'success',
                style: { backgroundColor: '#3d98ff' },
              });
              await router.push('/explore');
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
          {({ handleChange, handleBlur, values, isSubmitting }) => {
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
                    size="small"
                    text="Login"
                    type="submit"
                    extended
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
                  Don&apos;t have an account yet?{' '}
                  <Link href="/signup" passHref>
                    <a className="link">Sign up</a>
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

export default Login;
