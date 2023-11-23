import DeliverForm from "../../ui/DeliverForm";

function SupplyDetail() {
  const supply = {
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
  };
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
