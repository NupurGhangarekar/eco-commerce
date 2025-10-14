import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      {sent ? <div className="p-4 bg-lavender-100 rounded">Thanks for reaching out! We will respond soon.</div> : (
      <form onSubmit={submit} className="space-y-4">
        <input required value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
        <input required value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
        <textarea required value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} placeholder="Message" className="w-full p-2 border rounded" />
        <button type="submit" className="btn">Send</button>
      </form>
      )}
    </div>
  );
}
