import { NextFunction, Request, Response, Router } from "express";
import { createUser } from "../controllers/authControl";

import passport from "passport";
import { clientURL } from "../urls";

const router: Router = Router();

router.post("/register", createUser);
router.post(
  "/login",
  (_req: Request, _res: Response, next: NextFunction): void => next(),
  passport.authenticate("local"),
  (req: Request, res: Response): Response<JSON> => res.json({ user: req.user })
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] as any })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: clientURL,
    failureMessage: "Something went wrong.",
  })
);

router.delete("/logout", (req: Request, res: Response) => {
  req.logOut({}, (err: any) => res.redirect(clientURL));
});

export default router;
