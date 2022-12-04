import { NextFunction, Request, Response, Router } from "express";
import { createUser } from "../controllers/authControl";

import passport from "passport";
import { clientURL } from "../urls";

const router: Router = Router();

router.post("/register/step/1", createUser);

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
    successRedirect: `${clientURL}/auth/signup?stepNo=2`, // prettier-ignore
    failureMessage: "Something went wrong.",
  })
);

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureMessage: "Something went wrong" }),
  (_req: Request, res: Response) => {
    res.redirect(clientURL);
  }
);

router.delete("/logout", (req: Request, res: Response) => {
  req.logOut({}, (err: any): void | Response<JSON> => {
    if (err) return res.status(500).json({ message: err });
    res.redirect(clientURL);
  });
});

export default router;
