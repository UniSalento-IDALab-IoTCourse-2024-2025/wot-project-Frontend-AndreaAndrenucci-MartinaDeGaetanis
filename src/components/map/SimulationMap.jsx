import React, { useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, Rectangle, Marker, useMapEvents } from "react-leaflet";
import { LatLngBounds, LatLng } from "leaflet";
import MapUpdater from "./MapUpdater";
import { supportedRegions } from "../../constants/constants";

const ClickRectangleController = ({ onSetFirstCorner }) => {
  const startPointRef = useRef(null);
  const movedRef = useRef(false);

  useMapEvents({
    mousedown(e) {
      startPointRef.current = e.containerPoint;
      movedRef.current = false;
    },
    mousemove(e) {
      if (!startPointRef.current) return;
      const dist = e.containerPoint.distanceTo(startPointRef.current);
      if (dist > 5) { 
        movedRef.current = true;
      }
    },
    mouseup(e) {
      if (!startPointRef.current) return;
      const dist = e.containerPoint.distanceTo(startPointRef.current);
      if (!movedRef.current && dist <= 5) {
        onSetFirstCorner(e.latlng);
      }
      startPointRef.current = null;
      movedRef.current = false;
    }
  });

  
  useMapEvents({
    click(e) {
    },
  });

  return null;
};

const SimulationMap = ({
  initialCenter = [40.354596, 18.008495], 
  initialZoom = 13,
  bounds, 
  setBounds
}) => {
  const [firstCorner, setFirstCorner] = useState(null); 

  const handleFirstCornerSet = useCallback(
    (latlng) => {
      if (!firstCorner) {
        setFirstCorner(latlng);
        setBounds(null, null);
      } else {
        const b = new LatLngBounds(firstCorner, latlng);
        const sw = b.getSouthWest();
        const ne = b.getNorthEast();
        const boundsArray = [
          [sw.lat, sw.lng],
          [ne.lat, ne.lng],
        ];
        setBounds(boundsArray, false);
        setFirstCorner(null);
      }
    },
    [firstCorner]
  );

  return (
    <div className="w-full h-screen rounded-lg overflow-hidden shadow-lg z-10">

      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        className="w-full h-full"
      >
        <MapUpdater region={supportedRegions[1]} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickRectangleController
          onSetFirstCorner={handleFirstCornerSet}
        />

        {firstCorner && (
          <Marker position={firstCorner} />
        )}

        {bounds && (
          <Rectangle
            bounds={bounds}
            pathOptions={{
              color: "#2563EB",
              weight: 2,
              fillOpacity: 0.15,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default SimulationMap;
