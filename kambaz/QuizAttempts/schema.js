import mongoose from "mongoose";


const quizAttemptSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    quizId: { type: String, required: true },
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    attemptNumber: { type: Number, required: true },
    answers: [
      {
        questionIndex: Number,
        answer: String,
        isCorrect: Boolean,
      },
    ],
    score: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    startedAt: { type: Date, default: Date.now },
    submittedAt: { type: Date },
    isSubmitted: { type: Boolean, default: false },
  },
  { collection: "quizAttempts" }
);

export default quizAttemptSchema;
