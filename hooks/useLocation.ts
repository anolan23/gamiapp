import { useEffect, useState } from 'react';
import useMapbox, { Coords } from './useMapbox';

function useLocation() {
  const [coords, setCoords] = useState<Coords>();
  const [address, setAddress] = useState<string>();
  const { reverse } = useMapbox();

  const setLocation = function (coords: Coords, address: string) {
    setCoords(coords);
    setAddress(address);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { longitude, latitude } = pos.coords;
      const coords: Coords = [longitude, latitude];
      const feature = await reverse(coords, ['place']);
      setLocation(coords, feature[0].place_name.split(',')[0]);
    });
  }, [reverse]);

  return { coords, address, setLocation };
}

export default useLocation;
