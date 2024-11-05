"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserMiddleware_1 = require("../middlewares/UserMiddleware");
const comment_1 = require("../controllers/comment");
const router = (0, express_1.Router)();
router.route('/addcomments').post(UserMiddleware_1.authMiddleware, comment_1.AddComment);
router.route('/deletecomment').post(UserMiddleware_1.authMiddleware, comment_1.DeleteComment);
exports.default = router;
