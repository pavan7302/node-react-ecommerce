import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./db.js";
import config from "./config.js";

dotenv.config();

connectDB();

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
