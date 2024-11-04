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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zodvalidation_1 = require("../zod/zodvalidation");
const Schema_1 = require("../Schema");
const config_1 = require("../config");
exports.userRoutes = (0, express_1.Router)();
// Middleware for authentication
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.header("Authorization");
    if (!authorization) {
        res.status(403).json({ msg: "No Authorization Header" });
        return;
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        res.status(403).json({ msg: "Invalid Authorization Format" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_Secret);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(403).json({ msg: "User not Authorized" });
    }
});
// Signup Route (no auth required)
exports.userRoutes.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedResult = zodvalidation_1.signupInput.safeParse(req.body);
        if (!parsedResult.success) {
            res.status(400).json({ msg: "Invalid Schema" });
            return;
        }
        const { username, email, password } = parsedResult.data;
        const user = yield Schema_1.User.create({ username, email, password });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.JWT_Secret);
        res.status(201).json({ token, msg: "User Created Successfully" });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
}));
// Signin Route (no auth required)
exports.userRoutes.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Schema_1.User.findOne({ email });
        if (!user || user.password !== password) {
            res.status(403).json({ msg: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.JWT_Secret);
        res.status(200).json({ token, msg: "Signin Successful" });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
}));
// Protected Review Route (requires auth)
exports.userRoutes.post('/review', authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { film, review } = req.body;
        const createdFilm = yield Schema_1.Film.create({ film });
        const createdReview = yield Schema_1.Review.create({
            reviewId: req.userId,
            film: createdFilm.id,
            reviewContent: review,
        });
        if (!createdReview) {
            res.status(400).json({ msg: "Review could not be added" });
            return;
        }
        req.revID = createdReview.id;
        res.status(201).json({ msg: "Review Added Successfully" });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
}));
// Protected Review Update Route
exports.userRoutes.post('/review/update', authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { upvote, downvote, reviewmsg } = req.body;
    try {
        let update;
        if (upvote) {
            update = { $inc: { upvote: 1 } };
        }
        else if (downvote) {
            update = { $inc: { downvote: -1 } };
        }
        else {
            res.status(400).json({ msg: "Invalid update parameters" });
            return;
        }
        yield Schema_1.Review.findOneAndUpdate({ reviewContent: reviewmsg }, update);
        res.status(200).json({ msg: "Review Updated Successfully" });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}));
// Protected Review Delete Route
exports.userRoutes.delete('/review/:id', authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const review = yield Schema_1.Review.findByIdAndDelete(id);
        if (!review) {
            res.status(404).json({ msg: "Review Not Found" });
            return;
        }
        res.status(200).json({ msg: "Review Deleted Successfully" });
    }
    catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}));
// Protected Comment Delete Route
exports.userRoutes.delete('/comment/:id', authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
