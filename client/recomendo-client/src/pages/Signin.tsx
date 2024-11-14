import React, { createContext, useState } from "react"
import { AlreadyAccount } from "../components/AlreadyAccount"
import { Heading } from "../components/Heading"
import InputComponent from "../components/InputComponent"

import axios from "axios"
import { Home } from "./Home"

interface tokenType {
    token:string
}
const tokenData = createContext<tokenType|undefined>(undefined);

export const Signin = ()=>{
    const [token,setToken] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const handleNavigate =async ()=>{
        try{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                body:{
                    email,
                    password
                }
            })
            console.log(response.data)
            const token = response.data.token
            setToken(token)
        }catch(e){
            console.log(e)
        }
    }
    return<>
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="bg-gray-100 text-center w-80 shadow-lg rounded-lg p-8">
        <Heading label="Signin"/>
        <InputComponent label="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <InputComponent label="password" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}/>
        <button
          className="bg-red-600 text-white font-semibold text-lg py-2 px-4 mt-4 rounded"
          onClick={handleNavigate}
        >
          Submit
        </button>
        <AlreadyAccount label="Don't have an Account?" navigateTo="/" buttonLabel="SignUp"/>
        </div>
    </div>
    <tokenData.Provider value={{token}}>
        <Home/>
    </tokenData.Provider>
    </>
}
export {tokenData}