import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import Sell from "./components/Sell"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Verify from "./components/Verify"
import Home from "./components/Home"

function App() {
  return(
    <BrowserRouter>
    <Nav/>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/verify" element={<Verify/>}></Route>
    <Route path="/sell" element={<Sell/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
