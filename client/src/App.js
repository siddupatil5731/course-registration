import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/register";
import Login from "./pages/login";
import MyCourses from "./pages/MyCourses"; // Renamed for clarity
import CourseCatalog from "./pages/CourseCatalog"; // New page
import Navbar from "./pages/components/Navbar"; // New component
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/courses" element={<CourseCatalog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
