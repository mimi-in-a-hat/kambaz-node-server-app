import mongoose from "mongoose";
import assignmentSchema from "./schema.js";

const AssignmentModel =
	mongoose.models.AssignmentModel || mongoose.model("AssignmentModel", assignmentSchema);

export default AssignmentModel;