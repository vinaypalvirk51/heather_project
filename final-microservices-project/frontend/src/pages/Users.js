import React, { useEffect, useState } from "react";
import axios from "axios";
import usersImage from "../assets/users.jpg"; // ✅ Import the users image

const Users = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4001/contact")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Error fetching contacts", err));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Contact Form Submissions</h2>
      <ul>
        {contacts.map((user, index) => (
          <li key={index}>
            <strong>{user.name}</strong> – {user.email}<br />
            <em>{user.message}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
