import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {
async function findQuizzesForCourse(courseId) {
return model.find({ course: courseId });
}

async function createQuiz(quiz) {
const newQuiz = { ...quiz, _id: uuidv4() };
return model.create(newQuiz);
}

async function updateQuiz(quizId, updates) {
const updated = await model.findByIdAndUpdate(quizId, updates, { new: true });
return updated;
}

async function deleteQuiz(quizId) {
const result = await model.deleteOne({ _id: quizId });
return { success: result.deletedCount > 0 };
}

async function findQuizById(quizId) {
    return model.findById(quizId);
  }

return { findQuizzesForCourse, createQuiz, updateQuiz, deleteQuiz, findQuizById };
}
