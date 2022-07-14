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

  const [center, setCenter] = useState<Leaflet.LatLngExpression>([52, 19]);

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
        lamin: parseInt(searchParams.lamin),
        lamax: parseInt(searchParams.lamax),
        lomin: parseInt(searchParams.lomin),
        lomax: parseInt(searchParams.lomax),
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
      className="min-h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px] xl:h-[340px] 2xl:h-[420px]"
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
