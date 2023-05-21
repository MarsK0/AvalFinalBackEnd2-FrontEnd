import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Protected from "../components/protected/Protected"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Home from "../pages/Home"

const Router: React.FC = () => {
  return(
    <BrowserRouter>
      <Routes>ou
        <Route path="/" element={<Protected page={<Home />} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Protected page={<Home />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router