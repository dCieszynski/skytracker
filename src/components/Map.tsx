import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

const Map = () => {
  return (
    <MapContainer center={[52.12, 19.00]} zoom={8} scrollWheelZoom={false} style={{height: "280px"}}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={[52.12, 19.00]}>
            <Popup>Center of Poland</Popup>
        </Marker>
    </MapContainer>
  )
}

export default Map