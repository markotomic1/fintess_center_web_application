"use client";
import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const mapStyle = {
  width: "100%",
  height: "100%",
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY,
  });
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapStyle}
      center={{ lat: 43.82350642312724, lng: 18.372309700000002 }}
      zoom={17}
    >
      <MarkerF
        position={{ lat: 43.82350642312724, lng: 18.372309700000002 }}
      ></MarkerF>
    </GoogleMap>
  ) : (
    <>Loading...</>
  );
};

export default Map;
