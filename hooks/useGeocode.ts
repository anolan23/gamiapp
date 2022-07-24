import { useState } from 'react';
import axios from 'axios';

function useGeocode<T>() {
  const [data, setData] = useState<T>();

  const query = async function (q: string) {
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json`;
      const response = await axios.get(endpoint, {
        params: {
          access_token:
            'pk.eyJ1IjoiYW5vbDEyNTgiLCJhIjoiY2w1eWc0ZHBpMGV0ZzNpczJwbzRncWV2YSJ9.7IE8TFs_sBvPtE411SXDkw',
        },
      });
      setData(response.data);
    } catch (error) {
      throw error;
    }
  };

  return { data, query };
}

export default useGeocode;
