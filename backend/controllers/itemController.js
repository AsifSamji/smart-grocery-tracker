const Item = require("../models/Item");

/* ===============================
   📄 GET all items
================================ */
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ expireDate: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===============================
   ➕ ADD item
================================ */
const addItem = async (req, res) => {
  try {
    const {
      name,
      quantity,
      unit,
      purchaseDate,
      expireDate,
    } = req.body;

    // basic validation
    if (!name || !quantity || !unit || !purchaseDate || !expireDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const item = new Item({
      name,
      quantity,
      unit, // ✅ VERY IMPORTANT
      purchaseDate,
      expireDate,
    });

    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ===============================
   ✏️ UPDATE item
================================ */
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      quantity,
      unit,
      expireDate,
    } = req.body;

    if (!name || !quantity || !unit) {
      return res.status(400).json({
        message: "Name, quantity and unit are required",
      });
    }

    const updated = await Item.findByIdAndUpdate(
      id,
      {
        name,
        quantity,
        unit,       // ✅ MUST be included
        expireDate,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* ===============================
   ❌ DELETE item
================================ */
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Item.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};