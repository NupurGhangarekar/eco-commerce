import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";

const socket = io("http://localhost:5000");

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("chat message");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", { user: "User", message });
      setMessage("");
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-lavender-50">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>

          {/* Chat section below */}
          <div className="mt-8 max-w-lg mx-auto border rounded p-4 bg-white shadow">
            <h2 className="text-lg font-semibold mb-2">💬 Live Chat</h2>
            <ul className="h-40 overflow-y-auto bg-gray-100 p-2 mb-2 rounded">
              {messages.map((msg, index) => (
                <li key={index}><strong>{msg.user}</strong>: {msg.message}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border px-2 py-1 flex-1 rounded"
                placeholder="Type a message"
              />
              <button
                onClick={sendMessage}
                className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}
