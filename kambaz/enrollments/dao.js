import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  
  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((enrollment) => enrollment.user === userId);
  }

  function enrollUserInCourse(userId, courseId) {
   return model.create({
     user: userId,
     course: courseId,
     _id: `${userId}-${courseId}`,
   });
 }

  function unenrollUserFromCourse(user, course) {
   return model.deleteOne({ user, course });
 }

  function unenrollAllUsersFromCourse(courseId) {
   return model.deleteMany({ course: courseId });
 }


  return { findEnrollmentsForUser, enrollUserInCourse, 
    unenrollUserFromCourse, unenrollAllUsersFromCourse };
}
