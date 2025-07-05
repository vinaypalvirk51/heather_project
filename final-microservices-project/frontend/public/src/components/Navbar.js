import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: 20, backgroundColor: "#282c34" }}>
    <Link to="/" style={linkStyle}>Home</Link> |{" "}
    <Link to="/blogs" style={linkStyle}>Blog</Link> |{" "}
    <Link to="/contact" style={linkStyle}>Contact</Link> |{" "}
    <Link to="/users" style={linkStyle}>Users</Link> |{" "}
    <Link to="/products" style={linkStyle}>Products</Link> |{" "}
    <Link to="/orders" style={linkStyle}>Orders</Link> |{" "}
    <Link to="/reviews" style={linkStyle}>Reviews</Link>
  </nav>
);

const linkStyle = {
  color: "#61dafb",
  textDecoration: "none",
  marginRight: 10,
};

export default Navbar;
