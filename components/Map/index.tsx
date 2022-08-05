import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import useMapbox, { Coords } from '../../hooks/useMapbox';
import Button from '../Button';
import CircleButton from '../CircleButton';

export interface MarkerType {
  position: Coords;
}

interface Props {
  center?: Coords; //[lat, long]
  markers?: MarkerType[];
}

function Map({ center, markers }: Props) {
  const { getStaticTilesUrl } = useMapbox();

  if (!center) return null;
  const staticTilesUrl = getStaticTilesUrl();
  const renderMarkers = function () {
    if (!markers) return null;
    return markers.map((marker, index) => {
      return (
        <Marker
          key={index}
          position={marker.position}
          icon={
            new Icon({
              iconUrl: '/circle-marker.png',
              iconSize: [20, 20],
              iconAnchor: [20, 20],
            })
          }
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      );
    });
  };
  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: '100%', minHeight: '100%' }}
    >
      <ChangeView markers={markers} />
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>
        '
        url={staticTilesUrl}
        tileSize={512}
        zoomOffset={-1}
      />
      <CustomControl center={center} />
      {renderMarkers()}
    </MapContainer>
  );
}

interface ChangeViewProps {
  markers?: MarkerType[];
}

function ChangeView({ markers }: ChangeViewProps) {
  const map = useMap();
  if (markers) {
    const bounds = markers.map((marker) => marker.position);
    map.flyToBounds(bounds);
  }

  return null;
}

interface CustomControlProps {
  center: Coords;
}

function CustomControl({ center }: CustomControlProps) {
  const map = useMap();
  const handleClick = function () {
    map.flyTo(center, 15);
  };
  return (
    <Control prepend position="topright">
      <CircleButton icon="near_me" onClick={handleClick} color="secondary" />
    </Control>
  );
}

export default Map;
