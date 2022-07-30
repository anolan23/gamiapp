import axios from 'axios';
import { useState } from 'react';

export interface Gami {
  id?: number;
  name?: string;
  description?: string;
  image_url?: string;
}

export interface Game {
  active?: boolean;
  average_learning_complexity?: number;
  average_strategy_complexity?: number;
  average_user_rating?: number;
  categories?: any;
  description_preview?: string;
  id?: string;
  image_url?: string;
  name: string;
  min_age?: number;
  max_age?: number;
  min_playtime?: number;
  max_playtime?: number;
  min_players?: number;
  max_players?: number;
  mechanics?: any;
  official_url?: string;
  players?: string;
  rules_url?: string;
  tags?: any;
  thumb_url?: string;
  year_published?: number;
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
            fuzzy_match: true,
            client_id: process.env.NEXT_PUBLIC_BGA_CLIENT_ID,
          },
        }
      );
      setData(response.data.games);
    } catch (error) {
      setError(error);
    }
  };

  const leanGame = function (game: Game) {
    const lean = (({
      active,
      average_learning_complexity,
      average_strategy_complexity,
      average_user_rating,
      categories,
      description_preview,
      id,
      image_url,
      name,
      min_age,
      max_age,
      min_playtime,
      max_playtime,
      min_players,
      max_players,
      mechanics,
      official_url,
      players,
      rules_url,
      tags,
      thumb_url,
      year_published,
    }: Game): Game => ({
      active,
      average_learning_complexity,
      average_strategy_complexity,
      average_user_rating,
      categories,
      description_preview,
      id,
      image_url,
      name,
      min_age,
      max_age,
      min_playtime,
      max_playtime,
      min_players,
      max_players,
      mechanics,
      official_url,
      players,
      rules_url,
      tags,
      thumb_url,
      year_published,
    }))(game);

    return lean;
  };

  return { data, error, search, leanGame };
}
export default useGames;
