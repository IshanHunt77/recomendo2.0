import { Response } from "express";
import { CustomRequest } from "./review";
import { Comment, Review, User } from "../Schema";

export const AddComment = async (req: CustomRequest, res: Response) => {
    try {
        const { comment, review, email } = req.body;

        const reviewmsg = await Review.findOne({
            reviewContent: review
        });
        const user = await User.findOne({
            email: email
        });

        const addcomment = await Comment.create({
            commentReviewId: reviewmsg?.id,
            commentUserId: user?.id,
            commentmsg: comment
        });

        res.status(201).json({
            msg: "Comment Added Successfully"
        });
    } catch (e) {
        res.status(403).json({ msg: "Internal Error" });
        console.log("Error:", e); // Fix the syntax error here
    }
};

export const DeleteComment = async (req: CustomRequest, res: Response) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            res.status(404).json({ msg: "Comment Not Found" });
            return;
        }

        res.status(200).json({ msg: "Comment Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
