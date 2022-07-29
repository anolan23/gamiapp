import axios from 'axios';
import { useState } from 'react';

export interface Game {
  id?: number | string;
  name?: string;
  description?: string;
  image_url: string;
}

interface Search {
  name: string;
  limit: number;
}

interface BGAResponse {
  games: Game[];
}

function useGames() {
  const [data, setData] = useState<Game[]>();
  const [error, setError] = useState<any>();

  const search = async function ({ name, limit }: Search) {
    try {
      const response = await axios.get<BGAResponse>(
        `https://api.boardgameatlas.com/api/search`,
        {
          params: {
            name,
            limit,
            client_id: process.env.NEXT_PUBLIC_BGA_CLIENT_ID,
          },
        }
      );
      setData(response.data.games);
    } catch (error) {
      setError(error);
    }
  };

  return { data, error, search };
}
export default useGames;
