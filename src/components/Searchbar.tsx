import React, { useState } from "react";
import { SearchParams } from "../App";

interface Props {
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

const Searchbar: React.FC<Props> = ({ setSearchParams }) => {
  const [inputsValues, setInputsValues] = useState<SearchParams>({
    lamin: "0",
    lomin: "0",
    lamax: "0",
    lomax: "0",
  });

  const handleChange = (e: any) => {
    const { name } = e.target;
    const value = e.target.value.replace(/[^0-9]/gi, "");
    setInputsValues({ ...inputsValues, [name]: value });
    console.log(inputsValues);
  };

  const handleSearch = () => {
    let {
      lamin: laminValue,
      lamax: lamaxValue,
      lomin: lominValue,
      lomax: lomaxValue,
    } = inputsValues;
    laminValue = Math.min(Math.max(parseInt(laminValue), 0), 90).toString();
    lamaxValue = Math.min(Math.max(parseInt(lamaxValue), 0), 90).toString();
    lominValue = Math.min(Math.max(parseInt(lominValue), 0), 180).toString();
    lomaxValue = Math.min(Math.max(parseInt(lomaxValue), 0), 180).toString();
    const params: SearchParams = {
      lamin: laminValue,
      lamax: lamaxValue,
      lomin: lominValue,
      lomax: lomaxValue,
    };
    setSearchParams(params);
    setInputsValues({ lamin: "0", lamax: "0", lomin: "0", lomax: "0" });
  };

  return (
    <div className="flex flex-col mt-4 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <label>MinLatitude</label>
          <input
            className="w-1/4 text-black"
            type="text"
            name="lamin"
            placeholder="Enter number between 0 to 90"
            value={inputsValues.lamin}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <label>MaxLatitude</label>
          <input
            className="w-1/4 text-black"
            type="text"
            name="lamax"
            placeholder="Enter number between 0 to 90"
            value={inputsValues.lamax}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <label>MinLongitude</label>
          <input
            className="w-1/4 text-black"
            type="text"
            name="lomin"
            placeholder="Enter number between 0 to 180"
            value={inputsValues.lomin}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <label>MaxLongitude</label>
          <input
            className="w-1/4 text-black"
            type="text"
            name="lomax"
            placeholder="Enter number between 0 to 180"
            value={inputsValues.lomax}
            onChange={handleChange}
          />
        </div>
        <button
          className="self-center border-2 rounded-lg w-fit py-2 px-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
