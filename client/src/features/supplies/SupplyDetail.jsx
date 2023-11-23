import DeliverForm from "../../ui/DeliverForm";
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


function SupplyDetail() {
  const supply = transformData(getSuppliers());;
  const { id, name, timeStamp, address, latlng, products } = supply;
  return ( 
    <div className="mt-2">
      <h1 className="text-3xl font-bold mb-2">Supplies' info</h1>
      <div className="bg-[var(--color-dark--2)] px-12 py-6 rounded-2xl">
        <h1 className="text-[18px]">name: {name}</h1>
        <h1 className="text-[18px]">address: {address}</h1>
      </div>
      <h1 className="text-3xl font-bold mb-2 mt-8">Product info</h1>
      <div className="bg-[var(--color-dark--2)] px-12 py-6 rounded-2xl">
        {products.map((product, ind) => (
          <h1 className="text-[18px]" key={ind}>
            {product.name}: {product.quantity}
          </h1>
        ))}
      </div>
      <h1 className="mt-8 mb-2 text-3xl font-bold">
        Number of products you can pick up
      </h1>
      <DeliverForm products={products} />
    </div>
  );
}

export default SupplyDetail;
