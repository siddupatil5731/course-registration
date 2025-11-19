const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Course = require("../models/Course");
require("dotenv").config({ path: "../.env" });

const seedCourses = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error("MONGO_URI not found in .env file");
      process.exit(1);
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected for seeding...");

    // Clear existing courses
    await Course.deleteMany({});
    console.log("Cleared existing courses.");

    const courses = [];
    const courseCount = 50;

    const subjects = [
      "Cyber Security",
      "Web Development",
      "Data Science",
      "Artificial Intelligence",
      "Machine Learning",
      "Cloud Computing",
      "Mobile App Development",
      "Blockchain Technology",
      "UI/UX Design",
      "Digital Marketing",
      "Project Management",
      "Software Engineering",
    ];

    for (let i = 0; i < courseCount; i++) {
      const subject = subjects[faker.number.int({ max: subjects.length - 1 })];
      const titleFormats = [
        `Introduction to ${subject}`,
        `${subject} Fundamentals`,
        `Advanced ${subject}`,
        `The Complete ${subject} Bootcamp`,
        `${subject} for Beginners`,
      ];

      courses.push({
        title: titleFormats[faker.number.int({ max: titleFormats.length - 1 })],
        description: `This course provides a comprehensive overview of ${subject}. You will learn the core concepts, practical skills, and industry best practices to excel in this field. This is a hands-on course designed to take you from beginner to a professional level.`,
        instructor: faker.person.fullName(),
        courseNumber: `${faker.lorem
          .word()
          .substring(0, 3)
          .toUpperCase()}${faker.number.int({ min: 100, max: 499 })}`,
        courseCoordinator: faker.person.fullName(),
        credits: faker.number.int({ min: 1, max: 4 }),
      });
    }

    await Course.insertMany(courses);
    console.log(`${courseCount} courses have been seeded successfully!`);

    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
};

seedCourses();
