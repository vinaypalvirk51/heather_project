import React, { useState } from "react";
import axios from "axios";
import contactImage from "../assets/contact.png"; // ✅ Import the image

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4001/contact", form)
      .then(() => alert("Message sent!"))
      .catch(() => alert("Failed to send"));
  };

  return (
    <div style={style}>
      <img
        src={contactImage}
        alt="Contact"
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const style = { padding: 20 };
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: "100%",
  maxWidth: 400,
};

export default Contact;
