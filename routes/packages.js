const express = require("express");
const router = express.Router();
const pool = require("../db");

//Get All Data
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM packages");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get By ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM packages WHERE package_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Post - Menambahkan Data
router.post("/", async (req, res) => {
  const { package_name, description, price } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO packages (package_name, description, price) VALUES ($1, $2, $3) RETURNING *",
      [package_name, description, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Put - Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { package_name, description, price } = req.body;

  try {
    const result = await pool.query(
      "UPDATE packages SET package_name=$1, description=$2, price=$3 WHERE package_id=$4 RETURNING *",
      [package_name, description, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM packages WHERE package_id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;