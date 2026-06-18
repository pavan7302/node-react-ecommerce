import dotenv from "dotenv";

dotenv.config();

const config = {
  MONGODB_URL:
    process.env.NODE_ENV === "test"
      ? (process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerce")
      : (process.env.MONGODB_URL ||
         process.env.MONGODB_URI ||
         "mongodb://mongodb:27017/ecommerce"),

  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "sb",
  PORT: process.env.PORT || 5000,
};

export default config;
