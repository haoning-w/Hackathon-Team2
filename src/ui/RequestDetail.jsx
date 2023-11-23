function RequestDetail() {
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
    <div>
      <h1>name: {name}</h1>
      <h2>address: {address}</h2>
      {products.map((product, ind) => (
        <h3 key={ind}>
          {product.name}: {product.quantity}
        </h3>
      ))}
    </div>
  );
}

export default RequestDetail;
