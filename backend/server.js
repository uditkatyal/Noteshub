const express = require("express");
const dotenv = require("dotenv");
const notes = require("./data/notes.js");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const app = express();
const cors = require("cors");
dotenv.config();
app.use(cors());
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// app.get("/api/notes", (req, res) => {
//   res.json({
//     status: "sucess",
//     notes,
//   });
// });

// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((ele) => ele._id === req.params.id);
//   res.status(200).json({
//     status: "success",
//     note,
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log("Server is running on port 5000");
});
