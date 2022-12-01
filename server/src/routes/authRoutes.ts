import { Router } from "express";
import { createUser } from "../controllers/authControl";

const router: Router = Router();

router.post("/register", createUser);

export default router;
