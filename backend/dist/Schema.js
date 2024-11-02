"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Review = exports.User = exports.Film = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
const FilmSchema = new mongoose_1.default.Schema({
    film: {
        type: String,
        required: true
    }
});
const Film = mongoose_1.default.model("Film", FilmSchema);
exports.Film = Film;
const Reviews = new mongoose_1.default.Schema({
    reviewId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    film: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Film",
        required: true
    },
    reviewContent: {
        type: String,
        required: true,
        maxlength: 1000
    },
    upvote: {
        type: Number,
        default: 0,
        required: true
    },
    downvote: {
        type: Number,
        default: 0,
        required: true
    }
});
const Review = mongoose_1.default.model("Review", Reviews);
exports.Review = Review;
const Comments = new mongoose_1.default.Schema({
    commentUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    commentReviewId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Review",
        required: true
    },
    commentmsg: {
        type: String,
        required: true,
        maxlength: 500
    },
    upvote: {
        type: Number,
        default: 0,
        required: true
    },
    downvote: {
        type: Number,
        default: 0,
        required: true
    }
});
const Comment = mongoose_1.default.model("Comment", Comments);
exports.Comment = Comment;
