import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
import connectDB  from './config/db.js'
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";

const app = express()
const port = Number(process.env.PORT) || 5000
const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "https://portfolio-management-frenita.vercel.app",
  ...configuredOrigins,
];
const isVercelPortfolioOrigin = (origin: string) =>
  /^https:\/\/portfolio-management(?:-[a-z0-9-]+)?-frenita\.vercel\.app$/i.test(origin);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || isVercelPortfolioOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
}))
app.use(express.json())
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/uploads", express.static("uploads"));
app.get('/api/health', (_req, res) => {
	res.json({
    status: mongoose.connection.readyState === 1 ? "ok" : "degraded",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  })
})

async function start() {
	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`)
	})

  try {
    await connectDB();
  } catch {
    console.error("Server is running, but database-backed routes are unavailable until MongoDB connects.");
  }
}

start().catch((error) => {
	console.error('Failed to start server', error)
	process.exit(1)
})
