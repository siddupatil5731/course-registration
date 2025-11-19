const express = require("express");
const Course = require("../models/course");
const User = require("../models/user");
const auth = require("../middleware/auth"); // We will create this middleware next

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error: " + err.message });
  }
});

// Get courses for the currently logged-in user
router.get("/my-courses", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user.enrolledCourses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error: " + err.message });
  }
});

// Enroll in a course
router.post("/:courseId/enroll", auth, async (req, res) => {
  try {
    const newCourse = await Course.findById(req.params.courseId);
    const user = await User.findById(req.user.id).populate("enrolledCourses");

    if (!newCourse || !user) {
      return res.status(404).json({ msg: "Course or User not found" });
    }

    // Check credit limit
    const currentCredits = user.enrolledCourses.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    if (currentCredits + newCourse.credits > 30) {
      return res
        .status(400)
        .json({ msg: "Enrollment failed: Exceeds 30 credit limit." });
    }

    // Check if already enrolled
    if (user.enrolledCourses.some((c) => c._id.equals(newCourse._id))) {
      return res.status(400).json({ msg: "Already enrolled in this course" });
    }

    user.enrolledCourses.push(newCourse._id);
    newCourse.students.push(user._id);

    await user.save();
    await newCourse.save();

    res.json(user.enrolledCourses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error: " + err.message });
  }
});

module.exports = router;
