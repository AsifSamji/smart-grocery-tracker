import { NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaList, FaUtensils } from "react-icons/fa";
import "../styles/Dashboard.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Menu</h3>

      <NavLink to="/dashboard" className="nav-link">
        <FaHome /> Dashboard
      </NavLink>

      <NavLink to="/dashboard/add" className="nav-link">
        <FaPlus /> Add Item
      </NavLink>

      <NavLink to="/dashboard/list" className="nav-link">
        <FaList /> View Items
      </NavLink>

      <NavLink to="/dashboard/recipe" className="nav-link">
        <FaUtensils /> Recipes
      </NavLink>
    </div>
  );
};

export default Sidebar;