import React from 'react'

const Searchbar = () => {
  return (
    <div>
        <div>
          <div>
            <label>Min Latitude</label>
            <input type="text" />
            <label>Max Latitude</label>
            <input type="text" />
          </div>
          <div>
            <label>Min Longitude</label>
            <input type="text" />
            <label>Max Latitude</label>
            <input type="text" />
          </div>
          <button>Search</button>
        </div>
        <button>Advanced Search</button>
    </div>
  )
}

export default Searchbar