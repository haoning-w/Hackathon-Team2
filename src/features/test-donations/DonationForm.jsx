import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

function DonationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    console.log({
      ...data,
      unitPrice: Number(data.unitPrice),
      quantity: Number(data.quantity),
    });
    reset();
    toast.success("Successful! Thank you for your donation!");
  }

  const inputHeight = "4px";

  return (
    <form
      className="w-[800px] ml-auto mr-auto mb-8 flex flex-col gap-2 px-10 py-16 align-middle bg-slate-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Organization Name" error={errors?.orgName?.message}>
        <TextField
          sx={{ input: { height: inputHeight } }}
          id="orgName"
          {...register("orgName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Product" error={errors?.productType?.message}>
        <TextField
          sx={{ input: { height: inputHeight } }}
          {...register("productType", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Unit Price" error={errors?.unitPrice?.message}>
        <TextField
          sx={{ input: { height: inputHeight } }}
          {...register("unitPrice", {
            required: "This field is required",
            pattern: {
              value: /^([1-9]\d*|0)(\.\d{0,2})?$/,
              message: "Invalid number format",
            },
          })}
        />
      </FormRow>
      <FormRow label="Quantity" error={errors?.quantity?.message}>
        <TextField
          type="number"
          sx={{ input: { height: inputHeight } }}
          {...register("quantity", { required: "This field is required" })}
        />
      </FormRow>
      <div className="flex justify-center">
        <Button type="submit" variant="contained" className="w-1/6">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default DonationForm;
