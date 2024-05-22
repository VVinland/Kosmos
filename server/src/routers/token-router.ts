import { Router } from "express";
import tokenController from "../controllers/token-controller.js";

const router = Router();

router.get('/refreshToken', tokenController.refresh);

export default router;