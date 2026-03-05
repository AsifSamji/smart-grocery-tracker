import { useEffect, useState } from "react";
import API from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

const GroceryPage = () => {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async () => {
    if (!name || !price) return alert("Name & Price required");

    const data = {
      name,
      price: Number(price),
      quantity: Number(quantity) || 1,
    };

    if (editId) {
      await API.put(`/items/${editId}`, data);
      setEditId(null);
    } else {
      await API.post("/items", data);
    }

    setName("");
    setPrice("");
    setQuantity("");
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
  };

  const handleDelete = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  // ✅ TOTAL EXPENSE LOGIC (yahi sahi jagah hai)
  const totalExpense = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1 className="title">Smart Grocery Tracker</h1>

      <input
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update Item" : "Add Item"}
      </button>

      {/* ✅ TOTAL CARD — map ke bahar */}
      <div className="total-card">
        <h3>Total Expense</h3>
        <p>₹ {totalExpense}</p>
      </div>

      <hr />

      {items.map((item) => (
        <div key={item._id} className="item">
          <div>
            <strong>{item.name}</strong> — ₹{item.price} × {item.quantity}
          </div>

          <div className="actions">
            <button onClick={() => handleEdit(item)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(item._id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroceryPage;
