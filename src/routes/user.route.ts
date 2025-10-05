import express from "express";
import { userSignUp, userLogIn } from "../controllers/auth.controller.js"
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = express.Router();

router.post('/signup', userSignUp)
router.post('/login', userLogIn)

export default router;
