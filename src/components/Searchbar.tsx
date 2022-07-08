import React from "react";

const Searchbar = () => {
  return (
    <div className="flex flex-col mt-4 w-full">
      <div className="flex flex-col gap-2 border-2 p-4 rounded-2xl">
        <div className="flex justify-between">
          <label>MinLatitude</label>
          <input className="w-1/4 text-black" type="text" />
        </div>
        <div className="flex justify-between">
          <label>MaxLatitude</label>
          <input className="w-1/4 text-black" type="text" />
        </div>
        <div className="flex justify-between">
          <label>MinLongitude</label>
          <input className="w-1/4 text-black" type="text" />
        </div>
        <div className="flex justify-between">
          <label>MaxLatitude</label>
          <input className="w-1/4 text-black" type="text" />
        </div>
        <button className="self-center border-2 rounded-lg w-fit py-2 px-4">
          Search
        </button>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button className="border-2 rounded-lg w-fit py-2 px-4">
          Advanced Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
