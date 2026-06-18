import dotenv from "dotenv";
dotenv.config();
const config = {
  MONGODB_URL:
    process.env.MONGODB_URL ||
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/ecommerce",

  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "sb",
  PORT: 5000,
};

export default config;
