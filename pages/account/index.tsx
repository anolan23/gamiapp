import React, { ReactElement, useState } from 'react';
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
import ButtonUpload from '../../components/ButtonUpload';
import bucket from '../../lib/bucket';
import AccountForm from '../../components/AccountForm';

interface ProfileValues {
  name: string;
  bio: string;
}

interface Props {}

function Account() {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  if (!user) return <h1>...loading</h1>;

  const initialValues: ProfileValues = {
    name: user.name ?? '',
    bio: user.bio ?? '',
  };

  const handleUpload = async function (file: File) {
    try {
      setUploading(true);
      if (!user.id) throw new Error('No userId to assign image to');
      if (user.image) {
        await bucket.deleteImage({
          resource: 'users',
          resourceId: user.id,
          key: user.image,
        });
      }
      const image = await bucket.uploadViaPresignedPost({
        resource: 'users',
        file,
      });
      await update(user.id, { image });
      await mutateUser();
      toast('Image uploaded', {
        type: 'success',
        theme: 'colored',
        style: { backgroundColor: '#3d98ff' },
      });
    } catch (error: unknown) {
      console.error(error);
      let message = 'Error';
      if (error instanceof Error) message = error.message;
      toast(message, {
        type: 'error',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <AccountForm<ProfileValues>
      title="Edit profile"
      description="This information will appear on your public profile"
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
      {({ handleChange, values }) => {
        return (
          <React.Fragment>
            <div className="edit-profile__upload">
              <Avatar height={150} width={150} objectKey={user.image} />
              <ButtonUpload
                onUpload={handleUpload}
                text="Upload new"
                size="small"
                icon="image"
                loading={uploading}
              />
            </div>
            <InputGroup
              label="Name"
              name="name"
              onChange={handleChange}
              value={values.name}
            />
            <InputGroup
              label="Bio"
              Input={TextArea}
              name="bio"
              onChange={handleChange}
              value={values.bio}
            />
          </React.Fragment>
        );
      }}
    </AccountForm>
  );
}

Account.getLayout = function getLayout(page: ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default Account;
