import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const [message, setMessage] = useState("");

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      // On success, navigate to the courses page
      navigate("/courses");
    } catch (err) {
      // Set an on-page error message instead of an alert
      setMessage(err.response.data.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
