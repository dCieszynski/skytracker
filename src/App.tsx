import React, { useState, useEffect } from "react";
import InfoPanel from "./components/InfoPanel";
import List from "./components/List";
import Map from "./components/Map";
import Searchbar from "./components/Searchbar";

interface Data {
  time: number;
  states: [
    [
      string,
      string | null,
      string,
      number | null,
      number,
      number,
      number,
      number | null,
      boolean,
      number,
      number | null,
      number | null,
      null,
      number | null,
      string | null,
      boolean,
      0 | 1 | 2 | 3,
      (
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
      )
    ]
  ];
}

export interface AircraftData {
  icao24: string;
  callsign: string | null;
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
  positionSource: 0 | 1 | 2 | 3;
  category:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20;
}

function App() {
  const [aircrafts, setAircrafts] = useState<AircraftData[]>([]);
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftData | null>(
    null
  );

  const getAircratsData = async (): Promise<void> => {
    const url = "https://@opensky-network.org/api/states/all";
    const headers = new Headers();
    const username = process.env.REACT_APP_USERNAME;
    const password = process.env.REACT_APP_PASSWORD;
    headers.append(
      "Authorization",
      "Basic " + window.btoa(username + ":" + password)
    );
    const params = new URLSearchParams({
      lamin: "49.00",
      lomin: "14.07",
      lamax: "54.50",
      lomax: "24.09",
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: headers,
    });
    const data: Data = await response.json();
    console.log(data);
    const { states } = data;
    const aircraftsData: AircraftData[] = states.map((state) => {
      return {
        icao24: state[0],
        callsign: state[1],
        originCountry: state[2],
        timePosition: state[3],
        lastContact: state[4],
        longitude: state[5],
        latitude: state[6],
        baroAltitude: state[7],
        onGround: state[8],
        velocity: state[9],
        trueTrack: state[10],
        verticalRate: state[11],
        sensors: state[12],
        geoAltitude: state[13],
        squawk: state[14],
        spi: state[15],
        positionSource: state[16],
        category: state[17],
      } as AircraftData;
    });
    if (states.length > 0) {
      setAircrafts(aircraftsData);
    }
  };

  useEffect(() => {
    getAircratsData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => getAircratsData(), 15000);
    console.log(aircrafts);
    return () => clearInterval(interval);
  }, [aircrafts]);

  return (
    <div className="h-screen flex flex-col items-center bg-indigo-900 text-white p-4">
      <h1 className="self-start text-3xl border-2 border-white rounded-full px-4 py-2">
        Skytracker
      </h1>
      <Searchbar></Searchbar>
      <div className="w-full mt-4">
        <Map
          aircrafts={aircrafts}
          setSelectedAircraft={setSelectedAircraft}
        ></Map>
        <div className="flex gap-12 mt-2 border-white border-2 rounded-md p-1">
          <List aircrafts={aircrafts}></List>
          <InfoPanel selectedAircraft={selectedAircraft}></InfoPanel>
        </div>
      </div>
    </div>
  );
}

export default App;
