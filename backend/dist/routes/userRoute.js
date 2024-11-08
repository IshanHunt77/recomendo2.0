"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = require("../controllers/login");
const router = express_1.default.Router();
router.route('/signup').post(login_1.UserSignup);
router.route('/signin').post(login_1.UserSignin);
exports.default = router;
