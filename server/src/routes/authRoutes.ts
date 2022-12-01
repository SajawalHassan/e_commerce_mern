import { Router } from "express";
import { createUser } from "../controllers/authControl";
import { clientURL } from "../urls";

import passport from "passport";

const router: Router = Router();

router.post("/register", createUser);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: clientURL,
    failureMessage: "Login failed!",
  })
);

export default router;
