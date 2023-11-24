import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function DeliverForm({ products }) {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const values = watch();
  const totalAmount = Object.values(values).reduce((acc, currentValue) => {
    const quantity = Number(currentValue) || 0;
    return acc + quantity;
  }, 0);
  return (
    <form className="">
      {products.map((item, ind) => (
        <div
          key={ind}
          className="w-[100%] flex justify-between mt-4 align-middle bg-[var(--color-dark--2)] px-4 py-4 rounded-2xl"
        >
          <label className="h-[100%] my-auto text-center">
            {item.productName}
          </label>
          <input
            {...register(`product_${ind}`)}
            className="text-[var(--color-dark--1)] w-32 h-[32px]"
            type="number"
          />
        </div>
      ))}
      <div className="w-[100%] flex justify-end">
        <label className="block mt-4">Total Amount: {totalAmount}</label>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="border px-8 py-3 rounded-xl text-[16px] mt-4 block"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>
        <button className="border px-8 py-3 rounded-xl text-[16px] mt-4 bg-[var(--color-brand--2)] text-[var(--color-dark--1)]">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default DeliverForm;
