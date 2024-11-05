import { Request, Response } from "express";
import { signupInput } from "../zod/zodvalidation";
import { userType } from "../types/tsTypes";
import { User } from "../Schema";
import { JWT_Secret } from "../config";
import jwt from "jsonwebtoken";



export const UserSignup =  async (req: Request, res: Response)=> {
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
};

// Signin Route (no auth required)
export const UserSignin =  async (req: Request, res: Response)=> {
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
};
