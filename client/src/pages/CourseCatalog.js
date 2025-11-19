import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        setCourses(res.data);
      } catch (err) {
        setMessage("Could not load courses.");
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/courses/${courseId}/enroll`,
        {},
        { headers: { "x-auth-token": token } }
      );
      alert("Enrolled successfully!");
    } catch (err) {
      alert(err.response?.data?.msg || "Enrollment failed.");
    }
  };

  return (
    <>
      <h1>Course Catalog</h1>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <div className="course-list">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h2>
              {course.title} ({course.courseNumber})
            </h2>
            <p>{course.description}</p>
            <p>
              <strong>Coordinator:</strong> {course.courseCoordinator}
            </p>
            <p>
              <strong>Credits:</strong> {course.credits}
            </p>
            <button onClick={() => handleEnroll(course._id)}>Enroll</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseCatalog;
