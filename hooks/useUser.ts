import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import backend from '../lib/backend';

export interface User {
  isLoggedIn?: boolean;
  id: number;
  created_at?: string;
  updated_at?: string;
  google_id?: number;
  email: string;
  password?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  image?: string;
}

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const fetcher = async function (url: string) {
    const response = await backend.get(url);
    return response.data;
  };
  const { data: user, mutate: mutateUser } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser };
}
