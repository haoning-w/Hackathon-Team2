import { Button } from "@mui/material";
import DonationForm from "../features/test-donations/DonationForm";
import TestDashboard from "../features/test-donations/TestDashboard";
import CartOverview from "../features/test-feature/CartOverview";
import toast from "react-hot-toast";

function Test() {
  return (
    <div>
      <p className="text-emerald-500 text-[48px] text-center">
        Test all kinds of stuff
      </p>
      <Button
        variant="contained"
        sx={{ margin: "8px auto", display: "block" }}
        onClick={() => toast.success("Some message")}
      >
        Make a toast
      </Button>
      <DonationForm />
      <CartOverview />
      <TestDashboard />
    </div>
  );
}

export default Test;
