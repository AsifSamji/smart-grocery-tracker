import { useEffect, useState } from "react";
import axios from "axios";

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("pcs");
  const [expireDate, setExpireDate] = useState("");

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ⭐ BACKEND URL
  const API = "https://smart-grocery-tracker-wg6t.onrender.com/api";

  // 🔄 FETCH ITEMS
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/items`, authHeader);
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ❌ DELETE
  const deleteItem = async (id) => {
    if (!window.confirm("Delete item?")) return;

    try {
      await axios.delete(`${API}/items/${id}`, authHeader);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ✏️ EDIT
  const editItem = (item) => {
    setEditId(item._id);
    setName(item.name);
    setQuantity(item.quantity);
    setUnit(item.unit);
    setExpireDate(item.expireDate?.slice(0, 10));
  };

  // 💾 UPDATE
  const updateItem = async () => {
    if (!name || !quantity || !unit) {
      alert("All fields required");
      return;
    }

    try {
      await axios.put(
        `${API}/items/${editId}`,
        { name, quantity, unit, expireDate },
        authHeader
      );

      setEditId(null);
      setName("");
      setQuantity("");
      setUnit("pcs");
      setExpireDate("");

      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="table-box">
      <h2>All Grocery Items</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Expire</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                {editId === item._id ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>

              <td>
                {editId === item._id ? (
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                ) : (
                  item.quantity
                )}
              </td>

              <td>
                {editId === item._id ? (
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="kg">Kg</option>
                    <option value="liter">Liter</option>
                    <option value="pcs">Pcs</option>
                  </select>
                ) : (
                  item.unit
                )}
              </td>

              <td>
                {editId === item._id ? (
                  <input
                    type="date"
                    value={expireDate}
                    onChange={(e) => setExpireDate(e.target.value)}
                  />
                ) : (
                  item.expireDate?.slice(0, 10)
                )}
              </td>

              <td>
                {editId === item._id ? (
                  <>
                    <button
                      style={{
                        background: "green",
                        color: "white",
                        marginRight: 5,
                      }}
                      onClick={updateItem}
                    >
                      Save
                    </button>

                    <button onClick={() => setEditId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{
                        background: "orange",
                        color: "white",
                        marginRight: 5,
                      }}
                      onClick={() => editItem(item)}
                    >
                      Edit
                    </button>

                    <button
                      style={{
                        background: "red",
                        color: "white",
                      }}
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroceryList;