import QuizAttemptsDao from "./dao.js";


export default function QuizAttemptsRoutes(app) {
  const dao = QuizAttemptsDao();

  // Get all attempts for a quiz by a user
  const findAttemptsByQuizAndUser = async (req, res) => {
    const { quizId, userId } = req.params;
    const attempts = await dao.findAttemptsByQuizAndUser(quizId, userId);
    res.json(attempts);
  };

  // Get latest attempt for a quiz by a user
  const findLatestAttempt = async (req, res) => {
    const { quizId, userId } = req.params;
    const attempt = await dao.findLatestAttempt(quizId, userId);
    res.json(attempt);
  };

  // Create a new quiz attempt
  const createAttempt = async (req, res) => {
    const attempt = req.body;
    const newAttempt = await dao.createAttempt(attempt);
    res.json(newAttempt);
  };

  // Update an existing attempt (save answers)
  const updateAttempt = async (req, res) => {
    const { attemptId } = req.params;
    const updates = req.body;
    const updated = await dao.updateAttempt(attemptId, updates);
    if (!updated) return res.status(404).json({ error: "Attempt not found" });
    res.json(updated);
  };

  // Get attempt count for a user on a quiz
  const getAttemptCount = async (req, res) => {
    const { quizId, userId } = req.params;
    const count = await dao.getAttemptCount(quizId, userId);
    res.json({ count });
  };

  // Get a specific attempt by ID
  const findAttemptById = async (req, res) => {
    const { attemptId } = req.params;
    const attempt = await dao.findAttemptById(attemptId);
    if (!attempt) return res.status(404).json({ error: "Attempt not found" });
    res.json(attempt);
  };

  app.get("/api/quizzes/:quizId/users/:userId/attempts", findAttemptsByQuizAndUser);
  app.get("/api/quizzes/:quizId/users/:userId/latest", findLatestAttempt);
  app.post("/api/quiz-attempts", createAttempt);
  app.put("/api/quiz-attempts/:attemptId", updateAttempt);
  app.get("/api/quizzes/:quizId/users/:userId/count", getAttemptCount);
  app.get("/api/quiz-attempts/:attemptId", findAttemptById);
}
