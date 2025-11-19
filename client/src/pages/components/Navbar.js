import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      {token && (
        <Link to="/my-courses" style={linkStyle}>
          My Courses
        </Link>
      )}
      {token && (
        <Link to="/courses" style={linkStyle}>
          Course Catalog
        </Link>
      )}
      {!token && (
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
      )}
      {!token && (
        <Link to="/register" style={linkStyle}>
          Register
        </Link>
      )}
      {token && (
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Logout
        </button>
      )}
    </nav>
  );
};

const navStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
  marginBottom: "20px",
};

const linkStyle = { color: "#fff", textDecoration: "none", margin: "0 10px" };

const logoutButtonStyle = {
  background: "none",
  border: "none",
  color: "#007bff",
  cursor: "pointer",
  fontSize: "1rem",
  margin: "0 10px",
};

export default Navbar;
