import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';

import useUser, { User } from '../../hooks/useUser';
import AccountLayout from '../../layouts/AccountLayout';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import InputGroup from '../../components/InputGroup';
import TextArea from '../../components/TextArea';
import { Form, Formik } from 'formik';
import { update } from '../../lib/api/users';
import { toast } from 'react-toastify';

interface ProfileValues {
  first_name: string;
  last_name: string;
  bio: string;
}

interface Props {}

function Account() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) return <h1>...loading</h1>;
  const initialValues: ProfileValues = {
    first_name: user.first_name ?? '',
    last_name: user.last_name ?? '',
    bio: user.bio ?? '',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let cols: any = { ...values };
          for (let key in cols) {
            if (cols[key] === '') cols[key] = null;
          }
          await update(user.id, cols);
          toast('Profile saved', {
            type: 'success',
            theme: 'colored',
            style: { backgroundColor: '#3d98ff' },
          });
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
      {({ handleChange, isSubmitting, values }) => {
        return (
          <Form className="edit-profile">
            <div className="edit-profile__heading">
              <h1 className="edit-profile__heading__title">Edit profile</h1>
              <span className="edit-profile__heading__description">
                This information will appear on your public profile
              </span>
            </div>
            <div className="edit-profile__upload">
              <Avatar height={150} width={150} />
              <Button
                text="Upload new"
                size="small"
                icon="image"
                color="secondary"
              />
            </div>
            <InputGroup
              label="First name"
              name="first_name"
              onChange={handleChange}
              value={values.first_name}
            />
            <InputGroup
              label="Last name"
              name="last_name"
              onChange={handleChange}
              value={values.last_name}
            />
            <InputGroup
              label="Bio"
              Input={TextArea}
              name="bio"
              onChange={handleChange}
              value={values.bio}
            />
            <div>
              <Button text="Save" type="submit" loading={isSubmitting} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

Account.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default Account;
