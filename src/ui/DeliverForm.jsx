function DeliverForm({ products }) {
  return (
    <form className="">
      {products.map((item, ind) => (
        <div
          key={ind}
          className="w-[100%] flex justify-between mt-4 align-middle bg-[var(--color-dark--2)] px-4 py-4 rounded-2xl"
        >
          <label className="h-[100%] my-auto text-center">{item.name}</label>
          <input
            className="text-[var(--color-dark--1)] w-32 h-[32px]"
            type="number"
          />
        </div>
      ))}
      <button className="border px-8 py-3 rounded-xl text-[16px] mt-4 bg-[var(--color-brand--2)] text-[var(--color-dark--1)]">
        Confirm
      </button>
    </form>
  );
}

export default DeliverForm;
