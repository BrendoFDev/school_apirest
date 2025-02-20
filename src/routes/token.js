import { Router } from "express";
import TokenController from "../controllers/TokenController";
const router = new Router();

router.get('/:id', TokenController.getToken);

export default router;
