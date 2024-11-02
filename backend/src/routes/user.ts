import express, { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { signupInput } from "../zod/zodvalidation";
import { Comment, Film, Review, User } from "../Schema";
import { JWT_Secret } from "../config";

interface ReviewRequest extends Request {
    revID?: string;
}

// Extend Request interface for CustomRequest with userId
export interface CustomRequest extends Request {
    userId?: string;
}

export const userRoutes = Router();

// Middleware for authentication
const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authorization = req.header("Authorization");

    if (!authorization) {
        return res.status(403).json({ msg: "No Authorization Header" });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(403).json({ msg: "Invalid Authorization Format" });
    }

    try {
        const decoded = jwt.verify(token, JWT_Secret) as { id: string };
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ msg: "User not Authorized" });
    }
};

userRoutes.post('/signup', async (req: Request, res: Response) => {
    try {
        const parsedResult = signupInput.safeParse(req.body);
        if (!parsedResult.success) {
            return res.status(400).json({ msg: "Invalid Schema" });
        }
        
        const { username, email, password } = parsedResult.data;
        const user = await User.create({ username, email, password });
        const token = jwt.sign({ id: user.id }, JWT_Secret);
        
        res.status(201).json({ token, msg: "User Created Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
});


userRoutes.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(403).json({ msg: "Invalid email or password" });
        }
        
        const token = jwt.sign({ id: user.id }, JWT_Secret);
        res.status(200).json({ token, msg: "Signin Successful" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
});

// Middleware-protected routes
userRoutes.use(authMiddleware);

userRoutes.post('/review', async (req: CustomRequest, res: Response) => {
    try {
        const { film, review } = req.body;
        
        const createdFilm = await Film.create({ film });
        const createdReview = await Review.create({
            reviewId: req.userId,
            film: createdFilm.id,
            reviewContent: review,
        });

        if (!createdReview) {
            return res.status(400).json({ msg: "Review could not be added" });
        }

        (req as ReviewRequest).revID = createdReview.id;
        res.status(201).json({ msg: "Review Added Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Error" });
    }
});

// Update reviews with upvote or downvote
userRoutes.post('/review/update', async (req: Request, res: Response) => {
    const { upvote, downvote, reviewmsg } = req.body;

    try {
        let update;
        if (upvote) {
            update = { $inc: { upvote: 1 } };
        } else if (downvote) {
            update = { $inc: { downvote: -1 } };
        } else {
            return res.status(400).json({ msg: "Invalid update parameters" });
        }

        await Review.findOneAndUpdate({ reviewContent: reviewmsg }, update);
        res.status(200).json({ msg: "Review Updated Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Delete review by ID
userRoutes.delete('/review/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({ msg: "Review Not Found" });
        }
        
        res.status(200).json({ msg: "Review Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Delete comment by ID
userRoutes.delete('/comment/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({ msg: "Comment Not Found" });
        }
        
        res.status(200).json({ msg: "Comment Deleted Successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
