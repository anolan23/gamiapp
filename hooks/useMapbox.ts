import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import useLocation from './useLocation';

export type Coords = [number, number];

export interface Feature {
  place_name: string;
  center: Coords;
}

interface FeatureCollection {
  features?: Feature[];
}

function useMapbox() {
  const [data, setData] = useState<Feature[]>();
  const { coords } = useLocation();

  const forward = useCallback(
    async function (q: string) {
      try {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json`;
        const response = await axios.get<FeatureCollection>(endpoint, {
          params: {
            access_token: process.env.NEXT_PUBLIC_MAPBOX,
            proximity: coords
              ? `${coords?.longitude},${coords?.latitude}`
              : undefined,
          },
        });
        console.log(response.data);
        const feature = response.data.features?.map((feature) => {
          return {
            place_name: feature.place_name,
            center: feature.center,
          };
        });
        setData(feature);
      } catch (error) {
        throw error;
      }
    },
    [coords]
  );

  const getStaticMapUrl = function ([long, lat]: Coords): string {
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+000(${long},${lat})/${long},${lat},15/600x165?access_token=pk.eyJ1IjoiYW5vbDEyNTgiLCJhIjoiY2w1eWc0ZHBpMGV0ZzNpczJwbzRncWV2YSJ9.7IE8TFs_sBvPtE411SXDkw`;
  };

  return { data, forward, coords, getStaticMapUrl };
}

export default useMapbox;
