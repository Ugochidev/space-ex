const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./DB/connectDb")
const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");



app.use(express.json())

const { PORT } = process.env
connectDB;
// Base route
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/api/v1", userRoute);
app.use("/api/v1", adminRoute);

app.listen(PORT, async () => {
  console.log(`The app is listening on PORT ${PORT}`);
});