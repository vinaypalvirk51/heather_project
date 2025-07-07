import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./DealsSlider.css"; // Ensure this file includes 3D/modern styling

const DealsSlider = () => {
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4003/products")
      .then((res) => res.json())
      .then((data) => {
        // You can customize which products to display as deals
        setDeals(data.slice(0, 5));
      })
      .catch((err) => console.error("❌ Failed to fetch deals", err));
  }, []);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
  };

  return (
    <div className="deals-slider">
      <Slider {...settings}>
        {deals.map((deal, index) => (
          <div
            key={index}
            className="deal-card"
            onClick={() => navigate("/products")}
          >
            <img
              src={`http://localhost:4003/uploads/${deal.image}`}
              alt={deal.name}
              className="deal-image"
            />
            <h3 className="deal-title">{deal.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DealsSlider;
