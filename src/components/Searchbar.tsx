import React, { ChangeEvent, useState } from "react";
import { SearchParams } from "../App";

interface Props {
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

const Searchbar: React.FC<Props> = ({ setSearchParams }) => {
  const [inputsValues, setInputsValues] = useState<SearchParams>({
    lamin: "-90",
    lomin: "-180",
    lamax: "90",
    lomax: "180",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value: string = e.target.value.replace(/([^-0-9])/gi, "");
    setInputsValues({ ...inputsValues, [name]: value });
  };

  const handleSearch = () => {
    let {
      lamin: laminValue,
      lamax: lamaxValue,
      lomin: lominValue,
      lomax: lomaxValue,
    } = inputsValues;
    laminValue = Math.min(Math.max(parseInt(laminValue), -90), 90).toString();
    lamaxValue = Math.min(Math.max(parseInt(lamaxValue), -90), 90).toString();
    lominValue = Math.min(Math.max(parseInt(lominValue), -180), 180).toString();
    lomaxValue = Math.min(Math.max(parseInt(lomaxValue), -180), 180).toString();
    const params: SearchParams = {
      lamin: laminValue,
      lamax: lamaxValue,
      lomin: lominValue,
      lomax: lomaxValue,
    };
    console.log(params);
    if (
      params.lamin === "0" &&
      params.lamax === "0" &&
      params.lomin === "0" &&
      params.lomax === "0"
    ) {
      setSearchParams({
        lamin: "-90",
        lamax: "90",
        lomin: "-180",
        lomax: "180",
      });
    } else {
      setSearchParams(params);
    }
    setInputsValues({ lamin: "-90", lamax: "90", lomin: "-180", lomax: "180" });
  };

  return (
    <div className="flex flex-col mt-4 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <label>MinLatitude</label>
          <input
            className="w-1/4 text-black text-center"
            type="text"
            name="lamin"
            placeholder="Enter number between -90 to 90"
            value={inputsValues.lamin}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <label>MaxLatitude</label>
          <input
            className="w-1/4 text-black text-center"
            type="text"
            name="lamax"
            placeholder="Enter number between -90 to 90"
            value={inputsValues.lamax}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <label>MinLongitude</label>
          <input
            className="w-1/4 text-black text-center"
            type="text"
            name="lomin"
            placeholder="Enter number between -180 to 180"
            value={inputsValues.lomin}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <label>MaxLongitude</label>
          <input
            className="w-1/4 text-black text-center"
            type="text"
            name="lomax"
            placeholder="Enter number between -180 to 180"
            value={inputsValues.lomax}
            onChange={handleChange}
          />
        </div>
        <button
          className="self-center border-2 rounded-lg w-fit py-2 px-4 cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
