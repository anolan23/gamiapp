import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import useMapbox, { Coords } from '../../hooks/useMapbox';
import { useRef, useState } from 'react';

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
  const staticTilesUrl = getStaticTilesUrl('streets-v11');
  const renderMarkers = function () {
    if (!markers) return null;
    return markers.map((marker, index) => {
      return (
        <Marker
          key={index}
          position={marker.position}
          icon={
            new Icon({
              iconUrl: '/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
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
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', minHeight: '100%' }}
    >
      <ChangeView center={center} zoom={13} />
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>
        '
        url={staticTilesUrl}
        tileSize={512}
        zoomOffset={-1}
      />
      {renderMarkers()}
    </MapContainer>
  );
}

interface ChangeViewProps {
  center: Coords;
  zoom: number;
}

function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default Map;
