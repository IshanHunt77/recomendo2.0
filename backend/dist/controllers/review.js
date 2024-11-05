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
exports.DeleteReview = exports.UpdateReview = exports.Reviewpg = void 0;
const Schema_1 = require("../Schema");
const Reviewpg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { film, reviewmsg } = req.body;
        const createdFilm = yield Schema_1.Film.create({ film });
        const createdReview = yield Schema_1.Review.create({
            reviewId: req.userId,
            film: createdFilm.id,
            reviewContent: reviewmsg,
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
});
exports.Reviewpg = Reviewpg;
const UpdateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.UpdateReview = UpdateReview;
// Protected Review Delete Route
const DeleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.DeleteReview = DeleteReview;
