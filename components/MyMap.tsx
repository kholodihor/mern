"use client";
import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import "mapbox-gl/dist/mapbox-gl.css";

const MyMap = () => {
  const viewPort = {
    height: "100%",
    width: "100%",
  };
  return (
    <div className="relative w-full h-full min-h-[50vh]" role="application" >
      <ReactMapGL
        {...viewPort}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        initialViewState={{
          longitude: 21.04058,
          latitude: 52.37645,
          zoom: 14,
        }}
        mapStyle={"mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"}
        aria-label="Map showing location"
      >
        <Marker latitude={52.37645} longitude={21.04058} aria-hidden="true">
          <button
            className="w-[2rem] h-[2rem] text-[2rem]"
            type="button"
            aria-label="Marker at the location"
          >
            <FaMapMarkerAlt className="text-purple-600 text-[2.5rem]" />
          </button>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default MyMap;
