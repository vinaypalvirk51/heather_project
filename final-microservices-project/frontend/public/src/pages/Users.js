import React, { useEffect, useState } from "react";
import axios from "axios";
import usersImage from "../assets/users.png"; // ✅ Import the users image

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4002/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Error fetching users", err));
  }, []);

  return (
    <div style={style}>
      <img
        src={usersImage}
        alt="Users"
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <h2>Users</h2>
      <ul>
        {users.map((u, i) => (
          <li key={i}>{u.name} ({u.email}) - {u.role}</li>
        ))}
      </ul>
    </div>
  );
};

const style = { padding: 20 };

export default Users;
