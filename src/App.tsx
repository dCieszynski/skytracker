import React, { useState, useEffect } from "react";

interface Data {
  time: number;
  states: AircraftData[]
}


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

  const getAircratsData = async (): Promise<void> => {
    const url = "https://@opensky-network.org/api/states/all";
    const headers = new Headers();
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    headers.append("Authorization", "Basic " + window.btoa(username + ":" + password))
    const params = new URLSearchParams({
      lamin: "49.00",
      lomin: "14.07",
      lamax: "54.50",
      lomax: "24.09",
    });

    const response = await fetch(`${url}?${params.toString()}`, {headers: headers});
    const data:Data = await response.json();
    console.log(data);
    const { states } = data;
    if (states.length > 0) {
      setAircrafts(states);
    }
  };

  useEffect(() => {
    getAircratsData();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => getAircratsData(), 15000);
    console.log(aircrafts);
    return () => clearInterval(interval);
  }, [aircrafts]);

  return <div className="App">Skytracker</div>;
}

export default App;
