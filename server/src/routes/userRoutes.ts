import { Router } from "express";
import { getCurrentUser } from "../controllers/userControl";

const router: Router = Router();

router.get("/me", getCurrentUser);

export default router;
