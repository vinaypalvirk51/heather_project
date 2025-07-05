import React, { useEffect, useState } from "react";
import axios from "axios";
import blogImage from "../assets/blog.png";  // ✅ Image import

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4001/blogs")
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Error fetching blogs", err));
  }, []);

  return (
    <div style={style}>
      <img
        src={blogImage}
        alt="Blog"
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <h2>Blogs</h2>
      {blogs.map((b, i) => (
        <div key={i} style={card}>
          <h3>{b.title}</h3>
          <p>{b.content}</p>
          <small>{new Date(b.date).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

const style = { padding: 20 };
const card = {
  border: "1px solid #ddd",
  padding: 15,
  marginBottom: 10,
  borderRadius: 8
};

export default Blog;
