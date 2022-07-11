import React from "react";
import { AircraftData } from "../App";

interface Props {
  selectedAircraft: AircraftData | null;
}

const InfoPanel: React.FC<Props> = ({ selectedAircraft }) => {
  return (
    <div className="w-1/2">
      <h3 className="text-lg">Info Panel</h3>
      <div>
        icao24: {selectedAircraft && <span>{selectedAircraft.icao24}</span>}
      </div>
      <div>
        originCountry:{" "}
        {selectedAircraft && <span>{selectedAircraft.originCountry}</span>}
      </div>
      <div>
        latitude: {selectedAircraft && <span>{selectedAircraft.latitude}</span>}
      </div>
      <div>
        longitude:{" "}
        {selectedAircraft && <span>{selectedAircraft.longitude}</span>}
      </div>
      <div>
        velocity: {selectedAircraft && <span>{selectedAircraft.velocity}</span>}
      </div>
    </div>
  );
};

export default InfoPanel;
