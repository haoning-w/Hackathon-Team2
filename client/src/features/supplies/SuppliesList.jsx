import SupplyItem from "./SupplyItem";
import getSuppliers from "../../services/getSuppliers";

function transformData(originalData) {
  return originalData.map(item => {
    return {
      id: String(item.id), 
      name: item.organizationName,
      address: item.address,
      products: item.products.map(product => ({
        name: product.productName,
        quantity: product.quantity
      })),
      timeStamp: new Date(item.products[0]?.createdAt).toLocaleString()
    };
  });
}

function SuppliesList() {

  const fakeData = transformData(getSuppliers());

  return (
    <ul>
      {fakeData.map((item) => (
        <SupplyItem key={item.id} supply={item} />
      ))}
    </ul>
  );
}

export default SuppliesList;
