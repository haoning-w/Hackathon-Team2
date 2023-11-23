import addressToCoords from "../../services/getLocationCoords";
import { dataToCoords } from "../../utils/helper";
import useGetCoords from "../map/useGetCoords";
import SupplyItem from "./SupplyItem";

function SuppliesList() {
  const fakeData = [
    {
      id: "123455",
      name: "London Drugs",
      address: "4567 Lougheed Hwy. #400",
      latlng: { lat: 49.2707608, lng: -123.0406674 },
      products: [
        { name: "pads", quantity: 700 },
        { name: "tampoon", quantity: 200 },
        { name: "liners", quantity: 150 },
      ],
      timeStamp: "2023/11/27 14:08",
    },
    {
      id: "4353454",
      name: "Shoppers",
      address: "2330 Kingsway Building 1",
      latlng: { lat: 49.2411802, lng: -123.1392707 },
      products: [
        { name: "pads", quantity: 900 },
        { name: "tampoon", quantity: 400 },
        { name: "menstrual cups", quantity: 200 },
      ],
      timeStamp: "2023/11/23 14:08",
    },
  ];

  // const { data, isLoading } = useGetCoords("4567 Lougheed Hwy");
  // if (!isLoading) console.log(dataToCoords(data));

  return (
    <ul>
      {fakeData.map((item) => (
        <SupplyItem key={item.id} supply={item} />
      ))}
    </ul>
  );
}

export default SuppliesList;
