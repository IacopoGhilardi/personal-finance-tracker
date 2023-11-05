import express from 'express';
const router = express.Router();
import * as usersController from '../controllers/usersController';

router.post("/", () => {
    console.log('bank list');
});

export default router;