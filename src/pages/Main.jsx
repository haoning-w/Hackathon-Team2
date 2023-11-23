import AppMap from "../features/map/AppMap";
import SideBar from "../ui/SideBar";

function Main() {
  return (
    <div className="h-[100vh] flex">
      <SideBar />
      <AppMap />
    </div>
  );
}

export default Main;
