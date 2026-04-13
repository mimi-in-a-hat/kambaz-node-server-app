import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  async function findAssignmentsForCourse(courseId) {
    const { assignments } = db;
    return assignments.filter((assignment) => assignment.course === courseId);
  }

  async function findAssignmentById(assignmentId) {
    const { assignments } = db;
    return assignments.find((assignment) => assignment._id === assignmentId);
  }

  async function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  async function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = db;
    const assignment = assignments.find((a) => a._id === assignmentId);
    if (!assignment) {
      return null;
    }
    Object.assign(assignment, assignmentUpdates);
    return assignment;
  }

  async function deleteAssignment(assignmentId) {
    const { assignments } = db;
    const assignmentExists = assignments.some((a) => a._id === assignmentId);
    db.assignments = assignments.filter((a) => a._id !== assignmentId);
    return assignmentExists;
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
