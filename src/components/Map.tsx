import React from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { AircraftData } from "../App";

interface Props {
  aircrafts: AircraftData[];
  setSelectedAircraft: React.Dispatch<
    React.SetStateAction<AircraftData | null>
  >;
}

let myIcon = Leaflet.icon({
  iconUrl: require("../assets/aircraft.png"),
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const Map: React.FC<Props> = ({ aircrafts, setSelectedAircraft }) => {
  console.log(aircrafts);

  return (
    <MapContainer
      className="h-[220px]"
      center={[52.12, 19.0]}
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
    </MapContainer>
  );
};

export default Map;
