import { useNavigate } from "react-router-dom";
import DeliverForm from "./DeliverForm";
import useGetRequests from "../features/requests/useGetRequests";
import { useParams } from "react-router-dom";

function RequestDetail() {
  const { data, isLoading } = useGetRequests();
  const { id } = useParams();
  const request = data.find((item) => item.id === Number(id));
  const {
    id: requestId,
    organizationName,
    timeStamp,
    address,
    latlng,
    products,
  } = request;
  return (
    <div className="mt-2">
      <h1 className="text-3xl font-bold mb-2">requester's info</h1>
      <div className="bg-[var(--color-dark--2)] px-12 py-6 rounded-2xl">
        <h1 className="text-[18px]">name: {organizationName}</h1>
        <h1 className="text-[18px]">address: {address}</h1>
      </div>
      <h1 className="text-3xl font-bold mb-2 mt-8">Product info</h1>
      <div className="bg-[var(--color-dark--2)] px-12 py-6 rounded-2xl">
        {products.map((product, ind) => (
          <h1 className="text-[18px]" key={ind}>
            {product.productName}: {product.quantity}
          </h1>
        ))}
      </div>
      <h1 className="mt-8 mb-2 text-3xl font-bold">
        Number of products you'll deliver
      </h1>
      <DeliverForm products={products} />
    </div>
  );
}

export default RequestDetail;
