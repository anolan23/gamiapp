import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useMapbox, { Coords } from '../hooks/useMapbox';

interface LocationProviderProps {
  children: React.ReactNode;
}

interface Location {
  coords?: Coords;
  address?: string;
  setLocation: (coords: Coords, address: string) => void;
}

const initialState: Location = {
  setLocation: (coords: Coords, address: string) => {},
};

const LocationContext = createContext<Location>(initialState);

export default function LocationProvider({ children }: LocationProviderProps) {
  const [coords, setCoords] = useState<Coords>();
  const [address, setAddress] = useState<string>();
  const { reverse } = useMapbox();

  const setLocation = function (coords: Coords, address: string) {
    setCoords(coords);
    setAddress(address.split(',').slice(0, 2).join(','));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { longitude, latitude } = pos.coords;
      const coords: Coords = [longitude, latitude];
      const feature = await reverse(coords, ['place']);
      setLocation(coords, feature[0].place_name);
    });
  }, [reverse]);

  return (
    <LocationContext.Provider value={{ coords, address, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
