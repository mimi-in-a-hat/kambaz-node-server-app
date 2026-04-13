import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: String,
    dueDate: String,
    availableDate: String,
    availableUntilDate: String,
    points: Number,
  },
  { collection: "assignments" }
);

export default assignmentSchema;