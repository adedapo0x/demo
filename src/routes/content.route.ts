import express from "express";
import { getUserContents, getContent, createContent } from "../controllers/content.controller.js";
import { authenticateToken } from "../middlewares/authenticate-token.js";

const router = express.Router();

router.post("/content", authenticateToken, createContent)

router.get("/contents/:contentId", authenticateToken, getContent);
router.get("/users/:userId/contents", authenticateToken, getUserContents);

export default router;
