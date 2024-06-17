// server.js

import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv"; // Import dotenv to load environment variables

dotenv.config({ path: "./config/config.env" }); // Load environment variables

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Start the server
const PORT = process.env.PORT || 4000; // Default to port 3000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server Listening on port: ${PORT}`);
});
