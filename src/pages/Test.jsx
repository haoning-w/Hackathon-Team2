import TestDashboard from "../features/test-donations/TestDashboard";
import CartOverview from "../features/test-feature/CartOverview";

function Test() {
  return (
    <div>
      <p className="text-emerald-500 text-[48px] text-center">
        Test all kinds of stuff
      </p>
      <CartOverview />
      <TestDashboard />
    </div>
  );
}

export default Test;
