import React, { useEffect, useState } from "react";
import axios from "axios";
import ordersImage from "../assets/orders.png"; // Make sure this file exists

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [adminView, setAdminView] = useState("guest");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, search, statusFilter]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4004/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const filterOrders = () => {
    let data = [...orders];

    if (search.trim()) {
      data = data.filter((o) =>
        o.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((o) => o.status === statusFilter);
    }

    setFilteredOrders(data);
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`http://localhost:4004/orders/${orderId}`);
      alert("Order deleted");
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("Failed to delete order.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:4004/orders/${orderId}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  // Pagination
  const start = (currentPage - 1) * ordersPerPage;
  const paginated = filteredOrders.slice(start, start + ordersPerPage);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div style={{ padding: 20 }}>
      <img
        src={ordersImage}
        alt="Orders"
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <h2>Orders</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Search by product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={adminView} onChange={(e) => setAdminView(e.target.value)}>
          <option value="guest">Guest</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {paginated.map((o, i) => (
        <div key={i} style={card}>
          {o.productImageUrl && (
            <img
              src={`http://localhost:4003${o.productImageUrl}`}
              alt={o.productName}
              style={{ width: 120, height: 120, objectFit: "contain", marginBottom: 10 }}
            />
          )}
          <p><b>Product:</b> {o.productName || "N/A"}</p>
          <p><b>Total:</b> ${o.total}</p>
          <p><b>Status:</b> 
            {adminView === "admin" ? (
              <select
                value={o.status}
                onChange={(e) => handleStatusChange(o._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            ) : (
              o.status
            )}
          </p>
          {adminView === "admin" && (
            <button
              onClick={() => handleDelete(o._id)}
              style={deleteBtn}
            >
              Delete Order
            </button>
          )}
        </div>
      ))}

      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            style={{
              margin: 2,
              padding: "6px 12px",
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
              background: currentPage === i + 1 ? "#007BFF" : "#eee",
              color: currentPage === i + 1 ? "#fff" : "#333",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const card = {
  border: "1px solid #ccc",
  padding: 15,
  marginBottom: 20,
  borderRadius: 8,
  background: "#fff",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const deleteBtn = {
  marginTop: 10,
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  fontWeight: "bold",
  cursor: "pointer",
};

export default Orders;
