import RequestItem from "./RequestItem";
import getDemanders from "../services/getDemanders";
import useGetRequests from "../features/requests/useGetRequests";

function transformData(originalData) {
  return originalData.map((item) => {
    return {
      id: String(item.id),
      name: item.organizationName,
      address: item.address,
      products: item.products.map((product) => ({
        name: product.productName,
        quantity: product.quantity,
      })),
      timeStamp: new Date(item.products[0]?.createdAt).toLocaleString(),
    };
  });
}

function Requests() {
  const { data, isLoading } = useGetRequests();

  if (isLoading) return null;

  const realData = transformData(data);

  return (
    <ul>
      {realData.map((item) => (
        <RequestItem key={item.id} request={item} />
      ))}
    </ul>
  );
}

export default Requests;
