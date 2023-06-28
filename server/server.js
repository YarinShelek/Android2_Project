const express = require("express");
const mongoose = require("mongoose");
const api = require("./utils/api");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const isDataLoaded = (isLoaded) => isLoaded = false;

const app = express();

// MongoDB Atlas connection URI
const mongoURI =
  "mongodb+srv://kobi070:Sku16021996@cluster1.mtw9dlv.mongodb.net/?retryWrites=true&w=majority";
// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    // Load data into the database only once
    if(!isDataLoaded()) {
        api.fetchAndInsertData();
        isDataLoaded(true);
    };
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas", err);
  });

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
