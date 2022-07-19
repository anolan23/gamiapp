import { useFormik } from 'formik';
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

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit(credentials: Credentials) {
      try {
        const user = await login(credentials);
        router.push('/explore');
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Page className="auth">
      <AuthCard heading="Login">
        <form onSubmit={formik.handleSubmit} className="auth-card__form">
          <Input
            className="auth-card__form__input"
            icon="email"
            type="text"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <Input
            className="auth-card__form__input"
            icon="lock"
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <Button type="submit" extended>
            Login
          </Button>
        </form>
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
      </AuthCard>
    </Page>
  );
}

export default Login;
