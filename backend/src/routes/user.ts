
import { signupInput } from "../zod/zodvalidation"
import 'express'
import {Request,Response} from 'express'
import { User } from "../Schema";

userRoutes.post('/signup',async(req:Request,res:Response)=>{
    const parsedResult = signupInput.safeParse(req.body);
    if(!parsedResult.success){
        res.status(403).json({
            msg:"Invalid Schema"
        })
    }
    const {username,email,password} = parsedResult.data!;
    const user = await User.create({
        username,
        email,
        password
    })
    const token = jwt.sign(user.id,JWT_Secret)
    res.status(201).json({msg:"User Created Successfully"})
})
