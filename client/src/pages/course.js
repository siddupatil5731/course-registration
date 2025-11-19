import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/api/courses");
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/courses/${courseId}/enroll`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );
      alert("Enrolled successfully!");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      {courses.map((course) => (
        <div key={course._id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p>Instructor: {course.instructor}</p>
          <button onClick={() => handleEnroll(course._id)}>Enroll</button>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
