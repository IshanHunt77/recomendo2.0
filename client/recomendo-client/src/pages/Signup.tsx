import { useState } from "react";
import { Heading } from "../components/Heading";
import InputComponent from "../components/InputComponent";
import { AlreadyAccount } from "../components/AlreadyAccount";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState<string>(""); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleNavigate = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        body: {
          username,
          email,
          password,
        },
      });
      console.log(response.data);
      navigate("/signin");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <div className="bg-gray-100 text-center shadow-lg rounded-lg w-80 p-8">
        <Heading label="SignUp" />
        
        <InputComponent
          label="username"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputComponent
          label="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputComponent
          label="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          className="bg-orange-500 text-white font-semibold text-lg py-2 px-4 mt-4 rounded"
          onClick={handleNavigate}
        >
          Submit
        </button>

        <AlreadyAccount
          label="Already have an account?"
          navigateTo="/signin"
          buttonLabel="LogIn"
        />
      </div>
   
    </div>
      
  );
};
