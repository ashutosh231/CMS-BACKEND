import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import artifactRoutes from "./routes/artifact.route.js";
import cookieParser from "cookie-parser";
import likes from "./models/likes.js";
import likesRoutes from "./routes/likes.route.js";
import comment from "./routes/comment.route.js";
const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));
app.use(cookieParser());
/* Test Route */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CMS Backend is running"
  });
});

app.use("/auth",authRoutes);
app.use("/artifacts", artifactRoutes);
app.use("/likes", likesRoutes);
app.use("/comments", comment);
export default app;




// app.use(cors({
//   origin: ["https://cms-admin.vercel.app"],
//   credentials: true
// }));