import express, { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { signupInput } from "../zod/zodvalidation";
import { Comment, Film, Review, User } from "../Schema";
import { JWT_Secret } from "../config";
import { userType } from "../types/tsTypes";

interface ReviewRequest extends Request {
    revID?: string;
}

export interface CustomRequest extends Request {
    userId?: string;
}

export const userRoutes = Router();

// Middleware for authentication
const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
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
        const decoded = jwt.verify(token, JWT_Secret) as { id: string };
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({ msg: "User not Authorized" });
    }
};

// Signup Route (no auth required)
userRoutes.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedResult = signupInput.safeParse(req.body);
        if (!parsedResult.success) {
            res.status(400).json({ msg: "Invalid Schema" });
            return;
        }
        
        const { username, email, password } = parsedResult.data;
        const user: userType = await User.create({ username, email, password });
        const token = jwt.sign({ id: user.id }, JWT_Secret);
        
        res.status(201).json({ token, msg: "User Created Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
});

// Signin Route (no auth required)
userRoutes.post('/signin', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            res.status(403).json({ msg: "Invalid email or password" });
            return;
        }
        
        const token = jwt.sign({ id: user.id }, JWT_Secret);
        res.status(200).json({ token, msg: "Signin Successful" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
});

// Protected Review Route (requires auth)
userRoutes.post('/review', authMiddleware, async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { film, review } = req.body;
        
        const createdFilm = await Film.create({ film });
        const createdReview = await Review.create({
            reviewId: req.userId,
            film: createdFilm.id,
            reviewContent: review,
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
});

// Protected Review Update Route
userRoutes.post('/review/update', authMiddleware, async (req: CustomRequest, res: Response): Promise<void> => {
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
});

// Protected Review Delete Route
userRoutes.delete('/review/:id', authMiddleware, async (req: CustomRequest, res: Response): Promise<void> => {
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
});

// Protected Comment Delete Route
userRoutes.delete('/comment/:id', authMiddleware, async (req: CustomRequest, res: Response): Promise<void> => {
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
});
