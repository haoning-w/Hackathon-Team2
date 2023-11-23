import { useEffect, useRef } from "react";
import { Marker, Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useSearchParams } from "react-router-dom";

const data = [
  { coords: [-123.1443, 49.3043], info: "Info 1", type: 1 },
  { coords: [-123.1111, 49.2887], info: "Info 2", type: 2 },
];

const AppMap = () => {
  const [searchParams] = useSearchParams();
  const mapRef = useRef(null);

  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  useEffect(() => {
    if (mapRef.current && !isNaN(lat) && !isNaN(lng)) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 12,
      });
    }
  }, [lat, lng]);

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiaGFvbmluZy13IiwiYSI6ImNscDdsdzFqMjBtY2EyanFwdGU2dm1mMWMifQ._UUo7gy9CQSYwYlRpnWEIw";

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: -123.1443,
        latitude: 49.3043,
        zoom: 12,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {data.map((item, index) => (
        <Marker
          key={index}
          longitude={item.coords[0]}
          latitude={item.coords[1]}
        >
          <div style={{ cursor: "pointer" }}>
            <LocationOnRoundedIcon
              style={{ color: "#2b3", fontSize: "48px" }}
            />
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default AppMap;
