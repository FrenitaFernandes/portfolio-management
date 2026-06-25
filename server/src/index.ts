import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB  from './config/db.js'
import authRoutes from './routes/authRoutes.js';
import authMiddleware from "./middleware/authMiddleware.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";

const app = express()
const port = Number(process.env.PORT) || 5000

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
  ],
  credentials: true,
}))
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use(
  "/api/profile",
  profileRoutes
);
app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/upload",
  uploadRoutes
);
app.use(
  "/uploads",
  express.static("uploads")
);
app.use(
  "/api/resume",
  resumeRoutes
);
app.use(
  "/uploads",
  express.static("uploads")
);
app.get('/api/health', (_req, res) => {
	res.json({ status: 'ok' })
})

async function start() {
	await connectDB()
	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`)
	})
}

start().catch((error) => {
	console.error('Failed to start server', error)
	process.exit(1)
})
app.get("/api/admin/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
  });
});
