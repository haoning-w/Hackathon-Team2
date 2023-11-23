import RequestItem from "./RequestItem";

function Requests() {
  const fakeData = [
    {
      id: "123455",
      name: "Willingdon Community",
      address: "123 Granvile St.",
      latlng: { lat: 49.3043, lng: -123.1443 },
      products: [
        { name: "pads", quantity: 100 },
        { name: "tampoon", quantity: 50 },
      ],
      timeStamp: "2023/11/27 14:08",
    },
    {
      id: "4353454",
      name: "NEU Community",
      address: "6565 Robson St.",
      latlng: { lat: 49, lng: -123 },
      products: [
        { name: "pads", quantity: 100 },
        { name: "tampoon", quantity: 50 },
      ],
      timeStamp: "2023/11/23 14:08",
    },
  ];

  return (
    <ul>
      {fakeData.map((item) => (
        <RequestItem key={item.id} request={item} />
      ))}
    </ul>
  );
}

export default Requests;
