import AlunoController from "../controllers/AlunoController";
import { Router } from "express";
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', AlunoController.index);
router.get('/:id', loginRequired, AlunoController.show);
router.post('/',loginRequired, AlunoController.create)
router.put('/:id',loginRequired,  AlunoController.update);
router.delete('/:id', loginRequired, AlunoController.delete);
export default router;
