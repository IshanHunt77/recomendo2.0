"use strict";
// import { signupInput } from "../zod/zodvalidation";
// import express, { NextFunction, Request, RequestHandler, Response, Router } from "express";
// import { Comment, Film, Review, User } from "../Schema";
// import { JWT_Secret } from "../config";
// import jwt from "jsonwebtoken";
// interface ReviewRequest extends Request {
//     revID: string;
// }
// export const userRoutes = Router();
// // Define CustomRequest to include userId
// export interface CustomRequest extends Request {
//     userId?: string;
// }
// // Middleware function
//  const middleware: RequestHandler = async (req: CustomRequest, res: Response, next: NextFunction) => {
//     const authorization = req.header("Authorization");
//     if (!authorization) {
//         return res.status(403).json({ msg: "No Authorization Header" });
//     }
//     const token = authorization.split(' ')[1];
//     if (!token) {
//         return res.status(403).json({ msg: "Invalid Authorization Format" });
//     }
//     try {
//         const decoded = jwt.verify(token, JWT_Secret) as { id: string };
//         req.userId = decoded.id;  // Assign userId to CustomRequest
//         // Allow the request to proceed
//         next();
//     } catch (err) {
//         console.error(err);  // Optional: Logs the specific error for troubleshooting
//         res.status(403).json({ msg: "User not Authorized" });
//     }
// };
// userRoutes.post('/signup', async (req: Request, res: Response) => {
//     try {
//         const parsedResult = signupInput.safeParse(req.body);
//         if (!parsedResult.success) {
//             return res.status(403).json({ msg: "Invalid Schema" });
//         }
//         const { username, email, password } = parsedResult.data!;
//         const user = await User.create({ username, email, password });
//         const token = jwt.sign(user.id, JWT_Secret);
//         res.status(201).json({ token, msg: "User Created Successfully" });
//     } catch (err) {
//         res.status(500).json({ msg: "Internal Error" });
//     }
// });
// userRoutes.post('/signin', middleware, async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email, password });
//         if (!user) {
//             return res.status(403).json({ msg: "User Not Found" });
//         }
//         res.status(201).json({ msg: "Signin Successful" });
//     } catch (err) {
//         res.status(500).json({ msg: "Internal Error" });
//     }
// });
// userRoutes.post('/review', async (req: Request, res: Response) => {
//     try {
//         const { film, review } = req.body;
//         const films = await Film.create({ film });
//         const reviews = await Review.create({
//             reviewId: (req as CustomRequest).userId,
//             film: films.id,
//             reviewContent: review
//         });
//         if (!reviews) {
//             return res.status(403).json({ msg: "Review could not be Added" });
//         }
//         (req as ReviewRequest).revID = reviews.id;
//         res.status(201).json({ msg: "Review Added Successfully" });
//     } catch (err) {
//         res.status(500).json({ msg: "Internal Error" });
//     }
// });
// userRoutes.post('/review/comments', async (req: Request, res: Response) => {
//     try {
//         const { reviewmsg, comment } = req.body;
//         const review = await Review.findOne({ reviewContent: reviewmsg });
//         const commentStatus = await Comment.create({
//             commentUserId: (req as CustomRequest).userId,
//             commentReviewId: review?.id,
//             commentmsg: comment
//         });
//         if (!commentStatus) {
//             return res.status(403).json({ msg: 'Comment Could not be Added' });
//         }
//         res.status(201).json({ msg: "Comment Added Successfully" });
//     } catch (err) {
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// });
// userRoutes.post('/review/update', async (req: Request, res: Response) => {
//     const { upvote, downvote, reviewmsg } = req.body;
//     try {
//         if (upvote) {
//             await Review.findOneAndUpdate(
//                 { reviewContent: reviewmsg },
//                 { $inc: { upvote: 1 } }
//             );
//         } else if (downvote) {
//             await Review.findOneAndUpdate(
//                 { reviewContent: reviewmsg, downvote: { $gt: 0 } },
//                 { $inc: { downvote: -1 } }
//             );
//         }
//         res.status(201).json({ msg: "Review Updated Successfully" });
//     } catch (err) {
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// });
// userRoutes.post('/comment/update', async (req: Request, res: Response) => {
//     const { upvote, downvote, commentmsg } = req.body;
//     try {
//         if (upvote) {
//             await Comment.findOneAndUpdate(
//                 { commentmsg },
//                 { $inc: { upvote: 1 } }
//             );
//         } else if (downvote) {
//             await Comment.findOneAndUpdate(
//                 { commentmsg, downvote: { $gt: 0 } },
//                 { $inc: { downvote: -1 } }
//             );
//         }
//         res.status(201).json({ msg: "Comment Updated Successfully" });
//     } catch (err) {
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// });
// userRoutes.delete('/review/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const review = await Review.findByIdAndDelete(id);
//         if (!review) {
//             return res.status(404).json({ msg: "Review Not Found" });
//         }
//         res.status(200).json({ msg: "Review Deleted Successfully" });
//     } catch (err) {
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// });
// userRoutes.delete('/comment/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const comment = await Comment.findByIdAndDelete(id);
//         if (!comment) {
//             return res.status(404).json({ msg: "Comment Not Found" });
//         }
//         res.status(200).json({ msg: "Comment Deleted Successfully" });
//     } catch (err) {
//         res.status(500).json({ msg: "Internal Server Error" });
//     }
// });
