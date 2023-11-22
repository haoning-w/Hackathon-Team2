import { Marker, Popup, Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Sample data
const data = [
  { coords: [-123.1443, 49.3043], info: "Info 1", type: 1 },
  { coords: [-123.1111, 49.2887], info: "Info 2", type: 2 },
  // ... more data
];

const AppMap = () => {
  // Set your Mapbox access token
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiaGFvbmluZy13IiwiYSI6ImNscDdsdzFqMjBtY2EyanFwdGU2dm1mMWMifQ._UUo7gy9CQSYwYlRpnWEIw";

  // Define the initial viewport properties
  const initialViewState = {
    longitude: -100, // Adjust as needed
    latitude: 40, // Adjust as needed
    zoom: 3.5,
  };

  // Function to determine marker color based on type
  const getMarkerColor = (type) => {
    return type === 1 ? "blue" : "red"; // Change colors as needed
  };

  return (
    <Map
      initialViewState={initialViewState}
      style={{ width: 600, height: 400 }} // Adjust size as needed
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {data.map((item, index) => (
        <Marker
          key={index}
          longitude={item.coords[0]}
          latitude={item.coords[1]}
          color={getMarkerColor(item.type)}
        >
          <Popup>
            <div>{item.info}</div>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default AppMap;
