import addressToCoords from "../../services/getLocationCoords";
import { dataToCoords } from "../../utils/helper";
import useGetCoords from "../map/useGetCoords";
import SupplyItem from "./SupplyItem";
import getSuppliers from "../../services/getSuppliers";
import useGetRequests from "../requests/useGetRequests";

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

function SuppliesList() {
  const { data, isLoading } = useGetRequests();

  if (isLoading) return null;

  const realData = transformData(data);

  // const { data, isLoading } = useGetCoords("4567 Lougheed Hwy");
  // if (!isLoading) console.log(dataToCoords(data));

  return (
    <ul>
      {realData.map((item) => (
        <SupplyItem key={item.id} supply={item} />
      ))}
    </ul>
  );
}

export default SuppliesList;
