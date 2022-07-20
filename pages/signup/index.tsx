import { useFormik } from 'formik';
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
import useAuth from '../../hooks/useAuth';

function Signup() {
  const router = useRouter();
  const { signup } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit(credentials) {
      console.log(credentials);
      try {
        await signup(credentials);
        router.push(`/explore`);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Page>
      <AuthCard
        heading="Join thousands of gamers worldwide"
        text="Laugh and make new friends who share the love of the game"
      >
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
          <Button type="submit" extended text="Start gaming now" />
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
          Already a member?{' '}
          <Link href="/login" passHref>
            <a className="link">Login</a>
          </Link>
        </span>
      </AuthCard>
    </Page>
  );
}

export default Signup;
