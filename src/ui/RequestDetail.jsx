import { useNavigate } from "react-router-dom";

function RequestDetail() {
  const navigate = useNavigate();
  const request = {
    id: "123455",
    name: "Willingdon Community",
    address: "123 Granvile St.",
    latlng: { lat: 49.2643236, lng: -123.1443 },
    products: [
      { name: "pads", quantity: 100 },
      { name: "tampoon", quantity: 50 },
    ],
    timeStamp: "2023/11/27 14:08",
  };
  const { id, name, timeStamp, address, latlng, products } = request;
  return (
    <div className="mt-2">
      <div className="bg-[#42484d] px-12 py-6 rounded-2xl">
        <label>requester's info</label>
        <h1 className="text-[18px]">name: {name}</h1>
        <h1 className="text-[18px]">address: {address}</h1>
      </div>
      <div className="mt-8 bg-[#42484d] px-12 py-6 rounded-2xl">
        <label>Product info</label>
        {products.map((product, ind) => (
          <h1 className="text-[18px]" key={ind}>
            {product.name}: {product.quantity}
          </h1>
        ))}
      </div>
      <button
        className="border px-8 py-3 rounded-xl text-[16px] mt-8"
        onClick={() => navigate("/main/requests")}
      >
        &larr; Back
      </button>
    </div>
  );
}

export default RequestDetail;
