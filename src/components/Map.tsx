import React from 'react'
import Leaflet from "leaflet"
import { MapContainer, TileLayer, useMap, Marker} from 'react-leaflet'
import { AircraftData } from '../App'

interface Props {
  aircrafts: AircraftData[]
}

let myIcon = Leaflet.icon({
  iconUrl: require("../assets/aircraft.png"),
  iconSize: [20, 20],
  iconAnchor: [10, 10],

});

const Map: React.FC<Props> = ({aircrafts}) => {
  console.log(aircrafts)
  return (
    <MapContainer center={[52.12, 19.00]} zoom={8} scrollWheelZoom={false} style={{height: "280px"}}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {aircrafts.map(aircraft => {
          return <Marker position={[aircraft.latitude, aircraft.longitude]} icon={myIcon}></Marker>
        })}
    </MapContainer>
  )
}

export default Map