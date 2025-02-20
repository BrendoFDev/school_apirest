import {Router} from 'express';
import homeController from '../controllers/HomeController'
const router = new Router();

router.post('/', homeController.index);

export default router
