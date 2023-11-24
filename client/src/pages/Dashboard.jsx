import Menu from "../ui/Menu";
import { Outlet } from 'react-router-dom';


function Dashboard() {
  return (
    <div>
      <Menu />
      <Outlet /> 
    </div>
  );
}

export default Dashboard;
