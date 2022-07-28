import { useEffect, useState } from 'react';

function useLocation() {
  const [coords, setCoords] = useState<GeolocationCoordinates>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords(pos.coords);
    });
  }, []);

  return { coords };
}

export default useLocation;
