import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setItems(res.data));
  }, []);

  const today = new Date();

  const expireSoon = items.filter(
    (i) => new Date(i.expireDate) - today <= 3 * 86400000
  );

  const addedThisWeek = items.filter(
    (i) => new Date(i.createdAt) >= new Date(Date.now() - 7 * 86400000)
  );

  return (
    <>
      <h2>Dashboard</h2>

      <div className="card-container">
        <div className="card">
          <h3>Next Expire Items</h3>
          <p>{expireSoon.length}</p>
        </div>

        <div className="card">
          <h3>Items Added This Week</h3>
          <p>{addedThisWeek.length}</p>
        </div>
      </div>

      <div className="card-container">
        <div className="card clickable" onClick={() => navigate("add")}>
          ➕ Add Item
        </div>

        <div className="card clickable" onClick={() => navigate("list")}>
          📋 View All
        </div>

        <div className="card clickable">
          🍲 Find Recipe
        </div>
      </div>
     {/* EXPIRE LIST */}
<div
  className="table-box"
  style={{
    animation: "fadeUp 0.6s ease",
    perspective: "1000px",
  }}
>
  <h3 style={{ marginBottom: "14px" }}>Expiring Soon</h3>

  {expireSoon.map((i) => (
    <div
      key={i._id}
      style={{
        background: "#f8fafc",
        padding: "12px 16px",
        borderRadius: "12px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        transform: "translateZ(0)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "rotateX(4deg) rotateY(-4deg) scale(1.03)";
        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "rotateX(0deg) rotateY(0deg) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,0.08)";
      }}
    >
      <span style={{ fontWeight: 600, color: "#0f172a" }}>
        {i.name}
      </span>

      <span
        style={{
          fontSize: "13px",
          color: "#dc2626",
          background: "#fee2e2",
          padding: "4px 10px",
          borderRadius: "999px",
          fontWeight: 500,
        }}
      >
        {new Date(i.expireDate).toDateString()}
      </span>
    </div>
  ))}
</div>
    </>
  );
};

export default DashboardHome;