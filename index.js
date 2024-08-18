const express = require("express");
const app = express();
const db = require("./dbconnection");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("connection is completed");
});

const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

// This is the Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening ${PORT}`);
});
