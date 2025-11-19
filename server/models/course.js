const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  courseNumber: { type: String, required: true },
  courseCoordinator: { type: String, required: true },
  credits: { type: Number, required: true, min: 0 },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
