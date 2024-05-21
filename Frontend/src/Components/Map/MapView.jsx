import React from 'react'
import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";



const MapView = () => {
  return (
    <div>
      <Map
        mapboxAccessToken= 'pk.eyJ1Ijoiaml0aGluMTAiLCJhIjoiY2xzY3Vpaml2MHBiMjJwbm8wZXI1aGNkZiJ9.l4SvN_ZckKPlpxMluzqayA'
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </Map>
    </div>
  )
}

export default MapView
