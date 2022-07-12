import React, { useRef } from "react";
import { SearchParams } from "../App";

interface Props {
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

const Searchbar: React.FC<Props> = ({ setSearchParams }) => {
  const handleSearch = () => {
    if (
      minLatInput.current?.value !== undefined &&
      maxLatInput.current?.value !== undefined &&
      minLngInput.current?.value !== undefined &&
      maxLngInput.current?.value !== undefined
    ) {
      const params: SearchParams = {
        lamin: minLatInput.current.value,
        lamax: maxLatInput.current.value,
        lomin: minLngInput.current.value,
        lomax: maxLngInput.current.value,
      };
      setSearchParams(params);
      minLatInput.current.value = "";
      maxLatInput.current.value = "";
      minLngInput.current.value = "";
      maxLngInput.current.value = "";
    }
  };

  const minLatInput = useRef<HTMLInputElement | null>(null);
  const maxLatInput = useRef<HTMLInputElement | null>(null);
  const minLngInput = useRef<HTMLInputElement | null>(null);
  const maxLngInput = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col mt-4 w-full">
      <form className="flex flex-col gap-2 border-2 p-4 rounded-2xl">
        <div className="flex justify-between">
          <label>MinLatitude</label>
          <input className="w-1/4 text-black" type="number" ref={minLatInput} />
        </div>
        <div className="flex justify-between">
          <label>MaxLatitude</label>
          <input className="w-1/4 text-black" type="number" ref={maxLatInput} />
        </div>
        <div className="flex justify-between">
          <label>MinLongitude</label>
          <input className="w-1/4 text-black" type="number" ref={minLngInput} />
        </div>
        <div className="flex justify-between">
          <label>MaxLongitude</label>
          <input className="w-1/4 text-black" type="number" ref={maxLngInput} />
        </div>
        <button
          className="self-center border-2 rounded-lg w-fit py-2 px-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
