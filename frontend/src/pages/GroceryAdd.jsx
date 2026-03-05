import { useState } from "react";
import axios from "axios";
import "../styles/GroceryAdd.css";

const GroceryAdd = () => {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "pcs",
    purchaseDate: "",
    expireDate: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/items",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Item Added Successfully ✅");

    // reset form
    setForm({
      name: "",
      quantity: "",
      unit: "pcs",
      purchaseDate: "",
      expireDate: "",
    });
  };

  return (
    <div className="center-page">
      <div className="add-item-wrapper">
        <h2>Add Grocery Item</h2>
        <p className="form-subtitle">
          Fill in the details below to add a new grocery item
        </p>

        <form className="add-item-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Item Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <div className="input-row">
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />

            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              required
            >
              <option value="kg">Kg</option>
              <option value="liter">Liter</option>
              <option value="pcs">Pcs</option>
            </select>
          </div>

          <div className="date-group">
            <label>Purchase Date</label>
            <input
              name="purchaseDate"
              type="date"
              value={form.purchaseDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="date-group">
            <label>Expire Date</label>
            <input
              name="expireDate"
              type="date"
              value={form.expireDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default GroceryAdd;