import { useEffect, useRef } from "react";
import { Marker, Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetCoords from "./useGetCoords";

const data = [
  { id: 123455, coords: [-123.1443, 49.3043], info: "Info 1", type: 1 },
  { id: 4353454, coords: [-123.1111, 49.2887], info: "Info 2", type: 2 },
];

const AppMap = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  // const { data: coords, isLoading } = useGetCoords("4500 Still Creek Dr");
  // if (!isLoading) console.log(coords.features[0].center);

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

  const MAPBOX_TOKEN = import.meta.env.VITE_MAP_TOKEN;

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: -123.1443,
        latitude: 49.3043,
        zoom: 12,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v10"
      mapboxAccessToken={MAPBOX_TOKEN}
      onClick={(e) => console.log(e.lngLat)}
    >
      {data.map((item, index) => (
        <Marker
          key={index}
          longitude={item.coords[0]}
          latitude={item.coords[1]}
        >
          <div
            onClick={
              () =>
                navigate(
                  `requests/${item.id}?lat=${item.coords[1]}&lng=${item.coords[0]}`
                )
              // setSearchParams({ lat: item.coords[0], lng: item.coords[1] })
            }
            style={{ cursor: "pointer" }}
          >
            <LocationOnRoundedIcon
              style={{ color: "#f87171", fontSize: "48px" }}
            />
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default AppMap;
