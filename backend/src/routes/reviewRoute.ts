
import express from "express"
import { DeleteReview, Reviewpg, UpdateReview } from "../controllers/review"
import { authMiddleware } from "../middlewares/UserMiddleware"

const router = express.Router()

router.route('/addreview').post(authMiddleware,Reviewpg)
router.route('/updatereview').post(authMiddleware,UpdateReview)
router.route('/deletereview').post(authMiddleware,DeleteReview)

export default router

