import { NextFunction, Request, Response, Router } from "express";
import { createUser } from "../controllers/authControl";

import passport from "passport";

const router: Router = Router();

router.post("/register", createUser);
router.post(
  "/login",
  (_req: Request, _res: Response, next: NextFunction): void => next(),
  passport.authenticate("local"),
  (req: Request, res: Response): Response<JSON> => res.json({ user: req.user })
);

router.get("/user", (req: Request, res: Response): void => {
  res.json({ user: req.user });
});

export default router;
