import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export type Coords = [number, number];

type MapboxStyle =
  | 'streets-v11'
  | 'outdoors-v11'
  | 'light-v10'
  | 'dark-v10'
  | 'navigation-night-v1';

export interface Feature {
  place_name: string;
  center: Coords;
}

interface FeatureCollection {
  features?: Feature[];
}

interface GetStaticMapUrl {
  coords: Coords;
  width: number;
  height: number;
}

function useMapbox() {
  const [data, setData] = useState<any>();

  const forward = useCallback(async function (coords: Coords, q: string) {
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json`;
      const [long, lat] = coords;
      const response = await axios.get<FeatureCollection>(endpoint, {
        params: {
          access_token: process.env.NEXT_PUBLIC_MAPBOX,
          proximity: coords ? `${long},${lat}` : undefined,
        },
      });
      if (!response.data.features)
        throw new Error('Mapbox response object is missing features');
      const feature: Feature[] = response.data.features.map((feature) => {
        return {
          place_name: feature.place_name,
          center: feature.center,
        };
      });
      setData(feature);
    } catch (error) {
      throw error;
    }
  }, []);

  const reverse = useCallback(async function (
    [long, lat]: Coords,
    types?: string[]
  ) {
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json`;
      const response = await axios.get<FeatureCollection>(endpoint, {
        params: {
          access_token: process.env.NEXT_PUBLIC_MAPBOX,
          types: types ? types.join(',') : undefined,
        },
      });
      if (!response.data.features)
        throw new Error('Mapbox response object is missing features');
      const feature: Feature[] = response.data.features.map((feature) => {
        return {
          place_name: feature.place_name,
          center: feature.center,
        };
      });
      setData(feature);
      return feature;
    } catch (error) {
      throw error;
    }
  },
  []);

  const getStaticMapUrl = function ({
    coords: [long, lat],
    width,
    height,
  }: GetStaticMapUrl): string {
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+000(${long},${lat})/${long},${lat},15/${width}x${height}?access_token=${process.env.NEXT_PUBLIC_MAPBOX}`;
  };

  const getStaticTilesUrl = function (
    style: MapboxStyle = 'streets-v11'
  ): string {
    return `https://api.mapbox.com/styles/v1/mapbox/${style}/tiles/{z}/{x}/{y}?access_token=${process.env.NEXT_PUBLIC_MAPBOX}`;
  };

  return { data, forward, reverse, getStaticMapUrl, getStaticTilesUrl };
}

export default useMapbox;
