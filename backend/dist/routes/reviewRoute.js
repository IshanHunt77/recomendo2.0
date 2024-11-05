"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = require("../controllers/review");
const UserMiddleware_1 = require("../middlewares/UserMiddleware");
const router = express_1.default.Router();
router.route('/addreview').post(UserMiddleware_1.authMiddleware, review_1.Reviewpg);
router.route('/updatereview').post(UserMiddleware_1.authMiddleware, review_1.UpdateReview);
router.route('/deletereview').post(UserMiddleware_1.authMiddleware, review_1.DeleteReview);
exports.default = router;
