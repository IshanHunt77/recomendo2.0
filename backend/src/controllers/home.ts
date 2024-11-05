import { Request, Response } from "express"

export const Home = async(req:Request,res:Response)=>{
    res.status(201).json({msg:"welcome to Home Page"})
}