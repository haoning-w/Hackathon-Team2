import { useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100%] bg-[#2d3439]">
      <div className="mx-auto my-auto h-[350px] w-[30%] bg-[#42484d] px-8 py-8 rounded-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mb-8">
          <label>Email</label>
          <input className="text-gray-600" />
        </div>
        <div>
          <label>Password</label>
          <input className="text-gray-600" type="password" />
        </div>
        <div className="flex justify-center">
          <button
            className="mt-10 text-[24px] bg-[#00c46a] text-gray-600 px-8 py-2 rounded-xl"
            onClick={() => navigate("/main")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;