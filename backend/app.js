import express from "express";
import path from "path";
import bodyParser from "body-parser";

import config from "./config.js";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();

// Middleware
app.use(bodyParser.json());

// API routes
app.use("/api/uploads", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// PayPal config
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// Static files
const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "frontend/build")));

// Catch all route
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

export default app;
