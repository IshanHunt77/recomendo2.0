import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/UserMiddleware";
import { AddComment, DeleteComment } from "../controllers/comment";

 const router = Router();

router.route('/addcomments').post(authMiddleware,AddComment)
router.route('/deletecomment').post(authMiddleware,DeleteComment)

export default router