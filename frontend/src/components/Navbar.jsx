import { FaSearch } from "react-icons/fa";
import "../styles/Dashboard.css";

const Navbar = () => {
  return (
    <div className="navbar premium-navbar">
      {/* LEFT */}
      <div className="nav-left">
        <h3 className="logo-text">Smart Grocery</h3>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {/* SEARCH */}
        <div className="nav-search">
          <FaSearch className="search-icon" />
          <input placeholder="Search grocery items..." />
        </div>

        {/* LOGOUT */}
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;