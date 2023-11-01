import express from 'express';
const router = express.Router();
import * as usersController from '../controllers/usersController';
import * as authController from '../controllers/authController';
import { authenticateJWT } from '../../../middleware/authMiddleware';

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/reset-password", authController.resetPassword);
router.get("/bank-token", authenticateJWT, usersController.getUserToken);

export default router;