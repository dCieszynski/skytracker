import React from "react";
import { AircraftData } from "../App";

interface Props {
  aircrafts: AircraftData[];
}

const List: React.FC<Props> = ({ aircrafts }) => {
  return (
    <div className="w-1/2 flex flex-col h-48 pl-4">
      <h3 className="text-lg">Icao24</h3>
      <ul className="flex flex-col items-center border-white border-2 rounded-md overflow-hidden overflow-y-scroll">
        {aircrafts.map((aircraft) => {
          return (
            <li className="py-1 border-indigo-400 border-y-2 w-full text-center">
              {aircraft.icao24}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
