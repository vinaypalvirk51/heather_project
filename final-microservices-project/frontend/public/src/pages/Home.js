import React from "react";
import homeBanner from "../assets/home-banner.png"; // ✅ Import banner image

const Home = () => {
  return (
    <div style={style}>
      <img
        src={homeBanner}
        alt="Home Banner"
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <h1>Welcome to Final Microservices Website</h1>
      <p>
        This is a demo project with multiple services like contact, blog, users, products, orders, and reviews.
      </p>
    </div>
  );
};

const style = {
  padding: 20,
  fontFamily: "Arial"
};

export default Home;
``
