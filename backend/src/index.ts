import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env file")
  process.exit(1)
}

app.use(express.json())
app.use(cors())

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully")
    
    // Routes
    app.use("/api/auth", authRoutes)

    // Health check
    app.get("/health", (req, res) => {
      res.json({ status: "Server running" })
    })

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message)
    process.exit(1)
  })
