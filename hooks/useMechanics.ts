import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import useFetch from './useFetch';

export interface Mechanic {
  id: string;
  name: string;
  url: string;
}

interface BGAMechanicsResponse {
  mechanics: Mechanic[];
}

function useMechanics() {
  const config: AxiosRequestConfig = useMemo(() => {
    return {
      params: {
        client_id: process.env.NEXT_PUBLIC_BGA_CLIENT_ID,
      },
    };
  }, []);
  const { data, get } = useFetch<BGAMechanicsResponse>(
    `https://api.boardgameatlas.com/api/game/mechanics`,
    config
  );

  return { data: data?.mechanics, get };
}

export default useMechanics;
