import axios, { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import useFetch from './useFetch';

export interface Category {
  id: string;
  name: string;
  url: string;
}

interface BGACategoriesResponse {
  categories: Category[];
}

function useCategories() {
  const config: AxiosRequestConfig = useMemo(() => {
    return {
      params: {
        client_id: process.env.NEXT_PUBLIC_BGA_CLIENT_ID,
      },
    };
  }, []);
  const { data, get } = useFetch<BGACategoriesResponse>(
    `https://api.boardgameatlas.com/api/game/categories`,
    config
  );

  return { data: data?.categories, get };
}

export default useCategories;
