import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export default function CoursesDao(db) {
  function findAllCourses() {
    return model.find();
  }

  async function findCoursesForEnrolledUser(userId) {
  const { enrollments } = db;
  const courses = await model.find();
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}

function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
}

function deleteCourse(courseId) {
    const { courses, enrollments } = db;
    db.courses = courses.filter((course) => course._id !== courseId);
    db.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
    );
  }

async function updateCourse(courseId, courseUpdates) {
  const { _id, ...updatesWithoutId } = courseUpdates;
  await model.updateOne({ _id: courseId }, { $set: updatesWithoutId });
  return model.findOne({ _id: courseId });
}

  return { findAllCourses, findCoursesForEnrolledUser, 
    createCourse, deleteCourse, updateCourse };
}
