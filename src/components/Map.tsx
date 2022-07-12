import React, { useEffect, useState } from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import SetMapCenter from "./SetMapCenter";
import { AircraftData, SearchParams } from "../App";

interface Props {
  aircrafts: AircraftData[];
  selectedAircraft: AircraftData | null;
  searchParams: SearchParams;
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
  searchParams,
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

  useEffect(() => {
    const handleMapCenter = () => {
      const { lamin, lamax, lomin, lomax } = {
        lamin: parseFloat(searchParams.lamin),
        lamax: parseFloat(searchParams.lamax),
        lomin: parseFloat(searchParams.lomin),
        lomax: parseFloat(searchParams.lomax),
      };

      const la = (lamax - lamin) / 2 + lamin;
      const lo = (lomax - lomin) / 2 + lomin;
      const newCenter: Leaflet.LatLngExpression = [la, lo];
      setCenter(newCenter);
    };
    handleMapCenter();
  }, [searchParams]);

  return (
    <MapContainer
      className="h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[420px] 2xl:[460px]"
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
