import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatBox({ username }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.on("chat message", ({ user, message }) => {
      setMessages((prev) => [...prev, { user, message }]);
    });

    return () => socket.off("chat message");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (msg.trim()) {
      socket.emit("chat message", { user: username || "User", message: msg });
      setMsg("");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white border p-4 shadow-lg rounded">
      <h2 className="text-lg font-semibold mb-2">💬 Live Chat</h2>
      <div className="h-40 overflow-y-auto border p-2 mb-2 text-sm">
        {messages.map((m, i) => (
          <div key={i}><strong>{m.user}:</strong> {m.message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message"
        />
        <button type="submit" className="bg-lavender text-white px-3 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
