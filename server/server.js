require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
const movieRoutes = require("./routes/movies");

app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
  console.log("http://localhost:8080/api");
});
