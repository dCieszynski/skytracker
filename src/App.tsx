import React, { useState, useEffect } from 'react';


function App() {
  const [aircrafts, setAircrafts] = useState([]);

  useEffect(() => {
    const getAircratsData = async () => {
      const url = "https://opensky-network.org/api/states/all";
      const params = new URLSearchParams({ lamin: "49.00",
      lomin: "14.07",
      lamax: "54.50",
      lomax:"24.09"});

      const response = await fetch(`${url}?${params.toString()}`);
      const data = await response.json();
      const {states} = await data;
      if (states.length > 0) {
        setAircrafts(states);
      }
    }

    const interval = setInterval(() => getAircratsData(), 30000);
    console.log(aircrafts);
    return () => clearInterval(interval);

  }, [aircrafts])

  return (
    <div className="App">
    </div>
  );
}

export default App;
