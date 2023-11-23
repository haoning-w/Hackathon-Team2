import {
  Button,
  TextField,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function DonationForm() {
  // const [tableData, setTableData] = useState([]);
  const [role, setRole] = useState("supplier");
  const [itemTotalPrices, setItemTotalPrices] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      items: [{ productType: "", unitPrice: "", quantity: "", totalPrice: "" }],
    },
  });

  const watchFields = watch("items");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  function onSubmit(data) {
    const formData = {
      userType: data.role === "supplier" ? "s" : "d",
      email: data.orgEmail,
      organizationName: data.orgName,
      address: data.orgAddress,
      products: data.items.map((item) => ({
        productName: item.productType,
        unitPrice: parseFloat(item.unitPrice),
        totalPrice: parseFloat(item.unitPrice) * parseFloat(item.quantity),
        quantity: parseFloat(item.quantity),
      })),
    };
    //setTableData([...tableData, ...formData.items]);
    console.log(formData);

    fetch("/api/your-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Successful! Thank you for your donation!");
          reset();
        } else {
          toast.error("Failed to submit data. Please try again.");
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again later.");
        console.error(error);
      });
    reset();
    toast.success("Successful! Thank you for your donation!");
  }

  const updateItemTotalPrice = (index, totalPrice) => {
    const newItemTotalPrices = [...itemTotalPrices];
    newItemTotalPrices[index] = parseFloat(totalPrice) || 0;
    setItemTotalPrices(newItemTotalPrices);
  };

  const calculateSumPrice = () => {
    const total = itemTotalPrices.reduce((acc, price) => {
      // 确保每个 price 都是数值类型
      return acc + (parseFloat(price) || 0);
    }, 0);
    setSumPrice(total);
  };
  useEffect(() => {
    const total = itemTotalPrices.reduce((acc, price) => acc + price, 0);
    setSumPrice(total);
  }, [itemTotalPrices]);

  const inputHeight = "4px";

  return (
    <form
      className="w-[800px] ml-auto mr-auto mb-8 flex flex-col gap-2 px-10 py-16 align-middle bg-slate-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose Your Role</FormLabel>
        <RadioGroup
          row
          aria-label="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <FormControlLabel
            value="supplier"
            control={<Radio />}
            label="Supplier"
          />
          <FormControlLabel
            value="demander"
            control={<Radio />}
            label="Demander"
          />
        </RadioGroup>
      </FormControl>
      <FormRow label="Organization Email" error={errors?.orgEmail?.message}>
        <TextField
          sx={{ input: { height: inputHeight } }}
          id="orgEmail"
          {...register("orgEmail", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Organization Name" error={errors?.orgName?.message}>
        <TextField
          sx={{ input: { height: inputHeight } }}
          id="orgName"
          {...register("orgName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Address" error={errors?.orgAddress?.message}>
        <TextField
          sx={{ input: { height: inputHeight } }}
          id="orgAddress"
          {...register("orgAddress", { required: "This field is required" })}
        />
      </FormRow>

      {fields.map((item, index) => (
        <div key={item.id} className="flex justify-between items-end gap-2">
          <TextField
            label="Product"
            sx={{ input: { height: inputHeight }, flex: 1 }}
            {...register(`items[${index}].productType`, {
              required: "This field is required",
            })}
          />
          <TextField
            label="Unit Price"
            sx={{ input: { height: inputHeight }, flex: 1 }}
            {...register(`items[${index}].unitPrice`, {
              required: "This field is required",
              pattern: {
                value: /^([1-9]\d*|0)(\.\d{0,2})?$/,
                message: "Invalid number format",
              },
            })}
            onChange={(e) => {
              const unitPrice = parseFloat(e.target.value);
              const quantity = parseFloat(watchFields[index]?.quantity || 0); // Get quantity from form data
              const totalPrice = unitPrice * quantity;
              updateItemTotalPrice(index, totalPrice);
              calculateSumPrice();
              // Update the "Total Price" field
              document.getElementById(`items[${index}].totalPrice`).value =
                totalPrice.toFixed(2);
            }}
          />
          <TextField
            type="number"
            label="Quantity"
            sx={{ input: { height: inputHeight }, flex: 1 }}
            {...register(`items[${index}].quantity`, {
              required: "This field is required",
            })}
            onChange={(e) => {
              const quantity = parseFloat(e.target.value);
              const unitPrice = parseFloat(watchFields[index]?.unitPrice || 0); // Get unit price from form data
              const totalPrice = unitPrice * quantity;
              updateItemTotalPrice(index, totalPrice);
              calculateSumPrice();
              document.getElementById(`items[${index}].totalPrice`).value =
                totalPrice.toFixed(2);
            }}
          />
          <TextField
            label=""
            type="text"
            sx={{ input: { height: inputHeight }, flex: 1 }}
            id={`items[${index}].totalPrice`}
            disabled
          />
          <IconButton onClick={() => remove(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={() =>
            append({ productType: "", unitPrice: "", quantity: "" })
          }
          variant="outlined"
        >
          Add Product
        </Button>

        <div className="flex items-center text-red-500 font-bold">
          Total Sum Price: {sumPrice}
        </div>
        <Button type="submit" variant="contained" className="w-1/6">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default DonationForm;
