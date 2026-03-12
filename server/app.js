import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { v2 as cloudinary } from 'cloudinary';

// Import Middlewares
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// Import Routers
import authRouter from "./routes/authRouter.js";
import ProductRouter from "./routes/productRouter.js";
import OrderRouter from "./routes/orderRouter.js";

dotenv.config();

const app = express();

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

// --- DATABASE CONNECTION LOGIC (Optimized for Serverless) ---
const connectDB = async () => {
  // Jika sudah konek, jangan buat koneksi baru
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    // Jangan biarkan aplikasi jalan jika DB gagal di serverless
    throw err; 
  }
};

// --- MIDDLEWARES ---
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public")); 

// Manual Sanitization (Aman untuk Vercel Proxy)
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  next();
});

// Middleware untuk memastikan DB konek sebelum menjalankan route apapun
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed", error: err.message });
  }
});

// --- ROUTES ---
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/order", OrderRouter);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// --- SERVER START (Local Only) ---
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Local Server running on port ${port}`);
  });
}

// --- VERCEL EXPORT ---
export default app;