const express = require("express");
const app = express();
const cors = require("cors")
const PORT = 9090;
const mongoDB = require("./db");
mongoDB();
app.use(cors())
app.use(express.json());
app.use("/api", require("./Routers/CreateUser"));
app.use("/api", require("./Routers/DisplayData"));
app.use("/api", require("./Routers/OrderData"));
app.get("/", (req, res) => {
  res.send("Hello, World!");
}); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
