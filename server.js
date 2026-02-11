import dotenv from "dotenv";
dotenv.config();
import cloudinary from "./config/cloudinary.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import { testing } from "./cron/testing.js";
import { verifyMail } from "./config/mail.js";
import { autoPublishDrafts } from "./cron/autoPublishDrafts.js";

const PORT = process.env.PORT || 5000;

connectDB();
verifyMail();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  //testing();
  autoPublishDrafts();
});