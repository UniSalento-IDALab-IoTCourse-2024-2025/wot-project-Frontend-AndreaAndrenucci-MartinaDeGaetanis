import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapUpdater = ({ region }) => {
  const map = useMap();

  useEffect(() => {
    if (region?.bounds) {
      map.setMaxBounds(region?.bounds);
      map.fitBounds(region?.bounds);
      map.setMinZoom(region?.minZoom);
      map.setMaxZoom(region?.maxZoom);
    }
  }, [region, map]);

  return null;
}

export default MapUpdater