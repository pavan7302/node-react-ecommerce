import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import config from "./config.js";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(config.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// --------------------
// API ROUTES
// --------------------
app.use("/api/uploads", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// PayPal config
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// --------------------
// STATIC FILES
// --------------------
const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// serve React build
app.use(express.static(path.join(__dirname, "frontend/build")));

// --------------------
// FIXED CATCH-ALL ROUTE (IMPORTANT)
// Express 5 safe version (NO "*")
// --------------------
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

// --------------------
// START SERVER
// --------------------
const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
