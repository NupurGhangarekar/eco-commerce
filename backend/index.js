import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketServer } from "socket.io";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // ⬅️ Create raw HTTP server for Socket.IO
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:3000", // allow frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// WebSocket: handle chat messages
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("chat message", ({ user, message }) => {
    console.log(`💬 ${user}: ${message}`);
    io.emit("chat message", { user, message }); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("📂 Using database:", mongoose.connection.name);

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Eco-commerce backend is running");
});
