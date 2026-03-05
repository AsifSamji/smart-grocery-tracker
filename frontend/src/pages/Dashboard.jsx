import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/Dashboard.css";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />

        {/* RIGHT SIDE CONTENT */}
        <div className="dashboard-content">
          <Outlet />
        </div>

       

      </div>

    </>
  );
};

export default DashboardLayout;




