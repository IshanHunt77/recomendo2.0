import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";

import { Movie } from "./pages/Movie";
import { Apitest } from "./pages/Apitest";


export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/home" element={<Home/>}/>
        
        <Route path="/movie" element={<Movie/>}/>
        
       

      </Routes>
    </Router>
    
    </>
  )
}