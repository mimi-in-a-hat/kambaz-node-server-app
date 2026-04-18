import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
const dao = QuizzesDao();

const findQuizzesForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  } catch (error) {
    console.error("Error finding quizzes:", error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

const createQuizForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quiz = { ...req.body, course: courseId };
    console.log("Creating quiz:", quiz);
    const newQuiz = await dao.createQuiz(quiz);
    console.log("Quiz created:", newQuiz);
    res.json(newQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ error: "Failed to create quiz", details: error instanceof Error ? error.message : String(error) });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const updated = await dao.updateQuiz(quizId, req.body);
    if (!updated) return res.status(404).json({ error: "Quiz not found" });
    res.json(updated);
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "Failed to update quiz" });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const result = await dao.deleteQuiz(quizId);
    res.json(result);
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Failed to delete quiz" });
  }
};

const findQuizById = async (req, res) => {
    try {
      const { quizId } = req.params;
      const quiz = await dao.findQuizById(quizId);
      if (!quiz) return res.status(404).json({ error: "Quiz not found" });
      res.json(quiz);
    } catch (error) {
      console.error("Error finding quiz:", error);
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  };

app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
app.put("/api/quizzes/:quizId", updateQuiz);
app.delete("/api/quizzes/:quizId", deleteQuiz);
app.get("/api/quizzes/:quizId", findQuizById);
}
