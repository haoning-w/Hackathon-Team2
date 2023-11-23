import RequestItem from "./RequestItem";
import getDemanders from "../services/getDemanders";

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

function Requests() {
  const fakeData =  transformData(getDemanders());

  return (
    <ul>
      {fakeData.map((item) => (
        <RequestItem key={item.id} request={item} />
      ))}
    </ul>
  );
}

export default Requests;
