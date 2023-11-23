import { useNavigate } from "react-router-dom";
import DeliverForm from "./DeliverForm";

function RequestDetail() {
  const navigate = useNavigate();
  const request = {
    id: "123455",
    name: "Willingdon Community",
    address: "123 Granvile St.",
    latlng: { lat: 49.2643236, lng: -123.1443 },
    products: [
      { name: "pads", quantity: 100 },
      { name: "tampons", quantity: 50 },
    ],
    timeStamp: "2023/11/27 14:08",
  };
  const { id, name, timeStamp, address, latlng, products } = request;
  return (
    <div className="mt-2">
      <h1 className="text-3xl font-bold mb-2">requester's info</h1>
      <div className="bg-[var(--color-dark--2)] px-12 py-6 rounded-2xl">
        <h1 className="text-[18px]">name: {name}</h1>
        <h1 className="text-[18px]">address: {address}</h1>
      </div>
      <h1 className="text-3xl font-bold mb-2 mt-8">Product amount</h1>
      <div className="bg-[var(--color-dark--2)] px-12 py-6 rounded-2xl">
        {products.map((product, ind) => (
          <h1 className="text-[18px]" key={ind}>
            {product.name}: {product.quantity}
          </h1>
        ))}
      </div>
      <h1 className="mt-8 mb-2 text-3xl font-bold">
        Number of products you can deliver
      </h1>
      {/* --------------------------- placeholder for form*/}
      <DeliverForm products={products} />

      <button
        className="border px-8 py-3 rounded-xl text-[16px] mt-8 block"
        onClick={() => navigate("/main/requests")}
      >
        &larr; Back
      </button>
    </div>
  );
}

export default RequestDetail;
