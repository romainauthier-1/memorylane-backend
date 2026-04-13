require("dotenv").config();
var express = require("express");
var cors = require("cors");
const path = require("path");
// connection mongoDB
require("./models/connection");

// routers
const memoryRouter = require("./routes/memories");
const uploadRouter = require("./routes/upload");
const userRouter = require("./routes/users");

var app = express();

app.get("/", (req, res) => {
  res.send("Le serveur des souvenirs est en ligne ! 🚀");
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: true, // Autorise toutes les origines
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // <--- INDISPENSABLE
  }),
);

// app.use routers
app.use("/memories", memoryRouter);
app.use("/uploads", uploadRouter);
app.use("/user", userRouter);

module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
