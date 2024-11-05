import express from "express"
import {  UserSignin, UserSignup } from "../controllers/login"

const router  = express.Router()

router.route('/signup').post(UserSignup)
router.route('/signin').post(UserSignin)

export default router
