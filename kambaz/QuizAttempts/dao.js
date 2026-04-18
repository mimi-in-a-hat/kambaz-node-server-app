import model from "./model.js";
import { v4 as uuidv4 } from "uuid";


export default function QuizAttemptsDao() {
  async function findAttemptsByQuizAndUser(quizId, userId) {
    return model.find({ quizId, userId }).sort({ attemptNumber: -1 });
  }

  async function findLatestAttempt(quizId, userId) {
    return model.findOne({ quizId, userId, isSubmitted: true }).sort({ attemptNumber: -1 });
  }

  async function createAttempt(attempt) {
    const newAttempt = { ...attempt, _id: uuidv4() };
    return model.create(newAttempt);
  }

  async function updateAttempt(attemptId, updates) {
    return model.findByIdAndUpdate(attemptId, updates, { new: true });
  }

  async function getAttemptCount(quizId, userId) {
    return model.countDocuments({ quizId, userId, isSubmitted: true });
  }

  async function findAttemptById(attemptId) {
    return model.findById(attemptId);
  }

  return {
    findAttemptsByQuizAndUser,
    findLatestAttempt,
    createAttempt,
    updateAttempt,
    getAttemptCount,
    findAttemptById,
  };
}
