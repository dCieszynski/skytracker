import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import List from "./components/List";

export interface AircraftData {
  icao24: string;
  callsign: string;
  originCountry: string;
  timePosition: number | null;
  lastContact: number;
  longitude: number;
  latitude: number;
  baroAltitude: number | null;
  onGround: boolean;
  velocity: number;
  trueTrack: number | null;
  verticalRate: number | null;
  sensors: null;
  geoAltitude: number | null;
  squawk: string | null;
  spi: boolean;
  positionSource: number;
  category: number;
}

function App() {
  const [aircrafts, setAircrafts] = useState<AircraftData[]>([]);

  useEffect(() => {
    const getAircratsData = async (): Promise<void> => {
      const url = "https://@opensky-network.org/api/states/all";
      const headers = new Headers();
      const username = "VampusDC";
      const password = "Dawidwsn12!"
      headers.append("Authorization", "Basic " + window.btoa(username + ":" + password))
      const params = new URLSearchParams({
        lamin: "49.00",
        lomin: "14.07",
        lamax: "54.50",
        lomax: "24.09",
      });

      const response = await fetch(`${url}?${params.toString()}`, {headers: headers});
      const data = await response.json();
      console.log(data);
      const { states } = await data;
      if (states.length > 0) {
        setAircrafts(states);
      }
    };

    const interval = setInterval(() => getAircratsData(), 15000);
    console.log(aircrafts);
    return () => clearInterval(interval);
  }, [aircrafts]);

  return <div className="App">Skytracker</div>;
}

export default App;
