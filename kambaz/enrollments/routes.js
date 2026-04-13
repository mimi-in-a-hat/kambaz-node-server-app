import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const enrollUserInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const deleted = dao.unenrollUserFromCourse(currentUser._id, courseId);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  };

   const findCoursesForEnrolledUser = async (req, res) => {
   let { userId } = req.params;
   if (userId === "current") {
     const currentUser = req.session["currentUser"];
     if (!currentUser) {
       res.sendStatus(401);
       return;
     }
     userId = currentUser._id;
   }
   const courses = await enrollmentsDao.findCoursesForUser(userId);
   res.json(courses);
 };


  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses/:courseId/enrollment", enrollUserInCourse);
  app.delete("/api/users/current/courses/:courseId/enrollment", unenrollUserFromCourse);
}
