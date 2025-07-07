import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    sku: "",
    name: "",
    price: "",
    description: "",
    categories: "",
    instock: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const dropRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:4003/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const [key, value] of Object.entries(form)) {
      if (key === "image" && !value) continue;
      data.append(key, value);
    }

    try {
      await axios.post("http://localhost:4003/products", data);
      alert("✅ Product uploaded!");
      window.location.reload();
    } catch (err) {
      console.error("❌ Upload failed:", err.response?.data || err.message);
      alert("❌ Upload failed");
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:4004/orders", {
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.image, // ✅ full image URL already stored
      });
      alert("🛒 Added to cart!");
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
      alert("❌ Failed to add to cart.");
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:4003/products/${productId}`);
      alert("🗑️ Product deleted");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("❌ Failed to delete");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="sku" placeholder="SKU" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="price" placeholder="Price" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="categories" placeholder="Categories (comma-separated)" onChange={handleChange} />
        <input name="instock" placeholder="Stock" onChange={handleChange} required />

        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={dropZone}
        >
          {preview ? (
            <img src={preview} alt="Preview" style={previewStyle} />
          ) : (
            "Drag & Drop Image Here or Click Below"
          )}
        </div>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" style={uploadBtn}>📤 Upload</button>
      </form>

      <h2>Products</h2>
      <div style={grid}>
        {products.map((p, i) => (
          <div key={i} style={{ ...card, animation: "fadeIn 0.6s ease" }}>
            <h3>{p.name}</h3>
            <img
              src={`http://localhost:4003/uploads/${p.image}`}  // ✅ already full URL
              alt={p.name}
              style={{
                width: "100%",
                height: 200,
                objectFit: "contain",
                background: "#f9f9f9",
                borderRadius: 5,
              }}
            />
            <p>{p.description}</p>
            <p><b>Price:</b> ${p.price}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: 10 }}>
              <button onClick={() => handleAddToCart(p)} style={addToCartBtn}>🛒 Add to Cart</button>
              <button onClick={() => handleDelete(p._id)} style={deleteBtn}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`@keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }`}
      </style>
    </div>
  );
};

// ✅ Styling
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: 20,
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginBottom: 30,
};

const card = {
  border: "1px solid #ccc",
  padding: 15,
  borderRadius: 8,
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const addToCartBtn = {
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: 6,
  fontWeight: "bold",
  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  transition: "transform 0.2s ease",
};

const deleteBtn = {
  backgroundColor: "#DC3545",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: 6,
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
};

const uploadBtn = {
  gridColumn: "span 2",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: 6,
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
};

const dropZone = {
  gridColumn: "span 2",
  border: "2px dashed #aaa",
  padding: 20,
  textAlign: "center",
  borderRadius: 6,
  backgroundColor: "#f0f0f0",
  cursor: "pointer",
};

const previewStyle = {
  maxWidth: "100%",
  maxHeight: 200,
  borderRadius: 6,
};

export default Products;
