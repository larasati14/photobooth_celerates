const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const packageRoutes = require("./routes/packages");
app.use("/packages", packageRoutes);

// server jalan
app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});

console.log("Server mulai...");

app.get("/", (req, res) => {
  res.send("API Photobooth jalan 🚀");
});

