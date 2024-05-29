const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join("./views"));

const PORT = 4001;

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/new", async (req, res) => {
  res.render("form");
});

mongoose
  .connect("mongodb://0.0.0.0:27017/")
  .then(() => console.log(`connected`))
  .catch((error) => console.error(error.message));

app.use("/posts", postRoutes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
