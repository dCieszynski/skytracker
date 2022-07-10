import React from "react";
import { AircraftData } from "../App";

interface Props {
  aircrafts: AircraftData[];
}

const List: React.FC<Props> = ({ aircrafts }) => {
  return (
    <ul>
      {aircrafts.map((aircraft) => {
        return <li>{aircraft.icao24}</li>;
      })}
    </ul>
  );
};

export default List;
