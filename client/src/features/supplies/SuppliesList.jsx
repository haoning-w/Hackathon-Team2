import { transformData } from "../../utils/helper";
import SupplyItem from "./SupplyItem";
import useGetSuppliers from "../map/useGetSuppliers";

function SuppliesList() {
  const { data, isLoading } = useGetSuppliers();

  if (isLoading) return null;
  console.log(data);

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
