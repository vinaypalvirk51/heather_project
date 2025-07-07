import React from "react";
import homeBanner from "../assets/home-banner.jpg"; // ✅ Banner image
import DealsSlider from "../components/DealsSlider"; // ✅ Import the deals component

const Home = () => {
  return (
    <div style={style}>
      <img
        src={homeBanner}
        alt="Home Banner"
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <h1>Welcome to Bestfriends Website</h1>
      <p>
        This is our website to place and sell anything like contact, blog, users, products, orders, and reviews.
      </p>

      {/* ✅ Add animated product deals slider */}
      <DealsSlider />
    </div>
  );
};

const style = {
  padding: 20,
  fontFamily: "Arial",
};

export default Home;
