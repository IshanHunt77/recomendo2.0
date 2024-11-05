import { NextFunction, Response } from "express";
import { CustomRequest } from "../controllers/review";
import jwt from "jsonwebtoken";
import { JWT_Secret } from "../config";

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
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