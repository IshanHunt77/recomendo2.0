import express from "express"
import { Home } from "../controllers/home"

const router  = express.Router()

router.route('/home').get(Home)

export default router
