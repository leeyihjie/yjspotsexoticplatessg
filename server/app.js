const express = require("express");
const cors = require("cors");
const plateRoutes = require("./routes/plateRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", plateRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
