"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteComment = exports.AddComment = void 0;
const Schema_1 = require("../Schema");
const AddComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, review, email } = req.body;
        const reviewmsg = yield Schema_1.Review.findOne({
            reviewContent: review
        });
        const user = yield Schema_1.User.findOne({
            email: email
        });
        const addcomment = yield Schema_1.Comment.create({
            commentReviewId: reviewmsg === null || reviewmsg === void 0 ? void 0 : reviewmsg.id,
            commentUserId: user === null || user === void 0 ? void 0 : user.id,
            commentmsg: comment
        });
        res.status(201).json({
            msg: "Comment Added Successfully"
        });
    }
    catch (e) {
        res.status(403).json({ msg: "Internal Error" });
        console.log("Error:", e); // Fix the syntax error here
    }
});
exports.AddComment = AddComment;
const DeleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comment = yield Schema_1.Comment.findByIdAndDelete(id);
        if (!comment) {
            res.status(404).json({ msg: "Comment Not Found" });
            return;
        }
        res.status(200).json({ msg: "Comment Deleted Successfully" });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.DeleteComment = DeleteComment;
