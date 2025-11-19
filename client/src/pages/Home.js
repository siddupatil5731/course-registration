import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Our College</h1>
      <p>Your journey to knowledge starts here.</p>
      <div>
        <Link to="/login">
          <button style={{ marginRight: "10px" }}>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
