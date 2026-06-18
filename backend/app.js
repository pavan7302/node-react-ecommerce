import express from "express";
import path from "path";
import bodyParser from "body-parser";

import config from "./config.js";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/uploads", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

export default app;
