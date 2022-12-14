import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { clientURL as origin } from "./urls";

import "./passport/localStrategy";
import "./passport/googleStrategy";
import "./passport/githubStrategy";
import verifyUser from "./middleware/verifyUser";
dotenv.config();

const app = express(); // Initialize express app

// Middleware
app.use(
  session({
    secret: `${process.env.COOKIE_SECRET}`,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin, credentials: true }));
app.use(morgan("dev"));
app.use(helmet());

// Routes middleware
app.use("/auth", authRoutes);
app.use(verifyUser);
app.use("/users", userRoutes);

// Mongoose
mongoose.connect(
  `${process.env.MONGO_URI}`,
  { dbName: "e-commerce" },
  (err: any) => {
    if (err) return console.log(err);
    console.log("Connected to mongoDB!");
  }
);

// Starting server
const port: number = parseInt(`${process.env.PORT}`) || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
