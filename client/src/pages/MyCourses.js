import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please log in to see your courses.");
        return;
      }
      try {
        const res = await axios.get("/api/courses/my-courses", {
          headers: { "x-auth-token": token },
        });
        setEnrolledCourses(res.data);
      } catch (err) {
        setMessage("Could not fetch your courses.");
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <h1>My Enrolled Courses</h1>
      {message && <p>{message}</p>}
      {enrolledCourses.length > 0 ? (
        <div className="course-list">
          {enrolledCourses.map((course) => (
            <div key={course._id} className="course-card">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p>
                <strong>Credits:</strong> {course.credits}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>
          You are not enrolled in any course.{" "}
          <Link to="/courses">Browse the catalog to enroll.</Link>
        </p>
      )}
    </>
  );
};

export default MyCourses;
