import express from 'express';
const router = express.Router();
import * as usersController from '../controllers/usersController';

router.post("/token", usersController.getUserToken);
router.get('/institutions', usersController.getInstitutions);

export default router;