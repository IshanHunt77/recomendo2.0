import { Request, Response } from "express";
import { Film, Review } from "../Schema";

export interface CustomRequest<T = any> extends Request {
    userId?: string;
    body: T;
}

interface ReviewRequest extends Request {
    revID?: string;
}

export const Reviewpg = async (req: CustomRequest<{ film: string; reviewmsg: string }>, res: Response) => {
    try {
        const { film, reviewmsg } = req.body;
        
        const createdFilm = await Film.create({ film });
        const createdReview = await Review.create({
            reviewId: req.userId,
            film: createdFilm.id,
            reviewContent: reviewmsg,
        });

        if (!createdReview) {
            res.status(400).json({ msg: "Review could not be added" });
            return;
        }

        (req as ReviewRequest).revID = createdReview.id;
        res.status(201).json({ msg: "Review Added Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
};

export const UpdateReview =  async (req: CustomRequest, res: Response) => {
    const { upvote, downvote, reviewmsg } = req.body;

    try {
        let update;
        if (upvote) {
            update = { $inc: { upvote: 1 } };
        } else if (downvote) {
            update = { $inc: { downvote: -1 } };
        } else {
            res.status(400).json({ msg: "Invalid update parameters" });
            return;
        }

        await Review.findOneAndUpdate({ reviewContent: reviewmsg }, update);
        res.status(200).json({ msg: "Review Updated Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Protected Review Delete Route
export const DeleteReview =  async (req: CustomRequest, res: Response)=> {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            res.status(404).json({ msg: "Review Not Found" });
            return;
        }
        
        res.status(200).json({ msg: "Review Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};