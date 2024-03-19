"use client";

import L from "leaflet";
import MarkerIcon from "../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../node_modules/leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";

type MapProps = {
  lat?: number;
  long?: number
};

const Map = ({lat, long}: MapProps) => {
  const [coord, setCoord] = useState([lat, long]);

  // navigator.geolocation.getCurrentPosition((position) => {
  //   setCoord([position.coords.latitude, position.coords.longitude]);
  // });

  // const getMyLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setCoord([position.coords.latitude, position.coords.longitude]);
  //       console.log(coord);
  //     });
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // };

  if(!lat || !long || lat === 0 || long === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground" >
        User did not allow location data.
      </div>
    )
  }
 
  return (
    <div className="p-10">
      <MapContainer
        center={(coord as L.LatLngExpression) || [51, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[60vh] w-[80vh] rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
          position={coord as L.LatLngExpression}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
