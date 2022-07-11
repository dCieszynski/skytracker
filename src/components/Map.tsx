import React, { useEffect, useState } from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import SetMapCenter from "./SetMapCenter";
import { AircraftData } from "../App";

interface Props {
  aircrafts: AircraftData[];
  selectedAircraft: AircraftData | null;
  setSelectedAircraft: React.Dispatch<
    React.SetStateAction<AircraftData | null>
  >;
}

let myIcon = Leaflet.icon({
  iconUrl: require("../assets/aircraft.png"),
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const Map: React.FC<Props> = ({
  aircrafts,
  selectedAircraft,
  setSelectedAircraft,
}) => {
  console.log(aircrafts);

  const [center, setCenter] = useState<Leaflet.LatLngExpression>([52.12, 19.0]);

  useEffect(() => {
    if (selectedAircraft) {
      const newCenter: Leaflet.LatLngExpression = [
        selectedAircraft.latitude,
        selectedAircraft.longitude,
      ];
      setCenter(newCenter);
    }
  }, [selectedAircraft]);

  return (
    <MapContainer
      className="h-[220px]"
      center={center}
      zoom={5}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {aircrafts.map((aircraft) => {
        return (
          <Marker
            key={aircraft.icao24}
            position={[aircraft.latitude, aircraft.longitude]}
            icon={myIcon}
            eventHandlers={{
              click: () => {
                setSelectedAircraft(aircraft);
              },
            }}
          ></Marker>
        );
      })}
      <SetMapCenter center={center}></SetMapCenter>
    </MapContainer>
  );
};

export default Map;
