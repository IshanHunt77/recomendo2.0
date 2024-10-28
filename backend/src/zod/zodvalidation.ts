import {z} from 'zod'

const signupInput = z.object({
    username:z.string().min(1),
    email:z.string(),
    password:z.string().min(8)
})

type signupParams = z.infer<typeof signupInput>

export {signupInput,signupParams}