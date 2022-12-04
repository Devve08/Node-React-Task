const connectDb = require("./db/connect");
const cors = require('cors')
const express = require("express");
const app = express();
const categoriesRoutes = require("./routes/categories");
const itemsRoutes = require("./routes/items")
const path = require('path')
require('dotenv').config()

const port = 8000;
app.use(cors())
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')))

app.get("/", (req, res) => {
  res.send("kskjadklaj");
});

app.use("/api/categories", categoriesRoutes);
app.use("/api/items", itemsRoutes);

const startApp = async () => {
  try {
    await connectDb(process.env.ConnectionURL);
    app.listen(port, console.log(`server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
