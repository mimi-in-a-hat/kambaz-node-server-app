import express from 'express'
import Hello from "./Hello.js"
import Lab5 from './lab5/index.js'
import cors from "cors";
import session from "express-session";
import db from "./kambaz/database/index.js";
import UserRoutes from "./kambaz/users/routes.js";
import CourseRoutes from "./kambaz/courses/routes.js";
import AssignmentRoutes from "./kambaz/assignments/routes.js";
import EnrollmentRoutes from "./kambaz/enrollments/routes.js";
import "dotenv/config";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || true,
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  app.set("trust proxy", 1);
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app, db);
CourseRoutes(app, db);
AssignmentRoutes(app, db);
EnrollmentRoutes(app, db);
Hello(app)
Lab5(app)

const startServer = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    app.listen(process.env.PORT || 4000);
  } catch (error) {
    console.error("MongoDB connection failed.");
    console.error("Check DATABASE_CONNECTION_STRING in Render for the correct Atlas username, password, database name, and URL encoding.");
    console.error(error);
    process.exit(1);
  }
};

startServer();